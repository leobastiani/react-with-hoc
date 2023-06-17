import { Fn } from "hotscript";
import { OptionalKeysOf, RequiredKeysOf, SetOptional } from "type-fest";

export interface AcceptBoth<Map> extends Fn {
  return: SetOptional<
    {
      [K in keyof Map | keyof this["arg0"]]: K extends keyof this["arg0"]
        ? K extends keyof Map
          ? Exclude<this["arg0"][K] | Map[K], undefined>
          : Exclude<this["arg0"][K], undefined>
        : K extends keyof Map
        ? Exclude<Map[K], undefined>
        : never;
    },
    | Exclude<
        OptionalKeysOf<this["arg0"]>,
        RequiredKeysOf<Map extends object ? Map : never>
      >
    | OptionalKeysOf<Map extends object ? Map : never>
  >;
}
