import { Fn } from "hotscript";

export interface PartialBy<Names extends string | number | symbol> extends Fn {
  return: Pick<
    Omit<this["arg0"], Names> & Partial<Pick<this["arg0"], Names>>,
    // @ts-expect-error
    keyof this["arg0"]
  >;
}
