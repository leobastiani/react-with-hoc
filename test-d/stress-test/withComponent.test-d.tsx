import React, { FunctionComponent } from "react";
import { expectType } from "tsd";
import {
  PartialComponent,
  WithComponent,
  withComponent,
  withHocs,
} from "../../src";
import { halfStress, stress } from "../../src/test/stress";

function Button(props: {
  size: "lg" | "md" | "xs";
  disabled?: boolean;
}): JSX.Element {
  return <button>{props.size}</button>;
}

/* single */ {
  const BeforeHoc: React.FC<{
    Button: PartialComponent<typeof Button>;
    oldProp: string;
    oldPropOptional?: symbol;
  }> = undefined as any;
  const AfterHoc = withHocs(stress(withComponent("Button", Button)))(BeforeHoc);
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

/* multiple */ {
  const BeforeHoc: React.FC<{
    Button: PartialComponent<typeof Button>;
    oldProp: string;
    oldPropOptional?: symbol;
  }> = undefined as any;
  const AfterHoc = withHocs(halfStress(withComponent({ Button })))(BeforeHoc);
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
