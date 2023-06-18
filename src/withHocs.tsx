import { Fn, Identity, Pipe } from "hotscript";
import { ComponentType, FunctionComponent } from "react";
import { Simplify } from "type-fest";
import { Hoc } from "./Hoc";

type WithHocsArg =
  | Hoc<any>
  | ((Component: ComponentType<any>) => ComponentType<any>);

type AsFns<Fns extends WithHocsArg[]> = Fns extends [
  infer Fn0,
  ...infer FnsRest extends WithHocsArg[]
]
  ? [Fn0 extends Fn ? Fn0 : Identity, ...AsFns<FnsRest>]
  : [];

type WithHocs<Hocs extends WithHocsArg[]> = <Props extends {}>(
  Component: ComponentType<Props>
) => FunctionComponent<Simplify<Pipe<Props, AsFns<Hocs>>>>;

export function withHocs<Hocs extends WithHocsArg[]>(
  ...fns: Hocs
): WithHocs<Hocs> {
  return (arg: any) => fns.reduceRight((acc, fn) => fn(acc), arg);
}
