import { render } from "@testing-library/react";
import { componentDisplayName } from "./componentDisplayName";
import { withIf } from "./withIf";

interface ExampleProps {
  a: number;
}

function Example(props: ExampleProps): JSX.Element {
  return <pre>{JSON.stringify(props)}</pre>;
}

it("withIf name with propName", () => {
  const Component = withIf("b")(Example);
  expect(componentDisplayName.get(Component)).toBe("withIf.b(Example)");
});

it("withIf name with function", () => {
  const Component = withIf(({ a }: ExampleProps) => a > 0, {
    dependencyNames: ["a"],
  })(Example);
  expect(componentDisplayName.get(Component)).toBe(
    `withIf.(["a"]) => boolean(Example)`
  );
});

it("withIf with propName", () => {
  const Component = withIf("enabled")(Example);
  const { rerender } = render(<Component a={1} enabled={false} />);
  expect(document.body.children[0].innerHTML).toBe("");
  rerender(<Component a={1} enabled={true} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"a":1,"enabled":true}</pre>'
  );
});

it("withIf with function", () => {
  const Component = withIf(({ a }: ExampleProps) => a > 0, {
    dependencyNames: ["a"],
  })(Example);
  const { rerender } = render(<Component a={0} />);
  expect(document.body.children[0].innerHTML).toBe("");
  rerender(<Component a={-1} />);
  expect(document.body.children[0].innerHTML).toBe("");
  rerender(<Component a={1} />);
  expect(document.body.children[0].innerHTML).toBe('<pre>{"a":1}</pre>');
});

it("withIf with function with new dependency", () => {
  const Component = withIf(({ i }: { i: number }) => i > 0, {
    dependencyNames: ["i"],
  })(Example);
  const { rerender } = render(<Component a={1} i={0} />);
  expect(document.body.children[0].innerHTML).toBe("");
  rerender(<Component a={1} i={-1} />);
  expect(document.body.children[0].innerHTML).toBe("");
  rerender(<Component a={1} i={1} />);
  expect(document.body.children[0].innerHTML).toBe('<pre>{"a":1,"i":1}</pre>');
});

it("withIf with function and no dependecyNames", () => {
  let calls = 0;
  const Component = withIf(
    () => {
      calls++;
      return false;
    },
    {
      dependencyNames: [],
    }
  )(Example);
  const { rerender } = render(<Component a={0} />);
  expect(document.body.children[0].innerHTML).toBe("");
  expect(calls).toBe(1);
  rerender(<Component a={1} />);
  expect(calls).toBe(1);
  expect(document.body.children[0].innerHTML).toBe("");
});

it("withIf with Then and Else", () => {
  const Component = withIf("condition", {
    Then: (props: ExampleProps) => <pre id="then">{JSON.stringify(props)}</pre>,
    Else: (props: ExampleProps) => <pre id="else">{JSON.stringify(props)}</pre>,
  })(Example);
  const { rerender } = render(<Component a={0} condition={false} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="else">{"a":0,"condition":false}</pre>'
  );
  rerender(<Component a={1} condition={true} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="then">{"a":1,"condition":true}</pre>'
  );
});
