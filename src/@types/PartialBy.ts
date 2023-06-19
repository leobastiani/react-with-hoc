import { Fn } from "hotscript";
import { SetOptional } from "type-fest";

export interface PartialBy<Names extends string | number | symbol> extends Fn {
  return: SetOptional<
    this["arg0"],
    Names &
      keyof {
        [K in keyof this["arg0"] as [this["arg0"][K]] extends [never]
          ? never
          : K]: K;
      }
  >;
}
