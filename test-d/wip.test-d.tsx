import React, { ComponentProps, ComponentType, FunctionComponent } from "react";
import { Simplify } from "../src";

type WithComponents<
  Components extends Record<string, ComponentType<any>>,
  T,
> = {
  [K in keyof Components]: ComponentType<
    Simplify<ComponentProps<Components[K]>>
  >;
};

declare const Avatar: React.FunctionComponent<{
  size: number;
  fontSize: number;
  background: string | boolean;
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
}>()({ Avatar }, function Profile({ fontSize, background, Avatar }) {
  return (
    <div>
      <Avatar background={background} fontSize={20} size={100} sharp />
      Profile
    </div>
  );
});
