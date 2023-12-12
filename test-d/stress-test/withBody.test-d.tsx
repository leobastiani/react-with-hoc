import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { withBody, withHocs } from "../../src";
import { stress } from "../../src/test/stress";

const BeforeHoc: React.FC<{
  a: string;
  b: number;
  c: boolean;
}> = undefined as any;
const AfterHoc = withHocs(
  stress(withBody(({ a }: { a: string; d: symbol }) => ({ a }))),
)(BeforeHoc);
expectType<
  FunctionComponent<{
    a: string;
    b: number;
    c: boolean;
    d: symbol;
  }>
>(AfterHoc);
