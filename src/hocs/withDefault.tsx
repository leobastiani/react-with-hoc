import React, { ComponentType, FunctionComponent } from "react";
import {
  HasAllPropsFn,
  IfThenFn,
  IntersectionFn,
  SetOptionalFn,
} from "../types/Fn";
import { Hoc } from "../types/Hoc";
import { newHoc } from "../utils/newHoc";

type WithDefaultHoc = <PropValue, PropName extends string>(
  propName: PropName,
  value: PropValue,
) => Hoc<
  [
    IfThenFn<
      HasAllPropsFn<PropName>,
      [
        ...(PropValue extends (...args: any[]) => any
          ? []
          : [IntersectionFn<[PropName, PropValue]>]),
        SetOptionalFn<PropName>,
      ]
    >,
  ]
>;

/**
 * adds default value to a prop, so it can still receive a value but it now has a default one
 * @see {@link withDefaults} {@link withFactory} {@link withOverride} {@link withOverrides}
 * @example
 * function CardWithIcon({ content, icon }: {
 *   content: string;
 *   icon: "star" | "heart" | ...;
 * }) {
 *   return <>...</>
 * }
 * const StandardCard = withDefault("icon", "star")(CardWithIcon);
 *
 * <StandardCard content="some content" />
 * // is equivalent to
 * <CardWithIcon icon="star" content="some content" />
 *
 * // but
 * <StandardCard content="some content" icon="heart" />
 * // is equivalent to
 * <CardWithIcon content="some content" icon="heart" /> // it propagates the new value
 */
export const withDefault = newHoc<WithDefaultHoc>(function withDefault(
  Component: ComponentType,
  propName: string,
  value: any,
): FunctionComponent {
  return function WithDefault(props: any): JSX.Element {
    return <Component {...{ [propName]: value }} {...props} />;
  };
});
