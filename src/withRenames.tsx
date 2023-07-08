import { ComponentType, FunctionComponent } from "react";
import { Fn, ToSchema } from "./Fn";
import { Hoc } from "./Hoc";
import { createHocNameFunction } from "./hocNameForWithStyle";
import { newHoc } from "./newHoc";

interface WithRenamesFn<T extends [string | number | symbol, string]>
  extends Fn {
  return: {
    [K in Extract<this["arg0"], any[]>[0]]: [
      K extends T[1] ? Extract<T, [any, K]>[0] : K,
      Extract<this["arg0"], [K, any]>[1]
    ];
  }[Extract<this["arg0"], any[]>[0]];
}

interface WithRenamesHoc {
  <const Map extends Record<string, string>>(map: Map): Hoc<
    [WithRenamesFn<ToSchema<Map>>]
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
