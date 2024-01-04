import { ComponentType, FunctionComponent } from "react";
import { Fn } from "../../types/Fn";
import { Hoc } from "../../types/Hoc";
import { createHocNameFunction } from "../../utils/hocNameForWithStyle";
import { newHoc } from "../../utils/newHoc";

interface WithRenameFn<NewProp extends string, OldProp extends string>
  extends Fn {
  return: [OldProp, any] extends this["arg0"]
    ?
        | Exclude<this["arg0"], [OldProp, any]>
        | [NewProp, Extract<this["arg0"], [OldProp, any]>[1]]
    : this["arg0"];
}

type WithRenameHoc = <NewProp extends string, OldProp extends string>(
  newProp: NewProp,
  oldProp: OldProp,
) => Hoc<[WithRenameFn<NewProp, OldProp>]>;

export const withRenameSingle = newHoc<WithRenameHoc>(
  createHocNameFunction(
    (newProp: string, oldProp: string) => `${newProp}→${oldProp}`,
  ),
  function withRename(
    Component: ComponentType,
    newProp: string,
    oldProp: string,
  ): FunctionComponent {
    return function WithRename(props: any): JSX.Element {
      const newProps = { ...props };
      if (newProp in newProps) {
        newProps[oldProp] = newProps[newProp];
        delete newProps[newProp];
      }

      return <Component {...newProps} />;
    };
  },
);
