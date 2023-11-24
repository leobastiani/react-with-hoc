import { FunctionComponent, ReactNode } from "react";
import { expectType } from "tsd";
import { withForEach } from "../src";

{
  // without target keys

  const BeforeHoc: React.FC<{
    ignored: string;
    ignoredOptional?: number;
    included: boolean;
    includedOptional?: symbol;
  }> = undefined as any;
  const AfterHoc = withForEach(10)(BeforeHoc);
  expectType<
    FunctionComponent<{
      ignored: string;
      ignoredOptional?: number | undefined;
      included: boolean;
      includedOptional?: symbol | undefined;
    }>
  >(AfterHoc);
}

{
  // without i key

  const BeforeHoc: React.FC<{
    ignored: string;
    ignoredOptional?: number;
    included: boolean;
    includedOptional?: symbol;
    i: string;
  }> = undefined as any;
  const AfterHoc = withForEach(10)(BeforeHoc);
  expectType<
    FunctionComponent<{
      ignored: string;
      ignoredOptional?: number | undefined;
      included: boolean;
      includedOptional?: symbol | undefined;
      i?: string;
    }>
  >(AfterHoc);
}

{
  // without children key

  const BeforeHoc: React.FC<{
    ignored: string;
    ignoredOptional?: number;
    included: boolean;
    includedOptional?: symbol;
    children: ReactNode;
  }> = undefined as any;
  const AfterHoc = withForEach(10)(BeforeHoc);
  expectType<
    FunctionComponent<{
      ignored: string;
      ignoredOptional?: number | undefined;
      included: boolean;
      includedOptional?: symbol | undefined;
      children?: ReactNode;
    }>
  >(AfterHoc);
}

{
  // without custom keys

  const BeforeHoc: React.FC<{
    ignored: string;
    ignoredOptional?: number;
    included: boolean;
    includedOptional?: symbol;
    index: number;
    myChildren: ReactNode;
  }> = undefined as any;
  const AfterHoc = withForEach(10, {
    indexName: "index",
    valueName: "myChildren",
  })(BeforeHoc);
  expectType<
    FunctionComponent<{
      ignored: string;
      ignoredOptional?: number | undefined;
      included: boolean;
      includedOptional?: symbol | undefined;
      index?: number;
      myChildren?: ReactNode;
    }>
  >(AfterHoc);
}
