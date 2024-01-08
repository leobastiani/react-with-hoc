import { render } from "@testing-library/react";
import React from "react";
import { componentDisplayName } from "../utils/componentDisplayName";
import { withOverrides } from "./withOverrides";

function Example(props: { someProp: number }): JSX.Element {
  return <pre>{JSON.stringify(props)}</pre>;
}

it("withOverrides name", () => {
  const Component = withOverrides({ someProp: 1, anotherProp: 2 })(Example);
  expect(componentDisplayName.get(Component)).toBe(
    "withOverrides.someProp.anotherProp(Example)",
  );
});

it("withOverrides with value", () => {
  const Component = withOverrides({ someProp: 1 })(Example);
  render(<Component />);
  expect(document.body.children[0].innerHTML).toBe('<pre>{"someProp":1}</pre>');
});

it("withOverrides with another value", () => {
  const Component = withOverrides({ anotherProp: 1 })(Example);
  render(<Component someProp={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someProp":2,"anotherProp":1}</pre>',
  );
});

it("withOverrides overridden", () => {
  const Component = withOverrides({ someProp: 10 })(Example);
  // @ts-expect-error for testing purposes
  render(<Component someProp={20} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someProp":10}</pre>',
  );
});
