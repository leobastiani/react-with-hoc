import { ComponentType, ReactNode } from "react";

export type WithComponent<
  Target extends ComponentType,
  ClosureProps extends {}
> = ((Component: Target) => (props: ClosureProps) => ReactNode) | ReactNode;
