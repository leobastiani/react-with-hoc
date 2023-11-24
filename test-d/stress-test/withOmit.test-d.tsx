import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { stress } from "../../src/test/stress";
import { withBody } from "../../src/withBody";
import { withHocs } from "../../src/withHocs";
import { withOmit } from "../../src/withOmit";

const BeforeHoc: React.FC<{
  a: string;
  b: number;
  c: boolean;
}> = undefined as any;
const AfterHoc = withHocs(
  stress(
    withBody(({ b }: { b: number }) => ({ b })),
    withOmit(["b"])
  )
)(BeforeHoc);
expectType<
  FunctionComponent<{
    a: string;
    c: boolean;
  }>
>(AfterHoc);
