import { Call } from "hotscript";
import { ComponentType, FunctionComponent } from "react";
import { Hoc } from "./Hoc";

type WithHocsArg =
  | Hoc<any>
  | ((Component: ComponentType<any>) => ComponentType<any>);

type MyPipe<acc, xs extends readonly WithHocsArg[]> = xs extends readonly [
  infer first extends WithHocsArg,
  ...infer rest extends readonly WithHocsArg[]
]
  ? first extends Hoc<infer fn>
    ? MyPipe<Call<fn, acc>, rest>
    : MyPipe<acc, rest>
  : acc;

type WithHocs<Hocs extends readonly WithHocsArg[]> = <Props extends {}>(
  Component: ComponentType<Props>
) => FunctionComponent<MyPipe<Props, Hocs>>;

export function withHocs<const Hocs extends readonly WithHocsArg[]>(
  fns: Hocs
): WithHocs<Hocs> {
  return (arg: any) => fns.reduceRight((acc, fn) => fn(acc), arg);
}
