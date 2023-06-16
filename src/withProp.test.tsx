import { render } from "@testing-library/react";
import { componentDisplayName } from "./componentDisplayName";
import { withProp } from "./withProp";

function Example(props: { someProp: number }): JSX.Element {
  return <pre>{JSON.stringify(props)}</pre>;
}

it("withProp name", () => {
  const Component = withProp("someProp", 1)(Example);
  expect(componentDisplayName.get(Component)).toBe(
    "withProp.someProp(Example)"
  );
});

it("withProp with value", () => {
  const Component = withProp("someProp", 1)(Example);
  render(<Component />);
  expect(document.body.children[0].innerHTML).toBe('<pre>{"someProp":1}</pre>');
});

it("withProp with another value", () => {
  const Component = withProp("anotherProp", 1)(Example);
  render(<Component someProp={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"anotherProp":1,"someProp":2}</pre>'
  );
});

it("withProp with function", () => {
  const Component = withProp<number, "someProp", {}>(
    "someProp",
    () => 1,
    []
  )(Example);
  render(<Component />);
  expect(document.body.children[0].innerHTML).toBe('<pre>{"someProp":1}</pre>');
});

it("withProp a new property as value", () => {
  const Component = withProp("anotherProp", 10)(Example);
  render(<Component someProp={5} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"anotherProp":10,"someProp":5}</pre>'
  );
});

it("withProp a new property in dependencyNames", () => {
  const Component = withProp<number, "someProp", { anotherProp: number }>(
    "someProp",
    ({ anotherProp }) => anotherProp + 10,
    ["anotherProp"]
  )(Example);
  render(<Component anotherProp={5} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someProp":15,"anotherProp":5}</pre>'
  );
});

it("withProp overridden", () => {
  const Component = withProp("someProp", 10)(Example);
  render(<Component someProp={20} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someProp":20}</pre>'
  );
});

it("withProp rewritten", () => {
  const Component = withProp<number, "someProp", { someProp: number }>(
    "someProp",
    ({ someProp }) => someProp + 10,
    ["someProp"]
  )(Example);
  render(<Component someProp={20} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someProp":30}</pre>'
  );
});

it("withProp rewritten with different type", () => {
  const Component = withProp<number, "someProp", { someProp?: string }>(
    "someProp",
    ({ someProp }) => {
      if (typeof someProp !== "string") {
        throw new Error("it should be a string");
      }
      return parseInt(someProp) + 10;
    },
    ["someProp"]
  )(Example);
  render(<Component someProp="20" />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someProp":30}</pre>'
  );
});
