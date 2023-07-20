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
    // unmatched return
    unmatchedStateRequired: never;
    unmatchedStateOptional: never;
    // unmatched functions are considered as matched
    // setUnmatchedStateRequired
    // setUnmatchedStateOptional

    // has no matched return
    // matchedStateRequired
    // setMatchedStateRequired
    // matchedStateOptional
    // setMatchedStateOptional

    // matched props and requirements
    matchedPropRequired: number;
    matchedPropOptional?: number;
    // matched props but not requirements
    unmatchedRequirementRequired: number;
    unmatchedRequirementOptional: number;
    // prop unmatched
    unmatchedProp: never;
    // as new prop
    newProp: number;
    // no related
    nonRelatedProp: string;
  }>
>(AfterHoc);
