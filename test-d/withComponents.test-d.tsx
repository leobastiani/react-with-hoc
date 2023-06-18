/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { FunctionComponent } from "react";
import { expectType } from "tsd";
import { PartialComponent } from "../src/@types/PartialComponent";
import { WithComponent } from "../src/@types/WithComponent";
import { withComponents } from "../src/withComponents";

function Button(props: {
  size: "lg" | "md" | "xs";
  onPress: () => void;
  disabled?: boolean;
}): JSX.Element {
  return <button>{props.size}</button>;
}

{
  const BeforeHoc: React.FC<{
    LeftButton: PartialComponent<typeof Button>;
    oldPropOptional?: string;
  }> = undefined as any;
  const AfterHoc = withComponents({ LeftButton: Button, RightButton: Button })(
    BeforeHoc
  );
  expectType<
    FunctionComponent<{
      oldPropOptional?: string;
      LeftButton?: WithComponent<typeof Button>;
      RightButton?: WithComponent<typeof Button>;
    }>
  >(AfterHoc);

  // usage
  <AfterHoc />;
  <AfterHoc oldPropOptional="string" />;
  <AfterHoc oldPropOptional="string" LeftButton="string" />;
  <AfterHoc
    oldPropOptional="string"
    LeftButton="string"
    RightButton="string"
  />;
  <AfterHoc LeftButton={{ size: "lg" }} />;
  <AfterHoc RightButton={{ size: "lg" }} />;
}
