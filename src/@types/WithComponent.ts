import { ComponentType, ReactNode } from "react";

export type WithComponent<TargetProps> =
  | (<NewProps extends TargetProps>(
      Component: ComponentType<TargetProps>
    ) => ComponentType<NewProps | TargetProps>)
  | Partial<TargetProps>
  | ReactNode;
