import {
  CSSProperties,
  ComponentType,
  FunctionComponent,
  useMemo,
} from "react";
import { createHocNameFunction } from "./lib/hocNameForWithStyle";
import { newHoc } from "./newHoc";
import { DependencyNames } from "./types/DependencyNames";
import { IntersectionFn, SetOptionalFn, ToSchema } from "./types/Fn";
import { Hoc } from "./types/Hoc";

interface WithStyleObjectStrategyHoc {
  (value: CSSProperties): Hoc<[SetOptionalFn<"style">]>;

  <
    DependencyProps extends {},
    TDependencyNames extends DependencyNames<DependencyProps> = DependencyNames<DependencyProps>
  >(
    factory: (props: DependencyProps) => CSSProperties,
    dependencyNames: TDependencyNames
  ): Hoc<[IntersectionFn<ToSchema<DependencyProps>>, SetOptionalFn<"style">]>;
}

export const withStyleObjectStrategy = newHoc<WithStyleObjectStrategyHoc>(
  createHocNameFunction<WithStyleObjectStrategyHoc>(
    (_init, dependencyNames) => dependencyNames
  ),
  function withStyleObjectStrategy(
    Component: ComponentType<any>,
    init: ((props: any) => CSSProperties) | CSSProperties,
    dependencyNames?: string[]
  ): FunctionComponent {
    const override = dependencyNames?.includes("style") ?? false;
    return function WithStyleObjectStrategy(props: any): JSX.Element {
      let newValue: CSSProperties;
      if (typeof init === "function") {
        if (process.env.NODE_ENV !== "production") {
          if (!dependencyNames) {
            throw new Error(
              "withStyleObjectStrategy used with init function should have dependencyNames defined"
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
      return (
        <Component
          {...props}
          style={override ? newValue : { ...newValue, ...props.style }}
        />
      );
    };
  }
) as WithStyleObjectStrategyHoc;
