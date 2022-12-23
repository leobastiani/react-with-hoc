type Hoc = (arg: any) => any;

type PipeArgs<F extends Hoc[], Acc extends Hoc[] = []> = F extends [
  (...args: infer A) => infer B
]
  ? [...Acc, (...args: A) => B]
  : F extends [(arg: infer A) => any, ...infer Tail]
  ? Tail extends [(arg: infer B) => any, ...any[]]
    ? PipeArgs<Tail, [...Acc, (arg: A) => B]>
    : Acc
  : Acc;

type LastFnReturnType<F extends Array<Hoc>, Else = never> = F extends [
  ...any[],
  (...arg: any) => infer R
]
  ? R
  : Else;

export function withHocs<FirstFn extends Hoc, F extends Hoc[]>(
  firstFn: FirstFn,
  ...fns: PipeArgs<F> extends F ? F : PipeArgs<F>
): (arg: Parameters<FirstFn>[0]) => LastFnReturnType<F, ReturnType<FirstFn>> {
  return (arg: Parameters<FirstFn>[0]) =>
    (fns as Hoc[]).reduce((acc, fn) => fn(acc), firstFn(arg));
}
