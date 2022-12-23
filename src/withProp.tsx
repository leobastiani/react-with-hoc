/* eslint-disable @typescript-eslint/ban-types */

import assert from "assert";
import { ComponentType, FunctionComponent, useMemo } from "react";
import { newHocNamedWithProps } from "./newHoc";
import { render } from "./render";

type Merge<A, B> = {
  [K in keyof (A | B)]: K extends keyof B
    ? K extends keyof A
      ? A[K] | B[K]
      : B[K]
    : A[K];
};

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
  ): FunctionComponent<
    Props & {
      [key in `${PropName}`]?: PropValue;
    }
  >;

  function withProp<Props extends {}, PropName extends string, PropValue>(
    Component: ComponentType<Props>,
    propName: PropName,
    value: Exclude<PropValue, Function>
  ): FunctionComponent<
    Props & {
      [key in `${PropName}`]?: PropValue;
    }
  >;

  function withProp<Props extends {}, PropName extends string, PropValue>(
    Component: ComponentType<Props>,
    propName: PropName,
    init: ((props: Props) => PropValue) | PropValue,
    dependencyNames?: string[]
  ): FunctionComponent<
    Props & {
      [key in `${PropName}`]?: PropValue;
    }
  > {
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
      return render(Component, { [propName]: newValue }, props);
    }
    return WithProp;
  }

  return newHocNamedWithProps(withProp) as WithProp;
})();
