import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { stress } from "../../src/stress";
import { withBody } from "../../src/withBody";
import { withHocs } from "../../src/withHocs";
import { withPick } from "../../src/withPick";

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
