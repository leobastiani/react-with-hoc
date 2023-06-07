import { ComposeLeft, Objects, Pipe, Strings, Tuples, Unions } from "hotscript";
import {
  CSSProperties,
  ComponentType,
  FunctionComponent,
  useMemo,
} from "react";
import { PartialBy } from "./@types/PartialBy";
import { Hoc } from "./Hoc";
import { createHocNameFunction } from "./hocNameForWithStyle";
import { newHoc } from "./newHoc";

interface WithStyleObjectStrategyHoc {
  <CSSProperties>(value: CSSProperties): Hoc<
    ComposeLeft<[Objects.Assign<{ style: CSSProperties }>, PartialBy<"style">]>
  >;

  <CSSProperties, DependencyProps extends {}>(
    factory: (props: DependencyProps) => CSSProperties,
    dependencyNames: keyof DependencyProps extends never
      ? []
      : Pipe<
          DependencyProps,
          [Objects.Keys, Unions.ToTuple, Tuples.Sort<Strings.LessThan>]
        >
  ): Hoc<
    ComposeLeft<
      [
        Objects.Assign<DependencyProps, { style: CSSProperties }>,
        PartialBy<"style">
      ]
    >
  >;
}

export const withStyleObjectStrategy = newHoc(
  createHocNameFunction(
    (_init: unknown, dependencyNames?: string[]) => dependencyNames
  ),
  function withStyleObjectStrategy(
    Component: ComponentType,
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
