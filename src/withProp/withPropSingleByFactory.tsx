import { ComponentType, FunctionComponent, useMemo } from "react";
import { DependencyNames } from "../DependencyNames";
import {
  HasAllPropsFn,
  IfThenFn,
  IntersectionFn,
  KeepNeversFn,
  ReplaceFn,
  SetOptionalFn,
  ToSchema,
} from "../Fn";
import { Hoc } from "../Hoc";
import { newHoc } from "../newHoc";

type WithPropHoc = <
  PropValue,
  PropName extends string,
  DependencyProps extends {},
  TDependencyName extends DependencyNames<DependencyProps> = DependencyNames<DependencyProps>
>(
  propName: PropName,
  factory: (props: DependencyProps) => PropValue,
  dependencyNames: TDependencyName
) => Hoc<
  [
    IfThenFn<
      HasAllPropsFn<PropName>,
      [IntersectionFn<[PropName, PropValue]>, SetOptionalFn<PropName>]
    >,
    KeepNeversFn<ReplaceFn<ToSchema<DependencyProps>>>
  ]
>;

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
