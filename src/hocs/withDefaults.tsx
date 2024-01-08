import React, { ComponentType, FunctionComponent } from "react";
import { Fn, IntersectionFn, Pipe, SetOptionalFn, ToSchema } from "../types/Fn";
import { Hoc } from "../types/Hoc";
import { newHoc } from "../utils/newHoc";

interface WithDefaultsFn<Schema extends [string | number | symbol, any]>
  extends Fn {
  return: Pipe<
    this["arg0"],
    [IntersectionFn<Schema>, SetOptionalFn<Schema[0]>]
  >;
}

type WithDefaultsHoc = <Map extends Record<string, unknown>>(
  map: Map,
) => Hoc<[WithDefaultsFn<ToSchema<Map>>]>;

export const withDefaults = newHoc<WithDefaultsHoc>(function withDefaults(
  Component: ComponentType,
  map: object,
): FunctionComponent {
  return function WithDefaults(props: object): JSX.Element {
    return <Component {...map} {...props} />;
  };
});
