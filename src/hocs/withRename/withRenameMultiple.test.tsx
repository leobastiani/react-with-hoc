import { render } from "@testing-library/react";
import { componentDisplayName } from "../../utils/componentDisplayName";
import { withRenameMultiple } from "./withRenameMultiple";

interface ExampleProps {
  a: number;
  b: number;
  c: number;
}

function Example(props: ExampleProps): JSX.Element {
  return <pre>{JSON.stringify(props, Object.keys(props).sort())}</pre>;
}

it("withRename name", () => {
  const Component = withRenameMultiple({ e: "b", d: "a" })(Example);
  expect(componentDisplayName.get(Component)).toBe(
    "withRename.e→b.d→a(Example)",
  );
});

it("withRenameMultiple", () => {
  const Component = withRenameMultiple({ e: "b", d: "a", f: "iDonNotExist" })(
    Example,
  );
  render(<Component d={1} e={2} c={3} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"a":1,"b":2,"c":3}</pre>',
  );
});
