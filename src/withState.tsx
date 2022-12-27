import {
  ComponentType,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useState,
} from "react";
import { camelCase } from "./camelCase";
import { newHocNamedWithProps } from "./newHoc";
import { render } from "./render";

interface WithStateHoc {
  <
    PropValue,
    StateName extends string,
    SetterName extends string = CamelCase<`set_${StateName}`>,
    Props extends {} = {}
  >(
    stateName: StateName,
    {
      init,
      setterName,
    }?: {
      init?: Exclude<PropValue, Function> | ((props: Props) => PropValue);
      setterName?: SetterName;
    }
  ): <ClosureProps extends Props>(
    Component: ComponentType<ClosureProps>
  ) => FunctionComponent<
    ClosurePartial<
      Merge<
        ClosureProps,
        {
          [k in StateName]: PropValue;
        } & {
          [k in SetterName]: Dispatch<SetStateAction<PropValue>>;
        }
      >,
      [StateName, SetterName]
    >
  >;
}

export const withState = ((): WithStateHoc => {
  function withState(
    Component: ComponentType,
    stateName: string,
    { init, setterName = camelCase(["set", stateName]) }: any = {}
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

  return newHocNamedWithProps(withState) as WithStateHoc;
})();
