import { ComponentType, CSSProperties, ReactNode } from "react";
import { WithComponent } from "./WithComponent";

type GetObject<T> = T extends ComponentType<infer R> ? R : never;

type NormalizeObject<T> = T extends CSSProperties
  ? T
  : T extends ReactNode
  ? T
  : T extends Function
  ? T
  : T extends WithComponent<any, any>
  ? T
  : { [K in keyof T]: NormalizeObject<T[K]> };
