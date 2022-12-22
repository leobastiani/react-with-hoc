import { ComponentType, useMemo } from "react";
import { combineProps } from "./combineProps";
import { newHocNamedWithProps } from "./newHoc";

export const withProp = newHocNamedWithProps(function withProp<
  Props extends Record<string, never>,
  PropName extends string,
  PropValue
>(
  Component: ComponentType<Props>,
  propName: PropName,
  fn: ((props: Props) => PropValue) | PropValue,
  dependencyNames: string[]
) {
  function WithProp(props: Props & { [key in `${PropName}`]?: PropValue }) {
    const newValue =
      typeof fn === "function"
        ? // eslint-disable-next-line react-hooks/rules-of-hooks
          useMemo(
            // @ts-ignore
            () => fn(props),
            // @ts-ignore
            // eslint-disable-next-line react-hooks/exhaustive-deps
            dependencyNames.map((dependencyName) => props[dependencyName])
          )
        : fn;
    return <Component {...combineProps({ [propName]: newValue }, props)} />;
  }
  return WithProp;
});
