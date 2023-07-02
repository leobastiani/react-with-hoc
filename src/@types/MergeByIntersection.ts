import { Fn } from "./Fn";

export interface MergeByIntersection<Map extends object> extends Fn {
  return: this["arg0"];
}
