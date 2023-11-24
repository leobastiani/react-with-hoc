import { FunctionComponent, ReactNode } from "react";
import { expectType } from "tsd";
import { withHocs, withWrapper } from "../../src";
import { stress } from "../../src/test/stress";

const BeforeHoc: React.FC<{
  a: string;
  b: number;
  c: boolean;
}> = undefined as any;
const Provider: React.FC<{ children: ReactNode }> = undefined as any;
const AfterHoc = withHocs(stress(withWrapper(Provider)))(BeforeHoc);
expectType<FunctionComponent<{ a: string; b: number; c: boolean }>>(AfterHoc);
