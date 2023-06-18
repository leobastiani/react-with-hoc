/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fn, Identity, Pipe } from "hotscript";
import { ComponentType, FunctionComponent } from "react";
import { Simplify } from "type-fest";
import { Hoc } from "./Hoc";

type WithHocsArg =
  | Hoc<any>
  | ((Component: ComponentType<any>) => ComponentType<any>);

type AsFns<Fns extends WithHocsArg[]> = Fns extends [
  infer Fn0,
  ...infer FnsRest
]
  ? [
      Fn0 extends Fn ? Fn0 : Identity,
      ...AsFns<FnsRest extends WithHocsArg[] ? FnsRest : never>
    ]
  : [];

type GetDepsInHoc<MyHoc extends Hoc<any>> = MyHoc extends Hoc<
  infer _Fn,
  infer D
>
  ? D
  : {};

type GetDepsInHocs<MyHocs extends Hoc<any>[]> = MyHocs extends [
  infer Hoc0,
  ...infer HocsRest extends Hoc<any>[]
]
  ? GetDepsInHoc<Hoc0> & GetDepsInHocs<HocsRest>
  : {};

type WithHocs<Hocs extends WithHocsArg[]> = <
  ClosureProps extends GetDepsInHocs<Hocs>
>(
  Component: ComponentType<ClosureProps>
) => FunctionComponent<Simplify<Pipe<ClosureProps, AsFns<Hocs>>>>;

export function withHocs<Hocs extends Array<WithHocsArg>>(
  ...fns: Hocs
): WithHocs<Hocs> {
  // @ts-ignore
  return (arg: any) => fns.reduceRight((acc, fn) => fn(acc), arg);
}
