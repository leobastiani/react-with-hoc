import { Objects } from "hotscript";
import { ComponentType, FunctionComponent } from "react";
import { Hoc } from "./Hoc";
import { newHoc } from "./newHoc";

type WithOmitHoc = <OmitNames extends string>(
  omitNames: OmitNames[]
) => Hoc<Objects.Omit<OmitNames>>;

export const withOmit = newHoc(function withOmit(
  Component: ComponentType,
  omitNames: string[]
): FunctionComponent {
  const omitSet = new Set(omitNames);

  return function WithOmit(props: any): JSX.Element {
    for (const key in props) {
      if (omitSet.has(key)) {
        delete props[key];
      }
    }

    return <Component {...props} />;
  };
}) as WithOmitHoc;
