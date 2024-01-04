import {
  CSSProperties,
  ComponentType,
  FunctionComponent,
  useMemo,
} from "react";
import { DependencyNames } from "../types/DependencyNames";
import { IntersectionFn, SetOptionalFn, ToSchema } from "../types/Fn";
import { Hoc } from "../types/Hoc";
import { createHocNameFunction } from "../utils/hocNameForWithStyle";
import { newHoc } from "../utils/newHoc";

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

export const withStyleObjectStrategy = newHoc<WithStyleObjectStrategyHoc>(
  createHocNameFunction<WithStyleObjectStrategyHoc>(
    (_init, dependencyNames) => dependencyNames,
  ),
  function withStyleObjectStrategy(
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
              "withStyleObjectStrategy used with init function should have dependencyNames defined",
            );
          }
        }

        newValue = useMemo(
          () => init(props),

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
