import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { withHocs, withIf } from "../../src";
import { stress } from "../../src/test/stress";

/* dependency name */ {
  const BeforeHoc: React.FC<{
    a: string;
    b: number;
    c: boolean;
  }> = undefined as any;
  const AfterHoc = withHocs(stress(withIf("b")))(BeforeHoc);
  expectType<
    FunctionComponent<{
      a: string;
      b: number;
      c: boolean;
    }>
  >(AfterHoc);
}

/* factory */ {
  const BeforeHoc: React.FC<{
    a: string;
    b: number;
    c: boolean;
  }> = undefined as any;
  const AfterHoc = withHocs(
    stress(
      withIf(({ b }: { b: number }) => b > 0, {
        dependencyNames: ["b"],
      }),
    ),
  )(BeforeHoc);
  expectType<
    FunctionComponent<{
      a: string;
      b: number;
      c: boolean;
    }>
  >(AfterHoc);
}
