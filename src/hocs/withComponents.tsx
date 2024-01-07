import React, { ComponentType, FunctionComponent, useMemo } from "react";
import { Call, Fn, ReplaceFn, ToSchema } from "../types/Fn";
import { Hoc } from "../types/Hoc";
import { WithComponent } from "../types/WithComponent";
import { WithComponentOptions } from "../types/WithComponentOptions";
import { componentDisplayName } from "../utils/componentDisplayName";
import { getTargetByProps } from "../utils/getTargetByProps";
import { newHoc } from "../utils/newHoc";

interface WithComponentsFn<
  T extends [string | number | symbol, ComponentType<any>],
> extends Fn {
  return: Call<
    ReplaceFn<
      {
        [K in T[0]]: [K, WithComponent<Extract<T, [K, any]>[1]> | undefined];
      }[T[0]]
    >,
    this["arg0"]
  >;
}

interface WithComponentsHoc {
  <const Map extends Record<string, ComponentType<any>>>(
    components: Map,
    options?: WithComponentOptions,
  ): Hoc<[WithComponentsFn<ToSchema<Map>>]>;
}

export const withComponents = newHoc<WithComponentsHoc>(function withComponent(
  Component: ComponentType,
  object: Record<string, ComponentType>,
  options: any = {},
): FunctionComponent {
  const map = new Map(Object.entries(object));
  return function WithComponents(props: any): JSX.Element {
    const CurrTargets = {} as any;
    for (const [name, TargetComponent] of map) {
      const TargetByProps = useMemo(() => {
        return getTargetByProps({
          props,
          name,
          TargetComponent,
          options,
        });
      }, [props[name]]);
      CurrTargets[name] = (myProps: any): any => (
        <TargetByProps {...props} {...myProps} />
      );
      if (process.env.NODE_ENV !== "production") {
        componentDisplayName.set(`${name}.withComponents`, CurrTargets[name]);
      }
    }

    return <Component {...props} {...CurrTargets} />;
  };
});
