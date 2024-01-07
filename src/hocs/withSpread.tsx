import React from "react";
import { ComponentType, FunctionComponent } from "react";
import {
  Fn,
  FromSchema,
  IntersectionFn,
  Pipe,
  SetOptionalFn,
} from "../types/Fn";
import { Hoc } from "../types/Hoc";
import { newHoc } from "../utils/newHoc";

interface WithSpreadFn<PropName extends string, Names extends string>
  extends Fn {
  return: Pipe<
    this["arg0"],
    [
      IntersectionFn<
        [PropName, FromSchema<Extract<this["arg0"], [Names, any]>>]
      >,
      SetOptionalFn<Names>,
    ]
  >;
}

interface WithSpreadHoc {
  <PropName extends string, Names extends string>(
    propName: PropName,
  ): Hoc<[WithSpreadFn<PropName, Names>]>;
}

export const withSpread = newHoc<WithSpreadHoc>(function withSpread(
  Component: ComponentType,
  key: string,
): FunctionComponent {
  return function WithObject(props: any): JSX.Element {
    const newProps: any = {
      ...props[key],
      ...props,
    };

    return <Component {...newProps} />;
  };
});
