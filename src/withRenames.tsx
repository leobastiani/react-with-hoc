import { Fn } from "hotscript";
import { ComponentType, FunctionComponent } from "react";
import { Hoc } from "./Hoc";
import { createHocNameFunction } from "./hocNameForWithStyle";
import { newHoc } from "./newHoc";

interface WithRenamesFn<Map extends Record<string, string>> extends Fn {
  return: {
    [K in keyof this["arg0"] as K extends keyof Map
      ? Map[K]
      : K]: this["arg0"][K];
  };
}

type AsRecord<T> = T extends Record<string, string> ? T : never;

interface WithRenamesHoc {
  <Map extends Record<string, string>>(map: Map): Hoc<
    WithRenamesFn<
      AsRecord<{
        [K in keyof Map as K extends keyof Map ? Map[K] : never]: K;
      }>
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
