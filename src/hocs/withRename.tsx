import React, { ComponentType, FunctionComponent } from "react";
import { Fn } from "../types/Fn";
import { Hoc } from "../types/Hoc";
import { createHocNameFunction } from "../utils/hocNameForWithStyle";
import { newHoc } from "../utils/newHoc";

interface WithRenameFn<NewProp extends string, OldProp extends string>
  extends Fn {
  return: [OldProp, any] extends this["arg0"]
    ?
        | Exclude<this["arg0"], [OldProp, any]>
        | [NewProp, Extract<this["arg0"], [OldProp, any]>[1]]
    : this["arg0"];
}

type WithRenameHoc = <
  const NewProp extends string,
  const OldProp extends string,
>(
  /**
   * ```tsx
   * function Box({ handleClick }: { handleClick: () => void }) {
   *   ...
   * }
   * const NewBox = withRename("onClick", "handleClick")(Box);
   * //                         ↑ this will be the property
   * <NewBox onClick={() => {}} />
   * //      ↑ onClick is the new prop
   * // is equivalent to
   * <Box handleClick={() => {}} />
   * ```
   */
  newProp: NewProp,
  /**
   * ```tsx
   * function Box({ handleClick }: { handleClick: () => void }) {
   *   ...
   * }
   * const NewBox = withRename("onClick", "handleClick")(Box);
   * //                                    ↑ this is the old prop
   * <NewBox onClick={() => {}} />
   * // is equivalent to
   * <Box handleClick={() => {}} />
   * //   ↑ this is the old prop
   * ```
   */
  oldProp: OldProp,
) => Hoc<[WithRenameFn<NewProp, OldProp>]>;

/**
 * Make your component receive a new prop by renaming it.
 *
 * @see {@link withRenames}
 * @example
 * function Box({ handleClick }: { handleClick: () => void }) {
 *   ...
 * }
 * const NewBox = withRename("onClick", "handleClick")(Box);
 * <NewBox onClick={() => {}} />
 * // is equivalent to
 * <Box handleClick={() => {}} />
 */
export const withRename = newHoc<WithRenameHoc>(
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
