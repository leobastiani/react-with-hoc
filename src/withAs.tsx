import { ComponentType, FunctionComponent } from "react";
import { ClosureOmit } from "./@types/ClosureOmit";
import { NormalizeObject } from "./@types/NormalizeObject";
import { SpreadObject } from "./@types/SpreadObject";
import { newHocNamedWithProps } from "./newHoc";
import { render } from "./render";

interface WithAsHoc {
  <Props extends {}>(defaultComponent: string): <ClosureProps extends Props>(
    Component: ComponentType<ClosureProps>
  ) => FunctionComponent<
    NormalizeObject<
      ClosureOmit<
        SpreadObject<ClosureProps, { as?: React.ElementType }>,
        ["Component"]
      >
    >
  >;
}

export const withAs = ((): WithAsHoc => {
  function withAs(
    Component: ComponentType,
    defaultComponent: string
  ): FunctionComponent {
    function WithAs(props: any): JSX.Element {
      if (props.as) {
        const { as, ...rest } = props;
        return render(Component, rest, { Component: as });
      }
      return render(Component, props, { Component: defaultComponent });
    }
    return WithAs;
  }

  return newHocNamedWithProps(withAs) as WithAsHoc;
})();
