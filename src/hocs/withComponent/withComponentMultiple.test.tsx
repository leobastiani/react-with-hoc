import { act, render } from "@testing-library/react";
import { FunctionComponent } from "react";
import { componentDisplayName } from "../../lib/componentDisplayName";
import { PartialComponent } from "../../types/PartialComponent";
import { withHocs } from "../../withHocs";
import { withProp } from "../../withProp";
import { withState } from "../../withState";
import { withComponentMultiple } from "./withComponentMultiple";

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

it("withComponentMultiple name", () => {
  const Component = withComponentMultiple({ Left, Right })(Example);
  expect(componentDisplayName.get(Component)).toBe(
    "withComponentMultiple.Left.Right(Example)"
  );
});

it("withComponentMultiple with default behavior", () => {
  const Component = withHocs([
    withState<number, "a">("a"),
    withComponentMultiple({ Left, Right }),
  ])(Example);
  render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="left">{"a":1,"b":2}</pre><pre id="main">{"a":1,"b":2}</pre><pre id="right">{"a":1,"b":2}</pre>'
  );
});

it("withComponentMultiple disabled", () => {
  const Component = withHocs([
    withState<number, "a">("a"),
    withComponentMultiple({ Left, Right }),
  ])(Example);
  render(<Component a={1} b={2} Left={null} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="main">{"a":1,"b":2}</pre><pre id="right">{"a":1,"b":2,"Left":null}</pre>'
  );
});

it("withComponentMultiple overridden", () => {
  const Component = withHocs([
    withState<number, "a">("a"),
    withComponentMultiple({ Left, Right }),
  ])(Example);
  render(<Component a={1} b={2} Left={10} />);
  expect(document.body.children[0].innerHTML).toBe(
    '10<pre id="main">{"a":1,"b":2}</pre><pre id="right">{"a":1,"b":2,"Left":10}</pre>'
  );
});

it("withComponentMultiple rerenders when props change", () => {
  const Component = withHocs([
    withState("a", { init: 1 }),
    withComponentMultiple({ Left, Right }),
  ])(Example);
  render(<Component b={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="left">{"a":1,"b":2}</pre><pre id="main">{"a":1,"b":2}</pre><pre id="right">{"a":1,"b":2}</pre>'
  );
  act(() => {
    setA(3);
  });
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="left">{"a":3,"b":2}</pre><pre id="main">{"a":3,"b":2}</pre><pre id="right">{"a":3,"b":2}</pre>'
  );
});

it("passing a function as an attribute", () => {
  const Component = withHocs([
    withState<number, "a">("a"),
    withComponentMultiple({ Left, Right }),
  ])(Example);

  function Pre(props: object): JSX.Element {
    return <pre>{JSON.stringify(props)}</pre>;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render(<Component a={1} b={2} Left={() => Pre as FunctionComponent} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"a":1,"b":2}</pre><pre id="main">{"a":1,"b":2}</pre><pre id="right">{"a":1,"b":2}</pre>'
  );
});
