/* eslint-disable @typescript-eslint/no-unused-vars */
import { render } from "@testing-library/react";
import { CSSProperties } from "react";
import { componentDisplayName } from "./componentDisplayName";
import { withHocs } from "./withHocs";
import { withStyleObjectStrategy } from "./withStyleObjectStrategy";

function Example(props: { style: CSSProperties }): JSX.Element {
  return <pre>{JSON.stringify(props)}</pre>;
}

it("withStyleObjectStrategy name", () => {
  const Component = withStyleObjectStrategy({
    borderColor: "red",
  })(Example);
  expect(componentDisplayName.get(Component)).toBe(
    "withStyleObjectStrategy(Example)"
  );
});

it("withStyleObjectStrategy name with dependency array", () => {
  const Component = withStyleObjectStrategy({
    borderColor: "red",
  })(Example);
  expect(componentDisplayName.get(Component)).toBe(
    "withStyleObjectStrategy(Example)"
  );
});

it("withStyleObjectStrategy with value", () => {
  const Component = withStyleObjectStrategy<{ background?: string }>(
    ({ background }) => ({
      background,
    }),
    ["background"]
  )(Example);
  render(<Component />);
  expect(componentDisplayName.get(Component)).toBe(
    "withStyleObjectStrategy.background(Example)"
  );
});

it("withStyleObjectStrategy with function", () => {
  const Component = withStyleObjectStrategy<{}>(
    () => ({ background: "blue" }),
    []
  )(Example);
  render(<Component />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"style":{"background":"blue"}}</pre>'
  );
});

it("withStyleObjectStrategy a new property in dependencyNames", () => {
  const Component = withStyleObjectStrategy<{ background: string }>(
    ({ background }) => ({ background }),
    ["background"]
  )(Example);
  render(<Component background="yellow" />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"background":"yellow","style":{"background":"yellow"}}</pre>'
  );
});

it("withStyleObjectStrategy overridden", () => {
  const Component = withStyleObjectStrategy({ background: "red" })(Example);
  render(<Component style={{ border: "none" }} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"style":{"background":"red","border":"none"}}</pre>'
  );
});

it("withStyleObjectStrategy rewritten", () => {
  const Component = withStyleObjectStrategy<{ style: CSSProperties }>(
    (_props) => ({ width: "100%" }),
    ["style"]
  )(Example);
  render(<Component style={{ background: "black" }} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"style":{"width":"100%"}}</pre>'
  );
});

it("withStyleObjectStrategy with style twice", () => {
  const Component = withHocs(
    withStyleObjectStrategy({
      background: "black",
      borderColor: "white",
    }),
    withStyleObjectStrategy({
      borderColor: "red",
      display: "block",
    })
  )(Example);
  render(<Component />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"style":{"background":"black","borderColor":"red","display":"block"}}</pre>'
  );
});
