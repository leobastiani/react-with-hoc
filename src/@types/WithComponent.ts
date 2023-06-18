import { ComponentType, ReactNode } from "react";

export type WithComponent<TargetProps> = TargetProps extends ComponentType<
  infer Props
>
  ? WithComponent<Props>
  :
      | (<NewProps extends TargetProps>(
          Component: ComponentType<TargetProps>
        ) => ComponentType<NewProps | TargetProps>)
      | Partial<TargetProps>
      | ReactNode;
