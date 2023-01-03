import { ComponentType, FunctionComponent } from "react";
import { ClosureRenames } from "./@types/ClosureRenames";
import { NormalizeObject } from "./@types/NormalizeObject";
import { newHoc } from "./newHoc";
import { render } from "./render";

interface WithRenameHoc {
  <Props extends {}, Map extends Readonly<Record<string, string>>>(map: Map): <
    ClosureProps extends Props
  >(
    Component: ComponentType<ClosureProps>
  ) => FunctionComponent<NormalizeObject<ClosureRenames<ClosureProps, Map>>>;
}

export const withRenames = ((): WithRenameHoc => {
  function withRenames(
    Component: ComponentType,
    map: Record<string, string>
  ): FunctionComponent {
    function WithRename(props: any): JSX.Element {
      const newProps: any = { ...props };
      for (const from in map) {
        const to = map[from];
        newProps[to] = newProps[from];
        if (from in newProps) {
          delete newProps[from];
        }
      }

      return render(Component, newProps);
    }
    return WithRename;
  }

  return newHoc(withRenames, {
    dot(_Component, map) {
      return Object.entries(map)
        .map(([from, to]) => `${from}→${to}`)
        .join(".");
    },
  }) as WithRenameHoc;
})();
