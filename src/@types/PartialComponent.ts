import { ComponentType } from "react";
import { SimplifyComponentProps } from "./NormalizeObject";

export type PartialComponent<T extends ComponentType<any>> =
  T extends ComponentType<infer Props>
    ? ComponentType<SimplifyComponentProps<Partial<Props>>>
    : never;
