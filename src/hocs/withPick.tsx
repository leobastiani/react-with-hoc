import React, { ComponentType, FunctionComponent } from "react";
import { Call, Fn, KeepNeversFn, PickFn } from "../types/Fn";
import { Hoc } from "../types/Hoc";
import { newHoc } from "../utils/newHoc";

interface WithPickFn<PickNames extends string> extends Fn {
  return: Call<
    KeepNeversFn<PickFn<PickNames>>,
    {
      [K in Extract<this["arg0"], any[]>[0]]: [
        K,
        K extends PickNames
          ? Extract<this["arg0"], [K, any]>[1]
          : undefined extends Extract<this["arg0"], [K, any]>[1]
            ? Extract<this["arg0"], [K, any]>[1]
            : never,
      ];
    }[Extract<this["arg0"], any[]>[0]]
  >;
}

type WithPickHoc = <PickNames extends string>(
  pickNames: PickNames[],
) => Hoc<[WithPickFn<PickNames>]>;

/**
 * Pick, which is actually ignore other props
 *
 * @see {@link withOmit}
 * @example
 * const user = {
 *   username: "Some username",
 *   password: "s0m3 p4ssw0rd",
 *   vitalSecretInfo: "..."
 * };
 * function RevealInfo(
 *   { username, password, vitalSecretInfo }:
 *   { username: string; password?: string; vitalSecretInfo: string }
 * ) {
 *   ...
 * }
 * const SafeRevealInfo = withPick(["username"])(RevealInfo);
 * <SafeRevealInfo {...user} />
 * // is equivalent to
 * <RevealInfo username={user.username} /> // password and vitalSecretInfo is not included
 */
export const withPick = newHoc<WithPickHoc>(function withPick(
  Component: ComponentType,
  pickNames: string[],
): FunctionComponent {
  const pickSet = new Set(pickNames);

  return function WithPick(props: any): JSX.Element {
    const newProps = { ...props };
    for (const key in newProps) {
      if (!pickSet.has(key) && key in newProps) {
        delete newProps[key];
      }
    }

    return <Component {...newProps} />;
  };
});
