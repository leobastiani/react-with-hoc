import { render } from "@testing-library/react";
import { componentDisplayName } from "./componentDisplayName";
import { withOmit } from "./withOmit";

interface ExampleProps {
  a: number;
  b: number;
  c: number;
}

function Example(props: ExampleProps): JSX.Element {
  return <pre>{JSON.stringify(props)}</pre>;
}

it("withOmit name", () => {
  const Component = withOmit(["b"])(Example);
  expect(componentDisplayName.get(Component)).toBe("withOmit.b(Example)");
});

it("withOmit", () => {
  const Component = withOmit(["b"] as const)(Example);
  render(<Component a={1} c={2} />);
  expect(document.body.children[0].innerHTML).toBe('<pre>{"a":1,"c":2}</pre>');
});
