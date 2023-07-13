import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { expectType } from "tsd";
import { withState } from "../src/withState";

{
  // adds new state with oldProp as optional

  const BeforeHoc: React.FC<{
    someState: number;
    setSomeState: Dispatch<SetStateAction<number>>;
    oldProp: string;
    oldPropOptional?: symbol;
  }> = undefined as any;
  const AfterHoc = withState<number, "someState">("someState")(BeforeHoc);
  expectType<
    FunctionComponent<{
      someState?: number;
      setSomeState?: Dispatch<SetStateAction<number>>;
      oldProp: string;
      oldPropOptional?: symbol;
    }>
  >(AfterHoc);
}

{
  // adds new state with oldProp as required

  const BeforeHoc: React.FC<{
    someState: number;
    setSomeState: Dispatch<SetStateAction<number>>;
    oldProp: string;
    oldPropOptional?: symbol;
  }> = undefined as any;
  const AfterHoc = withState<number, "someState">("someState")(BeforeHoc);
  expectType<
    FunctionComponent<{
      someState?: number;
      setSomeState?: Dispatch<SetStateAction<number>>;
      oldProp: string;
      oldPropOptional?: symbol;
    }>
  >(AfterHoc);
}

{
  // with previous propValue but different kind

  const BeforeHoc: React.FC<{
    someState: string;
    setSomeState: Dispatch<SetStateAction<string>>;
    oldProp: string;
    oldPropOptional?: symbol;
  }> = undefined as any;
  const AfterHoc = withState<number, "someState">("someState")(BeforeHoc);
  expectType<
    FunctionComponent<{
      someState: never;
      setSomeState?: Dispatch<SetStateAction<string>>;
      oldProp: string;
      oldPropOptional?: symbol | undefined;
    }>
  >(AfterHoc);
}

{
  // with factory

  const BeforeHoc: React.FC<{
    nonConflictProp: string;
    nonConflictPropOptional?: symbol;
    conflictPropSameRequirement: number;
    conflictPropOptionalSameRequirement?: boolean;
    conflictProp: symbol;
    conflictPropOptional?: object;
    someState: number;
  }> = undefined as any;
  const AfterHoc = withState("someState", {
    init: (_props: {
      newProp: symbol;
      conflictPropSameRequirement: string;
      conflictPropOptionalSameRequirement?: symbol;
      conflictProp?: boolean;
      conflictPropOptional: number;
      someState: string;
    }) => 0 as number,
  })(BeforeHoc);
  expectType<
    FunctionComponent<{
      newProp: symbol;
      nonConflictProp: string;
      nonConflictPropOptional?: symbol;

      conflictPropSameRequirement: never;
      conflictPropOptionalSameRequirement?: undefined;

      conflictProp: never;
      conflictPropOptional: never;

      someState: never;
      setSomeState?: Dispatch<SetStateAction<number>>;
    }>
  >(AfterHoc);
}
