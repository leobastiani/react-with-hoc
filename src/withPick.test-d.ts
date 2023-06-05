import { Call, Unions } from "hotscript";
import React from "react";
import { expectType } from "tsd";
import { withPick } from "./withPick";
declare function Example({
  a,
  b,
  c,
}: {
  a: string;
  b: number;
  c: boolean;
}): JSX.Element;

const PickedComponent = withPick(["a", "b"])(Example);
declare const PickedProps: Call<
  Unions.ToTuple,
  keyof React.ComponentProps<typeof PickedComponent>
>;
expectType<["a", "b"]>(PickedProps);
