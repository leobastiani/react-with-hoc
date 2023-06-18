import { ComponentType, FunctionComponent } from "react";
import { expectError, expectType } from "tsd";
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
  const AfterHoc = withHocs(
    withState<number, "someStateOne">("someStateOne"),
    withState<number, "someStateTwo">("someStateTwo")
  )(BeforeHoc);
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
  const AfterHoc = withHocs(
    withState<number, "someStateOne">("someStateOne"),
    withState<number, "someStateTwo">("someStateTwo"),
    (C: ComponentType<any>) => withNotStdHoc(C)
  )(BeforeHoc);
  expectType<
    FunctionComponent<{
      someStateOne?: number;
      setSomeStateOne?: React.Dispatch<React.SetStateAction<number>>;
      someStateTwo?: number;
      setSomeStateTwo?: React.Dispatch<React.SetStateAction<number>>;
      oldProp: string;
    }>
  >(AfterHoc);

  const DoesNotMatchRequirementHoc: React.FC<{
    // someStateOne: number;
    setSomeStateOne: React.Dispatch<React.SetStateAction<number>>;
    someStateTwo: number;
    setSomeStateTwo: React.Dispatch<React.SetStateAction<number>>;
    oldProp: string;
  }> = undefined as any;
  expectError(
    withHocs(
      withState<number, "someStateOne">("someStateOne"),
      withState<number, "someStateTwo">("someStateTwo"),
      (C: ComponentType<any>) => withNotStdHoc(C)
    )(DoesNotMatchRequirementHoc)
  );
}
