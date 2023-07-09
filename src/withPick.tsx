import { ComponentType, FunctionComponent } from "react";
import { PickFn } from "./Fn";
import { Hoc } from "./Hoc";
import { newHoc } from "./newHoc";

type WithPickHoc = <PickNames extends string>(
  pickNames: PickNames[]
) => Hoc<[PickFn<PickNames>]>;

export const withPick = newHoc<WithPickHoc>(function withPick(
  Component: ComponentType,
  pickNames: string[]
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
