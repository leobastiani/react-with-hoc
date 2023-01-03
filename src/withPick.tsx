import { ComponentType, FunctionComponent } from "react";
import { ClosurePick } from "./@types/ClosurePick";
import { NormalizeObject } from "./@types/NormalizeObject";
import { newHocNamedWithProps } from "./newHoc";
import { render } from "./render";

interface WithPickHoc {
  <Props extends {}, PickNames extends readonly string[]>(
    pickNames: PickNames
  ): <ClosureProps extends Props>(
    Component: ComponentType<ClosureProps>
  ) => FunctionComponent<NormalizeObject<ClosurePick<ClosureProps, PickNames>>>;
}

export const withPick = ((): WithPickHoc => {
  function withPick(
    Component: ComponentType,
    pickNames: string[]
  ): FunctionComponent {
    function WithPick(props: any): JSX.Element {
      const pickSet = new Set(pickNames);
      for (const key in props) {
        if (!pickSet.has(key) && key in props) {
          delete props[key];
        }
      }

      return render(Component, props);
    }
    return WithPick;
  }

  return newHocNamedWithProps(withPick) as WithPickHoc;
})();
