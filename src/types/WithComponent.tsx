import { ComponentType, ReactNode } from "react";

export type WithComponent<TargetProps extends object | ComponentType<any>> =
  | ((TargetProps extends ComponentType<infer Props extends object>
      ? WithComponent<Props>
      :
          | ((Component: ComponentType<TargetProps>) => ComponentType<any>)
          | Partial<TargetProps>
          | ReactNode) & {}) // `& {}` is here to avoid decoupling WithComponent
  | null;
