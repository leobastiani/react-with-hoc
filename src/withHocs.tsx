import { ComponentType } from "react";

type Hoc<PropsIn extends {}, PropsOut extends {}> = (
  ComponentIn: ComponentType<PropsIn>
) => ComponentType<PropsOut>;

// type LastFnReturnType<
//   F extends Array<Hoc<any, any>>,
//   Else = never
// > = F extends [...any[], infer Last] ? Last : Else;

type PipeArgs<
  F extends Hoc<any, any>[],
  Acc extends Hoc<any, any>[] = []
> = F extends [(ComponentIn: ComponentType<infer A>) => ComponentType<infer B>]
  ? [...Acc, (ComponentIn: ComponentType<A>) => ComponentType<B>]
  : F extends [
      (ComponentIn: ComponentType<infer A>) => ComponentType<any>,
      ...infer Tail
    ]
  ? Tail extends [
      (ComponentIn: ComponentType<infer B>) => ComponentType<any>,
      ...any[]
    ]
    ? PipeArgs<
        Tail,
        [...Acc, (ComponentIn: ComponentType<A>) => ComponentType<B>]
      >
    : Acc
  : Acc;

export function withHocs<
  FirstFn extends Hoc<any, any>,
  F extends Hoc<any, any>[]
>(
  firstFn: FirstFn,
  ...fns: PipeArgs<F> extends F ? F : PipeArgs<F>
): // ): LastFnReturnType<F, ReturnType<FirstFn>> {
// TODO: trocar any
<PropsIn extends {}>(Component: ComponentType<PropsIn>) => ComponentType<any> {
  // @ts-ignore
  return (arg: any) =>
    ([firstFn, ...fns] as any[]).reduceRight((acc, fn) => fn(acc), arg);
}
