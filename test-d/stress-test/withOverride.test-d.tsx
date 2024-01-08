import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { withHocs, withOverride } from "../../src";
import { stress } from "../../src/test/stress";

/* basic usage */ {
  const BeforeHoc: React.FC<{
    a: string;
    b: number;
    c: boolean;
  }> = undefined as any;
  const AfterHoc = withHocs(stress(withOverride("a", "someString")))(BeforeHoc);
  expectType<
    FunctionComponent<{
      b: number;
      c: boolean;
    }>
  >(AfterHoc);
}
