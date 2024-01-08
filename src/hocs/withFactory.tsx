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
