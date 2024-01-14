import React, { ComponentType } from "react";
import { componentDisplayName } from "../utils/componentDisplayName";

export function withDisplayName<T extends ComponentType<any>>(
  name: (Component: T) => string,
): (component: T) => T;
export function withDisplayName<T extends ComponentType<any>>(
  name: (Component: T) => string,
  Component: T,
): T;
export function withDisplayName(
  name: string,
): <T extends ComponentType<any>>(component: T) => T;
export function withDisplayName<T extends ComponentType<any>>(
  name: string,
  component: T,
): T;

/**
 * creates an empty component with a given display name for debugging the component tree
 *
 * @example
 * const Component = withDisplayName('SomeName')(Example);
 * <Component {...props} />
 * // is equivalent to
 * <SomeName> // this is just a Fragment with displayName property as `SomeName`
 *   <Example {...props} />
 * </SomeName>
 *
 * @example
 * withDisplayName('SomeName')(Example);
 * // or
 * withDisplayName('SomeName', Example);
 * // or
 * withDisplayName((Component) => 'SomeName.' + componentDisplayName.get(Component))(Example);
 * // or
 * withHocs([withDisplayName('SomeName')])(Example);
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function withDisplayName(...args: any[]) {
  if (args.length === 2) {
    const displayName =
      typeof args[0] === "function" ? args[0](args[1]) : args[0];
    const Component = args[1];
    const Ret: any = (props: any) => {
      return <Component {...props} />;
    };
    componentDisplayName.set(displayName, Ret);
    return Ret;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  return (Component: any) => {
    return withDisplayName(args[0], Component);
  };
}
