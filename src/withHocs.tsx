import { ComponentType } from "react";
import { Config, Hoc } from "./Hoc";

type WithHocsArg =
  | Hoc<any>
  | ((Component: ComponentType<any>) => ComponentType<any>);

type Pipe<
  xs extends readonly WithHocsArg[],
  acc extends Config = {
    optional: never;
  }
> = xs extends readonly [
  infer first extends WithHocsArg,
  ...infer rest extends readonly WithHocsArg[]
]
  ? first extends Hoc<infer config>
    ? Pipe<rest, acc | config>
    : acc
  : acc;

// prettier-ignore
type WithHocs<Hocs extends readonly WithHocsArg[]> =
  (...args: any) => Pipe<Hocs>
// Hoc<Pipe<Hocs>>;

export function withHocs<const Hocs extends readonly WithHocsArg[]>(
  fns: Hocs
): WithHocs<Hocs> {
  return (arg: any) => fns.reduceRight((acc, fn) => fn(acc), arg);
}
