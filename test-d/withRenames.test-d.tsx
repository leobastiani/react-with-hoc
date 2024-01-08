import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { withRenames } from "../src";

/* basic usage */ {
  const BeforeHoc: React.FC<{
    ignored: "ignored";
    ignoredOptional?: "ignoredOptional";
    included: "included";
    includedOptional?: "includedOptional";
    keepSame: "keepSame";
    keepSameOptional?: "keepSameOptional";
  }> = undefined as any;
  const AfterHoc = withRenames({
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
