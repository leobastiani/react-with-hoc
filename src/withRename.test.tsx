import { render } from "@testing-library/react";
import { componentDisplayName } from "./componentDisplayName";
import { withRename } from "./withRename";

interface ExampleProps {
  a: number;
  b: number;
}

function Example(props: ExampleProps): JSX.Element {
  return <pre>{JSON.stringify(props)}</pre>;
}

it("withRename name", () => {
  const Component = withRename("c", "b")(Example);
  expect(componentDisplayName.get(Component)).toBe("withRename.c=>b(Example)");
});

it("withRename", () => {
  const Component = withRename("c", "b")(Example);
  render(<Component a={1} c={2} />);
  expect(document.body.children[0].innerHTML).toBe('<pre>{"a":1,"b":2}</pre>');
});
