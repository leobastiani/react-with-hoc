import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { withOverride } from "../src";

/* right value, with no optional */ {
  const BeforeHoc: React.FC<{
    string: string;
    stringOptional?: string;
  }> = undefined as any;
  const AfterHoc = withOverride("string", "some value")(BeforeHoc);
  expectType<
    FunctionComponent<{
      stringOptional?: string;
    }>
  >(AfterHoc);
}

/* right value, but it is optional */ {
  const BeforeHoc: React.FC<{
    string: string;
    stringOptional?: string;
  }> = undefined as any;
  const AfterHoc = withOverride("stringOptional", "some value")(BeforeHoc);
  expectType<
    FunctionComponent<{
      string: string;
    }>
  >(AfterHoc);
}

/* wrong value, with no optional */ {
  const BeforeHoc: React.FC<{
    string: string;
    stringOptional?: string;
  }> = undefined as any;
  const AfterHoc = withOverride("string", 1)(BeforeHoc);
  expectType<
    FunctionComponent<{
      string: never;
      stringOptional?: string;
    }>
  >(AfterHoc);
}

/* wrong value, but it is optional */ {
  const BeforeHoc: React.FC<{
    string: string;
    stringOptional?: string;
  }> = undefined as any;
  const AfterHoc = withOverride("stringOptional", 1)(BeforeHoc);
  expectType<
    FunctionComponent<{
      string: string;
      stringOptional: never;
    }>
  >(AfterHoc);
}
