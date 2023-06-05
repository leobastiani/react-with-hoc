import { Objects } from "hotscript";
import { ComponentType, FunctionComponent } from "react";
import { Hoc } from "./Hoc";
import { newHoc } from "./newHoc";

type WithPickHoc = <PickNames extends string>(
  pickNames: PickNames[]
) => Hoc<Objects.Pick<PickNames>>;

export const withPick = newHoc(function withPick(
  Component: ComponentType,
  pickNames: string[]
): FunctionComponent {
  const pickSet = new Set(pickNames);

  return function WithPick(props: any): JSX.Element {
    for (const key in props) {
      if (!pickSet.has(key) && key in props) {
        delete props[key];
      }
    }

    return <Component {...props} />;
  };
}) as WithPickHoc;
