import { Fn } from "hotscript";
import { ComponentType, FunctionComponent } from "react";
import { Hoc } from "./Hoc";
import { newHoc } from "./newHoc";

interface PickFn<Names extends string> extends Fn {
  return: Pick<this["arg0"], Extract<Names, keyof this["arg0"]>>;
}

type WithPickHoc = <PickNames extends string>(
  pickNames: PickNames[]
) => Hoc<PickFn<PickNames>>;

export const withPick = newHoc(function withPick(
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
}) as WithPickHoc;
