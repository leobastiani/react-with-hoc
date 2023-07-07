import { ComponentType, FunctionComponent } from "react";
import { OmitFn } from "./Fn";
import { Hoc } from "./Hoc";
import { newHoc } from "./newHoc";

type WithOmitHoc = <OmitNames extends string>(
  omitNames: OmitNames[]
) => Hoc<[OmitFn<OmitNames>]>;

export const withOmit = newHoc(function withOmit(
  Component: ComponentType,
  omitNames: string[]
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
}) as WithOmitHoc;
