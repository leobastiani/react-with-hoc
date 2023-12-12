import { FunctionComponent } from "react";
import { expectType } from "tsd";
import { withSpread } from "../src";

{
  // with perfect match

  const BeforeHoc: React.FC<{
    name: string;
    age: number;
    address: string;
  }> = undefined as any;
  const AfterHoc = withSpread<"user", "name" | "age" | "address">("user")(
    BeforeHoc,
  );
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
  const AfterHoc = withSpread<"user", "name" | "address">("user")(BeforeHoc);
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
  }> = undefined as any;
  const AfterHoc = withSpread<
    "user",
    | "name"
    // the component does not use phone
    | "phone"
    | "age"
  >("user")(BeforeHoc);
  expectType<
    FunctionComponent<{
      name?: string;
      age?: number;
      address: string;
      user: {
        name: string;
        age: number;
      };
    }>
  >(AfterHoc);
}
