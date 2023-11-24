import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { withBody, withHocs, withPick } from "../../src";
import { stress } from "../../src/test/stress";

const BeforeHoc: React.FC<{
  a: string;
  b: number;
  c: boolean;
}> = undefined as any;
const AfterHoc = withHocs(
  stress(
    withPick(["a"]),
    withBody(({ b }: { b: number }) => ({ b }))
  )
)(BeforeHoc);
expectType<
  FunctionComponent<{
    a: string;
    b: number;
  }>
>(AfterHoc);
