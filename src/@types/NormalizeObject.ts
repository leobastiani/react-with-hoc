import { CSSProperties, ReactNode } from "react";

export type SimplifyComponentProps<T> = T extends CSSProperties
  ? T
  : T extends ReactNode
  ? T
  : T extends Function
  ? T
  : { [K in keyof T]: SimplifyComponentProps<T[K]> };
