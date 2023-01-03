import { ComponentType, FunctionComponent } from "react";
import { ClosureRename } from "./@types/ClosureRename";
import { NormalizeObject } from "./@types/NormalizeObject";
import { newHoc } from "./newHoc";
import { render } from "./render";

interface WithRenameHoc {
  <Props extends {}, From extends string, To extends string>(
    from: From,
    to: To
  ): <ClosureProps extends Props>(
    Component: ComponentType<ClosureProps>
  ) => FunctionComponent<
    NormalizeObject<ClosureRename<ClosureProps, From, To>>
  >;
}

export const withRename = ((): WithRenameHoc => {
  function withRename(
    Component: ComponentType,
    from: string,
    to: string
  ): FunctionComponent {
    function WithRename(props: any): JSX.Element {
      const newProps: any = { ...props };
      newProps[to] = newProps[from];
      if (from in newProps) {
        delete newProps[from];
      }

      return render(Component, newProps);
    }
    return WithRename;
  }

  return newHoc(withRename, {
    dot(_Component, from, to) {
      return `${from}=>${to}`;
    },
  }) as WithRenameHoc;
})();
