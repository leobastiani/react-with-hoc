import assert from "assert";
import { ComponentType, FunctionComponent, ReactNode, useMemo } from "react";
import { newHoc } from "./newHoc";
import { render } from "./render";

type ThenElse<Props extends {}> = {
  Then: (props: Props) => ReactNode;
  Else: (props: Props) => ReactNode;
};

interface WithIfHoc {
  <Props extends {}, PropName extends string>(
    propName: PropName,
    options?: Partial<ThenElse<Props>>
  ): <ClosureProps extends Props>(
    Component: ComponentType<ClosureProps>
  ) => FunctionComponent<ClosureProps & { [K in PropName]: boolean }>;

  <Props extends {}>(
    func: (props: Props) => boolean,
    options: Partial<ThenElse<Props>> & { dependencyNames: string[] }
  ): <ClosureProps extends Props>(
    Component: ComponentType<ClosureProps>
  ) => FunctionComponent<ClosureProps>;
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
      assert(
        typeof propNameOrFactory !== "function" || dependencyNames,
        "withIf with function should have dependecyNames assigned"
      );
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
