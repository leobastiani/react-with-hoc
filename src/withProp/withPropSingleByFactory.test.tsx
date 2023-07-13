import { render } from "@testing-library/react";
import { withProp } from ".";
import { componentDisplayName } from "../componentDisplayName";

function Example(props: { someProp: number }): JSX.Element {
  return <pre>{JSON.stringify(props)}</pre>;
}

it("withProp name", () => {
  const Component = withProp("someProp", () => 1, [])(Example);
  expect(componentDisplayName.get(Component)).toBe(
    "withProp.someProp(Example)"
  );
});

it("withProp with no dependencies", () => {
  const Component = withProp("someProp", () => 1, [])(Example);
  render(<Component />);
  expect(document.body.children[0].innerHTML).toBe('<pre>{"someProp":1}</pre>');
});

it("withProp a new property in dependencyNames", () => {
  const Component = withProp(
    "someProp",
    ({ anotherProp }: { anotherProp: number }) => anotherProp + 10,
    ["anotherProp"]
  )(Example);
  render(<Component anotherProp={5} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someProp":15,"anotherProp":5}</pre>'
  );
});

it("withProp rewritten", () => {
  const Component = withProp(
    "someProp",
    ({ someProp }: { someProp: number }) => someProp + 10,
    ["someProp"]
  )(Example);
  render(<Component someProp={20} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someProp":30}</pre>'
  );
});

it("withProp rewritten with different type", () => {
  const Component = withProp(
    "someProp",
    ({ someProp }: { someProp?: string; x?: number }) => {
      if (typeof someProp !== "string") {
        throw new Error("it should be a string");
      }
      return parseInt(someProp) + 10;
    },
    ["someProp", "x"]
  )(Example);
  render(<Component someProp="20" />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someProp":30}</pre>'
  );
});
