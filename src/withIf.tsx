import { Fn, Objects, Pipe, Strings, Tuples, Unions } from "hotscript";
import { ComponentType, FunctionComponent, useMemo } from "react";
import { Hoc } from "./Hoc";
import { newHoc } from "./newHoc";

interface WithIfFn<PropName extends string> extends Fn {
  return: PropName extends keyof this["arg0"]
    ? this["arg0"]
    : this["arg0"] & {
        [K in PropName]: boolean;
      };
}

interface WithIfHoc {
  <PropName extends string>(
    propName: PropName,
    options?: {
      Else?: ComponentType<any>;
    }
  ): Hoc<WithIfFn<PropName>>;

  <DependencyProps extends {}>(
    factory: (props: DependencyProps) => boolean,
    options?: {
      Else?: ComponentType<any>;
      dependencyNames?: Pipe<
        DependencyProps,
        [Objects.Keys, Unions.ToTuple, Tuples.Sort<Strings.LessThan>]
      >;
    }
  ): Hoc<Objects.Assign<DependencyProps>>;
}

export const withIf = newHoc(function withIf(
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
}) as WithIfHoc;
