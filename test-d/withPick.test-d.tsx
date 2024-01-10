import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { withPick } from "../src";

/* with empty list */ {
  const BeforeHoc: React.FC<{
    ignored: string;
    ignoredOptional?: number;
    included: boolean;
    includedOptional?: symbol;
  }> = undefined as any;
  const AfterHoc = withPick([])(BeforeHoc);
  expectType<FunctionComponent<{ included: never; ignored: never }>>(AfterHoc);
}

/* with only unknown props */ {
  const BeforeHoc: React.FC<{
    ignored: string;
    ignoredOptional?: number;
    included: boolean;
    includedOptional?: symbol;
  }> = undefined as any;
  const AfterHoc = withPick(["a", "b", "c"])(BeforeHoc);
  expectType<FunctionComponent<{ included: never; ignored: never }>>(AfterHoc);
}

/* with half props and unknown props */ {
  const BeforeHoc: React.FC<{
    ignored: string;
    ignoredOptional?: number;
    included: boolean;
    includedOptional?: symbol;
  }> = undefined as any;
  const AfterHoc = withPick(["included", "includedOptional", "unknown"])(
    BeforeHoc,
  );
  expectType<
    FunctionComponent<{
      included: boolean;
      includedOptional?: symbol;
      ignored: never;
    }>
  >(AfterHoc);
}

/* with all props */ {
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
