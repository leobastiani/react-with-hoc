import { ComponentType, FunctionComponent } from "react";
import { Fn, FromSchema, Pipe, ToSchema } from "./types/Fn";

export type Hoc<TFns extends Fn[]> = <
  Props extends {},
  // without would trigger Type instantiation is excessively deep and possibly infinite
  Fns extends Fn[] = TFns
>(
  Component: ComponentType<Props>
) => FunctionComponent<
  FromSchema<Extract<Pipe<ToSchema<Props>, Fns>, [string, any]>>
>;
