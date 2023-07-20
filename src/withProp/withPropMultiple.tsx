import { ComponentType, FunctionComponent } from "react";
import { Fn, IntersectionFn, Pipe, SetOptionalFn, ToSchema } from "../Fn";
import { Hoc } from "../Hoc";
import { newHoc } from "../newHoc";

interface WithPropFn<Schema extends [string | number | symbol, any]>
  extends Fn {
  return: Pipe<
    this["arg0"],
    [IntersectionFn<Schema>, SetOptionalFn<Schema[0]>]
  >;
}

type WithPropHoc = <Map extends Record<string, unknown>>(
  map: Map
) => Hoc<[WithPropFn<ToSchema<Map>>]>;

export const withPropMultiple = newHoc<WithPropHoc>(function withProp(
  Component: ComponentType,
  map: object
): FunctionComponent {
  return function WithProp(props: object): JSX.Element {
    return <Component {...map} {...props} />;
  };
});
