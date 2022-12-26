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

    return function WithComponent(props: any): JSX.Element {
      const NewTarget = useMemo(() => {
        if (typeof props[targetName] === "function") {
          return (myProps: any): any =>
            render(props[targetName](Target), props, myProps);
        }
        if (options.hiddenByDefault) {
          if (!props[targetName]) {
            // eslint-disable-next-line react/display-name
            return (): any => <></>;
          } else if (props[targetName] === true) {
            return (myProps: any) => render(Target, props, myProps);
          }
        }
        if (targetName in props) {
          return (): any => props[targetName];
        }

        return (myProps: any) => render(Target, props, myProps);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [props[targetName]]);

      componentDisplayName.set(`${targetName}.withComponent`, NewTarget);

      return render(Component, props, {
        [targetName]: NewTarget,
      });
    };
  }

  return newHoc(withComponent, {
    dot(_Component, options) {
      return getComponentDevelopment(options);
    },
  }) as WithComponentHoc;
})();
