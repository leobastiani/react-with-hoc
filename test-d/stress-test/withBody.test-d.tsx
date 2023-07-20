import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { repeat950 } from "../../src/repeat";
import { withBody } from "../../src/withBody";
import { withHocs } from "../../src/withHocs";

const BeforeHoc: React.FC<{
  a: string;
  b: number;
  c: boolean;
}> = undefined as any;
const AfterHoc = withHocs(
  repeat950(withBody(({ a }: { a: string; d: symbol }) => ({ a })))
)(BeforeHoc);
expectType<
  FunctionComponent<{
    a: string;
    b: number;
    c: boolean;
    d: symbol;
  }>
>(AfterHoc);
