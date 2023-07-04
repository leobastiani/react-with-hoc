import { ComponentType, FunctionComponent } from "react";
import { Simplify } from "type-fest";
import { Fn, Pipe } from "./Fn";

export type Hoc<Fns extends Fn[]> = <Props extends {}>(
  Component: ComponentType<Props>
) => FunctionComponent<Simplify<Pipe<Props, Fns>>>;
