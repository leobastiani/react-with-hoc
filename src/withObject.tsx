import { ComponentType, FunctionComponent } from "react";
import { newHocNamedWithProps } from "./newHoc";
import { render } from "./render";

interface WithObjectHoc {
  <Props extends {}, Key extends string>(key: Key): <
    ClosureProps extends Props
  >(
    Component: ComponentType<ClosureProps>
  ) => FunctionComponent<DestructuringObject<ClosureProps, Key>>;
}

export const withObject = ((): WithObjectHoc => {
  function withObject(
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

  return newHocNamedWithProps(withObject) as WithObjectHoc;
})();
