import { render } from "@testing-library/react";
import { componentDisplayName } from "./componentDisplayName";
import { withProps } from "./withProps";

function Example(props: { someProp: number }): JSX.Element {
  return <pre>{JSON.stringify(props)}</pre>;
}

it("withProps name", () => {
  const Component = withProps({ someProp: 1, anotherProp: 2 })(Example);
  expect(componentDisplayName.get(Component)).toBe(
    "withProps.someProp.anotherProp(Example)"
  );
});

it("withProps with value", () => {
  const Component = withProps({ someProp: 1 })(Example);
  render(<Component />);
  expect(document.body.children[0].innerHTML).toBe('<pre>{"someProp":1}</pre>');
});

it("withProp with another value", () => {
  const Component = withProps({ anotherProp: 1 })(Example);
  render(<Component someProp={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"anotherProp":1,"someProp":2}</pre>'
  );
});

it("withProp overridden", () => {
  const Component = withProps({ someProp: 10 })(Example);
  render(<Component someProp={20} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someProp":20}</pre>'
  );
});
