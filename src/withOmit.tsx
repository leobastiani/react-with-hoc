import { ComponentType, FunctionComponent } from "react";
import { ClosureOmit } from "./@types/ClosureOmit";
import { NormalizeObject } from "./@types/NormalizeObject";
import { newHoc } from "./newHoc";
import { render } from "./render";

interface WithOmitHoc {
  <Props extends {}, OmitNames extends readonly string[]>(
    omitNames: OmitNames
  ): <ClosureProps extends Props>(
    Component: ComponentType<ClosureProps>
  ) => FunctionComponent<NormalizeObject<ClosureOmit<ClosureProps, OmitNames>>>;
}

export const withOmit = ((): WithOmitHoc => {
  function withOmit(
    Component: ComponentType,
    omitNames: string[]
  ): FunctionComponent {
    function WithOmit(props: any): JSX.Element {
      const omitSet = new Set(omitNames);
      for (const key in props) {
        if (omitSet.has(key)) {
          delete props[key];
        }
      }

      return render(Component, props);
    }
    return WithOmit;
  }

  return newHoc(withOmit) as WithOmitHoc;
})();
