import { render } from "@testing-library/react";
import { componentDisplayName } from "../utils/componentDisplayName";
import { withSpread } from "./withSpread";

interface ExampleProps {
  a: number;
  b: number;
}

function Example(props: ExampleProps): JSX.Element {
  return <pre>{JSON.stringify(props)}</pre>;
}

it("withSpread name", () => {
  const Component = withSpread("obj")(Example);
  expect(componentDisplayName.get(Component)).toBe("withSpread.obj(Example)");
});

it("withSpread", () => {
  const Component = withSpread<"obj", "a">("obj")(Example);
  render(
    <Component
      obj={{
        a: 1,
      }}
      b={2}
    />,
  );
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"a":1,"obj":{"a":1},"b":2}</pre>',
  );
});
