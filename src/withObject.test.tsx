import { render } from "@testing-library/react";
import { componentDisplayName } from "./componentDisplayName";
import { withObject } from "./withObject";

interface ExampleProps {
  a: number;
  b: number;
}

function Example(props: ExampleProps): JSX.Element {
  return <pre>{JSON.stringify(props)}</pre>;
}

it("withObject name", () => {
  const Component = withObject("obj")(Example);
  expect(componentDisplayName.get(Component)).toBe("withObject.obj(Example)");
});

it("withObject", () => {
  const Component = withObject("obj")(Example);
  render(
    <Component
      obj={{
        a: 1,
      }}
      b={2}
    />
  );
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"a":1,"obj":{"a":1},"b":2}</pre>'
  );
});
