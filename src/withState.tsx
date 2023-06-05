import { ComponentType, FunctionComponent, useState } from "react";
import { CamelCase } from "./@types/CamelCase";
import { ClosurePartial } from "./@types/ClosurePartial";
import { Merge } from "./@types/Merge";
import { SimplifyComponentProps } from "./@types/NormalizeObject";
import { SetState } from "./@types/SetState";
import { camelCase } from "./camelCase";
import { newHoc } from "./newHoc";
import { render } from "./render";

interface WithStateHoc {
  <
    PropValue,
    StateName extends string,
    SetterName extends string = CamelCase<`set_${StateName}`>,
    Props extends {} = {}
  >(
    stateName: StateName,
    {
      init,
      setterName,
    }?: {
      init?: Exclude<PropValue, Function> | ((props: Props) => PropValue);
      setterName?: SetterName;
    }
  ): <ClosureProps extends Props>(
    Component: ComponentType<ClosureProps>
  ) => FunctionComponent<
    SimplifyComponentProps<
      ClosurePartial<
        Merge<
          ClosureProps,
          {
            [k in StateName]: PropValue;
          } & {
            [k in SetterName]: SetState<PropValue>;
          }
        >,
        StateName | SetterName
      >
    >
  >;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop(): void {}

export const withState = ((): WithStateHoc => {
  function withState(
    Component: ComponentType,
    stateName: string,
    { init, setterName = camelCase(["set", stateName]) }: any = {}
  ): FunctionComponent {
    let locallyControlled: boolean | undefined;
    function getUseState(props: any): any {
      if (
        process.env.NODE_ENV !== "production" &&
        locallyControlled !== undefined
      ) {
        if (locallyControlled) {
          if (stateName in props || setterName in props) {
            throw new Error(
              `The state "${stateName}" was locally controlled and then it changed`
            );
          }
        } else {
          if (!(stateName in props)) {
            throw new Error(
              `The state "${stateName}" was controlled by its parent and then it changed`
            );
          }
        }
      }

      if (locallyControlled === true) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useState(init);
      }
      if (locallyControlled === false) {
        return [props[stateName], props[setterName] ?? noop];
      }
      locallyControlled = !(stateName in props || setterName in props);
      return getUseState(props);
    }

    function WithState(props: any): JSX.Element {
      const [state, setState] = getUseState(props);

      return render(
        Component,
        {
          [stateName]: state,
          [setterName]: setState,
        },
        props
      );
    }
    return WithState;
  }

  return newHoc(withState) as WithStateHoc;
})();
