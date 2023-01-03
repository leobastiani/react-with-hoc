import { ComponentType, FunctionComponent, useMemo } from "react";
import { ClosurePartial } from "./@types/ClosurePartial";
import { Merge } from "./@types/Merge";
import { NormalizeObject } from "./@types/NormalizeObject";
import { UnionToArray } from "./@types/UnionToArray";
import { newHocNamedWithProps } from "./newHoc";
import { render } from "./render";

interface WithProp {
  <PropValue, PropName extends string, Props extends {} = {}>(
    propName: PropName,
    value: Exclude<PropValue, Function>
  ): <ClosureProps extends Props>(
    Component: ComponentType<ClosureProps>
  ) => FunctionComponent<
    NormalizeObject<
      ClosurePartial<
        Merge<ClosureProps, { [key in `${PropName}`]: PropValue }>,
        [PropName]
      >
    >
  >;

  <
    PropValue,
    PropName extends string,
    Props extends {} = {},
    DependencyProps extends Props = Props
  >(
    propName: PropName,
    factory: (props: DependencyProps) => PropValue,
    dependencyNames: keyof DependencyProps extends never
      ? []
      : UnionToArray<Extract<keyof DependencyProps, string>>
  ): <ClosureProps extends Props>(
    Component: ComponentType<ClosureProps>
  ) => FunctionComponent<
    NormalizeObject<
      ClosurePartial<
        Merge<
          ClosureProps,
          Merge<DependencyProps, { [key in `${PropName}`]: PropValue }>
        >,
        [PropName]
      >
    >
  >;
}

export const withProp = ((): WithProp => {
  function withProp<PropValue, PropName extends string, Props extends {} = {}>(
    Component: ComponentType<Props>,
    propName: PropName,
    factory: (props: Props) => PropValue,
    dependencyNames: string[]
  ): FunctionComponent<any>;

  function withProp<PropValue, PropName extends string, Props extends {} = {}>(
    Component: ComponentType<Props>,
    propName: PropName,
    value: Exclude<PropValue, Function>
  ): FunctionComponent<any>;

  function withProp<Props extends {}, PropName extends string, PropValue>(
    Component: ComponentType<Props>,
    propName: PropName,
    init: ((props: Props) => PropValue) | PropValue,
    dependencyNames?: string[]
  ): FunctionComponent<any> {
    const override = dependencyNames?.includes(propName) ?? false;
    function WithProp<ClosureProps extends Props>(
      props: ClosureProps
    ): JSX.Element {
      let newValue: PropValue;
      if (init instanceof Function) {
        if (process.env.NODE_ENV !== "production") {
          if (!dependencyNames) {
            throw new Error(
              "withProp used with init function should have dependecyNames defined"
            );
          }
        }
        // eslint-disable-next-line react-hooks/rules-of-hooks
        newValue = useMemo(
          () => init(props),
          // @ts-expect-error
          // eslint-disable-next-line react-hooks/exhaustive-deps
          dependencyNames!.map((dependencyName) => props[dependencyName])
        );
      } else {
        newValue = init;
      }
      return override
        ? render(Component, props, { [propName]: newValue })
        : render(Component, { [propName]: newValue }, props);
    }
    return WithProp;
  }

  return newHocNamedWithProps(withProp) as WithProp;
})();
