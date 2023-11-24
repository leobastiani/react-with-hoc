import { render } from "@testing-library/react";
import { withProp } from ".";
import { componentDisplayName } from "../../lib/componentDisplayName";

function Example(props: { someProp: number }): JSX.Element {
  return <pre>{JSON.stringify(props)}</pre>;
}

it("withProp name", () => {
  const Component = withProp({ someProp: 1, anotherProp: 2 })(Example);
  expect(componentDisplayName.get(Component)).toBe(
    "withProp.someProp.anotherProp(Example)"
  );
});

it("withProp with value", () => {
  const Component = withProp({ someProp: 1 })(Example);
  render(<Component />);
  expect(document.body.children[0].innerHTML).toBe('<pre>{"someProp":1}</pre>');
});

it("withProp with another value", () => {
  const Component = withProp({ anotherProp: 1 })(Example);
  render(<Component someProp={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"anotherProp":1,"someProp":2}</pre>'
  );
});

it("withProp overridden", () => {
  const Component = withProp({ someProp: 10 })(Example);
  render(<Component someProp={20} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someProp":20}</pre>'
  );
});
