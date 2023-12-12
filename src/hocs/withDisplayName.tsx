import { ComponentType } from "react";

export function withDisplayName<T extends ComponentType<any>>(
  name: (Component: T) => string,
): (component: T) => T;
export function withDisplayName<T extends ComponentType<any>>(
  name: (Component: T) => string,
  Component: T,
): T;
export function withDisplayName(name: string): <
  T extends {
    displayName?: string;
  },
>(
  component: T,
) => T;
export function withDisplayName<
  T extends {
    displayName?: string;
  },
>(name: string, component: T): T;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function withDisplayName(...args: any[]) {
  if (args.length === 2) {
    args[1].displayName =
      typeof args[0] === "function" ? args[0](args[1]) : args[0];
    return args[1];
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  return (Component: any) => {
    return withDisplayName(args[0], Component);
  };
}
