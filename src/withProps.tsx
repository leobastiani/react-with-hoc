import { ComponentType, FunctionComponent } from "react";
import { IntersectionFn, SetOptionalFn, ToSchema } from "./Fn";
import { Hoc } from "./Hoc";
import { newHoc } from "./newHoc";

interface WithPropsHoc {
  <Map extends Record<string, unknown>>(map: Map): Hoc<
    [IntersectionFn<ToSchema<Map>>, SetOptionalFn<keyof Map>]
  >;
}

export const withProps = newHoc(function withProps(
  Component: ComponentType,
  map: object
): FunctionComponent {
  return function WithProps(props: object): JSX.Element {
    return <Component {...map} {...props} />;
  };
}) as WithPropsHoc;
