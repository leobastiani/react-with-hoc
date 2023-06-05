import { Pipe, Strings, Tuples, Unions } from "hotscript";
import React, { ComponentType } from "react";
import { expectType } from "tsd";
import { withOmit } from "./withOmit";

declare function Example(props: {
  a: string;
  b: number;
  c: boolean;
}): JSX.Element;

const OmittedComponent = withOmit(["a", "b"])(Example);
expectType<
  ComponentType<{
    c: boolean;
  }>
>(OmittedComponent);

declare const OmittedProps: Pipe<
  keyof React.ComponentProps<typeof OmittedComponent>,
  [Unions.ToTuple, Tuples.Sort<Strings.LessThan>]
>;
expectType<["c"]>(OmittedProps);
