/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { FunctionComponent } from "react";
import { expectType } from "tsd";
import { PartialComponent } from "../../src/@types/PartialComponent";
import { stress } from "../../src/stress";
import { withComponent } from "../../src/withComponent";
import { withHocs } from "../../src/withHocs";
import { WithComponent } from "../../src/@types/WithComponent";

function Button(props: {
  size: "lg" | "md" | "xs";
  disabled?: boolean;
}): JSX.Element {
  return <button>{props.size}</button>;
}

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
