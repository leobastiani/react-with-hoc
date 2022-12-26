import assert from "assert";
import { ComponentType, FunctionComponent, useMemo } from "react";
import { newHocNamedWithProps } from "./newHoc";
import { render } from "./render";

interface WithProp {
  <Props extends {}, PropName extends string, PropValue>(
    propName: PropName,
    value: Exclude<PropValue, Function>
  ): <ClosureProps extends Props>(
    Component: ComponentType<ClosureProps>
  ) => FunctionComponent<
    Merge<ClosureProps, { [key in `${PropName}`]?: PropValue }>
  >;

  <Props extends {}, PropName extends string, PropValue>(
    propName: PropName,
    factory: (props: Props) => PropValue,
    dependencyNames: string[]
  ): <ClosureProps extends Props>(
    Component: ComponentType<ClosureProps>
  ) => FunctionComponent<
    Merge<ClosureProps, { [key in `${PropName}`]?: PropValue }>
  >;
}

export const withProp = ((): WithProp => {
  function withProp<Props extends {}, PropName extends string, PropValue>(
    Component: ComponentType<Props>,
    propName: PropName,
    factory: (props: Props) => PropValue,
    dependencyNames: string[]
  ): FunctionComponent<any>;

  function withProp<Props extends {}, PropName extends string, PropValue>(
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
          assert(dependencyNames);
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
