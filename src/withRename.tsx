import { Fn } from "hotscript";
import { ComponentType, FunctionComponent } from "react";
import { OptionalKeysOf, SetOptional } from "type-fest";
import { Hoc } from "./Hoc";
import { newHoc } from "./newHoc";

interface WithRenameFn<NewProp extends string, OldProp extends string>
  extends Fn {
  return: OldProp extends keyof this["arg0"]
    ? SetOptional<
        {
          [K in NewProp]: this["arg0"][OldProp];
        },
        OldProp extends OptionalKeysOf<this["arg0"]> ? NewProp : never
      > &
        Omit<this["arg0"], OldProp>
    : this["arg0"];
}

interface WithRenameHoc {
  <NewProp extends string, OldProp extends string>(
    newProp: NewProp,
    oldProp: OldProp
  ): Hoc<WithRenameFn<NewProp, OldProp>>;
}

export const withRename = newHoc(function withRename(
  Component: ComponentType,
  newProp: string,
  oldProp: string
): FunctionComponent {
  return function WithRename(props: any): JSX.Element {
    props[oldProp] = props[newProp];
    if (newProp in props) {
      delete props[newProp];
    }

    return <Component {...props} />;
  };
}) as WithRenameHoc;
