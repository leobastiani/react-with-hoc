import { ComponentType, FunctionComponent, useMemo } from "react";
import { NormalizeObject } from "./@types/NormalizeObject";
import { SpreadObject } from "./@types/SpreadObject";
import { WithComponent } from "./@types/WithComponent";
import { componentDisplayName } from "./componentDisplayName";
import { newHocNamedWithProps } from "./newHoc";
import { render } from "./render";

interface WithComponentsHoc {
  <Props extends {}, Map extends Readonly<Record<string, ComponentType<any>>>>(
    components: Map
  ): <ClosureProps extends Props>(
    Component: ComponentType<ClosureProps>
  ) => FunctionComponent<
    NormalizeObject<
      SpreadObject<
        ClosureProps,
        {
          [K in keyof Map]?: NormalizeObject<
            WithComponent<Map[K], ClosureProps>
          >;
        }
      >
    >
  >;
}

export const withComponents = ((): WithComponentsHoc => {
  function withComponents(
    Component: ComponentType,
    object: Record<string, ComponentType>
  ): FunctionComponent {
    const map = new Map(Object.entries(object));
    return function WithComponents(props: any): JSX.Element {
      const CurrTargets = {} as any;
      for (const [targetName, Target] of map) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const TargetByProps = useMemo(() => {
          if (typeof props[targetName] === "function") {
            return props[targetName](Target);
          }
          if (targetName in props) {
            return (): any => props[targetName];
          }

          return Target;
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [props[targetName]]);
        CurrTargets[targetName] = (myProps: any): any =>
          render(TargetByProps, props, myProps);
        if (process.env.NODE_ENV !== "production") {
          componentDisplayName.set(
            `${targetName}.withComponents`,
            CurrTargets[targetName]
          );
        }
      }

      return render(Component, props, CurrTargets);
    };
  }

  return newHocNamedWithProps(withComponents) as WithComponentsHoc;
})();
