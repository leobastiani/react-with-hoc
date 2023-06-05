import { ComponentType } from "react";
import { Hoc } from "./Hoc";
import { componentDisplayName } from "./componentDisplayName";

export function defaultHocName<Props, HocArgs extends any[]>(
  {
    Component,
    hoc,
  }: {
    Component: ComponentType<Props>;
    hoc: (...args: any[]) => Hoc<any>;
  },
  ...args: HocArgs
): string {
  const nameByArgs = ((): string => {
    const firstArg = args[0];
    if (typeof firstArg === "string") {
      return firstArg;
    }
    if (typeof firstArg === "number") {
      return String(firstArg);
    }
    if (Array.isArray(firstArg)) {
      return firstArg.join(".");
    }
    if (firstArg === null) {
      return "null";
    }
    if (typeof firstArg === "object") {
      return Object.keys(firstArg).join(".");
    }
    return String(firstArg);
  })();

  return `${[hoc.name, nameByArgs]
    .filter(Boolean)
    .join(".")}(${componentDisplayName.get(Component)})`;
}
