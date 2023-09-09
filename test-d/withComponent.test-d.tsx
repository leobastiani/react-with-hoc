/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { Fragment, FunctionComponent } from "react";
import { expectType } from "tsd";
import { PartialComponent } from "../src/@types/PartialComponent";
import { WithComponent } from "../src/@types/WithComponent";
import { withComponent } from "../src/withComponent";

function Button(props: {
  size: "lg" | "md" | "xs";
  onPress: () => void;
  disabled?: boolean;
}): JSX.Element {
  return <button>{props.size}</button>;
}

function ButtonEnhanced(props: {
  size: "lg" | "md" | "xs";
  onPress: () => void;
  disabled?: boolean | string;
  fullWidth?: boolean;
}): JSX.Element {
  return <button>{props.size}</button>;
}

function OtherButton(_props: { size: "lg" | "md" | "xs" }): JSX.Element {
  return <button>Click me</button>;
}

/* single */ {
  /* override */ {
    const PartialButton: PartialComponent<typeof Button> = undefined as any;
    <PartialButton />;
    <PartialButton size="lg" />;
    <PartialButton disabled />;
    <PartialButton disabled size="lg" />;

    const BeforeHoc: React.FC<{
      Button: PartialComponent<typeof Button>;
      oldProp: string;
      oldPropOptional?: symbol;
    }> = undefined as any;
    const AfterHoc = withComponent("Button", Button)(BeforeHoc);
    expectType<
      FunctionComponent<{
        oldProp: string;
        oldPropOptional?: symbol | undefined;
        Button?: WithComponent<typeof Button>;
      }>
    >(AfterHoc);
  }

  /* adds new state with oldProp as optional */ {
    const BeforeHoc: React.FC<{
      oldPropOptional?: string;
    }> = undefined as any;
    const AfterHoc = withComponent("Button", Button)(BeforeHoc);
    expectType<
      FunctionComponent<{
        oldPropOptional?: string;
        Button?: WithComponent<typeof Button>;
      }>
    >(AfterHoc);

    // usage
    <AfterHoc />;
    <AfterHoc oldPropOptional="string" />;
    <AfterHoc oldPropOptional="string" Button="string" />;
    <AfterHoc Button={{ size: "lg" }} />;
    <AfterHoc Button={null} />;
    <AfterHoc Button={false} />;
    <AfterHoc Button={true} />;
    <AfterHoc Button={10} />;
    <AfterHoc Button={<OtherButton size="lg" />} />;
    // with myself
    <AfterHoc Button={() => Button} />;
    // with another button
    <AfterHoc Button={(): typeof ButtonEnhanced => ButtonEnhanced} />;
    <AfterHoc Button={() => Fragment} />;
    // with myself but received from parameters
    <AfterHoc Button={(Button) => Button} />;
  }
}

/* multiple */ {
  const BeforeHoc: React.FC<{
    LeftButton: PartialComponent<typeof Button>;
    oldPropOptional?: string;
  }> = undefined as any;
  const AfterHoc = withComponent({ LeftButton: Button, RightButton: Button })(
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
