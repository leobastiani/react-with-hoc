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
  let parsedDot = "";
  if (dot != undefined) {
    parsedDot = `.${dot(Component, ...args)}`;
  }
  return `${fn.name}${parsedDot}(${componentDisplayName.get(Component)})`;
}

export function newHoc<Props, HocArgs extends any[]>(
  fn: (
    Component: ComponentType<Props>,
    ...args: HocArgs
  ) => ComponentType<Props>,
  {
    name,
    dot,
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

export function newHocNamedWithProps<Props, HocArgs extends any[]>(
  fn: (
    Component: ComponentType<Props>,
    ...args: HocArgs
  ) => ComponentType<Props>
): (
  ...args: HocArgs
) => (Component: ComponentType<Props>) => ComponentType<Props> {
  return newHoc(fn, {
    dot(_Component, ...args) {
      const props = args[0];
      const keys = ((): (string | number)[] => {
        if (Array.isArray(props)) {
          return props as string[];
        }
        if (typeof props === "string" || typeof props === "number") {
          return [props];
        }
        return Object.keys(props);
      })();
      return keys.join(".");
    },
  });
}
