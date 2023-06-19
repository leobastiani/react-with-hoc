import { Fn } from "hotscript";
import { OptionalKeysOf, RequiredKeysOf, SetOptional } from "type-fest";

export interface MergeByUnion<Map extends object> extends Fn {
  return: SetOptional<
    {
      [K in keyof Map | keyof this["arg0"]]: Exclude<
        K extends keyof this["arg0"]
          ? K extends keyof Map
            ? this["arg0"][K] | Map[K]
            : this["arg0"][K]
          : K extends keyof Map
          ? Map[K]
          : never,
        undefined
      >;
    },
    | Exclude<OptionalKeysOf<this["arg0"]>, RequiredKeysOf<Map>>
    | OptionalKeysOf<Map>
  >;
}
