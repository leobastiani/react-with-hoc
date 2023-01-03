import { ComponentType, FunctionComponent, ReactNode } from "react";

export type WithComponent<Target extends ComponentType, Props extends {}> =
  | ((Component: Target) => FunctionComponent<Props>)
  | ReactNode;
