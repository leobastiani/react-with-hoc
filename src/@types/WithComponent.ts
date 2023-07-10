import { ComponentType, ReactNode } from "react";

export type WithComponent<TargetProps> = TargetProps extends ComponentType<
  infer Props
>
  ? WithComponent<Props>
  :
      | ((Component: ComponentType<TargetProps>) => ComponentType<any>)
      | Partial<TargetProps>
      | ReactNode;
