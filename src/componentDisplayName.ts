import { ComponentType } from "react";

export const componentDisplayName = {
  get(component: ComponentType<any>): string {
    return (
      component.displayName || component.name || "UnkownComponentDisplayName"
    );
  },
  set(displayName: string, component: ComponentType<any>): void {
    component.displayName = displayName;
  },
};
