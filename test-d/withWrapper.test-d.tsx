import { FunctionComponent, ReactNode } from "react";
import { expectType } from "tsd";
import { withWrapper } from "../src";

/* basic usage */ {
  const BeforeHoc: React.FC<{
    a: string;
    b: number;
    c: boolean;
  }> = undefined as any;
  const Provider: React.FC<{ children: ReactNode }> = undefined as any;
  const AfterHoc = withWrapper(Provider)(BeforeHoc);
  expectType<FunctionComponent<{ a: string; b: number; c: boolean }>>(AfterHoc);
}

/* pick props with different types should throw never */ {
  const BeforeHoc: React.FC<{
    a: string;
    b: number;
    c: boolean;
  }> = undefined as any;
  const Provider: React.FC<{
    a: number;
    b: number;
    c: string;
    children: ReactNode;
  }> = undefined as any;
  const AfterHoc = withWrapper(Provider, {
    pickProps: ["a", "b", "d"],
  })(BeforeHoc);
  expectType<FunctionComponent<{ a: never; b: number; c: boolean }>>(AfterHoc);
}

/* omit props with different types should throw never */ {
  const BeforeHoc: React.FC<{
    a: string;
    b: number;
    c: boolean;
  }> = undefined as any;
  const Provider: React.FC<{
    a: number;
    b: number;
    c: number;
    children: ReactNode;
  }> = undefined as any;
  const AfterHoc = withWrapper(Provider, {
    omitProps: ["a", "d"],
  })(BeforeHoc);
  expectType<
    FunctionComponent<{
      a: string;
      b: number;
      c: never;
    }>
  >(AfterHoc);
}

/* can not assign pickProps and omitProps */ {
  const BeforeHoc: React.FC<{
    a: string;
    b: number;
    c: boolean;
  }> = undefined as any;
  const Provider: React.FC<{ children: ReactNode }> = undefined as any;
  const AfterHoc = withWrapper(Provider, {
    pickProps: [],
    // @ts-expect-error ensure it's an error
    omitProps: [],
  })(BeforeHoc);
  expectType<FunctionComponent<{ a: string; b: number; c: boolean }>>(AfterHoc);
}
