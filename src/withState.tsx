import { ComponentType, FunctionComponent, useState } from "react";
import { IntersectionFn, ReplaceFn, SetOptionalFn, ToSchema } from "./Fn";
import { Hoc } from "./Hoc";
import { camelCase } from "./camelCase";
import { newHoc } from "./newHoc";

type WithStateHoc = <
  PropValue,
  StateName extends string,
  SetterName extends string = `set${Capitalize<StateName>}`,
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
) => Hoc<
  [
    IntersectionFn<
      | [StateName, PropValue]
      | [SetterName, React.Dispatch<React.SetStateAction<PropValue>>]
    >,
    SetOptionalFn<StateName | SetterName>,
    ReplaceFn<ToSchema<Props>>
  ]
>;

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop(): void {}

export const withState = newHoc(function withState(
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

    locallyControlled = !(stateName in props || setterName in props);
    if (locallyControlled === true) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useState(typeof init === "function" ? init(props) : init);
    }
    return [props[stateName], props[setterName] ?? noop];
  }

  return function WithState(props: any): JSX.Element {
    const [state, setState] = getUseState(props);

    return (
      <Component
        {...{
          [stateName]: state,
          [setterName]: setState,
        }}
        {...props}
      />
    );
  };
}) as WithStateHoc;
