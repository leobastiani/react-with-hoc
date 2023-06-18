import { Fn } from "hotscript";
import { SetOptional } from "type-fest";

export interface PartialBy<Names extends string | number | symbol> extends Fn {
  return: SetOptional<this["arg0"], Extract<Names, keyof this["arg0"]>>;
}
