import { ComponentType, FunctionComponent } from "react";
import { IntersectionFn, SetOptionalFn, ToSchema } from "../Fn";
import { Hoc } from "../Hoc";
import { newHoc } from "../newHoc";

type WithPropHoc = <Map extends Record<string, unknown>>(
  map: Map
) => Hoc<[IntersectionFn<ToSchema<Map>>, SetOptionalFn<keyof Map>]>;

export const withPropMultiple = newHoc<WithPropHoc>(function withProp(
  Component: ComponentType,
  map: object
): FunctionComponent {
  return function WithProp(props: object): JSX.Element {
    return <Component {...map} {...props} />;
  };
});
