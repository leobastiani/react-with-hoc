import { render } from "@testing-library/react";
import { CSSProperties } from "react";
import { componentDisplayName } from "./componentDisplayName";
import { withHocs } from "./withHocs";
import { withStyle } from "./withStyle";

function Example(props: { style: CSSProperties }): JSX.Element {
  return <pre>{JSON.stringify(props)}</pre>;
}

it("withStyle name", () => {
  const Component = withStyle({})(Example);
  expect(componentDisplayName.get(Component)).toBe("withStyle(Example)");
});

it("withStyle with value", () => {
  const Component = withStyle({ background: "red" })(Example);
  render(<Component />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"style":{"background":"red"}}</pre>'
  );
});

it("withStyle with function", () => {
  const Component = withStyle(() => ({ background: "blue" }), [])(Example);
  render(<Component />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"style":{"background":"blue"}}</pre>'
  );
});

it("withStyle a new property in dependencyNames", () => {
  const Component = withStyle(
    ({ background }: { background: string }) => ({ background }),
    ["background"]
  )(Example);
  render(<Component background="yellow" />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"style":{"background":"yellow"},"background":"yellow"}</pre>'
  );
});

it("withStyle overridden", () => {
  const Component = withStyle({ background: "red" })(Example);
  render(<Component style={{ border: "none" }} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"style":{"background":"red","border":"none"}}</pre>'
  );
});

it("withStyle rewritten", () => {
  const Component = withStyle(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_options: { style: CSSProperties }) => ({ width: "100%" }),
    ["style"]
  )(Example);
  render(<Component style={{ background: "black" }} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"style":{"width":"100%"}}</pre>'
  );
});

it("withStyle with style twice", () => {
  const Component = withHocs(
    withStyle({
      background: "black",
      borderColor: "white",
    }),
    withStyle({
      borderColor: "red",
      display: "block",
    })
  )(Example);
  render(<Component />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"style":{"borderColor":"white","display":"block","background":"black"}}</pre>'
  );
});
