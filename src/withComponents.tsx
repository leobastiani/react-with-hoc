import { ComponentType, FunctionComponent, useMemo } from "react";
import { WithComponent } from "./@types/WithComponent";
import { ReplaceFn } from "./Fn";
import { Hoc } from "./Hoc";
import { componentDisplayName } from "./componentDisplayName";
import { newHoc } from "./newHoc";
import { getTargetByProps, withComponent } from "./withComponent";

interface WithComponentsHoc {
  <Map extends Record<string, ComponentType<any>>>(
    components: Map,
    options?: Parameters<typeof withComponent>[1]
  ): Hoc<
    [
      ReplaceFn<
        {
          [K in keyof Map]: [K, WithComponent<Map[K]> | undefined];
        }[keyof Map]
      >
    ]
  >;
}

export const withComponents = newHoc<WithComponentsHoc>(function withComponents(
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
});
