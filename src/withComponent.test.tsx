import { act, render } from "@testing-library/react";
import { PartialComponent } from "./@types/PartialComponent";
import { SetState } from "./@types/SetState";
import { componentDisplayName } from "./componentDisplayName";
import { withComponent } from "./withComponent";
import { withRevHocs } from "./withRevHocs";
import { withState } from "./withState";

interface ExampleProps {
  a: number;
  b: number;
  setA: SetState<number>;
  Side: PartialComponent<typeof Side>;
}

let setA: SetState<number>;

function Example({
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

function Side(props: { someProp: number }): JSX.Element {
  return <pre id="side">{JSON.stringify(props)}</pre>;
}

function AnotherSide(props: { someAnotherProp: string }): JSX.Element {
  return <pre id="another-side">{JSON.stringify(props)}</pre>;
}

it("withComponent name", () => {
  const Component = withComponent("Side", Side)(Example);
  expect(componentDisplayName.get(Component)).toBe(
    "withComponent.Side(Example)"
  );
});

it("withComponent with default behavior", () => {
  const Component = withRevHocs(
    withState<number, "a">("a"),
    withComponent("Side", Side)
  )(Example);
  render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="side">{"a":1,"b":2}</pre><pre id="main">{"a":1,"b":2}</pre>'
  );
});

it("withComponent disabled", () => {
  const Component = withRevHocs(
    withState<number, "a">("a"),
    withComponent("Side", Side)
  )(Example);
  render(<Component a={1} b={2} Side={null} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="main">{"a":1,"b":2}</pre>'
  );
});

it("withComponent overridden", () => {
  const Component = withRevHocs(
    withState<number, "a">("a"),
    withComponent("Side", Side)
  )(Example);
  render(<Component a={1} b={2} Side={10} />);
  expect(document.body.children[0].innerHTML).toBe(
    '10<pre id="main">{"a":1,"b":2}</pre>'
  );
});

it("withComponent hiddenByDefault", () => {
  const Component = withRevHocs(
    withState<number, "a">("a"),
    withComponent("Side", Side, { hiddenByDefault: true })
  )(Example);
  const { rerender } = render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="main">{"a":1,"b":2}</pre>'
  );
  rerender(<Component a={1} b={2} Side={true} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="side">{"a":1,"b":2,"Side":true}</pre><pre id="main">{"a":1,"b":2}</pre>'
  );
});

it("withComponent pick", () => {
  const Component = withRevHocs(
    withState<number, "a">("a"),
    withComponent("Side", Side, { pick: ["b"] })
  )(Example);
  render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="side">{"b":2}</pre><pre id="main">{"a":1,"b":2}</pre>'
  );
});

it("withComponent omit", () => {
  const Component = withRevHocs(
    withState<number, "a">("a"),
    withComponent("Side", Side, { omit: ["b"] })
  )(Example);
  render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="side">{"a":1}</pre><pre id="main">{"a":1,"b":2}</pre>'
  );
});

it("withComponent rerenders when props change", () => {
  const Component = withRevHocs(
    withComponent("Side", Side),
    withState("a", { init: 1 })
  )(Example);
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
    const Component = withRevHocs(
      withState<number, "a">("a"),
      withComponent("Side", Side)
    )(Example);
    render(
      <Component
        a={1}
        b={2}
        Side={(MySide) =>
          // eslint-disable-next-line react/display-name
          (props): JSX.Element => {
            expect(MySide).toBe(Side);
            //@ts-expect-error
            return <AnotherSide {...props} />;
          }}
      />
    );
    expect(document.body.children[0].innerHTML).toBe(
      '<pre id="another-side">{"a":1,"b":2}</pre><pre id="main">{"a":1,"b":2}</pre>'
    );
  });

  it("hiddenByDefault = true", () => {
    const Component = withRevHocs(
      withState<number, "a">("a"),
      withComponent("Side", Side, { hiddenByDefault: true })
    )(Example);
    render(
      <Component
        a={1}
        b={2}
        Side={(MySide) =>
          // eslint-disable-next-line react/display-name
          (props): JSX.Element => {
            expect(MySide).toBe(Side);
            //@ts-expect-error
            return <AnotherSide {...props} />;
          }}
      />
    );
    expect(document.body.children[0].innerHTML).toBe(
      '<pre id="another-side">{"a":1,"b":2}</pre><pre id="main">{"a":1,"b":2}</pre>'
    );
  });
});
