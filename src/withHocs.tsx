import { Fn } from "hotscript";
import { ComponentType } from "react";
import { Hoc } from "./Hoc";

type WithHocsArg =
  | Hoc<any>
  | ((Component: ComponentType<any>) => ComponentType<any>);

type WithHocsFlat<
  Hocs extends WithHocsArg[],
  Acc extends Fn[] = []
> = Hocs extends [infer first, ...infer rest extends WithHocsArg[]]
  ? first extends Hoc<infer Fns extends Fn[]>
    ? WithHocsFlat<rest, [...Acc, ...Fns]>
    : Acc
  : Acc;

// prettier-ignore
type WithHocs<Hocs extends WithHocsArg[]> =
// (...args: any[]) =>
Hoc<WithHocsFlat<Hocs>>;

export function withHocs<const Hocs extends readonly WithHocsArg[]>(
  fns: Hocs
): WithHocs<[...Hocs]> {
  return (arg: any) => fns.reduceRight((acc, fn) => fn(acc), arg);
}
