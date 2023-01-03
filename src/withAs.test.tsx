import { render } from "@testing-library/react";
import { WithAs } from "./@types/WithAs";
import { componentDisplayName } from "./componentDisplayName";
import { withAs } from "./withAs";

interface ExampleProps {
  a: number;
  b: number;
  c: number;
}

function Example({ Component, ...props }: WithAs<ExampleProps>): JSX.Element {
  // @ts-expect-error
  return <Component>{JSON.stringify(props)}</Component>;
}

it("withAs name", () => {
  const Component = withAs("pre")(Example);
  expect(componentDisplayName.get(Component)).toBe("withAs.pre(Example)");
});

it("withAs", () => {
  const Component = withAs("pre")(Example);
  render(<Component a={1} b={2} c={3} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"a":1,"b":2,"c":3}</pre>'
  );
});

it("withAs override by div", () => {
  const Component = withAs("pre")(Example);
  render(<Component as="div" a={1} b={2} c={3} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<div>{"a":1,"b":2,"c":3}</div>'
  );
});

it("withAs override by other component", () => {
  const Component = withAs("pre")(Example);

  function Example2(props: object): JSX.Element {
    return <pre>{JSON.stringify({ ...props, keys: Object.keys(props) })}</pre>;
  }

  render(<Component as={Example2} a={1} b={2} c={3} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"children":"{\\"a\\":1,\\"b\\":2,\\"c\\":3}","keys":["children"]}</pre>'
  );
});
