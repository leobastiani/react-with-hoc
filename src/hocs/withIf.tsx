import React, { ComponentType, FunctionComponent, useMemo } from "react";
import { DependencyNames } from "../types/DependencyNames";
import { Fn, IntersectionFn, ToSchema } from "../types/Fn";
import { Hoc } from "../types/Hoc";
import { newHoc } from "../utils/newHoc";

interface WithIfFn<PropName extends string, PropValue> extends Fn {
  return: [PropName, any] extends this["arg0"]
    ? this["arg0"]
    : this["arg0"] | [PropName, PropValue];
}

interface WithIfHoc {
  <PropName extends string, PropValue = unknown>(
    propName: PropName,
    options?: {
      Else?: ComponentType<any>;
    },
  ): Hoc<[WithIfFn<PropName, PropValue>]>;

  <
    DependencyProps extends {},
    TDependencyNames extends
      DependencyNames<DependencyProps> = DependencyNames<DependencyProps>,
  >(
    factory: (props: DependencyProps) => any,
    options: {
      Else?: ComponentType<any>;
      dependencyNames: TDependencyNames;
    },
  ): Hoc<[IntersectionFn<ToSchema<DependencyProps>>]>;
}

/**
 * renders conditionally
 * @example
 * const AdminDashboard: React.FC = () => {
 *   return <>...</>
 * }
 * const SafeAdminDashboard = withIf<"isAdmin", boolean>("isAdmin")(AdminDashboard)
 *
 * // renders <AdminDashboard />
 * <SafeAdminDashboard isAdmin={true} />
 *
 * // renders null
 * <SafeAdminDashboard isAdmin={false} />
 *
 * @example
 * const HappyScreen: React.FC = () => {
 *   return <>...</>
 * }
 * const BlueErrorScreen: React.FC = () => {
 *   return <>...</>
 * }
 * const NewComponent = withIf("error", {
 *   Else: BlueErrorScreen
 * })(HappyScreen)
 *
 * // renders <HappyCase />
 * <NewComponent error={null} />
 *
 * // renders <BlueErrorScreen />
 * <NewComponent error={new Error("some error")} />
 *
 * @example
 * type HappinessLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
 * const HappyScreen: React.FC = () => {
 *   return <>...</>
 * }
 * const SadScreen: React.FC = () => {
 *   return <>...</>
 * }
 * const MoodScreen = withIf<{ happinessLevel: HappinessLevel }>(
 *   ({ happinessLevel }) => happinessLevel >= 5,
 *   {
 *     dependencyNames: ["happinessLevel"],
 *     Else: SadScreen,
 *   },
 * )(HappyScreen);
 *
 * // renders <HappyScreen />
 * <MoodScreen happinessLevel={10} />
 *
 * // renders <SadScreen />
 * <MoodScreen happinessLevel={3} />
 */
export const withIf = newHoc<WithIfHoc>(function withIf(
  Component: ComponentType<any>,
  propNameOrFactory: string | Function,
  {
    dependencyNames,
    Else,
  }: {
    dependencyNames?: string[];
    Else?: ComponentType<any>;
  } = {},
): FunctionComponent {
  if (process.env.NODE_ENV !== "production") {
    if (typeof propNameOrFactory === "function" && !dependencyNames) {
      throw new Error(
        "withIf with function should have dependencyNames assigned",
      );
    }
  }

  return function WithIf(props: any): JSX.Element {
    let condition: boolean;
    if (typeof propNameOrFactory === "string") {
      condition = props[propNameOrFactory];
    } else {
      // is function

      condition = useMemo(
        () => propNameOrFactory(props),

        dependencyNames!.map((key) => props[key]),
      );
    }

    if (condition) {
      return <Component {...props} />;
    } else {
      if (Else) {
        return <Else {...props} />;
      }
      // @ts-expect-error null is valid
      return null;
    }
  };
});
