import { ComposeLeft, Fn, Objects, Pipe, Tuples, Unions } from "hotscript";
import { ComponentType, FunctionComponent } from "react";
import { Hoc } from "./Hoc";
import { createHocNameFunction } from "./hocNameForWithStyle";
import { newHoc } from "./newHoc";
import { WithRenameFn } from "./withRename";

interface ToWithRenameFn extends Fn {
  return: WithRenameFn<this["arg0"][0], this["arg0"][1]>;
}

type ForceComposeLeft<Arr> = Arr extends Fn[] ? ComposeLeft<Arr> : never;

interface WithRenamesHoc {
  <const Map extends Record<string, string>>(map: Map): Hoc<
    ForceComposeLeft<
      Pipe<Map, [Objects.Entries, Unions.ToTuple, Tuples.Map<ToWithRenameFn>]>
    >
  >;
}

export const withRenames = newHoc(
  createHocNameFunction((map: object) =>
    Object.entries(map)
      .map(([from, to]) => `${from}→${to}`)
      .join(".")
  ),
  function withRenames(
    Component: ComponentType,
    map: Record<string, string>
  ): FunctionComponent {
    return function WithRenames(props: any): JSX.Element {
      for (const newProp in map) {
        const oldProp = map[newProp];
        if (newProp in map) {
          map[oldProp] = map[newProp];
          delete map[newProp];
        }
      }

      return <Component {...props} />;
    };
  }
) as WithRenamesHoc;
