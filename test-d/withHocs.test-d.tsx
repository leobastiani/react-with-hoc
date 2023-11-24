import { ComponentType, FunctionComponent } from "react";
import { expectType } from "tsd";
import { withHocs, withState } from "../src";

{
  // matches requirements

  const BeforeHoc: React.FC<{
    someStateOne: number;
    setSomeStateOne: React.Dispatch<React.SetStateAction<number>>;
    someStateTwo: number;
    setSomeStateTwo: React.Dispatch<React.SetStateAction<number>>;
    oldProp: string;
  }> = undefined as any;
  const AfterHoc = withHocs([
    withState<number, "someStateOne">("someStateOne"),
    withState<number, "someStateTwo">("someStateTwo"),
  ])(BeforeHoc);
  expectType<
    FunctionComponent<{
      oldProp: string;
      someStateOne?: number;
      setSomeStateOne?: React.Dispatch<React.SetStateAction<number>>;
      someStateTwo?: number;
      setSomeStateTwo?: React.Dispatch<React.SetStateAction<number>>;
    }>
  >(AfterHoc);
}

{
  // used with no standard hoc

  const BeforeHoc: React.FC<{
    someStateOne: number;
    setSomeStateOne: React.Dispatch<React.SetStateAction<number>>;
    someStateTwo: number;
    setSomeStateTwo: React.Dispatch<React.SetStateAction<number>>;
    oldProp: string;
  }> = undefined as any;
  const withNotStdHoc: (Component: ComponentType<any>) => ComponentType<any> =
    undefined as any;
  const AfterHoc = withHocs([
    withState<number, "someStateOne">("someStateOne"),
    withState<number, "someStateTwo">("someStateTwo"),
    withNotStdHoc,
    withHocs([withState<number, "someStateThree">("someStateThree")]),
  ])(BeforeHoc);
  expectType<
    FunctionComponent<{
      someStateOne?: number;
      setSomeStateOne?: React.Dispatch<React.SetStateAction<number>>;
      someStateTwo?: number;
      setSomeStateTwo?: React.Dispatch<React.SetStateAction<number>>;
      someStateThree?: number;
      setSomeStateThree?: React.Dispatch<React.SetStateAction<number>>;
      oldProp: string;
    }>
  >(AfterHoc);
}
