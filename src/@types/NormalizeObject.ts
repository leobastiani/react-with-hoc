import { CSSProperties, ReactNode } from "react";
import { PartialComponent } from "./PartialComponent";
import { WithComponent } from "./WithComponent";

export type SimplifyComponentProps<T> = T extends CSSProperties
  ? T
  : T extends ReactNode
  ? T
  : T extends Function
  ? T
  : T extends WithComponent<any>
  ? T
  : T extends PartialComponent<any>
  ? T
  : { [K in keyof T]: SimplifyComponentProps<T[K]> };
