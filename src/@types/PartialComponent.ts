import { ComponentType } from "react";
import { NormalizeObject } from "./NormalizeObject";

export type PartialComponent<T extends ComponentType<any>> =
  T extends ComponentType<infer Props>
    ? ComponentType<NormalizeObject<Partial<Props>>>
    : never;
