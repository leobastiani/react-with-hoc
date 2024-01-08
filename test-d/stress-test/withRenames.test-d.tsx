import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { withHocs, withRenames } from "../../src";
import { stress } from "../../src/test/stress";

/* basic usage */ {
  const BeforeHoc: React.FC<{
    a: string;
    b: number;
    c: boolean;
  }> = undefined as any;
  const AfterHoc = withHocs([
    ...stress(
      withRenames({
        d: "a",
        e: "b",
      }),
      withRenames({
        a: "d",
        b: "e",
      }),
    ),
    withRenames({
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
