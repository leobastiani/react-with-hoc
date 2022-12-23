import { ComponentType, FunctionComponent, useState } from "react";
import { camelCase } from "./camelCase";
import { newHocNamedWithProps } from "./newHoc";
import { render } from "./render";

interface WithState {
  <PropValue, Props extends {} = {}>(
    stateName: string,
    {
      init,
      setterName,
    }?: {
      init: Exclude<PropValue, Function> | ((props: Props) => PropValue);
      setterName: string;
    }
  ): <ClosureProps extends Props>(
    Component: ComponentType<ClosureProps>
  ) => FunctionComponent<ClosureProps>;
}

export const withState = ((): WithState => {
  function withState(
    Component: ComponentType,
    stateName: string,
    { init, setterName = camelCase(stateName) }: any = {}
  ): FunctionComponent {
    function WithState(props: any): JSX.Element {
      const [state, setState] = useState(init);

      return render(
        Component,
        {
          [stateName]: state,
          [setterName]: setState,
        },
        props
      );
    }
    return WithState;
  }

  return newHocNamedWithProps(withState) as WithState;
})();
