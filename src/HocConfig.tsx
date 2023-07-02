import { ComponentType } from "react";
import { SetOptional } from "type-fest";

export type ApplyOmit<Props, omit> = omit extends [never]
  ? Props
  : Omit<Props, Extract<omit, string>>;

export type ApplyPick<Props, pick> = pick extends [never]
  ? Props
  : Pick<Props, Extract<pick, keyof Props>>;

export type ApplyOptional<Props, optional> = optional extends [never]
  ? Props
  : SetOptional<Props, Extract<optional, keyof Props>>;

type Normalize<Props> = keyof Props;

export type Apply<
  Props,
  intersection,
  replace,
  omit,
  pick,
  optional,
  replaceNever
> = Normalize<(Props & intersection & replaceNever) | replace>;

export type Hoc<
  intersection,
  replace,
  omit,
  pick,
  optional,
  replaceNever = {
    [K in keyof replace]: never;
  }
> = <Props extends {}>(
  Component: ComponentType<Props>
) => Apply<Props, intersection, replace, omit, pick, optional, replaceNever>;
