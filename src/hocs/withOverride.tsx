import React, { ComponentType, FunctionComponent } from "react";
import {
  HasAllPropsFn,
  IfThenFn,
  IntersectionFn,
  KeepNeversFn,
  OmitFn,
} from "../types/Fn";
import { Hoc } from "../types/Hoc";
import { newHoc } from "../utils/newHoc";

type WithOverrideHoc = <PropValue, PropName extends string>(
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
        KeepNeversFn<OmitFn<PropName>>,
      ]
    >,
  ]
>;

/**
 * adds a prop value to the component, the given value can not be override, which means the given value overrides others
 * @see {@link withOverrides} {@link withFactory} {@link withDefault} {@link withDefaults}
 * @example
 * function CardWithIcon({ content, icon }: {
 *   content: string;
 *   icon: "star" | "heart" | ...;
 * }) {
 *   return <>...</>
 * }
 * const StandardCard = withOverride("icon", "star")(CardWithIcon);
 *
 * <StandardCard content="some content" />
 * // is equivalent to
 * <CardWithIcon content="some content" icon="star" />
 *
 * // and
 * <StandardCard content="some content" icon="heart" /> // ❌ is a typescript error, but even though
 * // is equivalent to
 * <CardWithIcon content="some content" icon="star" />
 */
export const withOverride = newHoc<WithOverrideHoc>(function withOverride(
  Component: ComponentType,
  propName: string,
  value: any,
): FunctionComponent {
  return function WithOverride(props: any): JSX.Element {
    return <Component {...props} {...{ [propName]: value }} />;
  };
});
