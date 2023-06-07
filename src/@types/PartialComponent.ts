import { ComponentProps, ComponentType } from "react";
import { SimplifyComponentProps } from "./NormalizeObject";

export type PartialComponent<T extends ComponentType<any>> = ComponentType<
  SimplifyComponentProps<Partial<ComponentProps<T>>>
>;
