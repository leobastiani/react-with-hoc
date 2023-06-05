import { Pipe, Strings, Tuples, Unions } from "hotscript";
import React, { ComponentType } from "react";
import { expectType } from "tsd";
import { withState } from "./withState";

declare function Example(props: {
  someState: number;
  setSomeState: React.Dispatch<React.SetStateAction<number>>;
  oldProp: string;
}): JSX.Element;

const NewComponent = withState("someState", {
  init: ({ newProp }: { newProp: boolean }) => (newProp ? (1 as number) : 2),
})(Example);
expectType<
  ComponentType<{
    newProp: boolean;
    oldProp: string;
    someState?: number;
    setSomeState?: React.Dispatch<React.SetStateAction<number>>;
  }>
>(NewComponent);

declare const NewComponentPropNames: Pipe<
  keyof React.ComponentProps<typeof NewComponent>,
  [Unions.ToTuple, Tuples.Sort<Strings.LessThan>]
>;
expectType<["newProp", "oldProp", "setSomeState", "someState"]>(
  NewComponentPropNames
);
