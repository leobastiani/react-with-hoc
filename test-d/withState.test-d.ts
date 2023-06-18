import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { withState } from "../src/withState";

{
  // adds new state with oldProp as optional

  const BeforeHoc: React.FC<{
    someState: number;
    setSomeState: React.Dispatch<React.SetStateAction<number>>;
    oldProp: string;
    oldPropOptional?: symbol;
  }> = undefined as any;
  const AfterHoc = withState<number, "someState">("someState")(BeforeHoc);
  expectType<
    FunctionComponent<{
      someState?: number;
      setSomeState?: React.Dispatch<React.SetStateAction<number>>;
      oldProp: string;
      oldPropOptional?: symbol;
    }>
  >(AfterHoc);
}

{
  // adds new state with oldProp as required

  const BeforeHoc: React.FC<{
    someState: number;
    setSomeState: React.Dispatch<React.SetStateAction<number>>;
    oldProp: string;
    oldPropOptional?: symbol;
  }> = undefined as any;
  const AfterHoc = withState<number, "someState">("someState")(BeforeHoc);
  expectType<
    FunctionComponent<{
      someState?: number;
      setSomeState?: React.Dispatch<React.SetStateAction<number>>;
      oldProp: string;
      oldPropOptional?: symbol;
    }>
  >(AfterHoc);
}

{
  // with previous propValue but different kind

  const BeforeHoc: React.FC<{
    someState: string;
    setSomeState: React.Dispatch<React.SetStateAction<string>>;
    oldProp: string;
    oldPropOptional?: symbol;
  }> = undefined as any;
  const AfterHoc = withState<number, "someState">("someState")(BeforeHoc);
  expectType<
    FunctionComponent<{
      someState?: string | number;
      setSomeState?:
        | React.Dispatch<React.SetStateAction<number>>
        | React.Dispatch<React.SetStateAction<string>>;
      oldProp: string;
      oldPropOptional?: symbol;
    }>
  >(AfterHoc);
}
