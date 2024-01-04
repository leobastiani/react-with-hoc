import { ComponentProps, ComponentType } from "react";
import { Simplify } from "./Fn";

export type PartialComponent<T extends ComponentType<any>> = ComponentType<
  Simplify<Partial<ComponentProps<T>>>
>;
