import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { withSpread } from "../src/withSpread";

{
  // with perfect match

  const BeforeHoc: React.FC<{
    name: string;
    age: number;
    address: string;
  }> = undefined as any;
  const AfterHoc = withSpread<
    "user",
    {
      name: string;
      age: number;
      address: string;
    }
  >("user")(BeforeHoc);
  expectType<
    FunctionComponent<{
      user: {
        name: string;
        age: number;
        address: string;
      };
      name?: string;
      age?: number;
      address?: string;
    }>
  >(AfterHoc);
}

{
  // with missing prop in new object

  const BeforeHoc: React.FC<{
    name: string;
    age: number;
    address: string;
  }> = undefined as any;
  const AfterHoc = withSpread<
    "user",
    {
      name: string;
      address: string;
    }
  >("user")(BeforeHoc);
  expectType<
    FunctionComponent<{
      user: {
        name: string;
        address: string;
      };
      name?: string;
      age: number;
      address?: string;
    }>
  >(AfterHoc);
}

{
  // with imperfect match

  const BeforeHoc: React.FC<{
    name: string;
    age: number;
    address: string;
    someUnmatchedProp: string;
    someUnmatchedOptionalProp?: string;
    someOptionalProp?: string;
    someOptionalPropInUser?: string;
  }> = undefined as any;
  const AfterHoc = withSpread<
    "user",
    {
      name: string;
      // the component does not use phone
      phone: number;
      address: string;
      someOptionalPropInUser?: string;
      someUnmatchedProp: number;
      someUnmatchedOptionalProp?: number;
    }
  >("user")(BeforeHoc);
  expectType<
    FunctionComponent<{
      user: {
        name: string;
        address: string;
        // has no phone

        someOptionalPropInUser?: string;
        // it's never for erroring
        someUnmatchedProp: never;
        // should never be used
        someUnmatchedOptionalProp?: undefined;
      };
      // age is still required
      age: number;

      name?: string;
      address?: string;
      // has no phone

      // keeps optional prop
      someUnmatchedProp?: string;
      someUnmatchedOptionalProp?: string;
      someOptionalProp?: string;
      someOptionalPropInUser?: string;
    }>
  >(AfterHoc);
}
