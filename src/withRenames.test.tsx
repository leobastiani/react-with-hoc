import { render } from "@testing-library/react";
import { componentDisplayName } from "./componentDisplayName";
import { withRenames } from "./withRenames";

interface ExampleProps {
  a: number;
  b: number;
  c: number;
}

function Example(props: ExampleProps): JSX.Element {
  return <pre>{JSON.stringify(props)}</pre>;
}

it("withRenames name", () => {
  const Component = withRenames({ e: "b", d: "a" } as const)(Example);
  expect(componentDisplayName.get(Component)).toBe(
    "withRenames.e→b.d→a(Example)"
  );
});

it("withRenames", () => {
  const Component = withRenames({ e: "b", d: "a" } as const)(Example);
  render(<Component d={1} e={2} c={3} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"d":1,"e":2,"c":3}</pre>'
  );
});
