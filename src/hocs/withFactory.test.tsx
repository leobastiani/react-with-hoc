import { render } from "@testing-library/react";
import React from "react";
import { componentDisplayName } from "../utils/componentDisplayName";
import { withFactory } from "./withFactory";

function Example(props: { someProp: number }): JSX.Element {
  return <pre>{JSON.stringify(props)}</pre>;
}

it("withFactory name", () => {
  const Component = withFactory("someProp", () => 1, [])(Example);
  expect(componentDisplayName.get(Component)).toBe(
    "withFactory.someProp(Example)",
  );
});

it("withFactory with no dependencies", () => {
  const Component = withFactory("someProp", () => 1, [])(Example);
  // @ts-expect-error for testing purposes
  render(<Component someProp={2} />);
  expect(document.body.children[0].innerHTML).toBe('<pre>{"someProp":1}</pre>');
});

it("withFactory a new property in dependencyNames", () => {
  const Component = withFactory(
    "someProp",
    ({ anotherProp }: { anotherProp: number }) => anotherProp + 10,
    ["anotherProp"],
  )(Example);
  render(<Component anotherProp={5} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"anotherProp":5,"someProp":15}</pre>',
  );
});

it("withFactory rewritten", () => {
  const Component = withFactory(
    "someProp",
    ({ someProp }: { someProp: number }) => someProp + 10,
    ["someProp"],
  )(Example);
  render(<Component someProp={20} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someProp":30}</pre>',
  );
});

it("withFactory rewritten with different type", () => {
  const Component = withFactory(
    "someProp",
    ({ someProp }: { someProp?: string; x?: number }) => {
      if (typeof someProp !== "string") {
        throw new Error("it should be a string");
      }
      return parseInt(someProp) + 10;
    },
    ["someProp", "x"],
  )(Example);
  render(<Component someProp="20" />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someProp":30}</pre>',
  );
});
