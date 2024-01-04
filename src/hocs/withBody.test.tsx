import { render } from "@testing-library/react";
import { componentDisplayName } from "../utils/componentDisplayName";
import { withBody } from "./withBody";

interface ExampleProps {
  a: number;
  b: string;
  c: boolean;
}
const Example = (props: ExampleProps): JSX.Element => {
  return <pre>{JSON.stringify(props, Object.keys(props).sort())}</pre>;
};
it("withBody name", () => {
  const Component = withBody(function bodyHook() {
    return {};
  })(Example);
  expect(componentDisplayName.get(Component)).toBe(
    "withBody.bodyHook(Example)",
  );
});

it("with no props", () => {
  const Component = withBody(() => ({ b: "b" }))(Example);
  render(<Component a={1} c />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"a":1,"b":"b","c":true}</pre>',
  );
});

it("with props", () => {
  const Component = withBody(({ a }: { a: number }) => ({ b: String(a) }))(
    Example,
  );
  render(<Component a={10} c />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"a":10,"b":"10","c":true}</pre>',
  );
});

it("same prop on same body", () => {
  const Component = withBody(({ a }: { a?: number | string }) => {
    if (typeof a === "string") {
      return { a: Number(a) };
    }
    return {
      a: a! + 10,
    };
  })(Example);
  render(<Component a={10} b="b" c />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"a":20,"b":"b","c":true}</pre>',
  );
});
