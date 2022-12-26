import { ComponentType, FunctionComponent } from "react";
import { newHocNamedWithProps } from "./newHoc";
import { render } from "./render";

interface WithPickHoc {
  <Props extends {}, PickNames extends string[]>(pickNames: PickNames): <
    ClosureProps extends Props
  >(
    Component: ComponentType<ClosureProps>
  ) => FunctionComponent<ClosurePick<ClosureProps, ["b"]>>;
}

export const withPick = ((): WithPickHoc => {
  function withPick(
    Component: ComponentType,
    pickNames: string[]
  ): FunctionComponent {
    function WithPick(props: any): JSX.Element {
      const newProps: any = {};
      for (const pickName of pickNames) {
        if (pickName in props) {
          newProps[pickName] = props[pickName];
        }
      }
      if ("key" in props) {
        newProps.key = props.key;
      }

      return render(Component, newProps);
    }
    return WithPick;
  }

  return newHocNamedWithProps(withPick) as WithPickHoc;
})();
