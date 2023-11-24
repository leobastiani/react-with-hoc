import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { withHocs, withSpread } from "../../src";
import { stress } from "../../src/test/stress";

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
