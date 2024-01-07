import { act, render } from "@testing-library/react";
import React, { ComponentProps } from "react";
import { PartialComponent } from "../types/PartialComponent";
import { componentDisplayName } from "../utils/componentDisplayName";
import { withComponent } from "./withComponent";
import { withHocs } from "./withHocs";
import { withState } from "./withState";

interface ExampleProps {
  a: number;
  b: number;
  setA: React.Dispatch<React.SetStateAction<number>>;
  Side: PartialComponent<typeof Side>;
}

let setA: React.Dispatch<React.SetStateAction<number>>;

function Example1({
  a,
  b,
  setA: mySetA,
  Side,
}: ExampleProps & { setA: typeof setA }): JSX.Element {
  setA = mySetA;
  return (
    <>
      <Side />
      <pre id="main">{JSON.stringify({ a, b })}</pre>
    </>
  );
}

function Example2({
  a,
  b,
  setA: mySetA,
  Side,
}: ExampleProps & { setA: typeof setA }): JSX.Element {
  setA = mySetA;
  return (
    <>
      <Side someProp={10} />
      <pre id="main">{JSON.stringify({ a, b })}</pre>
    </>
  );
}

function Side(props: { someProp: number }): JSX.Element {
  return <pre id="side">{JSON.stringify(props)}</pre>;
}

function AnotherSide(props: { someAnotherProp: string }): JSX.Element {
  return <pre id="another-side">{JSON.stringify(props)}</pre>;
}

it("withComponent name", () => {
  const Component = withComponent("Side", Side)(Example1);
  expect(componentDisplayName.get(Component)).toBe(
    "withComponent.Side(Example1)",
  );
});

it("withComponent with default behavior", () => {
  const Component = withHocs([
    withState<number, "a">("a"),
    withComponent("Side", Side),
  ])(Example1);
  render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="side">{"a":1,"b":2}</pre><pre id="main">{"a":1,"b":2}</pre>',
  );
});

it("withComponent with default behavior and prop", () => {
  const Component = withHocs([
    withState<number, "a">("a"),
    withComponent("Side", Side),
  ])(Example2);
  render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="side">{"a":1,"b":2,"someProp":10}</pre><pre id="main">{"a":1,"b":2}</pre>',
  );
});

it("withComponent disabled", () => {
  const Component = withHocs([
    withState<number, "a">("a"),
    withComponent("Side", Side),
  ])(Example1);
  render(<Component a={1} b={2} Side={null} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="main">{"a":1,"b":2}</pre>',
  );
});

it("withComponent overridden", () => {
  const Component = withHocs([
    withState<number, "a">("a"),
    withComponent("Side", Side),
  ])(Example1);
  render(<Component a={1} b={2} Side={10} />);
  expect(document.body.children[0].innerHTML).toBe(
    '10<pre id="main">{"a":1,"b":2}</pre>',
  );
});

it("withComponent by object", () => {
  const Component = withHocs([
    withState<number, "a">("a"),
    withComponent("Side", Side),
  ])(Example2);
  render(<Component a={1} b={2} Side={{ someProp: 20 }} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="side">{"a":1,"b":2,"Side":{"someProp":20},"someProp":20}</pre><pre id="main">{"a":1,"b":2}</pre>',
  );
});

it("withComponent with object", () => {
  const Component = withHocs([
    withState<number, "a">("a"),
    withComponent("Side", Side),
  ])(Example2);
  render(<Component a={1} b={2} Side={{ someProp: 20 }} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="side">{"a":1,"b":2,"Side":{"someProp":20},"someProp":20}</pre><pre id="main">{"a":1,"b":2}</pre>',
  );
});

it("withComponent with element", () => {
  const Component = withHocs([
    withState<number, "a">("a"),
    withComponent("Side", Side),
  ])(Example2);
  render(<Component a={1} b={2} Side={<AnotherSide someAnotherProp="20" />} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="another-side">{"someAnotherProp":"20"}</pre><pre id="main">{"a":1,"b":2}</pre>',
  );
});

it("withComponent hiddenByDefault", () => {
  const Component = withHocs([
    withState<number, "a">("a"),
    withComponent("Side", Side, { hiddenByDefault: true }),
  ])(Example1);
  const { rerender } = render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="main">{"a":1,"b":2}</pre>',
  );
  rerender(<Component a={1} b={2} Side={true} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="side">{"a":1,"b":2,"Side":true}</pre><pre id="main">{"a":1,"b":2}</pre>',
  );
});

it("withComponent pick", () => {
  const Component = withHocs([
    withState<number, "a">("a"),
    withComponent("Side", Side, { pick: ["b"] }),
  ])(Example1);
  render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="side">{"b":2}</pre><pre id="main">{"a":1,"b":2}</pre>',
  );
});

it("withComponent omit", () => {
  const Component = withHocs([
    withState<number, "a">("a"),
    withComponent("Side", Side, { omit: ["b"] }),
  ])(Example1);
  render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="side">{"a":1}</pre><pre id="main">{"a":1,"b":2}</pre>',
  );
});

it("withComponent rerenders when props change", () => {
  const Component = withHocs([
    withState("a", { init: 1 }),
    withComponent("Side", Side),
  ])(Example1);
  render(<Component b={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="side">{"a":1,"b":2}</pre><pre id="main">{"a":1,"b":2}</pre>',
  );
  act(() => {
    setA(3);
  });
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="side">{"a":3,"b":2}</pre><pre id="main">{"a":3,"b":2}</pre>',
  );
});

describe("passing a function as an attribute", () => {
  it("hiddenByDefault = false", () => {
    const Component = withHocs([
      withState<number, "a">("a"),
      withComponent("Side", Side),
    ])(Example1);
    render(
      <Component
        a={1}
        b={2}
        Side={(MySide) =>
          // eslint-disable-next-line react/display-name
          (props: ComponentProps<typeof AnotherSide>): JSX.Element => {
            expect(MySide).toBe(Side);
            return <AnotherSide {...props} />;
          }}
      />,
    );
    expect(document.body.children[0].innerHTML).toBe(
      '<pre id="another-side">{"a":1,"b":2}</pre><pre id="main">{"a":1,"b":2}</pre>',
    );
  });

  it("hiddenByDefault = true", () => {
    const Component = withHocs([
      withState<number, "a">("a"),
      withComponent("Side", Side, { hiddenByDefault: true }),
    ])(Example1);
    render(
      <Component
        a={1}
        b={2}
        Side={(MySide) =>
          // eslint-disable-next-line react/display-name
          (props: ComponentProps<typeof AnotherSide>): JSX.Element => {
            expect(MySide).toBe(Side);
            return <AnotherSide {...props} />;
          }}
      />,
    );
    expect(document.body.children[0].innerHTML).toBe(
      '<pre id="another-side">{"a":1,"b":2}</pre><pre id="main">{"a":1,"b":2}</pre>',
    );
  });
});
