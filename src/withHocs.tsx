import { Fn } from "hotscript";
import { ComponentType } from "react";
import { Hoc } from "./Hoc";

type WithHocsArg =
  | Hoc<any>
  | ((Component: ComponentType<any>) => ComponentType<any>);

type WithHocsFlat<
  Hocs extends readonly WithHocsArg[],
  Acc extends Fn[] = []
> = Hocs extends readonly [
  infer first,
  ...infer rest extends readonly WithHocsArg[]
]
  ? first extends Hoc<infer Fns>
    ? [...Fns, ...WithHocsFlat<rest, Acc>]
    : Acc
  : Acc;

// prettier-ignore
type WithHocs<Hocs extends Fn[]> =
// (...args: any[]) =>
Hoc<Hocs>;

export function withHocs<const Hocs extends readonly Fn[]>(
  fns: Hocs
): WithHocs<[...Hocs]> {
  return (arg: any) => fns.reduceRight((acc, fn) => fn(acc), arg);
}
