/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { FunctionComponent } from "react";
import { expectType } from "tsd";
import { PartialComponent } from "../../src/@types/PartialComponent";
import { WithComponent } from "../../src/@types/WithComponent";
import { halfStress, stress } from "../../src/stress";
import { withComponent } from "../../src/withComponent";
import { withHocs } from "../../src/withHocs";

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
