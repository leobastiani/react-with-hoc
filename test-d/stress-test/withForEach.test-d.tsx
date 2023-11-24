import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { withForEach, withHocs } from "../../src";
import { stress } from "../../src/test/stress";

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
