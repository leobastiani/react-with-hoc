import { FunctionComponent, ReactNode } from "react";
import { expectType } from "tsd";
import { withWrapper } from "../src";

{
  // don't change component props

  const BeforeHoc: React.FC<{
    a: string;
    b: number;
    c: boolean;
  }> = undefined as any;
  const Provider: React.FC<{ children: ReactNode }> = undefined as any;
  const AfterHoc = withWrapper(Provider)(BeforeHoc);
  expectType<FunctionComponent<{ a: string; b: number; c: boolean }>>(AfterHoc);
}
