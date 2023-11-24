import { render } from "@testing-library/react";
import { componentDisplayName } from "../lib/componentDisplayName";
import { withForEach } from "./withForEach";

interface ExampleProps {
  a: number;
  b: number;
  i: number;
}

function Example(props: ExampleProps): JSX.Element {
  return <pre>{JSON.stringify(props)}</pre>;
}

it("withForEach name", () => {
  const Component = withForEach(10)(Example);
  expect(componentDisplayName.get(Component)).toBe("withForEach.10(Example)");
});

it("withForEach number", () => {
  const Component = withForEach(2)(Example);
  render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"a":1,"b":2,"i":0}</pre><pre>{"a":1,"b":2,"i":1}</pre>'
  );
});

it("withForEach array of string", () => {
  const Component = withForEach(["c", "d"])(Example);
  render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"a":1,"b":2,"i":0,"children":"c"}</pre><pre>{"a":1,"b":2,"i":1,"children":"d"}</pre>'
  );
});

it("withForEach array of objects", () => {
  const Component = withForEach([{ c: 3 }, { d: 4 }])(Example);
  render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"children":{"c":3},"c":3,"a":1,"b":2,"i":0}</pre><pre>{"children":{"d":4},"d":4,"a":1,"b":2,"i":1}</pre>'
  );
});

it("withForEach object", () => {
  const Component = withForEach({ c: 3 })(Example);
  render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"children":3,"a":1,"b":2,"i":"c"}</pre>'
  );
});
