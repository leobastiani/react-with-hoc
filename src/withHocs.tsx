import { Fn, Pipe } from "hotscript";
import { ComponentType, FunctionComponent } from "react";
import { NormalizeObject } from "./@types/NormalizeObject";

type WithHocArgs = (((...args: any) => any) | Fn)[];

interface Identity extends Fn {
  return: this["arg0"];
}

type MakeFns<Fns extends WithHocArgs> = Fns extends [
  infer Fn0 extends WithHocArgs[number],
  ...infer Rest extends WithHocArgs
]
  ? [Fn0 extends Fn ? Fn0 : Identity, ...MakeFns<Rest>]
  : never;

export function withHocs<Fns extends Array<((...args: any) => any) | Fn>>(
  ...fns: Fns
): <ClosureProps extends {}>(
  Component: ComponentType<ClosureProps>
) => FunctionComponent<NormalizeObject<Pipe<ClosureProps, MakeFns<Fns>>>> {
  // @ts-ignore
  return (arg: any) => fns.reduce((acc, fn) => fn(acc), arg);
}
