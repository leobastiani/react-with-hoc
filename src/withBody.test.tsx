import { act, render } from "@testing-library/react";
import { componentDisplayName } from "./componentDisplayName";
import { withBody } from "./withBody";

interface ExampleProps {
  a: number;
  b: string;
  c: boolean;
}
const Example = (props: ExampleProps): JSX.Element => {
  return <pre>{JSON.stringify(props)}</pre>;
};
it("withBody name", () => {
  const Component = withBody(function bodyHook() {
    return {};
  })(Example);
  expect(componentDisplayName.get(Component)).toBe(
    "withBody.bodyHook(Example)"
  );
});

it("with no props", () => {
  const Component = withBody(() => ({ b: "b" }))(Example);
  render(<Component a={1} c />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"a":1,"c":true,"b":"b"}</pre>'
  );
});

it("with props", () => {
  const Component = withBody(({ a }: { a: number }) => ({ b: String(a) }))(
    Example
  );
  render(<Component a={10} c />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"a":10,"c":true,"b":"10"}</pre>'
  );
});

it("same prop on same body", () => {
  const Component = withBody(({ a }: { a?: number }) => ({ a: a! + 10 }))(
    Example
  );
  render(<Component someState={10} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someState":10}</pre>'
  );
  act(() => {
    setSomeState(1);
  });
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someState":10}</pre>'
  );
});
