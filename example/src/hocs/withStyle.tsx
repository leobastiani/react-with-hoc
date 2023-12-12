import React, {
  CSSProperties,
  ComponentType,
  FunctionComponent,
  useMemo,
} from "react";

import {
  DependencyNames,
  Hoc,
  IntersectionFn,
  SetOptionalFn,
  ToSchema,
  createHocNameFunction,
  newHoc,
} from "react-with-hoc";

interface WithStyleObjectStrategyHoc {
  (value: CSSProperties): Hoc<[SetOptionalFn<"style">]>;

  <
    DependencyProps extends {},
    TDependencyNames extends
      DependencyNames<DependencyProps> = DependencyNames<DependencyProps>,
  >(
    factory: (props: DependencyProps) => CSSProperties,
    dependencyNames: TDependencyNames,
  ): Hoc<[IntersectionFn<ToSchema<DependencyProps>>, SetOptionalFn<"style">]>;
}

export const withStyle = newHoc<WithStyleObjectStrategyHoc>(
  createHocNameFunction<WithStyleObjectStrategyHoc>(
    (_init, dependencyNames) => dependencyNames,
  ),
  function withStyle(
    Component: ComponentType<any>,
    init: ((props: any) => CSSProperties) | CSSProperties,
    dependencyNames?: string[],
  ): FunctionComponent {
    const override = dependencyNames?.includes("style") ?? false;
    return function WithStyleObjectStrategy(props: any): JSX.Element {
      let newValue: CSSProperties;
      if (typeof init === "function") {
        if (process.env.NODE_ENV !== "production") {
          if (!dependencyNames) {
            throw new Error(
              "withStyle used with init function should have dependencyNames defined",
            );
          }
        }
        // eslint-disable-next-line react-hooks/rules-of-hooks
        newValue = useMemo(
          () => init(props),
          // eslint-disable-next-line react-hooks/exhaustive-deps
          dependencyNames!.map((dependencyName) => props[dependencyName]),
        );
      } else {
        newValue = init;
      }
      return (
        <Component
          {...props}
          style={override ? newValue : { ...newValue, ...props.style }}
        />
      );
    };
  },
) as WithStyleObjectStrategyHoc;
