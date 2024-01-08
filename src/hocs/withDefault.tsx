import React, { ComponentType, FunctionComponent } from "react";
import {
  HasAllPropsFn,
  IfThenFn,
  IntersectionFn,
  SetOptionalFn,
} from "../types/Fn";
import { Hoc } from "../types/Hoc";
import { newHoc } from "../utils/newHoc";

type WithDefaultHoc = <PropValue, PropName extends string>(
  propName: PropName,
  value: PropValue,
) => Hoc<
  [
    IfThenFn<
      HasAllPropsFn<PropName>,
      [
        ...(PropValue extends (...args: any[]) => any
          ? []
          : [IntersectionFn<[PropName, PropValue]>]),
        SetOptionalFn<PropName>,
      ]
    >,
  ]
>;

export const withDefault = newHoc<WithDefaultHoc>(function withDefault(
  Component: ComponentType,
  propName: string,
  value: any,
): FunctionComponent {
  return function WithDefault(props: any): JSX.Element {
    return <Component {...{ [propName]: value }} {...props} />;
  };
});
