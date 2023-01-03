import { ComponentType, FunctionComponent } from "react";
import { DestructuringObject } from "./@types/DestructuringObject";
import { NormalizeObject } from "./@types/NormalizeObject";
import { newHocNamedWithProps } from "./newHoc";
import { render } from "./render";

interface WithObjectHoc {
  <Props extends {}, Key extends string>(key: Key): <
    ClosureProps extends Props
  >(
    Component: ComponentType<ClosureProps>
  ) => FunctionComponent<
    NormalizeObject<DestructuringObject<ClosureProps, Key>>
  >;
}

export const withSpread = ((): WithObjectHoc => {
  function withSpread(
    Component: ComponentType,
    key: string
  ): FunctionComponent {
    function WithObject(props: any): JSX.Element {
      const newProps: any = {
        ...props[key],
        ...props,
      };

      return render(Component, newProps);
    }
    return WithObject;
  }

  return newHocNamedWithProps(withSpread) as WithObjectHoc;
})();
