import React, { FunctionComponent } from "react";
import { expectType } from "tsd";
import {
  PartialComponent,
  WithComponent,
  withComponents,
  withHocs,
} from "../../src";
import { halfStress } from "../../src/test/stress";

function Button(props: {
  size: "lg" | "md" | "xs";
  disabled?: boolean;
}): JSX.Element {
  return <button>{props.size}</button>;
}

/* basic usage */ {
  const BeforeHoc: React.FC<{
    Button: PartialComponent<typeof Button>;
    oldProp: string;
    oldPropOptional?: symbol;
  }> = undefined as any;
  const AfterHoc = withHocs(halfStress(withComponents({ Button })))(BeforeHoc);
  expectType<
    FunctionComponent<{
      oldProp: string;
      Button?: WithComponent<{
        size: "lg" | "md" | "xs";
        disabled?: boolean | undefined;
      }>;
      oldPropOptional?: symbol | undefined;
    }>
  >(AfterHoc);
}
