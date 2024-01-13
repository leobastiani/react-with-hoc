import React, { ComponentType } from "react";

type WithComponents<
  Components extends Record<string, ComponentType<any>>,
  T,
> = {
  [K in keyof Components]: Components[K];
};

declare const Avatar: React.FunctionComponent<{
  size: number;
  fontSize: number;
  background: string | boolean;
  sharp?: boolean;
}>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function addComponents<
  const Components extends Record<string, ComponentType<any>>,
  T,
  NewComponents = WithComponents<Components, T>,
>(
  components: Components,
  getComponent: (components: NewComponents) => ComponentType<T>,
) {
  return getComponent(components as any);
}

export const Profile = addComponents({ Avatar }, ({ Avatar }) => {
  const Profile: React.FunctionComponent<{
    fontSize: number | string;
    background: string;
  }> = ({ fontSize }) => {
    return (
      <div>
        <Avatar size={10} fontSize={20} background="red" />
        Profile: {fontSize}
      </div>
    );
  };

  return Profile;
});
