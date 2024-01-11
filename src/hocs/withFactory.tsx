import React, { ComponentType, FunctionComponent, useMemo } from "react";
import { DependencyNames } from "../types/DependencyNames";
import {
  Fn,
  HasAllPropsFn,
  IfThenFn,
  IntersectionFn,
  KeepNeversFn,
  OmitFn,
  Pipe,
  ReplaceFn,
  ToSchema,
} from "../types/Fn";
import { Hoc } from "../types/Hoc";
import { newHoc } from "../utils/newHoc";

interface WithFactoryFn<
  PropName extends string,
  PropValue,
  DependencyProps extends [string | number | symbol, any],
> extends Fn {
  return: Pipe<
    this["arg0"],
    [
      IfThenFn<
        HasAllPropsFn<PropName>,
        [IntersectionFn<[PropName, PropValue]>, KeepNeversFn<OmitFn<PropName>>]
      >,
      KeepNeversFn<ReplaceFn<DependencyProps>>,
    ]
  >;
}

type WithFactoryHoc = <
  PropValue,
  PropName extends string,
  DependencyProps extends object,
  TDependencyName extends
    DependencyNames<DependencyProps> = DependencyNames<DependencyProps>,
>(
  propName: PropName,
  factory: (props: DependencyProps) => PropValue,
  dependencyNames: TDependencyName,
) => Hoc<[WithFactoryFn<PropName, PropValue, ToSchema<DependencyProps>>]>;

/**
 * add value to a prop based on a function and/or other props
 * @see {@link withDefaults} {@link withDefault} {@link withOverride} {@link withOverrides}
 * @example
 * function Card({ content, icon, border }: {
 *   content: string;
 *   icon?: "star" | "heart" | ...;
 * }) {
 *   return <>...</>
 * }
 * const StandardCard = withFactory<{content: string; icon?: Icon}>("icon", ({content, icon}) => content.includes("star") ? "star" : icon)(Card);
 *
 * <StandardCard content="some content with star" icon="heart" />
 * // is equivalent to
 * <CardWithIcon content="some content with star" icon="star" />
 *
 * // and
 * <StandardCard content="some content" icon="heart" />
 * // is equivalent to
 * <CardWithIcon content="some content" icon="heart" />
 */
export const withFactory = newHoc<WithFactoryHoc>(function withFactory(
  Component: ComponentType,
  propName: string,
  init: (props: any) => any,
  dependencyNames: string[],
): FunctionComponent {
  return function WithFactory(props: any): JSX.Element {
    if (process.env.NODE_ENV !== "production") {
      if (!dependencyNames) {
        throw new Error(
          "withFactory used with init function should have dependencyNames defined",
        );
      }
    }
    const value = useMemo(
      () => init(props),

      dependencyNames.map((dependencyName) => props[dependencyName]),
    );

    return <Component {...props} {...{ [propName]: value }} />;
  };
});
