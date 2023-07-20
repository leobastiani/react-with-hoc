import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { repeat950 } from "../../src/repeat";
import { withHocs } from "../../src/withHocs";
import { withProp } from "../../src/withProp";

/* single by value */ {
  const BeforeHoc: React.FC<{
    a: string;
    b: number;
    c: boolean;
  }> = undefined as any;
  const AfterHoc = withHocs(repeat950(withProp("a", "someString")))(BeforeHoc);
  expectType<
    FunctionComponent<{
      b: number;
      c: boolean;
      a?: string;
    }>
  >(AfterHoc);
}

/* single by factory */ {
  const BeforeHoc: React.FC<{
    a: string;
    b: number;
    c: boolean;
  }> = undefined as any;
  const AfterHoc = withHocs(
    repeat950(withProp("a", ({ b }: { b: number }) => String(b), ["b"]))
  )(BeforeHoc);
  AfterHoc;
  expectType<
    FunctionComponent<{
      a?: string;
      b: number;
      c: boolean;
    }>
  >(AfterHoc);
}

/* multiple */ {
  const BeforeHoc: React.FC<{
    a: string;
    b: number;
    c: boolean;
  }> = undefined as any;
  const AfterHoc = withHocs(
    repeat950(
      withProp({
        a: "1",
        b: 2,
      })
    )
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