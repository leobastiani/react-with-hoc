import { Pipe, Objects, Unions, Tuples, Strings } from "hotscript";

export type DependencyArray<DependencyProps extends {}> = Pipe<
  DependencyProps,
  [Objects.Keys, Unions.ToTuple, Tuples.Sort<Strings.LessThan>]
>;
