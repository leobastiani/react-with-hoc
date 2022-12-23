import { render } from "@testing-library/react";
import { componentDisplayName } from "./componentDisplayName";
import { withProp } from "./withProp";

function Example(props: { someProp: number }) {
  return <pre>{JSON.stringify(props)}</pre>;
}

it("withProps with value", () => {
  const Component = withProp("someProp", 1)(Example);
  render(<Component />);
  expect(document.body.children[0].innerHTML).toBe('<pre>{"someProp":1}</pre>');
  expect(componentDisplayName.get(Component)).toBe(
    "withProp.someProp(Example)"
  );
});

it("withProps with function", () => {
  const Component = withProp("someProp", () => 1, [])(Example);
  render(<Component />);
  expect(document.body.children[0].innerHTML).toBe('<pre>{"someProp":1}</pre>');
  expect(componentDisplayName.get(Component)).toBe(
    "withProp.someProp(Example)"
  );
});
