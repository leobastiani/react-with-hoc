import { Fn } from "hotscript";
import { RequiredKeysOf, SetOptional } from "type-fest";

export interface MergeByIntersection<Map extends object> extends Fn {
  return: SetOptional<
    {
      [K in keyof Map | keyof this["arg0"]]: K extends keyof this["arg0"]
        ? K extends keyof Map
          ? Exclude<this["arg0"][K] & Map[K], undefined>
          : Exclude<this["arg0"][K], undefined>
        : K extends keyof Map
        ? Exclude<Map[K], undefined>
        : never;
    },
    Exclude<
      keyof this["arg0"] | keyof Map,
      RequiredKeysOf<this["arg0"]> | RequiredKeysOf<Map>
    >
  >;
}
