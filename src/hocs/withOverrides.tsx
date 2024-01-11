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

/**
 * adds values to many props, they can not be override, which means the given values override others
 * @see {@link withOverride} {@link withFactory} {@link withDefaults} {@link withDefault}
 * @example
 * function Card({ content, icon, border }: {
 *   content: string;
 *   icon: "star" | "heart" | ...;
 *   border: "none" | "dashed" | ...
 * }) {
 *   return <>...</>
 * }
 * const StandardCard = withOverrides({icon: "star", border: "rounded"})(Card);
 *
 * <StandardCard content="some content" />
 * // is equivalent to
 * <CardWithIcon content="some content" icon="star" border="rounded" />
 *
 * // and
 * <StandardCard content="some content" icon="heart" border="dashed" /> // ❌ is a typescript error, but even though
 * // is equivalent to
 * <CardWithIcon content="some content" icon="star" border="rounded" />
 */
export const withOverrides = newHoc<WithOverridesHoc>(function withOverrides(
  Component: ComponentType,
  map: object,
): FunctionComponent {
  return function WithOverrides(props: object): JSX.Element {
    return <Component {...props} {...map} />;
  };
});
