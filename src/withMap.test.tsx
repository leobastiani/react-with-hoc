import { render } from "@testing-library/react";
import { componentDisplayName } from "./componentDisplayName";
import { withMap } from "./withMap";

interface ExampleProps {
  a: number;
  b: number;
  i: number;
}

function Example(props: ExampleProps): JSX.Element {
  return <pre>{JSON.stringify(props)}</pre>;
}

it("withMap name", () => {
  const Component = withMap(10)(Example);
  expect(componentDisplayName.get(Component)).toBe("withMap.10(Example)");
});

it("withMap number", () => {
  const Component = withMap(2)(Example);
  render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"a":1,"b":2,"i":0}</pre><pre>{"a":1,"b":2,"i":1}</pre>'
  );
});

it("withMap array of string", () => {
  const Component = withMap(["c", "d"])(Example);
  render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"a":1,"b":2,"i":0,"children":"c"}</pre><pre>{"a":1,"b":2,"i":1,"children":"d"}</pre>'
  );
});

it("withMap array of objects", () => {
  const Component = withMap([{ c: 3 }, { d: 4 }])(Example);
  render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"children":{"c":3},"c":3,"a":1,"b":2,"i":0}</pre><pre>{"children":{"d":4},"d":4,"a":1,"b":2,"i":1}</pre>'
  );
});

it("withMap object", () => {
  const Component = withMap({ c: 3 })(Example);
  render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"children":3,"a":1,"b":2,"i":"c"}</pre>'
  );
});
