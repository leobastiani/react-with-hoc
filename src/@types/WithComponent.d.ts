import { ComponentType, ReactNode } from "react";

type WithComponent<Target extends ComponentType, ClosureProps extends {}> =
  | ((Component: Target) => (props: ClosureProps) => ReactNode)
  | ReactNode;
