import { Fn } from "hotscript";

export interface Merge<Map> extends Fn {
  return: {
    [K in keyof Map | keyof this["arg0"]]: K extends keyof this["arg0"]
      ? K extends keyof Map
        ? this["arg0"][K] | Map[K]
        : this["arg0"][K]
      : K extends keyof Map
      ? Map[K]
      : never;
  };
}
