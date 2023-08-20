import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { stress } from "../../src/stress";
import { withHocs } from "../../src/withHocs";
import { withIf } from "../../src/withIf";

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
      })
    )
  )(BeforeHoc);
  expectType<
    FunctionComponent<{
      a: string;
      b: number;
      c: boolean;
    }>
  >(AfterHoc);
}
