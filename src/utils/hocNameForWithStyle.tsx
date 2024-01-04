import { ComponentType } from "react";
import { componentDisplayName } from "./componentDisplayName";
import { GetHocArgs, HocDefinition, NewHocReturn } from "./newHoc";

export type HocNameFactory = (
  {
    Component,
    hoc,
  }: {
    Component: ComponentType<any>;
    hoc: HocDefinition<any>;
  },
  ...args: any
) => string;

export const createHocNameFunction = <TNewHocReturn extends NewHocReturn<any>>(
  selector: (...args: GetHocArgs<TNewHocReturn>) => unknown | undefined,
): HocNameFactory => {
  return function hocName(
    {
      Component,
      hoc,
    }: {
      Component: ComponentType<any>;
      hoc: HocDefinition<GetHocArgs<TNewHocReturn>>;
    },
    ...args: GetHocArgs<TNewHocReturn>
  ): string {
    function parseArg(arg: any): string | undefined {
      if (typeof arg === "string") {
        return arg;
      }
      if (typeof arg === "number") {
        return String(arg);
      }
      if (typeof arg === "function") {
        return arg.name || "[unnamed function]";
      }
      if (Array.isArray(arg)) {
        return arg
          .map((a) => parseArg(a))
          .filter(Boolean)
          .join(".");
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
    }

    const nameByArgs = ((): string | undefined => {
      const arg = selector(...args);

      return parseArg(arg);
    })();

    return `${[hoc.name, nameByArgs]
      .filter(Boolean)
      .join(".")}(${componentDisplayName.get(Component)})`;
  };
};

export const defaultHocName: HocNameFactory = createHocNameFunction(
  (firstArg: unknown) => firstArg,
);
