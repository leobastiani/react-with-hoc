import { ComponentType } from "react";
import { Hoc } from "./HocConfig";

type WithHocsArg =
  | Hoc<any, any, any, any, any>
  | ((Component: ComponentType<any>) => ComponentType<any>);

type MyPipe<
  xs extends readonly WithHocsArg[],
  accIntersection = {},
  accReplace = {},
  accOmit = never,
  accPick = never,
  accOptional = never
> = xs extends readonly [
  infer first extends WithHocsArg,
  ...infer rest extends readonly WithHocsArg[]
]
  ? first extends Hoc<
      infer myIntersection,
      infer myReplace,
      infer myOmit,
      infer myPick,
      infer myOptional
    >
    ? MyPipe<rest, accIntersection, accReplace, accOmit, accPick, accOptional>
    : MyPipe<rest, accIntersection, accReplace, accOmit, accPick, accOptional>
  : Hoc<accIntersection, accReplace, accOmit, accPick, accOptional>;

type WithHocs<Hocs extends readonly WithHocsArg[]> = MyPipe<Hocs>;

export function withHocs<const Hocs extends readonly WithHocsArg[]>(
  fns: Hocs
): WithHocs<Hocs> {
  return (arg: any) => fns.reduceRight((acc, fn) => fn(acc), arg);
}
