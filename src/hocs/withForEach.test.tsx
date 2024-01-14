import { render } from "@testing-library/react";
import React from "react";
import { componentDisplayName } from "../utils/componentDisplayName";
import { withForEach } from "./withForEach";

interface ExampleProps {
  a: number;
  b: number;
  i: number;
}

function Example(props: ExampleProps): JSX.Element {
  // @ts-expect-error it's okay
  // eslint-disable-next-line react/prop-types
  const { children, ...rest } = props;
  return (
    <pre>
      {"\n"}
      {JSON.stringify(rest)}
      {"\n"}
      {children ? <>children: {children}</> : ""}
      {!!children && "\n"}
    </pre>
  );
}

it("withForEach name", () => {
  const Component = withForEach(10)(Example);
  expect(componentDisplayName.get(Component)).toBe("withForEach.10(Example)");
});

it("withForEach number", () => {
  const Component = withForEach(2)(Example);
  render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toMatchInlineSnapshot(`
"<pre>
{"a":1,"b":2,"i":0}
</pre><pre>
{"a":1,"b":2,"i":1}
</pre>"
`);
});

it("withForEach array of string", () => {
  const Component = withForEach(["c", "d"])(Example);
  render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toMatchInlineSnapshot(`
"<pre>
{"a":1,"b":2,"i":0}
children: c
</pre><pre>
{"a":1,"b":2,"i":1}
children: d
</pre>"
`);
});

it("withForEach array of objects", () => {
  const Component = withForEach([{ c: 3 }, { d: 4 }])(Example);
  render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toMatchInlineSnapshot(`
"<pre>
{"c":3,"a":1,"b":2,"i":0}
</pre><pre>
{"d":4,"a":1,"b":2,"i":1}
</pre>"
`);
});

it("withForEach array of elements", () => {
  const Component = withForEach([
    <div key="div-1">1</div>,
    <div key="div-2">2</div>,
  ])(Example);
  render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toMatchInlineSnapshot(`
"<pre>
{"a":1,"b":2,"i":0}
children: <div>1</div>
</pre><pre>
{"a":1,"b":2,"i":1}
children: <div>2</div>
</pre>"
`);
});

it("withForEach object", () => {
  const Component = withForEach({ c: 3 })(Example);
  render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toMatchInlineSnapshot(`
"<pre>
{"a":1,"b":2,"i":"c"}
children: 3
</pre>"
`);
});
