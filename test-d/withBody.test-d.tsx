import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import { expectType } from "tsd";
import { withBody } from "../src/withBody";

const BeforeHoc: React.FC<{
  matchedPropRequired: number;
  matchedPropOptional?: number;
  unmatchedRequirementRequired: number;
  unmatchedRequirementOptional?: number;
  unmatchedProp: string;
  nonRelatedProp: string;
  matchedStateRequired: number | string;
  setMatchedStateRequired: Dispatch<SetStateAction<number>>;
  unmatchedStateRequired: boolean;
  setUnmatchedStateRequired: Dispatch<SetStateAction<boolean>>;
  matchedStateOptional?: number | string;
  setMatchedStateOptional?: Dispatch<SetStateAction<number>>;
  unmatchedStateOptional?: boolean;
  setUnmatchedStateOptional?: Dispatch<SetStateAction<boolean>>;
}> = undefined as any;
const AfterHoc = withBody(
  (_props: {
    matchedPropRequired: number;
    matchedPropOptional?: number;
    unmatchedRequirementRequired?: number;
    unmatchedRequirementOptional: number;
    unmatchedProp: number;
    newProp: number;
  }) => {
    const [matchedStateRequired, setMatchedStateRequired] = useState(0);
    const [unmatchedStateRequired, setUnmatchedStateRequired] = useState(0);
    const [matchedStateOptional, setMatchedStateOptional] = useState(0);
    const [unmatchedStateOptional, setUnmatchedStateOptional] = useState(0);
    return {
      matchedStateRequired,
      setMatchedStateRequired,
      unmatchedStateRequired,
      setUnmatchedStateRequired,
      matchedStateOptional,
      setMatchedStateOptional,
      unmatchedStateOptional,
      setUnmatchedStateOptional,
    };
  }
)(BeforeHoc);
expectType<
  FunctionComponent<{
    matchedPropRequired: number;
    newProp: number;
    matchedState: never;
    nonRelatedProp: string;
    matchedPropOptional?: number | undefined;
    matchedStateOptional: never;
    setMatchedStateOptional: never;
    matchedStateRequired: never;
    setMatchedStateRequired: any;

    // unmatched
    unmatchedRequirementRequired: number;
    unmatchedRequirementOptional: number;
    unmatchedProp: never;
    unmatchedState: never;
    setUnmatchedState: never;
    unmatchedStateOptional: never;
    setUnmatchedStateOptional: never;
    unmatchedStateRequired: never;
    setUnmatchedStateRequired: never;
  }>
>(AfterHoc);
