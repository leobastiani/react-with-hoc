import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { withIf } from "../src";

// with prop name
{
  // with matching prop
  {
    // required
    {
      const BeforeHoc: React.FC<{
        matchingProp: number;
        nonRelatedProp: string;
      }> = undefined as any;
      const AfterHoc = withIf("matchingProp")(BeforeHoc);
      expectType<typeof BeforeHoc>(AfterHoc);
    }

    // optional
    {
      const BeforeHoc: React.FC<{
        matchingProp?: number;
        nonRelatedProp: string;
      }> = undefined as any;
      const AfterHoc = withIf("matchingProp")(BeforeHoc);
      expectType<typeof BeforeHoc>(AfterHoc);
    }
  }

  // with new prop
  {
    const BeforeHoc: React.FC<{
      nonRelatedProp: string;
    }> = undefined as any;
    const AfterHoc = withIf("newProp")(BeforeHoc);
    expectType<
      FunctionComponent<{
        newProp: unknown;
        nonRelatedProp: string;
      }>
    >(AfterHoc);
  }
}

// with function prop
{
  const BeforeHoc: React.FC<{
    matchingProp1: number;
    matchingProp2?: number | string;
    unmatchedProp: string;
    nonRelatedProp: string;
  }> = undefined as any;
  const AfterHoc = withIf(
    ({
      matchingProp1,
      matchingProp2,
    }: {
      matchingProp1?: number;
      matchingProp2: number;
      unmatchedProp: number;
      newProp: string;
    }) => matchingProp1 === matchingProp2,
    {
      dependencyNames: [
        "matchingProp1",
        "matchingProp2",
        "newProp",
        "unmatchedProp",
      ],
    },
  )(BeforeHoc);
  expectType<
    FunctionComponent<{
      newProp: string;
      nonRelatedProp: string;
      matchingProp1: number;
      matchingProp2: number;
      unmatchedProp: never;
    }>
  >(AfterHoc);
}
