import { render } from "@testing-library/react";
import React from "react";
import { componentDisplayName } from "../utils/componentDisplayName";
import { withOverride } from "./withOverride";

function Example(props: { someProp: number }): JSX.Element {
  return <pre>{JSON.stringify(props)}</pre>;
}

it("withOverride name", () => {
  const Component = withOverride("someProp", 1)(Example);
  expect(componentDisplayName.get(Component)).toBe(
    "withOverride.someProp(Example)",
  );
});

it("withOverride with value", () => {
  const Component = withOverride("someProp", 1)(Example);
  render(<Component />);
  expect(document.body.children[0].innerHTML).toBe('<pre>{"someProp":1}</pre>');
});

it("withOverride with another value", () => {
  const Component = withOverride("anotherProp", 1)(Example);
  render(<Component someProp={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someProp":2,"anotherProp":1}</pre>',
  );
});

it("withOverride a new property as value", () => {
  const Component = withOverride("anotherProp", 10)(Example);
  render(<Component someProp={5} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someProp":5,"anotherProp":10}</pre>',
  );
});

it("withOverride can not accept the same property again", () => {
  const Component = withOverride("someProp", 10)(Example);
  // @ts-expect-error for testing purposes
  render(<Component someProp={20} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someProp":10}</pre>',
  );
});
