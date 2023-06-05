import { Fn, Identity, Pipe } from "hotscript";
import { ComponentType, FunctionComponent } from "react";
import { NormalizeObject } from "./@types/NormalizeObject";

type WithHocsArg = Fn | ((Component: ComponentType<any>) => ComponentType<any>);

type AsFns<Fns extends WithHocsArg[]> = Fns extends [
  infer Fn0,
  ...infer FnsRest
]
  ? [
      Fn0 extends Fn ? Fn0 : Identity,
      ...AsFns<FnsRest extends WithHocsArg[] ? FnsRest : never>
    ]
  : [];

type WithHocs<Fns extends WithHocsArg[]> = <ClosureProps extends {}>(
  Component: ComponentType<ClosureProps>
) => FunctionComponent<NormalizeObject<Pipe<ClosureProps, AsFns<Fns>>>>;

export function withHocs<Fns extends Array<WithHocsArg>>(
  ...fns: Fns
): WithHocs<Fns> {
  // @ts-ignore
  return (arg: any) => fns.reduce((acc, fn) => fn(acc), arg);
}
