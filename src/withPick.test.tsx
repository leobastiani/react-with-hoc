import { render } from "@testing-library/react";
import { componentDisplayName } from "./lib/componentDisplayName";
import { withPick } from "./withPick";

interface ExampleProps {
  a: number;
  b: number;
  c: number;
}

function Example(props: ExampleProps): JSX.Element {
  return <pre>{JSON.stringify(props)}</pre>;
}

it("withPick name", () => {
  const Component = withPick(["b", "a"])(Example);
  expect(componentDisplayName.get(Component)).toBe("withPick.b.a(Example)");
});

it("withPick", () => {
  const Component = withPick(["b"])(Example);
  render(<Component b={1} />);
  expect(document.body.children[0].innerHTML).toBe('<pre>{"b":1}</pre>');
});
