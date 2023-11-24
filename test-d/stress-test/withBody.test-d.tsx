import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { stress } from "../../src/test/stress";
import { withBody } from "../../src/withBody";
import { withHocs } from "../../src/withHocs";

const BeforeHoc: React.FC<{
  a: string;
  b: number;
  c: boolean;
}> = undefined as any;
const AfterHoc = withHocs(
  stress(withBody(({ a }: { a: string; d: symbol }) => ({ a })))
)(BeforeHoc);
expectType<
  FunctionComponent<{
    a: string;
    b: number;
    c: boolean;
    d: symbol;
  }>
>(AfterHoc);
