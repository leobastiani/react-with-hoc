import { ComponentType, FunctionComponent } from "react";
import { Fn, ToSchema } from "../../types/Fn";
import { Hoc } from "../../types/Hoc";
import { createHocNameFunction } from "../../utils/hocNameForWithStyle";
import { newHoc } from "../../utils/newHoc";

interface WithRenamesFn<T extends [string | number | symbol, string]>
  extends Fn {
  return: {
    [K in Extract<this["arg0"], any[]>[0]]: [
      K extends T[1] ? Extract<T, [any, K]>[0] : K,
      Extract<this["arg0"], [K, any]>[1],
    ];
  }[Extract<this["arg0"], any[]>[0]];
}

type WithRenamesHoc = <const Map extends Record<string, string>>(
  map: Map,
) => Hoc<[WithRenamesFn<ToSchema<Map>>]>;

export const withRenameMultiple = newHoc<WithRenamesHoc>(
  createHocNameFunction((map: object) =>
    Object.entries(map)
      .map(([from, to]) => `${from}→${to}`)
      .join("."),
  ),
  function withRename(
    Component: ComponentType,
    map: Record<string, string>,
  ): FunctionComponent {
    return function WithRenames(props: any): JSX.Element {
      const newProps = { ...props };
      for (const newProp in map) {
        const oldProp = map[newProp];
        if (newProp in newProps) {
          newProps[oldProp] = newProps[newProp];
          delete newProps[newProp];
        }
      }

      return <Component {...newProps} />;
    };
  },
);
