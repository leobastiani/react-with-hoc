import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { withOverrides } from "../src";

/* right value, with no optional */ {
  const BeforeHoc: React.FC<{
    string: string;
    stringOptional?: string;
    boolean: boolean;
    booleanOptional?: boolean;
  }> = undefined as any;
  const AfterHoc = withOverrides({ string: "some value", boolean: true })(
    BeforeHoc,
  );
  expectType<
    FunctionComponent<{
      stringOptional?: string;
      booleanOptional?: boolean;
    }>
  >(AfterHoc);
}

/* right value, but it is optional */ {
  const BeforeHoc: React.FC<{
    string: string;
    stringOptional?: string;
    boolean: boolean;
    booleanOptional?: boolean;
  }> = undefined as any;
  const AfterHoc = withOverrides({
    stringOptional: "some value",
    booleanOptional: true,
  })(BeforeHoc);
  expectType<
    FunctionComponent<{
      string: string;
      boolean: boolean;
    }>
  >(AfterHoc);
}

/* wrong value, with no optional */ {
  const BeforeHoc: React.FC<{
    string: string;
    stringOptional?: string;
    boolean: boolean;
    booleanOptional?: boolean;
  }> = undefined as any;
  const AfterHoc = withOverrides({ string: 1, boolean: 1 })(BeforeHoc);
  expectType<
    FunctionComponent<{
      string: never;
      stringOptional?: string;
      boolean: never;
      booleanOptional?: boolean;
    }>
  >(AfterHoc);
}

/* wrong value, but it is optional */ {
  const BeforeHoc: React.FC<{
    string: string;
    stringOptional?: string;
    boolean: boolean;
    booleanOptional?: boolean;
  }> = undefined as any;
  const AfterHoc = withOverrides({ stringOptional: 1, booleanOptional: 1 })(
    BeforeHoc,
  );
  expectType<
    FunctionComponent<{
      string: string;
      stringOptional: never;
      boolean: boolean;
      booleanOptional: never;
    }>
  >(AfterHoc);
}
