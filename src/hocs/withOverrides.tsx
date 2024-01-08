import React, { ComponentType, FunctionComponent } from "react";
import {
  Fn,
  IntersectionFn,
  KeepNeversFn,
  OmitFn,
  Pipe,
  ToSchema,
} from "../types/Fn";
import { Hoc } from "../types/Hoc";
import { newHoc } from "../utils/newHoc";

interface WithOverridesFn<Schema extends [string | number | symbol, any]>
  extends Fn {
  return: Pipe<
    this["arg0"],
    [IntersectionFn<Schema>, KeepNeversFn<OmitFn<Schema[0]>>]
  >;
}

type WithOverridesHoc = <Map extends Record<string, unknown>>(
  map: Map,
) => Hoc<[WithOverridesFn<ToSchema<Map>>]>;

export const withOverrides = newHoc<WithOverridesHoc>(function withOverrides(
  Component: ComponentType,
  map: object,
): FunctionComponent {
  return function WithOverrides(props: object): JSX.Element {
    return <Component {...props} {...map} />;
  };
});
