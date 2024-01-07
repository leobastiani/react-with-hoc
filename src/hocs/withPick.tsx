import React from "react";
import { ComponentType, FunctionComponent } from "react";
import { PickFn } from "../types/Fn";
import { Hoc } from "../types/Hoc";
import { newHoc } from "../utils/newHoc";

type WithPickHoc = <PickNames extends string>(
  pickNames: PickNames[],
) => Hoc<[PickFn<PickNames>]>;

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
