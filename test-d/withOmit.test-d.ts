import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { withOmit } from "../src/withOmit";

{
  // with empty list

  const BeforeHoc: React.FC<{
    a: string;
    b: number;
    c: boolean;
  }> = undefined as any;
  const AfterHoc = withOmit([])(BeforeHoc);
  expectType<
    FunctionComponent<{
      a: string;
      b: number;
      c: boolean;
    }>
  >(AfterHoc);
}

{
  // with elements outside of the list

  const BeforeHoc: React.FC<{
    a: string;
    b: number;
    c: boolean;
  }> = undefined as any;
  const AfterHoc = withOmit(["d"])(BeforeHoc);
  expectType<
    FunctionComponent<{
      a: string;
      b: number;
      c: boolean;
    }>
  >(AfterHoc);
}

{
  // with elements inside the list

  const BeforeHoc: React.FC<{
    a: string;
    b: number;
    c: boolean;
  }> = undefined as any;
  const AfterHoc = withOmit(["a", "b"])(BeforeHoc);
  expectType<FunctionComponent<{ c: boolean }>>(AfterHoc);
}

{
  // with elements inside and outside of the list

  const BeforeHoc: React.FC<{
    a: string;
    b: number;
    c: boolean;
  }> = undefined as any;
  const AfterHoc = withOmit(["a", "b", "d"])(BeforeHoc);
  expectType<
    FunctionComponent<{
      c: boolean;
    }>
  >(AfterHoc);
}
