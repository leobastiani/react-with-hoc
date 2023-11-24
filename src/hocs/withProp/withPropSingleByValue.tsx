import { ComponentType, FunctionComponent } from "react";
import { newHoc } from "../../lib/newHoc";
import {
  HasAllPropsFn,
  IfThenFn,
  IntersectionFn,
  SetOptionalFn,
} from "../../types/Fn";
import { Hoc } from "../../types/Hoc";

type WithPropHoc = <PropValue, PropName extends string>(
  propName: PropName,
  value: PropValue
) => Hoc<
  [
    IfThenFn<
      HasAllPropsFn<PropName>,
      [
        ...(PropValue extends (...args: any[]) => any
          ? []
          : [IntersectionFn<[PropName, PropValue]>]),
        SetOptionalFn<PropName>
      ]
    >
  ]
>;

export const withPropSingleByValue = newHoc<WithPropHoc>(function withProp(
  Component: ComponentType,
  propName: string,
  value: any
): FunctionComponent {
  return function WithProp(props: any): JSX.Element {
    return <Component {...{ [propName]: value }} {...props} />;
  };
});
