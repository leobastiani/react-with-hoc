import { render } from "@testing-library/react";
import { componentDisplayName } from "../utils/componentDisplayName";
import { withWrapper } from "./withWrapper";

interface ExampleProps {
  a: number;
  b: number;
}

function Example(props: ExampleProps): JSX.Element {
  return <pre>{JSON.stringify(props)}</pre>;
}

function Wrapper(props: { children: JSX.Element }): JSX.Element {
  const { children, ...rest } = props;
  return <pre data-props={JSON.stringify(rest)}>{children}</pre>;
}

it("withWrapper name", () => {
  const Component = withWrapper(Wrapper)(Example);
  expect(componentDisplayName.get(Component)).toBe(
    "withWrapper.Wrapper(Example)",
  );
});

it("withWrapper with default params", () => {
  const Component = withWrapper(Wrapper)(Example);
  render(<Component a={0} b={1} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre data-props="{}"><pre>{"a":0,"b":1}</pre></pre>',
  );
});

it("withWrapper with empty pickProps", () => {
  const Component = withWrapper(Wrapper, { pickProps: [] })(Example);
  render(<Component a={0} b={1} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre data-props="{}"><pre>{"a":0,"b":1}</pre></pre>',
  );
});

it("withWrapper with empty omitProps", () => {
  const Component = withWrapper(Wrapper, { omitProps: [] })(Example);
  render(<Component a={0} b={1} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre data-props="{&quot;a&quot;:0,&quot;b&quot;:1}"><pre>{"a":0,"b":1}</pre></pre>',
  );
});

it("withWrapper with pickProps", () => {
  const Component = withWrapper(Wrapper, { pickProps: ["a"] })(Example);
  render(<Component a={0} b={1} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre data-props="{&quot;a&quot;:0}"><pre>{"a":0,"b":1}</pre></pre>',
  );
});

it("withWrapper with omitProps", () => {
  const Component = withWrapper(Wrapper, { omitProps: ["a"] })(Example);
  render(<Component a={0} b={1} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre data-props="{&quot;b&quot;:1}"><pre>{"a":0,"b":1}</pre></pre>',
  );
});
