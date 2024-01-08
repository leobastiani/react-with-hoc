import { render } from "@testing-library/react";
import React from "react";
import { componentDisplayName } from "../utils/componentDisplayName";
import { withDefault } from "./withDefault";

function Example(props: { someProp: number }): JSX.Element {
  return <pre>{JSON.stringify(props)}</pre>;
}

it("withDefault name", () => {
  const Component = withDefault("someProp", 1)(Example);
  expect(componentDisplayName.get(Component)).toBe(
    "withDefault.someProp(Example)",
  );
});

it("withDefault with value", () => {
  const Component = withDefault("someProp", 1)(Example);
  render(<Component />);
  expect(document.body.children[0].innerHTML).toBe('<pre>{"someProp":1}</pre>');
});

it("withDefault with another value", () => {
  const Component = withDefault("anotherProp", 1)(Example);
  render(<Component someProp={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"anotherProp":1,"someProp":2}</pre>',
  );
});

it("withDefault a new property as value", () => {
  const Component = withDefault("anotherProp", 10)(Example);
  render(<Component someProp={5} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"anotherProp":10,"someProp":5}</pre>',
  );
});

it("withDefault overridden", () => {
  const Component = withDefault("someProp", 10)(Example);
  render(<Component someProp={20} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someProp":20}</pre>',
  );
});
