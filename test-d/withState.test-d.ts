import { FunctionComponent } from "react";
import { expectError, expectType } from "tsd";
import { withState } from "../src/withState";

{
  // adds new state with oldProp as optional

  const BeforeHoc: React.FC<{
    someState: number;
    setSomeState: React.Dispatch<React.SetStateAction<number>>;
    oldProp?: string;
  }> = undefined as any;
  const AfterHoc = withState<number, "someState">("someState")(BeforeHoc);
  expectType<
    FunctionComponent<{
      someState?: number;
      setSomeState?: React.Dispatch<React.SetStateAction<number>>;
      oldProp?: string;
    }>
  >(AfterHoc);
}

{
  // adds new state with oldProp as required

  const BeforeHoc: React.FC<{
    someState: number;
    setSomeState: React.Dispatch<React.SetStateAction<number>>;
    oldProp: string;
  }> = undefined as any;
  const AfterHoc = withState<number, "someState">("someState")(BeforeHoc);
  expectType<
    FunctionComponent<{
      someState?: number;
      setSomeState?: React.Dispatch<React.SetStateAction<number>>;
      oldProp: string;
    }>
  >(AfterHoc);
}

{
  // when it has previous setter

  const BeforeHoc: React.FC<{
    setSomeState: React.Dispatch<React.SetStateAction<number>>;
    oldProp: string;
  }> = undefined as any;
  expectError(withState<number, "someState">("someState")(BeforeHoc));
}

{
  // with previous propValue but different kind

  const BeforeHoc: React.FC<{
    someState: string;
    setSomeState: React.Dispatch<React.SetStateAction<string>>;
    oldProp: string;
  }> = undefined as any;
  // no error for string
  withState<string, "someState">("someState")(BeforeHoc);
  // error when using a different type
  expectError(withState<number, "someState">("someState")(BeforeHoc));
}
