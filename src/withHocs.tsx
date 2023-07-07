import { ComponentType } from "react";
import { Fn } from "./Fn";
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
    : WithHocsFlat<rest, Acc>
  : Acc;

export function withHocs<const Hocs extends readonly WithHocsArg[]>(
  fns: Hocs
): Hoc<WithHocsFlat<[...Hocs]>> {
  return (arg: any) => fns.reduceRight((acc, fn) => fn(acc), arg);
}
