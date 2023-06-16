import { Fn } from "hotscript";

export interface Merge<A> extends Fn {
  return: {
    [K in keyof A]: K extends keyof this["arg0"]
      ? A[K] | this["arg0"][K]
      : A[K];
  } & {
    [K in keyof this["arg0"]]: K extends keyof A
      ? A[K] | this["arg0"][K]
      : this["arg0"][K];
  };
}
