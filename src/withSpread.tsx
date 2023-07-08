import { ComponentType, FunctionComponent } from "react";
import { Call, Fn, FromSchema, IntersectionFn, SetOptionalFn } from "./Fn";
import { Hoc } from "./Hoc";
import { newHoc } from "./newHoc";

interface WithSpreadFn<PropName extends string, Names extends string>
  extends Fn {
  return: Call<
    IntersectionFn<[PropName, FromSchema<Extract<this["arg0"], [Names, any]>>]>,
    this["arg0"]
  >;
}

interface WithSpreadHoc {
  <PropName extends string, Names extends string>(propName: PropName): Hoc<
    [WithSpreadFn<PropName, Names>, SetOptionalFn<Names>]
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
