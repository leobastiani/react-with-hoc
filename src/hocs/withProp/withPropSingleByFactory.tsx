import { ComponentType, FunctionComponent, useMemo } from "react";
import { newHoc } from "../../lib/newHoc";
import { DependencyNames } from "../../types/DependencyNames";
import {
  Fn,
  HasAllPropsFn,
  IfThenFn,
  IntersectionFn,
  KeepNeversFn,
  Pipe,
  ReplaceFn,
  SetOptionalFn,
  ToSchema,
} from "../../types/Fn";
import { Hoc } from "../../types/Hoc";

interface WithPropFn<
  PropName extends string,
  PropValue,
  DependencyProps extends [string | number | symbol, any]
> extends Fn {
  return: Pipe<
    this["arg0"],
    [
      IfThenFn<
        HasAllPropsFn<PropName>,
        [IntersectionFn<[PropName, PropValue]>, SetOptionalFn<PropName>]
      >,
      KeepNeversFn<ReplaceFn<DependencyProps>>
    ]
  >;
}

type WithPropHoc = <
  PropValue,
  PropName extends string,
  DependencyProps extends object,
  TDependencyName extends DependencyNames<DependencyProps> = DependencyNames<DependencyProps>
>(
  propName: PropName,
  factory: (props: DependencyProps) => PropValue,
  dependencyNames: TDependencyName
) => Hoc<[WithPropFn<PropName, PropValue, ToSchema<DependencyProps>>]>;

export const withPropSingleByFactory = newHoc<WithPropHoc>(function withProp(
  Component: ComponentType,
  propName: string,
  init: (props: any) => any,
  dependencyNames: string[]
): FunctionComponent {
  const override = dependencyNames.includes(propName);
  return function WithProp(props: any): JSX.Element {
    if (process.env.NODE_ENV !== "production") {
      if (!dependencyNames) {
        throw new Error(
          "withProp used with init function should have dependencyNames defined"
        );
      }
    }
    const value = useMemo(
      () => init(props),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      dependencyNames.map((dependencyName) => props[dependencyName])
    );

    return override ? (
      <Component {...props} {...{ [propName]: value }} />
    ) : (
      <Component {...{ [propName]: value }} {...props} />
    );
  };
});
