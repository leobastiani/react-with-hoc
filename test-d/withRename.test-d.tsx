import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { withRename } from "../src/withRename";

/* single */ {
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
}

/* multiple */ {
  const BeforeHoc: React.FC<{
    ignored: "ignored";
    ignoredOptional?: "ignoredOptional";
    included: "included";
    includedOptional?: "includedOptional";
    keepSame: "keepSame";
    keepSameOptional?: "keepSameOptional";
  }> = undefined as any;
  const AfterHoc = withRename({
    newProp: "included",
    newPropOptional: "includedOptional",
    nonNewOption: "nonIncluded",
    keepSame: "keepSame",
    keepSameOptional: "keepSameOptional",
  })(BeforeHoc);
  expectType<
    FunctionComponent<{
      ignored: "ignored";
      ignoredOptional?: "ignoredOptional";
      newProp: "included";
      newPropOptional?: "includedOptional";
      keepSame: "keepSame";
      keepSameOptional?: "keepSameOptional";
    }>
  >(AfterHoc);
}
