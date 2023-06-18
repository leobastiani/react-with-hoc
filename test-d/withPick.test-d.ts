import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { withPick } from "../src/withPick";

{
  // with empty list

  const BeforeHoc: React.FC<{
    a: string;
    b: number;
    c: boolean;
  }> = undefined as any;
  const AfterHoc = withPick([])(BeforeHoc);
  expectType<FunctionComponent<{}>>(AfterHoc);
}

{
  // with elements outside of the list

  const BeforeHoc: React.FC<{
    a: string;
    b: number;
    c: boolean;
  }> = undefined as any;
  const AfterHoc = withPick(["d"])(BeforeHoc);
  expectType<FunctionComponent<{}>>(AfterHoc);
}

{
  // with elements inside the list

  const BeforeHoc: React.FC<{
    a: string;
    b: number;
    c: boolean;
  }> = undefined as any;
  const AfterHoc = withPick(["a", "b"])(BeforeHoc);
  expectType<FunctionComponent<{ a: string; b: number }>>(AfterHoc);
}

{
  // with elements inside and outside of the list

  const BeforeHoc: React.FC<{
    a: string;
    b: number;
    c: boolean;
  }> = undefined as any;
  const AfterHoc = withPick(["a", "b", "d"])(BeforeHoc);
  expectType<FunctionComponent<{ a: string; b: number }>>(AfterHoc);
}
