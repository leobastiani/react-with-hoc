import { ComponentType } from "react";
import { Fn, FromSchema, Pipe, ToSchema } from "./Fn";

export type Hoc<Fns extends Fn[]> = <Props extends {}>(
  Component: ComponentType<Props>
) => FromSchema<Extract<Pipe<ToSchema<Props>, Fns>, [string, any]>>;
