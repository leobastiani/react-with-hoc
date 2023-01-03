import { ComponentType, FunctionComponent } from "react";
import { BaseProperties } from "./@types/BaseProperties";
import { ClosurePartial } from "./@types/ClosurePartial";
import { Merge } from "./@types/Merge";
import { NormalizeObject } from "./@types/NormalizeObject";
import { newHocNamedWithProps } from "./newHoc";
import { render } from "./render";

interface WithProps {
  <Map extends Record<string, unknown>, Props extends {} = {}>(map: Map): <
    ClosureProps extends Props
  >(
    Component: ComponentType<ClosureProps>
  ) => FunctionComponent<
    NormalizeObject<
      BaseProperties<
        ClosurePartial<Merge<ClosureProps, Map>, Extract<keyof Map, string>>
      >
    >
  >;
}

export const withProps = ((): WithProps => {
  function withProps<Props extends {}, Map extends object>(
    Component: ComponentType<Props>,
    map: Map
  ): FunctionComponent<any> {
    function WithProps<ClosureProps extends Props>(
      props: ClosureProps
    ): JSX.Element {
      return render(Component, map, props);
    }
    return WithProps;
  }

  return newHocNamedWithProps(withProps) as WithProps;
})();
