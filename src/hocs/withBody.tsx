import React, { ComponentType, FunctionComponent } from "react";
import {
  Fn,
  IntersectionFn,
  KeepNeversFn,
  OmitFn,
  PickFn,
  Pipe,
  ToSchema,
} from "../types/Fn";
import { Hoc } from "../types/Hoc";
import { newHoc } from "../utils/newHoc";

export interface WithBodyFn<
  PropsSchema extends [string | number | symbol, any],
  RetSchema extends [string | number | symbol, any],
> extends Fn {
  return: Pipe<
    this["arg0"],
    [
      IntersectionFn<RetSchema>,
      KeepNeversFn<OmitFn<RetSchema[0]>>,
      IntersectionFn<
        Pipe<
          this["arg0"],
          [PickFn<PropsSchema[0]>, IntersectionFn<PropsSchema>]
        >
      >,
    ]
  >;
}

type WithBodyHoc = <Props extends object, Ret extends object>(
  body: (props: Props) => Ret,
) => Hoc<[WithBodyFn<ToSchema<Props>, ToSchema<Ret>>]>;

/**
 * withBody can be used as an intermediator to convert props and pass to the component
 * @example
 * // in this example, HappinessByLevel logs according to level 1 to 5
 * function HappinessByLevel({ level }: { level: number }) {
 *   if (level >= 5) {
 *     return "Very Happy";
 *   }
 *   if (level === 4) {
 *     return "Happy";
 *   }
 *   if (level === 3) {
 *     return "Neutral";
 *   }
 *   if (level === 2) {
 *     return "Sad";
 *   }
 *   // very sad if level is 1 or less
 *   return "Very Sad";
 * }
 *
 * const HappinessByGradient = withBody(function convertToGradient({
 *   level,
 * }: {
 *   level: number;
 * }) {
 *   // convert a value from 0 to 1 to a gradient level
 *   return { level: Math.ceil(level * 5) };
 * })(HappinessByLevel);
 * @example
 * const AddOne = withBody(function acceptStringToo({
 *   value,
 * }: {
 *   value: number | string;
 * }) {
 *   return { value: typeof value === "string" ? parseInt(value, 10) : value };
 * })(function AddOne({ value }: { value: number }) {
 *   return <>{value + 1}</>;
 * });
 */
export const withBody = newHoc<WithBodyHoc>(function withBody(
  Component: ComponentType,
  body: Function,
): FunctionComponent {
  return function WithBody(props: any): JSX.Element {
    return <Component {...props} {...body(props)} />;
  };
});
