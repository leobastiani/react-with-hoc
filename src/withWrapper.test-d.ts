import { Pipe, Strings, Tuples, Unions } from "hotscript";
import React, { ComponentProps, FunctionComponent, ReactNode } from "react";
import { expectType } from "tsd";
import { withWrapper } from "./withWrapper";

declare function Example(props: {
  a: string;
  b: number;
  c: boolean;
}): JSX.Element;

declare function Provider(props: { children: ReactNode }): JSX.Element;

const WrappedComponent = withWrapper(Provider)(Example);
expectType<FunctionComponent<ComponentProps<typeof Example>>>(WrappedComponent);

declare const WrappedProps: Pipe<
  keyof React.ComponentProps<typeof WrappedComponent>,
  [Unions.ToTuple, Tuples.Sort<Strings.LessThan>]
>;
expectType<["a", "b", "c"]>(WrappedProps);
