import {
  ComponentProps,
  ComponentType,
  FunctionComponent,
  ReactNode,
} from "react";

export type WithComponent<Target extends ComponentType> =
  | ((Component: Target) => FunctionComponent<ComponentProps<Target>>)
  | Partial<ComponentProps<Target>>
  | ReactNode;
