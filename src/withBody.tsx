import { ComponentType, FunctionComponent } from "react";
import {
  Fn,
  IntersectionFn,
  KeepNeversFn,
  OmitFn,
  PickFn,
  Pipe,
  ToSchema,
} from "./Fn";
import { Hoc } from "./Hoc";
import { newHoc } from "./newHoc";

interface WithBodyFn<
  PropsSchema extends [string | number | symbol, any],
  RetSchema extends [string | number | symbol, any]
> extends Fn {
  return: Pipe<
    this["arg0"],
    [
      IntersectionFn<RetSchema>,
      KeepNeversFn<OmitFn<RetSchema[0]>>,
      IntersectionFn<
        Pipe<
          this["arg0"],
          [PickFn<PropsSchema[0]>, IntersectionFn<PropsSchema>]
        >
      >
    ]
  >;
}

type WithBodyHoc = <Props extends object, Ret extends object>(
  body: (props: Props) => Ret
) => Hoc<[WithBodyFn<ToSchema<Props>, ToSchema<Ret>>]>;

export const withBody = newHoc<WithBodyHoc>(function withBody(
  Component: ComponentType,
  body: Function
): FunctionComponent {
  return function WithBody(props: any): JSX.Element {
    return <Component {...props} {...body(props)} />;
  };
});
