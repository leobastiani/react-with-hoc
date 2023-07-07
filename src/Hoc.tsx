import { Fn, Pipe } from "hotscript";
import { ComponentType } from "react";
import { FromSchema, ToSchema } from "./Fn";

export type Hoc<Fns extends Fn[]> = <Props extends {}, TFns extends Fn[] = Fns>(
  Component: ComponentType<Props>
) => FromSchema<Extract<Pipe<ToSchema<Props>, TFns>, [string, any]>>;
