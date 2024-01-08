import { render } from "@testing-library/react";
import React from "react";
import { componentDisplayName } from "../utils/componentDisplayName";
import { withDefaults } from "./withDefaults";

function Example(props: { someProp: number }): JSX.Element {
  return <pre>{JSON.stringify(props)}</pre>;
}

it("withDefaults name", () => {
  const Component = withDefaults({ someProp: 1, anotherProp: 2 })(Example);
  expect(componentDisplayName.get(Component)).toBe(
    "withDefaults.someProp.anotherProp(Example)",
  );
});

it("withDefaults with value", () => {
  const Component = withDefaults({ someProp: 1 })(Example);
  render(<Component />);
  expect(document.body.children[0].innerHTML).toBe('<pre>{"someProp":1}</pre>');
});

it("withDefaults with another value", () => {
  const Component = withDefaults({ anotherProp: 1 })(Example);
  render(<Component someProp={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"anotherProp":1,"someProp":2}</pre>',
  );
});

it("withDefaults overridden", () => {
  const Component = withDefaults({ someProp: 10 })(Example);
  render(<Component someProp={20} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someProp":20}</pre>',
  );
});
