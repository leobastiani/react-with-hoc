import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { expectType } from "tsd";
import { stress } from "../../src/test/stress";
import { withHocs } from "../../src/withHocs";
import { withState } from "../../src/withState";

const BeforeHoc: React.FC<{
  someState: number;
  setSomeState: Dispatch<SetStateAction<number>>;
  oldProp: string;
  oldPropOptional?: symbol;
}> = undefined as any;
const AfterHoc = withHocs(stress(withState<number, "someState">("someState")))(
  BeforeHoc
);
expectType<
  FunctionComponent<{
    someState?: number;
    setSomeState?: Dispatch<SetStateAction<number>>;
    oldProp: string;
    oldPropOptional?: symbol;
  }>
>(AfterHoc);
