import { ComposeLeft, Objects, Pipe, Strings, Tuples, Unions } from "hotscript";
import { ComponentType, FunctionComponent, useMemo } from "react";
import { Merge } from "./@types/Merge";
import { PartialBy } from "./@types/PartialBy";
import { Hoc } from "./Hoc";
import { newHoc } from "./newHoc";

interface WithPropHoc {
  <PropValue, PropName extends string>(
    propName: PropName,
    value: Exclude<PropValue, Function>
  ): Hoc<
    ComposeLeft<
      [
        PartialBy<PropName>,
        Objects.Assign<{
          [K in PropName]?: PropValue;
        }>
      ]
    >
  >;

  <PropValue, PropName extends string, DependencyProps extends {}>(
    propName: PropName,
    factory: (props: DependencyProps) => PropValue,
    dependencyNames: Pipe<
      DependencyProps,
      [Objects.Keys, Unions.ToTuple, Tuples.Sort<Strings.LessThan>]
    >
  ): Hoc<
    ComposeLeft<
      [
        PartialBy<PropName>,
        Merge<
          DependencyProps & {
            [K in PropName]?: PropValue;
          }
        >
      ]
    >
  >;
}

export const withProp = newHoc(function withProp(
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
}) as WithPropHoc;
