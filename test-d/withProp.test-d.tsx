import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { withProp } from "../src/withProp";

// with perfect matching prop
{
  // required
  {
    const BeforeHoc: React.FC<{
      matchingProp: number;
      nonRelatedProp: string;
    }> = undefined as any;
    const AfterHoc = withProp("matchingProp", 1)(BeforeHoc);
    expectType<
      FunctionComponent<{
        nonRelatedProp: string;
        matchingProp?: number | undefined;
      }>
    >(AfterHoc);
  }

  // optional
  {
    const BeforeHoc: React.FC<{
      matchingProp?: number;
      nonRelatedProp: string;
    }> = undefined as any;
    const AfterHoc = withProp("matchingProp", 1)(BeforeHoc);
    expectType<typeof BeforeHoc>(AfterHoc);
  }
}

// with same name but different type
{
  // required
  {
    const BeforeHoc: React.FC<{
      matchingProp: number;
      nonRelatedProp: string;
    }> = undefined as any;
    const AfterHoc = withProp("matchingProp", "")(BeforeHoc);
    expectType<
      FunctionComponent<{
        nonRelatedProp: string;
        matchingProp: never;
      }>
    >(AfterHoc);
  }

  // optional
  {
    const BeforeHoc: React.FC<{
      matchingProp?: number;
      nonRelatedProp: string;
    }> = undefined as any;
    const AfterHoc = withProp("matchingProp", "")(BeforeHoc);
    expectType<
      FunctionComponent<{
        nonRelatedProp: string;
        matchingProp: never;
      }>
    >(AfterHoc);
  }
}

// with different name
{
  const BeforeHoc: React.FC<{
    nonRelatedProp1: number;
    nonRelatedProp2: string;
  }> = undefined as any;
  const AfterHoc = withProp("newProp", "")(BeforeHoc);
  expectType<typeof BeforeHoc>(AfterHoc);
}
