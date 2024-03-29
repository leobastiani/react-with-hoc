import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { withHocs, withRename } from "../../src";
import { stress } from "../../src/test/stress";

/* basic usage */ {
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
