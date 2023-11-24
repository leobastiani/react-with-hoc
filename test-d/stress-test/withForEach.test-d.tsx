import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { stress } from "../../src/test/stress";
import { withForEach } from "../../src/withForEach";
import { withHocs } from "../../src/withHocs";

const BeforeHoc: React.FC<{
  a: string;
  b: number;
  c: boolean;
}> = undefined as any;
const AfterHoc = withHocs(stress(withForEach(10)))(BeforeHoc);
expectType<
  FunctionComponent<{
    a: string;
    b: number;
    c: boolean;
  }>
>(AfterHoc);
