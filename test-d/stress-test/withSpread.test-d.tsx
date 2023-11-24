import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { stress } from "../../src/test/stress";
import { withHocs } from "../../src/withHocs";
import { withSpread } from "../../src/withSpread";

const BeforeHoc: React.FC<{
  name: string;
  age: number;
  address: string;
}> = undefined as any;
const AfterHoc = withHocs(
  stress(withSpread<"user", "name" | "age" | "address">("user"))
)(BeforeHoc);
expectType<
  FunctionComponent<{
    user: {
      name: string;
      age: number;
      address: string;
    } & {
      name?: string | undefined;
      age?: number | undefined;
      address?: string | undefined;
    };
    name?: string | undefined;
    age?: number | undefined;
    address?: string | undefined;
  }>
>(AfterHoc);
