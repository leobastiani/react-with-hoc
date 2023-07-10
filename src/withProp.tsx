import { ComponentType, FunctionComponent, useMemo } from "react";
import { DependencyNames } from "./DependencyNames";
import {
  IntersectionFn,
  KeepNeversFn,
  ReplaceFn,
  SetOptionalFn,
  ToSchema,
} from "./Fn";
import { Hoc } from "./Hoc";
import { newHoc } from "./newHoc";

interface WithPropHoc {
  <PropValue, PropName extends string>(
    propName: PropName,
    value: Exclude<PropValue, Function>
  ): Hoc<[IntersectionFn<[PropName, PropValue]>, SetOptionalFn<PropName>]>;

  <
    PropValue,
    PropName extends string,
    DependencyProps extends {},
    TDependencyName extends DependencyNames<DependencyProps> = DependencyNames<DependencyProps>
  >(
    propName: PropName,
    factory: (props: DependencyProps) => PropValue,
    dependencyNames: TDependencyName
  ): Hoc<
    [
      IntersectionFn<[PropName, PropValue]>,
      SetOptionalFn<PropName>,
      KeepNeversFn<ReplaceFn<ToSchema<DependencyProps>>>
    ]
  >;
}

export const withProp = newHoc<WithPropHoc>(function withProp(
  Component: ComponentType,
  propName: string,
  init: ((props: any) => any) | unknown,
  dependencyNames?: string[]
): FunctionComponent {
  const override = dependencyNames?.includes(propName) ?? false;
  return function WithProp(props: any): JSX.Element {
    let newValue: any;
    if (init instanceof Function) {
      if (process.env.NODE_ENV !== "production") {
        if (!dependencyNames) {
          throw new Error(
            "withProp used with init function should have dependencyNames defined"
          );
        }
      }
      // eslint-disable-next-line react-hooks/rules-of-hooks
      newValue = useMemo(
        () => init(props),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        dependencyNames!.map((dependencyName) => props[dependencyName])
      );
    } else {
      newValue = init;
    }
    return override ? (
      <Component {...props} {...{ [propName]: newValue }} />
    ) : (
      <Component {...{ [propName]: newValue }} {...props} />
    );
  };
});
