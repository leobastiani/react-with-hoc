import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { withRename } from "../src";

/* with required prop */ {
  const BeforeHoc: React.FC<{
    ignored: string;
    ignoredOptional?: number;
    included: boolean;
    includedOptional?: symbol;
  }> = undefined as any;
  const AfterHoc = withRename("newProp", "included")(BeforeHoc);
  expectType<
    FunctionComponent<{
      newProp: boolean;
      ignored: string;
      ignoredOptional?: number;
      includedOptional?: symbol;
    }>
  >(AfterHoc);
}

/* with optional prop */ {
  const BeforeHoc: React.FC<{
    ignored: string;
    ignoredOptional?: number;
    included: boolean;
    includedOptional?: symbol;
  }> = undefined as any;
  const AfterHoc = withRename("newProp", "includedOptional")(BeforeHoc);
  expectType<
    FunctionComponent<{
      newProp?: symbol;
      included: boolean;
      ignored: string;
      ignoredOptional?: number;
    }>
  >(AfterHoc);
}

/* with unknown prop */ {
  const BeforeHoc: React.FC<{
    ignored: string;
    ignoredOptional?: number;
    included: boolean;
    includedOptional?: symbol;
  }> = undefined as any;
  const AfterHoc = withRename("newProp", "unknownProp")(BeforeHoc);
  expectType<typeof BeforeHoc>(AfterHoc);
}
