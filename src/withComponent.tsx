import assert from "assert";
import { ComponentType, FunctionComponent, useMemo } from "react";
import { MakeWithComponentProps } from "./@types/MakeWithComponentProps";
import { componentDisplayName } from "./componentDisplayName";
import { newHoc } from "./newHoc";
import { render } from "./render";

interface WithComponentHoc {
  <Props extends {}, Options extends {}>(
    options: Options & { hiddenByDefault?: boolean } & (
        | { pick?: string[] }
        | { omit?: string[] }
      )
  ): <ClosureProps extends Props>(
    Component: ComponentType<ClosureProps>
  ) => FunctionComponent<MakeWithComponentProps<ClosureProps, Options>>;
}

const notComponent = new Set(["pick", "omit", "hiddenByDefault"]);

function getComponentDevelopment(options: object): string {
  const keys = Object.keys(options);
  const keyComponents = keys.filter((key) => !notComponent.has(key));
  assert(
    keyComponents.length == 1,
    "withComponent({ Component }) should be used with exactly one Component"
  );
  return keyComponents[0];
}

function getComponent(options: object): string {
  for (const key in options) {
    if (!notComponent.has(key)) {
      return key;
    }
  }
  assert.fail("withComponent could not find Component");
}

export const withComponent = ((): WithComponentHoc => {
  function withComponent(
    Component: ComponentType,
    options: any
  ): FunctionComponent {
    const targetName =
      process.env.NODE_ENV === "production"
        ? getComponent(options)
        : getComponentDevelopment(options);
    const Target = options[targetName] as FunctionComponent;

    if (process.env.NODE_ENV !== "production") {
      if (options.omit && options.pick) {
        assert.fail(
          "Don't use withComponent with pick and omit at the same time"
        );
      }
    }

    const parseProps = ((): any => {
      if (options.pick) {
        if (!(options.pick instanceof Set)) {
          options.pick = new Set(options.pick);
        }

        return (props: any) => {
          const ret: any = {};
          for (const key in props) {
            if (options.pick.has(key)) {
              ret[key] = props[key];
            }
          }
          return ret;
        };
      } else if (options.omit) {
        if (!(options.omit instanceof Set)) {
          options.omit = new Set(options.omit);
        }

        return (props: any) => {
          const ret: any = {};
          for (const key in props) {
            if (options.omit.has(key)) {
              continue;
            }
            ret[key] = props[key];
          }
          return ret;
        };
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

  return newHoc(withComponent, {
    dot(_Component, options) {
      return getComponentDevelopment(options);
    },
  }) as WithComponentHoc;
})();
