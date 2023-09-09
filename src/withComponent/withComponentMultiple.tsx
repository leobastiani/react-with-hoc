import { ComponentType, FunctionComponent, useMemo } from "react";
import { WithComponent } from "../@types/WithComponent";
import { Call, Fn, ReplaceFn, ToSchema } from "../Fn";
import { Hoc } from "../Hoc";
import { componentDisplayName } from "../componentDisplayName";
import { newHoc } from "../newHoc";
import { getTargetByProps, withComponentSingle } from "./withComponentSingle";

interface WithComponentsFn<
  T extends [string | number | symbol, ComponentType<any>]
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
    options?: Parameters<typeof withComponentSingle>[1]
  ): Hoc<[WithComponentsFn<ToSchema<Map>>]>;
}

export const withComponentMultiple = newHoc<WithComponentsHoc>(
  function withComponents(
    Component: ComponentType,
    object: Record<string, ComponentType>,
    options: any = {}
  ): FunctionComponent {
    const map = new Map(Object.entries(object));
    return function WithComponents(props: any): JSX.Element {
      const CurrTargets = {} as any;
      for (const [name, TargetComponent] of map) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const TargetByProps = useMemo(() => {
          return getTargetByProps({
            props,
            name,
            TargetComponent,
            options,
          });
          // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }
);
