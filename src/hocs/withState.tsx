import React, { ComponentType, FunctionComponent, useState } from "react";
import { Fn, IntersectionFn, Pipe, SetOptionalFn, ToSchema } from "../types/Fn";
import { Hoc } from "../types/Hoc";
import { newHoc } from "../utils/newHoc";

interface WithStateFn<
  PropValue,
  StateName extends string,
  SetterName extends string,
  PropsSchema extends [string | number | symbol, any],
> extends Fn {
  return: Pipe<
    this["arg0"],
    [
      IntersectionFn<
        | [StateName, PropValue]
        | [SetterName, React.Dispatch<React.SetStateAction<PropValue>>]
      >,
      SetOptionalFn<StateName | SetterName>,
      IntersectionFn<PropsSchema>,
    ]
  >;
}

type WithStateHoc = <
  PropValue,
  StateName extends string,
  SetterName extends string = `set${Capitalize<StateName>}`,
  Props extends object = {},
>(
  stateName: StateName,
  options?: {
    /**
     * the initial value
     *
     *  @example
     * // initial state from a constant
     * {init: "initial value"}
     *
     * @example
     * // initial state will be derived from someProp
     * {init: ({ someProp }: {someProp: number}) => someProp + 1}
     */
    init?: Exclude<PropValue, Function> | ((props: Props) => PropValue);
    /**
     * the setter's name property, usually you want to the default which is `set${Capitalize<StateName>}`
     * @default `set${Capitalize<StateName>}`
     * @example
     * withState("someState", {
     *   init: 0,
     *   setterName: "setSomeState" // default
     * })(Example)
     */
    setterName?: SetterName;
  },
) => Hoc<[WithStateFn<PropValue, StateName, SetterName, ToSchema<Props>>]>;

function noop(): void {}

/**
 * like `useState` or you can pass properties to the component to make it controllable
 * @example
 * const CounterWithState = withState("count", { init: 0 })(function Counter({count, setCount}: {count: number; setCount: Dispatch<SetStateAction<number>>}) {
 *   return <button onClick={() => setCount(count + 1)}>{count}</button>;
 * });
 * // using CounterWithState as self controlled
 * function IndependentCounters() {
 *   return <>
 *     <CounterWithState />
 *     <CounterWithState />
 *   </>;
 * }
 * <IndependentCounters /> // will render 2 buttons that can count independently
 *
 * // using CounterWithState as parent controlled
 * function SameCounters() {
 *   const [count, setCount] = useState(0);
 *   return <>
 *     <CounterWithState count={count} setCount={setCount} />
 *     <CounterWithState count={count} setCount={setCount} />
 *   </>;
 * }
 * <SameCounters /> // will render 2 buttons with the same count
 */
export const withState = newHoc<WithStateHoc>(function withState(
  Component: ComponentType,
  stateName: string,
  {
    init,
    setterName = "set" + stateName.charAt(0).toUpperCase() + stateName.slice(1),
  }: any = {},
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
            `The state "${stateName}" was locally controlled and then it changed`,
          );
        }
      } else {
        if (!(stateName in props)) {
          throw new Error(
            `The state "${stateName}" was controlled by its parent and then it changed`,
          );
        }
      }
    }

    locallyControlled = !(stateName in props || setterName in props);
    if (locallyControlled === true) {
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
});
