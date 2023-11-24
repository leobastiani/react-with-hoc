import { act, render } from "@testing-library/react";
import { ComponentProps } from "react";
import { componentDisplayName } from "../../lib/componentDisplayName";
import { PartialComponent } from "../../types/PartialComponent";
import { withHocs } from "../../withHocs";
import { withState } from "../../withState";
import { withComponentSingle } from "./withComponentSingle";

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

it("withComponentSingle name", () => {
  const Component = withComponentSingle("Side", Side)(Example1);
  expect(componentDisplayName.get(Component)).toBe(
    "withComponentSingle.Side(Example1)"
  );
});

it("withComponentSingle with default behavior", () => {
  const Component = withHocs([
    withState<number, "a">("a"),
    withComponentSingle("Side", Side),
  ])(Example1);
  render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="side">{"a":1,"b":2}</pre><pre id="main">{"a":1,"b":2}</pre>'
  );
});

it("withComponentSingle with default behavior and prop", () => {
  const Component = withHocs([
    withState<number, "a">("a"),
    withComponentSingle("Side", Side),
  ])(Example2);
  render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="side">{"a":1,"b":2,"someProp":10}</pre><pre id="main">{"a":1,"b":2}</pre>'
  );
});

it("withComponentSingle disabled", () => {
  const Component = withHocs([
    withState<number, "a">("a"),
    withComponentSingle("Side", Side),
  ])(Example1);
  render(<Component a={1} b={2} Side={null} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="main">{"a":1,"b":2}</pre>'
  );
});

it("withComponentSingle overridden", () => {
  const Component = withHocs([
    withState<number, "a">("a"),
    withComponentSingle("Side", Side),
  ])(Example1);
  render(<Component a={1} b={2} Side={10} />);
  expect(document.body.children[0].innerHTML).toBe(
    '10<pre id="main">{"a":1,"b":2}</pre>'
  );
});

it("withComponentSingle by object", () => {
  const Component = withHocs([
    withState<number, "a">("a"),
    withComponentSingle("Side", Side),
  ])(Example2);
  render(<Component a={1} b={2} Side={{ someProp: 20 }} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="side">{"a":1,"b":2,"Side":{"someProp":20},"someProp":20}</pre><pre id="main">{"a":1,"b":2}</pre>'
  );
});

it("withComponentSingle with object", () => {
  const Component = withHocs([
    withState<number, "a">("a"),
    withComponentSingle("Side", Side),
  ])(Example2);
  render(<Component a={1} b={2} Side={{ someProp: 20 }} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="side">{"a":1,"b":2,"Side":{"someProp":20},"someProp":20}</pre><pre id="main">{"a":1,"b":2}</pre>'
  );
});

it("withComponentSingle with element", () => {
  const Component = withHocs([
    withState<number, "a">("a"),
    withComponentSingle("Side", Side),
  ])(Example2);
  render(<Component a={1} b={2} Side={<AnotherSide someAnotherProp="20" />} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="another-side">{"someAnotherProp":"20"}</pre><pre id="main">{"a":1,"b":2}</pre>'
  );
});

it("withComponentSingle hiddenByDefault", () => {
  const Component = withHocs([
    withState<number, "a">("a"),
    withComponentSingle("Side", Side, { hiddenByDefault: true }),
  ])(Example1);
  const { rerender } = render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="main">{"a":1,"b":2}</pre>'
  );
  rerender(<Component a={1} b={2} Side={true} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="side">{"a":1,"b":2,"Side":true}</pre><pre id="main">{"a":1,"b":2}</pre>'
  );
});

it("withComponentSingle pick", () => {
  const Component = withHocs([
    withState<number, "a">("a"),
    withComponentSingle("Side", Side, { pick: ["b"] }),
  ])(Example1);
  render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="side">{"b":2}</pre><pre id="main">{"a":1,"b":2}</pre>'
  );
});

it("withComponentSingle omit", () => {
  const Component = withHocs([
    withState<number, "a">("a"),
    withComponentSingle("Side", Side, { omit: ["b"] }),
  ])(Example1);
  render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="side">{"a":1}</pre><pre id="main">{"a":1,"b":2}</pre>'
  );
});

it("withComponentSingle rerenders when props change", () => {
  const Component = withHocs([
    withState("a", { init: 1 }),
    withComponentSingle("Side", Side),
  ])(Example1);
  render(<Component b={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="side">{"a":1,"b":2}</pre><pre id="main">{"a":1,"b":2}</pre>'
  );
  act(() => {
    setA(3);
  });
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="side">{"a":3,"b":2}</pre><pre id="main">{"a":3,"b":2}</pre>'
  );
});

describe("passing a function as an attribute", () => {
  it("hiddenByDefault = false", () => {
    const Component = withHocs([
      withState<number, "a">("a"),
      withComponentSingle("Side", Side),
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
      />
    );
    expect(document.body.children[0].innerHTML).toBe(
      '<pre id="another-side">{"a":1,"b":2}</pre><pre id="main">{"a":1,"b":2}</pre>'
    );
  });

  it("hiddenByDefault = true", () => {
    const Component = withHocs([
      withState<number, "a">("a"),
      withComponentSingle("Side", Side, { hiddenByDefault: true }),
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
      />
    );
    expect(document.body.children[0].innerHTML).toBe(
      '<pre id="another-side">{"a":1,"b":2}</pre><pre id="main">{"a":1,"b":2}</pre>'
    );
  });
});
