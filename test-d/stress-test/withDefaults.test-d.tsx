import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { withDefaults, withHocs } from "../../src";
import { stress } from "../../src/test/stress";

/* basic usage */ {
  const BeforeHoc: React.FC<{
    a: string;
    b: number;
    c: boolean;
  }> = undefined as any;
  const AfterHoc = withHocs(
    stress(
      withDefaults({
        a: "1",
        b: 2,
      }),
    ),
  )(BeforeHoc);
  AfterHoc;
  expectType<
    FunctionComponent<{
      a?: string;
      b?: number;
      c: boolean;
    }>
  >(AfterHoc);
}
