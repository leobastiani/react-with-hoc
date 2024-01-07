import { act, render } from "@testing-library/react";
import React, { FunctionComponent } from "react";
import { PartialComponent } from "../types/PartialComponent";
import { componentDisplayName } from "../utils/componentDisplayName";
import { withComponents } from "./withComponents";
import { withHocs } from "./withHocs";
import { withProp } from "./withProp";
import { withState } from "./withState";

interface ExampleProps {
  a: number;
  b: number;
  setA: React.Dispatch<React.SetStateAction<number>>;
  Left: PartialComponent<typeof Left>;
  Right: PartialComponent<typeof Right>;
}

let setA: React.Dispatch<React.SetStateAction<number>>;

function Example({
  a,
  b,
  setA: mySetA,
  Left,
  Right,
}: ExampleProps): JSX.Element {
  setA = mySetA;
  return (
    <>
      <Left />
      <pre id="main">{JSON.stringify({ a, b })}</pre>
      <Right />
    </>
  );
}

function Side({ side, ...props }: { side: string }): JSX.Element {
  return <pre id={side}>{JSON.stringify(props)}</pre>;
}

const Left = withProp("side", "left")(Side);
const Right = withProp("side", "right")(Side);

it("withComponents name", () => {
  const Component = withComponents({ Left, Right })(Example);
  expect(componentDisplayName.get(Component)).toBe(
    "withComponent.Left.Right(Example)",
  );
});

it("withComponents with default behavior", () => {
  const Component = withHocs([
    withState<number, "a">("a"),
    withComponents({ Left, Right }),
  ])(Example);
  render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="left">{"a":1,"b":2}</pre><pre id="main">{"a":1,"b":2}</pre><pre id="right">{"a":1,"b":2}</pre>',
  );
});

it("withComponents disabled", () => {
  const Component = withHocs([
    withState<number, "a">("a"),
    withComponents({ Left, Right }),
  ])(Example);
  render(<Component a={1} b={2} Left={null} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="main">{"a":1,"b":2}</pre><pre id="right">{"a":1,"b":2,"Left":null}</pre>',
  );
});

it("withComponents overridden", () => {
  const Component = withHocs([
    withState<number, "a">("a"),
    withComponents({ Left, Right }),
  ])(Example);
  render(<Component a={1} b={2} Left={10} />);
  expect(document.body.children[0].innerHTML).toBe(
    '10<pre id="main">{"a":1,"b":2}</pre><pre id="right">{"a":1,"b":2,"Left":10}</pre>',
  );
});

it("withComponents rerenders when props change", () => {
  const Component = withHocs([
    withState("a", { init: 1 }),
    withComponents({ Left, Right }),
  ])(Example);
  render(<Component b={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="left">{"a":1,"b":2}</pre><pre id="main">{"a":1,"b":2}</pre><pre id="right">{"a":1,"b":2}</pre>',
  );
  act(() => {
    setA(3);
  });
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="left">{"a":3,"b":2}</pre><pre id="main">{"a":3,"b":2}</pre><pre id="right">{"a":3,"b":2}</pre>',
  );
});

it("passing a function as an attribute", () => {
  const Component = withHocs([
    withState<number, "a">("a"),
    withComponents({ Left, Right }),
  ])(Example);

  function Pre(props: object): JSX.Element {
    return <pre>{JSON.stringify(props)}</pre>;
  }

  render(<Component a={1} b={2} Left={() => Pre as FunctionComponent} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"a":1,"b":2}</pre><pre id="main">{"a":1,"b":2}</pre><pre id="right">{"a":1,"b":2}</pre>',
  );
});
