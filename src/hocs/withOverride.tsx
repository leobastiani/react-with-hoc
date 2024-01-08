import React, { ComponentType, FunctionComponent } from "react";
import {
  HasAllPropsFn,
  IfThenFn,
  IntersectionFn,
  KeepNeversFn,
  OmitFn,
} from "../types/Fn";
import { Hoc } from "../types/Hoc";
import { newHoc } from "../utils/newHoc";

type WithOverrideHoc = <PropValue, PropName extends string>(
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
        KeepNeversFn<OmitFn<PropName>>,
      ]
    >,
  ]
>;

export const withOverride = newHoc<WithOverrideHoc>(function withOverride(
  Component: ComponentType,
  propName: string,
  value: any,
): FunctionComponent {
  return function WithOverride(props: any): JSX.Element {
    return <Component {...props} {...{ [propName]: value }} />;
  };
});
