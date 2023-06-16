import { Pipe, Strings, Tuples, Unions } from "hotscript";
import React, { ComponentType } from "react";
import { expectType } from "tsd";
import { withPick } from "./withPick";

declare function Example(props: {
  a: string;
  b: number;
  c: boolean;
}): JSX.Element;

const PickedComponent = withPick(["a", "b"])(Example);
expectType<
  ComponentType<{
    a: string;
    b: number;
  }>
>(PickedComponent);

declare const PickedProps: Pipe<
  keyof React.ComponentProps<typeof PickedComponent>,
  [Unions.ToTuple, Tuples.Sort<Strings.LessThan>]
>;
expectType<["a", "b"]>(PickedProps);