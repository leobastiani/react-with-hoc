import { ComponentType } from "react";
import { Hoc } from "./Hoc";
import { componentDisplayName } from "./componentDisplayName";

export function createHocNameFunction<
  SelectorArgs extends (...args: any[]) => unknown | undefined
>(selector: SelectorArgs) {
  return function hocName<Props, HocArgs extends Parameters<SelectorArgs>>(
    {
      Component,
      hoc,
    }: {
      Component: ComponentType<Props>;
      hoc: (...args: any[]) => Hoc<any>;
    },
    ...args: HocArgs
  ): string {
    const nameByArgs = ((): string | undefined => {
      const arg = selector(...args);
      if (typeof arg === "string") {
        return arg;
      }
      if (typeof arg === "number") {
        return String(arg);
      }
      if (Array.isArray(arg)) {
        return arg.join(".");
      }
      if (arg === undefined || typeof arg === "function") {
        return undefined;
      }
      if (arg === null) {
        return "null";
      }
      if (typeof arg === "object") {
        return Object.keys(arg).join(".");
      }
      return String(arg);
    })();

    return `${[hoc.name, nameByArgs]
      .filter(Boolean)
      .join(".")}(${componentDisplayName.get(Component)})`;
  };
}

// export const defaultHocName = createHocNameFunction(
//   (firstArg: unknown) => firstArg
// );
