import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { withHocs, withRename } from "../../src";
import { stress } from "../../src/test/stress";

/* single */ {
  const BeforeHoc: React.FC<{
    a: string;
    b: number;
    c: boolean;
  }> = undefined as any;
  const AfterHoc = withHocs([
    ...stress(withRename("d", "a"), withRename("a", "d")),
    withRename("d", "a"),
  ])(BeforeHoc);
  expectType<
    FunctionComponent<{
      b: number;
      c: boolean;
      d: string;
    }>
  >(AfterHoc);
}

/* multiple */ {
  const BeforeHoc: React.FC<{
    a: string;
    b: number;
    c: boolean;
  }> = undefined as any;
  const AfterHoc = withHocs([
    ...stress(
      withRename({
        d: "a",
        e: "b",
      }),
      withRename({
        a: "d",
        b: "e",
      }),
    ),
    withRename({
      d: "a",
      e: "b",
    }),
  ])(BeforeHoc);
  expectType<
    FunctionComponent<{
      c: boolean;
      d: string;
      e: number;
    }>
  >(AfterHoc);
}
