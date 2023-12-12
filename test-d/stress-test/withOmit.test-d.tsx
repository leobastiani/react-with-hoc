import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { withBody, withHocs, withOmit } from "../../src";
import { stress } from "../../src/test/stress";

const BeforeHoc: React.FC<{
  a: string;
  b: number;
  c: boolean;
}> = undefined as any;
const AfterHoc = withHocs(
  stress(
    withBody(({ b }: { b: number }) => ({ b })),
    withOmit(["b"]),
  ),
)(BeforeHoc);
expectType<
  FunctionComponent<{
    a: string;
    c: boolean;
  }>
>(AfterHoc);
