import { ComponentType, FunctionComponent, useMemo } from "react";
import { SimplifyComponentProps } from "./@types/NormalizeObject";
import { SpreadObject } from "./@types/SpreadObject";
import { UnionToArray } from "./@types/UnionToArray";
import { newHoc } from "./newHoc";
import { render } from "./render";

type ThenElse = {
  Then: ComponentType<any>;
  Else: ComponentType<any>;
};

interface WithIfHoc {
  <Props extends {}, PropName extends string>(
    propName: PropName,
    options?: Partial<ThenElse>
  ): <ClosureProps extends Props>(
    Component: ComponentType<ClosureProps>
  ) => FunctionComponent<
    SimplifyComponentProps<ClosureProps & { [K in PropName]: boolean }>
  >;

  <Props extends {}, DependencyProps extends Props>(
    func: (props: DependencyProps) => boolean,
    options: {
      dependencyNames: keyof DependencyProps extends never
        ? []
        : UnionToArray<Extract<keyof DependencyProps, string>>;
    } & Partial<ThenElse>
  ): <ClosureProps extends Props>(
    Component: ComponentType<ClosureProps>
  ) => FunctionComponent<
    SimplifyComponentProps<SpreadObject<ClosureProps, DependencyProps>>
  >;
}

export const withIf = ((): WithIfHoc => {
  function withIf(
    Component: ComponentType,
    propNameOrFactory: string | Function,
    {
      dependencyNames,
      Then,
      Else,
    }: {
      dependencyNames?: string[];
      Then?: Function;
      Else?: Function;
    } = {}
  ): FunctionComponent {
    if (process.env.NODE_ENV !== "production") {
      if (typeof propNameOrFactory === "function" && !dependencyNames) {
        throw new Error(
          "withIf with function should have dependecyNames assigned"
        );
      }
    }

    Then ??= (props: any): JSX.Element => render(Component, props);
    // eslint-disable-next-line react/display-name
    Else ??= (): JSX.Element => <></>;

    function WithIf(props: any): JSX.Element {
      let condition: boolean;
      if (typeof propNameOrFactory === "string") {
        condition = props[propNameOrFactory];
      } else {
        // is function
        // eslint-disable-next-line react-hooks/rules-of-hooks
        condition = useMemo(
          () => propNameOrFactory(props),
          // eslint-disable-next-line react-hooks/exhaustive-deps
          dependencyNames!.map((key) => props[key])
        );
      }

      if (condition) {
        return Then!(props);
      } else {
        return Else!(props);
      }
    }
    return WithIf;
  }

  return newHoc(withIf, {
    dot(_Component, propNameOrFactory, { dependencyNames } = {}) {
      if (typeof propNameOrFactory === "string") {
        return propNameOrFactory;
      }
      return `(${JSON.stringify(dependencyNames)}) => boolean`;
    },
  }) as WithIfHoc;
})();
