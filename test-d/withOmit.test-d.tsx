import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { withOmit } from "../src";

/* with empty list */ {
  const BeforeHoc: React.FC<{
    ignored: string;
    ignoredOptional?: number;
    included: boolean;
    includedOptional?: symbol;
  }> = undefined as any;
  const AfterHoc = withOmit([])(BeforeHoc);
  expectType<
    FunctionComponent<{
      ignored: string;
      ignoredOptional?: number;
      included: boolean;
      includedOptional?: symbol;
    }>
  >(AfterHoc);
}

/* with elements outside of the list */ {
  const BeforeHoc: React.FC<{
    ignored: string;
    ignoredOptional?: number;
    included: boolean;
    includedOptional?: symbol;
  }> = undefined as any;
  const AfterHoc = withOmit(["a", "b", "c"])(BeforeHoc);
  expectType<
    FunctionComponent<{
      ignored: string;
      ignoredOptional?: number;
      included: boolean;
      includedOptional?: symbol;
    }>
  >(AfterHoc);
}

/* with elements inside the list */ {
  const BeforeHoc: React.FC<{
    ignored: string;
    ignoredOptional?: number;
    included: boolean;
    includedOptional?: symbol;
  }> = undefined as any;
  const AfterHoc = withOmit(["included", "includedOptional"])(BeforeHoc);
  expectType<
    FunctionComponent<{
      ignored: string;
      ignoredOptional?: number;
      // i can't omit included
      included: never;
    }>
  >(AfterHoc);
}

/* with elements inside and outside of the list */ {
  const BeforeHoc: React.FC<{
    ignored: string;
    ignoredOptional?: number;
    included: boolean;
    includedOptional?: symbol;
  }> = undefined as any;
  const AfterHoc = withOmit(["a", "included", "b", "includedOptional", "c"])(
    BeforeHoc,
  );
  expectType<
    FunctionComponent<{
      ignored: string;
      ignoredOptional?: number;
      // i can't omit included
      included: never;
    }>
  >(AfterHoc);
}
