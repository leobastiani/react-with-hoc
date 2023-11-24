import { Objects, Pipe, Strings, Tuples, Unions } from "hotscript";

export type DependencyNames<T> = Pipe<
  T,
  [Objects.Keys, Unions.ToTuple, Tuples.Sort<Strings.LessThan>]
>;
