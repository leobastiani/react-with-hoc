import { Call, Fn } from "hotscript";
import { ComponentType, FunctionComponent } from "react";
import { Simplify } from "type-fest";

export type Hoc<FnApplier extends Fn> = <Props extends {}>(
  Component: ComponentType<Props>
) => FunctionComponent<Simplify<Call<FnApplier, Props>>>;
