import { Fn } from "hotscript";
import { ComponentType, FunctionComponent } from "react";
import { RequiredKeysOf, SetOptional } from "type-fest";
import { Hoc } from "./Hoc";
import { newHoc } from "./newHoc";

interface WithSpreadFn<PropName extends string, Object extends {}> extends Fn {
  return: {
    [K in PropName]: Object;
  } & SetOptional<this["arg0"], RequiredKeysOf<Object>>;
}

interface WithSpreadHoc {
  <PropName extends string, Object extends {}>(propName: PropName): Hoc<
    WithSpreadFn<PropName, Object>
  >;
}

export const withSpread = newHoc(function withSpread(
  Component: ComponentType,
  key: string
): FunctionComponent {
  return function WithObject(props: any): JSX.Element {
    const newProps: any = {
      ...props[key],
      ...props,
    };

    return <Component {...newProps} />;
  };
}) as WithSpreadHoc;
