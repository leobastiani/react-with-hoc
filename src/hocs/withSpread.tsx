import React, { ComponentType, FunctionComponent } from "react";
import {
  Fn,
  FromSchema,
  IntersectionFn,
  Pipe,
  SetOptionalFn,
} from "../types/Fn";
import { Hoc } from "../types/Hoc";
import { newHoc } from "../utils/newHoc";

interface WithSpreadFn<PropName extends string, Names extends string>
  extends Fn {
  return: Pipe<
    this["arg0"],
    [
      IntersectionFn<
        [PropName, FromSchema<Extract<this["arg0"], [Names, any]>>]
      >,
      SetOptionalFn<Names>,
    ]
  >;
}

interface WithSpreadHoc {
  <PropName extends string, Names extends string>(
    propName: PropName,
  ): Hoc<[WithSpreadFn<PropName, Names>]>;
}

/**
 * Start receiving an object and spread all properties to Component
 *
 * @experimental It uses the same mechanism as {@link withDefaults} but it could also have the same mechanism as {@link withOverrides}
 *
 * @example
 * function Profile({ name, age, city }: {...}) {
 *   ...
 * }
 * const NewProfile = withSpread<"profile", "name" | "age" | "city">("profile")(Profile)
 * <NewProfile profile={{ name: "Some Name", age: 20, city: "Some City" }} />
 * // is equivalent to
 * <Profile name="Some Name" age={20} city="Some City" />
 */
export const withSpread = newHoc<WithSpreadHoc>(function withSpread(
  Component: ComponentType,
  key: string,
): FunctionComponent {
  return function WithObject(props: any): JSX.Element {
    const newProps: any = {
      ...props[key],
      ...props,
    };

    return <Component {...newProps} />;
  };
});
