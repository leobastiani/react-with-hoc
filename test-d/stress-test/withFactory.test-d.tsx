import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { withFactory, withHocs } from "../../src";
import { stress } from "../../src/test/stress";

/* basic usage */ {
  const BeforeHoc: React.FC<{
    a: string;
    b: number;
    c: boolean;
  }> = undefined as any;
  const AfterHoc = withHocs(
    stress(withFactory("a", ({ b }: { b: number }) => String(b), ["b"])),
  )(BeforeHoc);
  AfterHoc;
  expectType<
    FunctionComponent<{
      b: number;
      c: boolean;
    }>
  >(AfterHoc);
}
