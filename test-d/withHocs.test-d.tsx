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
  const arr = [
    withState<number, "a0">("a0"),
    withState<number, "a1">("a1"),
    withState<number, "a2">("a2"),
    withState<number, "a3">("a3"),
    withState<number, "a4">("a4"),
    withState<number, "a5">("a5"),
    withState<number, "a6">("a6"),
    withState<number, "a7">("a7"),
    withState<number, "a8">("a8"),
    withState<number, "a9">("a9"),
    withState<number, "a10">("a10"),
    withState<number, "a11">("a11"),
    withState<number, "a12">("a12"),
    withState<number, "a13">("a13"),
    withState<number, "a14">("a14"),
    withState<number, "a15">("a15"),
    withState<number, "a16">("a16"),
    withState<number, "a17">("a17"),
    withState<number, "a18">("a18"),
    withState<number, "a19">("a19"),
    withState<number, "a19">("a19"),
    withState<number, "a19">("a19"),
    withState<number, "a19">("a19"),
    withState<number, "a19">("a19"),
    withState<number, "a20">("a20"),
    withState<number, "a0">("a0"),
    withState<number, "a1">("a1"),
    withState<number, "a2">("a2"),
    withState<number, "a3">("a3"),
    withState<number, "a4">("a4"),
    withState<number, "a5">("a5"),
    withState<number, "a6">("a6"),
    withState<number, "a7">("a7"),
    withState<number, "a8">("a8"),
    withState<number, "a9">("a9"),
    withState<number, "a10">("a10"),
    withState<number, "a11">("a11"),
    withState<number, "a12">("a12"),
    withState<number, "a13">("a13"),
    withState<number, "a14">("a14"),
    withState<number, "a15">("a15"),
    withState<number, "a16">("a16"),
    withState<number, "a17">("a17"),
    withState<number, "a18">("a18"),
    withState<number, "a19">("a19"),
    withState<number, "a19">("a19"),
    withState<number, "a19">("a19"),
    withState<number, "a19">("a19"),
    withState<number, "a19">("a19"),
    withState<number, "a20">("a20"),
    withState<number, "a0">("a0"),
    withState<number, "a1">("a1"),
    withState<number, "a2">("a2"),
    withState<number, "a3">("a3"),
    withState<number, "a4">("a4"),
    withState<number, "a5">("a5"),
    withState<number, "a6">("a6"),
    withState<number, "a7">("a7"),
    withState<number, "a8">("a8"),
    withState<number, "a9">("a9"),
    withState<number, "a10">("a10"),
    withState<number, "a11">("a11"),
    withState<number, "a12">("a12"),
    withState<number, "a13">("a13"),
    withState<number, "a14">("a14"),
    withState<number, "a15">("a15"),
    withState<number, "a16">("a16"),
    withState<number, "a17">("a17"),
    withState<number, "a18">("a18"),
    withState<number, "a19">("a19"),
    withState<number, "a19">("a19"),
    withState<number, "a19">("a19"),
    withState<number, "a19">("a19"),
    withState<number, "a19">("a19"),
    withState<number, "a20">("a20"),
    withState<number, "a0">("a0"),
    withState<number, "a1">("a1"),
    withState<number, "a2">("a2"),
    withState<number, "a3">("a3"),
    withState<number, "a4">("a4"),
    withState<number, "a5">("a5"),
    withState<number, "a6">("a6"),
    withState<number, "a7">("a7"),
    withState<number, "a8">("a8"),
    withState<number, "a9">("a9"),
    withState<number, "a10">("a10"),
    withState<number, "a11">("a11"),
    withState<number, "a12">("a12"),
    withState<number, "a13">("a13"),
    withState<number, "a14">("a14"),
    withState<number, "a15">("a15"),
    withState<number, "a16">("a16"),
    withState<number, "a17">("a17"),
    withState<number, "a18">("a18"),
    withState<number, "a19">("a19"),
    withState<number, "a19">("a19"),
    withState<number, "a19">("a19"),
    withState<number, "a19">("a19"),
    withState<number, "a19">("a19"),
    withState<number, "a20">("a20"),
  ] as const;
  const AfterHoc = withHocs<typeof arr>(arr)(BeforeHoc);
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
