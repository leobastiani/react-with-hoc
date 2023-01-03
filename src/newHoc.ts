import { ComponentType } from "react";
import { componentDisplayName } from "./componentDisplayName";

function getName<Props, HocArgs extends any[]>(
  {
    Component,
    name,
    dot,
    fn,
  }: {
    Component: ComponentType<Props>;
    name?: (Component: ComponentType<Props>, ...args: HocArgs) => string;
    dot?: (Component: ComponentType<Props>, ...args: HocArgs) => string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    fn: Function;
  },
  ...args: HocArgs
): string {
  if (name != undefined) {
    return name(Component, ...args);
  }
  const dotResult = dot ? dot(Component, ...args) : "";
  return `${fn.name}${
    dotResult ? "." : ""
  }${dotResult}(${componentDisplayName.get(Component)})`;
}

function defaultDot(_Component: ComponentType, ...args: any[]): string {
  const firstArg = args[0];
  if (typeof firstArg === "string") {
    return firstArg;
  }
  if (typeof firstArg === "number") {
    return firstArg.toString();
  }

  const keys = ((): string[] => {
    if (Array.isArray(firstArg)) {
      return firstArg as string[];
    }
    return Object.keys(firstArg);
  })();

  return keys.join(".");
}

export function newHoc<Props, HocArgs extends any[]>(
  fn: (
    Component: ComponentType<Props>,
    ...args: HocArgs
  ) => ComponentType<Props>,
  {
    name,
    dot = defaultDot as any,
  }: {
    name?: (Component: ComponentType<Props>, ...args: HocArgs) => string;
    dot?: (Component: ComponentType<Props>, ...args: HocArgs) => string;
  } = {}
) {
  return (...args: HocArgs) =>
    (Component: ComponentType<Props>): ComponentType<Props> => {
      if (process.env.NODE_ENV !== "production") {
        if (!fn.name) {
          throw new Error(`Trying to create a new hoc without a name: ${fn}`, {
            cause: fn,
          });
        }
      }
      const Ret = fn(Component, ...args);
      if (process.env.NODE_ENV !== "production") {
        componentDisplayName.set(
          getName({ Component, name, dot, fn }, ...args),
          Ret
        );
      }
      return Ret;
    };
}
