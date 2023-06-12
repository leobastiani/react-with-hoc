import { ComposeLeft, Objects, Pipe, Strings, Tuples, Unions } from "hotscript";
import { ComponentType, Fragment, FunctionComponent, useMemo } from "react";
import { PartialBy } from "./@types/PartialBy";
import { Hoc } from "./Hoc";
import { newHoc } from "./newHoc";

interface WithIfHoc {
  <Name extends string>(
    propName: Name,
    options?: {
      Else?: ComponentType<any>;
    }
  ): Hoc<ComposeLeft<[Objects.Update<Name, boolean>, PartialBy<Name>]>>;

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

  Else ??= Fragment;

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
      // @ts-expect-error Else is valid
      return <Else {...props} />;
    }
  };
}) as WithIfHoc;
