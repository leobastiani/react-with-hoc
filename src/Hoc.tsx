import { ComponentType, FunctionComponent } from "react";
import { SetOptional, Simplify } from "type-fest";

export type Config = {
  union?: object;
  intersection?: object;
  replace?: object;
  omit?: string;
  pick?: string;
  optional?: string;
};

export type ApplyUnion<T, Union> = T & Union;
export type Apply<T, MyConfig extends Config> = SetOptional<
  T,
  Extract<MyConfig["optional"], keyof T>
>;

export type Hoc<config extends Config> = <Props extends {}>(
  Component: ComponentType<Props>
) => FunctionComponent<Simplify<Apply<Props, config>>>;
