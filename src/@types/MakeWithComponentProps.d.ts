import { ReactNode } from "react";

type MakeWithComponentProps<
  ClosureProps extends {},
  Options extends {},
  ComponentKey = Exclude<
    Extract<keyof Options, string>,
    "hiddenByDefault" | "pick" | "omit"
  >
> = {
  [K in keyof ClosureProps as K extends ComponentKey
    ? never
    : K]: ClosureProps[K];
} & {
  [K in ComponentKey]?:
    | ((Component: Options[K]) => (props: ClosureProps) => ReactNode)
    | ReactNode;
};
