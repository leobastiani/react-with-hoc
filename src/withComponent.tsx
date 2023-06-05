import { ComponentType, FunctionComponent, useMemo } from "react";
import { SimplifyComponentProps } from "./@types/NormalizeObject";
import { WithComponent } from "./@types/WithComponent";
import { componentDisplayName } from "./componentDisplayName";
import { newHoc } from "./newHoc";
import { render } from "./render";

interface WithComponentHoc {
  <Props extends {}, Name extends string, Target extends ComponentType<any>>(
    name: Name,
    component: Target,
    options?: { hiddenByDefault?: boolean } & (
      | { pick?: string[] }
      | { omit?: string[] }
    )
  ): <ClosureProps extends Props>(
    Component: ComponentType<ClosureProps>
  ) => FunctionComponent<
    SimplifyComponentProps<
      {
        [K in keyof ClosureProps as K extends Name
          ? never
          : K]: ClosureProps[K];
      } & {
        [K in Name]?: SimplifyComponentProps<
          WithComponent<Target, ClosureProps>
        >;
      }
    >
  >;
}

function parsePropsByPick(props: any, pick: any): any {
  const ret: any = {};
  for (const key in props) {
    if (pick.has(key)) {
      ret[key] = props[key];
    }
  }
  return ret;
}

function parsePropsByOmit(props: any, omit: any): any {
  const ret: any = {};
  for (const key in props) {
    if (omit.has(key)) {
      continue;
    }
    ret[key] = props[key];
  }
  return ret;
}

export const withComponent = ((): WithComponentHoc => {
  function withComponent(
    Component: ComponentType,
    targetName: string,
    Target: ComponentType,
    options: any = {}
  ): FunctionComponent {
    if (process.env.NODE_ENV !== "production") {
      if (options.omit && options.pick) {
        throw new Error(
          "Don't use withComponent with pick and omit at the same time"
        );
      }
    }

    const parseProps = ((): any => {
      if (options.pick) {
        if (!(options.pick instanceof Set)) {
          options.pick = new Set(options.pick);
        }

        return (props: any) => parsePropsByPick(props, options.pick);
      } else if (options.omit) {
        if (!(options.omit instanceof Set)) {
          options.omit = new Set(options.omit);
        }

        return (props: any) => parsePropsByOmit(props, options.omit);
      }

      return (props: any) => props;
    })();

    return function WithComponent(props: any): JSX.Element {
      const TargetByProps = useMemo(() => {
        if (typeof props[targetName] === "function") {
          return props[targetName](Target);
        }
        if (options.hiddenByDefault) {
          if (!props[targetName]) {
            // eslint-disable-next-line react/display-name
            return (): any => <></>;
          } else if (props[targetName] === true) {
            return Target;
          }
        }
        if (targetName in props) {
          return (): any => props[targetName];
        }

        return Target;
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [props[targetName]]);
      const CurrTarget = (myProps: any): any =>
        render(TargetByProps, parseProps(props), myProps);
      if (process.env.NODE_ENV !== "production") {
        componentDisplayName.set(`${targetName}.withComponent`, CurrTarget);
      }

      return render(Component, props, {
        [targetName]: CurrTarget,
      });
    };
  }

  return newHoc(withComponent) as WithComponentHoc;
})();
