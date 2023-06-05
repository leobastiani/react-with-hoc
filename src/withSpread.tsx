import { ComponentType, FunctionComponent } from "react";
import { DestructuringObject } from "./@types/DestructuringObject";
import { SimplifyComponentProps } from "./@types/NormalizeObject";
import { newHoc } from "./newHoc";
import { render } from "./render";

// TODO: if a component should have "a", "b" and "c" properties, if I use withSpread and set an object with "a" and "b", the final Component should require "c"

interface WithObjectHoc {
  <Props extends {}, Key extends string>(key: Key): <
    ClosureProps extends Props
  >(
    Component: ComponentType<ClosureProps>
  ) => FunctionComponent<
    SimplifyComponentProps<DestructuringObject<ClosureProps, Key>>
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

  return newHoc(withSpread) as WithObjectHoc;
})();
