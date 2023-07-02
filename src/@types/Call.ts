import { Fn } from "./Fn";

export type Call<fn extends Fn, arg0> = (fn & { arg0: arg0 })["return"];
