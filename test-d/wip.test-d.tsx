import React, { ComponentProps, ComponentType, FunctionComponent } from "react";
import { Simplify } from "../src";

type Mix<P, T> = {
  [K in keyof P as K extends keyof T
    ? T[K] extends P[K]
      ? never
      : K
    : K]: P[K];
};

type WithComponents<
  Components extends Record<string, ComponentType<any>>,
  T,
> = {
  [K in keyof Components]: ComponentType<
    Simplify<Mix<ComponentProps<Components[K]>, T>>
  >;
};

declare const Avatar: React.FunctionComponent<{
  size: number;
  fontSize: number;
  background: string | boolean;
  darkMode: boolean;
  sharp?: boolean;
}>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function addComponents<T>(): <
  Components extends Record<string, ComponentType<any>>,
>(
  components: Components,
  getComponent: FunctionComponent<T & WithComponents<Components, T>>,
) => ComponentType<Simplify<Omit<T, "fontSize">>> {
  throw new Error("never");
}

export const Profile = addComponents<{
  fontSize: number | string;
  background: string;
  darkMode: boolean;
  sharp?: string;
}>()({ Avatar }, function Profile({ fontSize, background, Avatar }) {
  return (
    <div>
      <Avatar fontSize={20} size={100} />
      Profile
    </div>
  );
});
