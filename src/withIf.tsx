import { ComponentType, FunctionComponent, useMemo } from "react";
import { DependencyNames } from "./DependencyNames";
import { Fn, IntersectionFn, ToSchema } from "./Fn";
import { Hoc } from "./Hoc";
import { newHoc } from "./newHoc";

interface WithIfFn<PropName extends string> extends Fn {
  return: [PropName, any] extends this["arg0"]
    ? this["arg0"]
    : this["arg0"] | [PropName, unknown];
}

interface WithIfHoc {
  <PropName extends string>(
    propName: PropName,
    options?: {
      Else?: ComponentType<any>;
    }
  ): Hoc<[WithIfFn<PropName>]>;

  <
    DependencyProps extends {},
    TDependencyNames extends DependencyNames<DependencyProps> = DependencyNames<DependencyProps>
  >(
    factory: (props: DependencyProps) => any,
    options: {
      Else?: ComponentType<any>;
      dependencyNames: TDependencyNames;
    }
  ): Hoc<[IntersectionFn<ToSchema<DependencyProps>>]>;
}

export const withIf = newHoc<WithIfHoc>(function withIf(
  Component: ComponentType<any>,
  propNameOrFactory: string | Function,
  {
    dependencyNames,
    Else,
  }: {
    dependencyNames?: string[];
    Else?: ComponentType<any>;
  } = {}
): FunctionComponent {
  if (process.env.NODE_ENV !== "production") {
    if (typeof propNameOrFactory === "function" && !dependencyNames) {
      throw new Error(
        "withIf with function should have dependencyNames assigned"
      );
    }
  }

  return function WithIf(props: any): JSX.Element {
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
      return <Component {...props} />;
    } else {
      if (Else) {
        return <Else {...props} />;
      }
      // @ts-expect-error null is valid
      return null;
    }
  };
});
