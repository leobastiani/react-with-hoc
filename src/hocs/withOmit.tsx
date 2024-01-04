import React from "react";
import { ComponentType, FunctionComponent } from "react";
import { OmitFn } from "../types/Fn";
import { Hoc } from "../types/Hoc";
import { newHoc } from "../utils/newHoc";

type WithOmitHoc = <OmitNames extends string>(
  omitNames: OmitNames[],
) => Hoc<[OmitFn<OmitNames>]>;

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
