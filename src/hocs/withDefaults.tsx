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

/**
 * adds default values to many props, so they can still receive values but they now have a default
 * @see {@link withDefault} {@link withFactory} {@link withOverrides} {@link withOverride}
 * @example
 * function Card({ content, icon, border }: {
 *   content: string;
 *   icon: "star" | "heart" | ...;
 *   border: "none" | "dashed" | ...
 * }) {
 *   return <>...</>
 * }
 * const StandardCard = withDefaults({icon: "star", border: "rounded"})(Card);
 *
 * <StandardCard content="some content" />
 * // is equivalent to
 * <CardWithIcon icon="star" border="rounded" content="some content" />
 *
 * // but
 * <StandardCard content="some content" icon="heart" border="dashed" />
 * // is equivalent to
 * <CardWithIcon content="some content" icon="heart" border="dashed" /> // it propagates the new value
 */
export const withDefaults = newHoc<WithDefaultsHoc>(function withDefaults(
  Component: ComponentType,
  map: object,
): FunctionComponent {
  return function WithDefaults(props: object): JSX.Element {
    return <Component {...map} {...props} />;
  };
});
