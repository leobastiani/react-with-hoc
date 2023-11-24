import { render } from "@testing-library/react";
import { componentDisplayName } from "../lib/componentDisplayName";
import { withRenameSingle } from "./withRenameSingle";

interface ExampleProps {
  a: number;
  b: number;
}

function Example(props: ExampleProps): JSX.Element {
  return <pre>{JSON.stringify(props)}</pre>;
}

it("withRenameSingle name", () => {
  const Component = withRenameSingle("c", "b")(Example);
  expect(componentDisplayName.get(Component)).toBe("withRename.c→b(Example)");
});

it("withRename", () => {
  const Component = withRenameSingle("c", "b")(Example);
  render(<Component a={1} c={2} />);
  expect(document.body.children[0].innerHTML).toBe('<pre>{"a":1,"b":2}</pre>');
});
