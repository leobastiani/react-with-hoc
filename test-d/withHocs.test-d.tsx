import { ComponentType, FunctionComponent } from "react";
import { expectType } from "tsd";
import { withHocs } from "../src/withHocs";
import { withState } from "../src/withState";

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
      someStateOne?: number;
      setSomeStateOne?: React.Dispatch<React.SetStateAction<number>>;
      someStateTwo?: number;
      setSomeStateTwo?: React.Dispatch<React.SetStateAction<number>>;
      oldProp: string;
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
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    (C: ComponentType<any>) => withNotStdHoc(C),
  ])(BeforeHoc);
  expectType<
    FunctionComponent<{
      someStateOne?: number;
      setSomeStateOne?: React.Dispatch<React.SetStateAction<number>>;
      someStateTwo?: number;
      setSomeStateTwo?: React.Dispatch<React.SetStateAction<number>>;
      oldProp: string;
    }>
  >(AfterHoc);
}
