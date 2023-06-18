import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { withPick } from "../src/withPick";

{
  // with empty list

  const BeforeHoc: React.FC<{
    ignored: string;
    ignoredOptional?: number;
    included: boolean;
    includedOptional?: symbol;
  }> = undefined as any;
  const AfterHoc = withPick([])(BeforeHoc);
  expectType<FunctionComponent<{}>>(AfterHoc);
}

{
  // with elements outside of the list

  const BeforeHoc: React.FC<{
    ignored: string;
    ignoredOptional?: number;
    included: boolean;
    includedOptional?: symbol;
  }> = undefined as any;
  const AfterHoc = withPick(["a", "b", "c"])(BeforeHoc);
  expectType<FunctionComponent<{}>>(AfterHoc);
}

{
  // with elements inside the list

  const BeforeHoc: React.FC<{
    ignored: string;
    ignoredOptional?: number;
    included: boolean;
    includedOptional?: symbol;
  }> = undefined as any;
  const AfterHoc = withPick(["included", "includedOptional"])(BeforeHoc);
  expectType<
    FunctionComponent<{ included: boolean; includedOptional?: symbol }>
  >(AfterHoc);
}

{
  // with elements inside and outside of the list

  const BeforeHoc: React.FC<{
    ignored: string;
    ignoredOptional?: number;
    included: boolean;
    includedOptional?: symbol;
  }> = undefined as any;
  const AfterHoc = withPick([
    "ignored",
    "ignoredOptional",
    "included",
    "includedOptional",
  ])(BeforeHoc);
  expectType<
    FunctionComponent<{
      ignored: string;
      ignoredOptional?: number;
      included: boolean;
      includedOptional?: symbol;
    }>
  >(AfterHoc);
}
