import React, { ComponentType, FunctionComponent } from "react";
import { Call, Fn, KeepNeversFn, OmitFn } from "../types/Fn";
import { Hoc } from "../types/Hoc";
import { newHoc } from "../utils/newHoc";

interface WithOmitFn<OmitNames extends string> extends Fn {
  return: Call<
    KeepNeversFn<OmitFn<OmitNames>>,
    {
      [K in Extract<this["arg0"], any[]>[0]]: [
        K,
        K extends OmitNames
          ? undefined extends Extract<this["arg0"], [K, any]>[1]
            ? Extract<this["arg0"], [K, any]>[1]
            : never
          : Extract<this["arg0"], [K, any]>[1],
      ];
    }[Extract<this["arg0"], any[]>[0]]
  >;
}

type WithOmitHoc = <OmitNames extends string>(
  omitNames: OmitNames[],
) => Hoc<[WithOmitFn<OmitNames>]>;

/**
 * Omit, which is actually ignore mentioned props
 *
 * @see {@link withPick}
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
 * const SafeRevealInfo = withOmit(["password"])(RevealInfo);
 * <SafeRevealInfo {...user} />
 * // is equivalent to
 * <RevealInfo username={user.username} vitalSecretInfo={user.vitalSecretInfo} /> // password is not included, but you can still see vitalSecretInfo
 */
export const withOmit = newHoc<WithOmitHoc>(function withOmit(
  Component: ComponentType,
  omitNames: string[],
): FunctionComponent {
  const omitSet = new Set(omitNames);

  return function WithOmit(props: any): JSX.Element {
    const newProps = { ...props };
    for (const key in newProps) {
      if (omitSet.has(key)) {
        delete newProps[key];
      }
    }

    return <Component {...newProps} />;
  };
});
