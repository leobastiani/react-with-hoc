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
        console.assert(fn.name);
      }
      return componentDisplayName.set(
        getName({ Component, name, dot, fn }, ...args),
        fn(Component, ...args)
      );
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
      const keys = ((): string[] => {
        if (Array.isArray(props)) {
          return props as string[];
        }
        if (typeof props === "string") {
          return [props];
        }
        return Object.keys(props);
      })();
      return keys.join(".");
    },
  });
}
