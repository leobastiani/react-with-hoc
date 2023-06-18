import { Call, Fn } from "hotscript";
import { ComponentType, FunctionComponent } from "react";
import { Simplify } from "type-fest";

export type Hoc<
  FnApplier extends Fn,
  RequiredProps extends {} = {}
> = FnApplier &
  (<Props extends RequiredProps>(
    Component: ComponentType<Props>
  ) => FunctionComponent<Simplify<Call<FnApplier, Props>>>);
