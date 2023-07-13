/* eslint-disable @typescript-eslint/no-empty-function */
import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { withProp } from "../src/withProp";

/* single by value */ {
  /* with perfect matching prop */ {
    /* required */ {
      const BeforeHoc: React.FC<{
        matchingProp: number;
        nonRelatedProp: string;
      }> = undefined as any;
      const AfterHoc = withProp("matchingProp", 1)(BeforeHoc);
      expectType<
        FunctionComponent<{
          nonRelatedProp: string;
          matchingProp?: number;
        }>
      >(AfterHoc);
    }

    /* optional */ {
      const BeforeHoc: React.FC<{
        matchingProp?: number;
        nonRelatedProp: string;
      }> = undefined as any;
      const AfterHoc = withProp("matchingProp", 1)(BeforeHoc);
      expectType<typeof BeforeHoc>(AfterHoc);
    }
  }

  /* with same name but different type */ {
    /* required */ {
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

    /* optional */ {
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

  /* with different name */ {
    const BeforeHoc: React.FC<{
      nonRelatedProp1: number;
      nonRelatedProp2: string;
    }> = undefined as any;
    const AfterHoc = withProp("newProp", "")(BeforeHoc);
    expectType<typeof BeforeHoc>(AfterHoc);
  }

  /* with function as value */ {
    const BeforeHoc: React.FC<{
      matchingProp: () => number;
      nonRelatedProp: string;
    }> = undefined as any;
    const AfterHoc = withProp("matchingProp", () => "" as string)(BeforeHoc);
    expectType<
      FunctionComponent<{
        matchingProp?: () => number;
        nonRelatedProp: string;
      }>
    >(AfterHoc);
  }
}

/* single by factory */ {
  /* with perfect matching prop */ {
    /* required */ {
      const BeforeHoc: React.FC<{
        matchingProp: number;
        nonRelatedProp: string;
      }> = undefined as any;
      const AfterHoc = withProp(
        "matchingProp",
        () => 1 as number,
        []
      )(BeforeHoc);
      expectType<
        FunctionComponent<{
          nonRelatedProp: string;
          matchingProp?: number;
        }>
      >(AfterHoc);
    }

    /* optional */ {
      const BeforeHoc: React.FC<{
        matchingProp?: number;
        nonRelatedProp: string;
      }> = undefined as any;
      const AfterHoc = withProp(
        "matchingProp",
        () => 1 as number,
        []
      )(BeforeHoc);
      expectType<typeof BeforeHoc>(AfterHoc);
    }
  }

  /* with same name but different type */ {
    /* required */ {
      const BeforeHoc: React.FC<{
        matchingProp: number;
        nonRelatedProp: string;
      }> = undefined as any;
      const AfterHoc = withProp(
        "matchingProp",
        () => "" as string,
        []
      )(BeforeHoc);
      expectType<
        FunctionComponent<{
          nonRelatedProp: string;
          matchingProp: never;
        }>
      >(AfterHoc);
    }

    /* optional */ {
      const BeforeHoc: React.FC<{
        matchingProp?: number;
        nonRelatedProp: string;
      }> = undefined as any;
      const AfterHoc = withProp(
        "matchingProp",
        () => "" as string,
        []
      )(BeforeHoc);
      expectType<
        FunctionComponent<{
          nonRelatedProp: string;
          matchingProp: never;
        }>
      >(AfterHoc);
    }
  }

  /* with different name */ {
    const BeforeHoc: React.FC<{
      nonRelatedProp1: number;
      nonRelatedProp2: string;
    }> = undefined as any;
    const AfterHoc = withProp("newProp", () => "" as string, [])(BeforeHoc);
    expectType<typeof BeforeHoc>(AfterHoc);
  }

  /* with function as value */ {
    const BeforeHoc: React.FC<{
      matchingProp: 1;
      nonRelatedProp: string;
    }> = undefined as any;
    const AfterHoc = withProp(
      "matchingProp",
      /* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */ () =>
        () =>
          "" as string,
      []
    )(BeforeHoc);
    expectType<
      FunctionComponent<{
        matchingProp: never;
        nonRelatedProp: string;
      }>
    >(AfterHoc);
  }
}

/* multiple */ {
  const BeforeHoc: React.FC<{
    matchedTypeRequired: number;
    matchedTypeOptional?: boolean;
    unmatchedTypeRequired: number;
    unmatchedTypeOptional?: boolean;
    matchedCallbackTypeRequired: () => void;
    matchedCallbackTypeOptional?: () => void;
    unmatchedCallbackTypeRequired: () => void;
    unmatchedCallbackTypeOptional?: () => void;
    nonRelatedProp: string;
  }> = undefined as any;
  const AfterHoc = withProp({
    matchedTypeRequired: 1,
    matchedTypeOptional: true,
    unmatchedTypeRequired: true,
    unmatchedTypeOptional: 1,
    matchedCallbackTypeRequired: () => {},
    matchedCallbackTypeOptional: () => {},
    unmatchedCallbackTypeRequired: 1,
    unmatchedCallbackTypeOptional: 1,
    newProp: 1,
  })(BeforeHoc);
  expectType<
    FunctionComponent<{
      nonRelatedProp: string;
      unmatchedTypeRequired: never;
      unmatchedTypeOptional: never;
      unmatchedCallbackTypeRequired: never;
      unmatchedCallbackTypeOptional: never;
      matchedTypeRequired?: number;
      matchedTypeOptional?: boolean;
      matchedCallbackTypeRequired?: () => void;
      matchedCallbackTypeOptional?: () => void;
    }>
  >(AfterHoc);
}
