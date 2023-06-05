import { Fn } from "hotscript";

export interface PartialBy<Names extends string> extends Fn {
  return: Omit<this["arg0"], Names> & Partial<Pick<this["arg0"], Names>>;
}
