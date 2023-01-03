import {
  ComponentType,
  CSSProperties,
  FunctionComponent,
  useMemo,
} from "react";
import { ClosurePartial } from "./@types/ClosurePartial";
import { Merge } from "./@types/Merge";
import { NormalizeObject } from "./@types/NormalizeObject";
import { UnionToArray } from "./@types/UnionToArray";
import { newHoc } from "./newHoc";
import { render } from "./render";

interface WithStyle {
  <Props extends {} = {}>(value: CSSProperties): <ClosureProps extends Props>(
    Component: ComponentType<ClosureProps>
  ) => FunctionComponent<
    NormalizeObject<ClosurePartial<ClosureProps, "style">>
  >;

  <Props extends {} = {}, DependencyProps extends Props = Props>(
    factory: (props: DependencyProps) => CSSProperties,
    dependencyNames: keyof DependencyProps extends never
      ? []
      : UnionToArray<Extract<keyof DependencyProps, string>>
  ): <ClosureProps extends Props>(
    Component: ComponentType<ClosureProps>
  ) => FunctionComponent<
    NormalizeObject<
      ClosurePartial<Merge<ClosureProps, DependencyProps>, "style">
    >
  >;
}

export const withStyle = ((): WithStyle => {
  function withStyle<Props extends {} = {}>(
    Component: ComponentType<Props>,
    factory: (props: Props) => CSSProperties,
    dependencyNames: string[]
  ): FunctionComponent<any>;

  function withStyle<Props extends {} = {}>(
    Component: ComponentType<Props>,
    value: CSSProperties
  ): FunctionComponent<any>;

  function withStyle<Props extends {}>(
    Component: ComponentType<Props>,
    init: ((props: Props) => CSSProperties) | CSSProperties,
    dependencyNames?: string[]
  ): FunctionComponent<any> {
    const override = dependencyNames?.includes("style") ?? false;
    function WithStyle<ClosureProps extends Props>(
      props: ClosureProps
    ): JSX.Element {
      let newValue: CSSProperties;
      if (init instanceof Function) {
        if (process.env.NODE_ENV !== "production") {
          if (!dependencyNames) {
            throw new Error(
              "withStyle used with init function should have dependecyNames defined"
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
      return override ? (
        <Component {...{ ...props, style: newValue }} />
      ) : (
        render(Component, { style: newValue }, props)
      );
    }
    return WithStyle;
  }

  return newHoc(withStyle) as WithStyle;
})();
