import { ComponentType } from "react";

export const componentDisplayName = {
  get<T>(component: ComponentType<T>): string {
    return (
      component.displayName || component.name || "UnkownComponentDisplayName"
    );
  },
  set<T>(displayName: string, component: ComponentType<T>): void {
    component.displayName = displayName;
  },
};
