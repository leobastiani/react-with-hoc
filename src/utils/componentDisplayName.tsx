import { ComponentType } from "react";

export const componentDisplayName = {
  get(component: ComponentType<any>): string {
    // https://github.com/jestjs/jest/blob/3738e3f038c8a8854575f44a806ee139d2c15cdd/packages/pretty-format/src/plugins/ReactElement.ts#L36C46-L36C53
    return component.displayName || component.name || "Unknown";
  },
  set(displayName: string, component: ComponentType<any>): void {
    component.displayName = displayName;
  },
};
