import { Fn } from "hotscript";
import { OptionalKeysOf, SetOptional } from "type-fest";

export interface AddTypes<Map> extends Fn {
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
    | OptionalKeysOf<this["arg0"]>
    | OptionalKeysOf<Map extends object ? Map : never>
  >;
}
