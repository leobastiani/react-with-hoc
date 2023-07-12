import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { withProp } from "../src/withProp";
import { withProps } from "../src/withProps";

// with perfect matching prop
{
  // required
  {
    const BeforeHoc: React.FC<{
      matchingProp1: number;
      matchingProp2: boolean;
      nonRelatedProp: string;
    }> = undefined as any;
    const AfterHoc = withProps({ matchingProp1: 1, matchingProp2: true })(
      BeforeHoc
    );
    expectType<
      FunctionComponent<{
        nonRelatedProp: string;
        matchingProp1?: number | undefined;
        matchingProp2?: boolean | undefined;
      }>
    >(AfterHoc);
  }

  // optional
  {
    const BeforeHoc: React.FC<{
      matchingProp1?: number;
      matchingProp2?: boolean;
      nonRelatedProp: string;
    }> = undefined as any;
    const AfterHoc = withProps({ matchingProp1: 1, matchingProp2: true })(
      BeforeHoc
    );
    expectType<typeof BeforeHoc>(AfterHoc);
  }
}

// with same name but different type
{
  // required
  {
    const BeforeHoc: React.FC<{
      matchingProp1: number;
      matchingProp2: boolean;
      nonRelatedProp: string;
    }> = undefined as any;
    const AfterHoc = withProps({ matchingProp1: true, matchingProp2: 1 })(
      BeforeHoc
    );
    expectType<
      FunctionComponent<{
        matchingProp1: never;
        matchingProp2: never;
        nonRelatedProp: string;
      }>
    >(AfterHoc);
  }

  // optional
  {
    const BeforeHoc: React.FC<{
      matchingProp1?: number;
      matchingProp2?: boolean;
      nonRelatedProp: string;
    }> = undefined as any;
    const AfterHoc = withProps({ matchingProp1: true, matchingProp2: 1 })(
      BeforeHoc
    );
    expectType<
      FunctionComponent<{
        matchingProp1: never;
        matchingProp2: never;
        nonRelatedProp: string;
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
