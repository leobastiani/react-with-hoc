import { render } from "@testing-library/react";
import { CSSProperties } from "react";
import { componentDisplayName } from "./componentDisplayName";
import { withHocs } from "./withHocs";
import { withProp } from "./withProp";

function Example(props: { someProp: number }): JSX.Element {
  return <pre>{JSON.stringify(props)}</pre>;
}

it("withProps name", () => {
  const Component = withProp("someProp", 1)(Example);
  expect(componentDisplayName.get(Component)).toBe(
    "withProp.someProp(Example)"
  );
});

it("withProps with value", () => {
  const Component = withProp("someProp", 1)(Example);
  render(<Component />);
  expect(document.body.children[0].innerHTML).toBe('<pre>{"someProp":1}</pre>');
});

it("withProps with function", () => {
  const Component = withProp("someProp", () => 1, [])(Example);
  render(<Component />);
  expect(document.body.children[0].innerHTML).toBe('<pre>{"someProp":1}</pre>');
});

it("withProps a new property as value", () => {
  const Component = withProp("anotherProp", 10)(Example);
  render(<Component someProp={5} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"anotherProp":10,"someProp":5}</pre>'
  );
});

it("withProps a new property in dependencyNames", () => {
  const Component = withProp(
    "someProp",
    ({ anotherProp }: { anotherProp: number }) => anotherProp + 10,
    ["anotherProp"]
  )(Example);
  render(<Component anotherProp={5} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someProp":15,"anotherProp":5}</pre>'
  );
});

it("withProps overridden", () => {
  const Component = withProp("someProp", 10)(Example);
  render(<Component someProp={20} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someProp":20}</pre>'
  );
});

it("withProps rewritten", () => {
  const Component = withProp(
    "someProp",
    ({ someProp }: { someProp: number }) => someProp + 10,
    ["someProp"]
  )(Example);
  render(<Component someProp={20} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someProp":30}</pre>'
  );
});

it("withProps with className", () => {
  const Component = withProp("className", ["myClass1"])(Example);
  render(<Component className={["myClass2"]} someProp={1} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"className":["myClass1","myClass2"],"someProp":1}</pre>'
  );
});

it("withProps with style", () => {
  const Component = withProp<CSSProperties, "style">("style", {
    background: "black",
  })(Example);
  render(
    <Component
      style={{
        borderColor: "red",
      }}
      someProp={1}
    />
  );
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"style":{"background":"black","borderColor":"red"},"someProp":1}</pre>'
  );
});

it("withProps with style twice", () => {
  const Component = withHocs(
    withProp<CSSProperties, "style">("style", {
      background: "black",
      borderColor: "white",
    }),
    withProp<CSSProperties, "style">("style", {
      borderColor: "red",
      display: "block",
    })
  )(Example);
  render(<Component someProp={1} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"style":{"borderColor":"white","display":"block","background":"black"},"someProp":1}</pre>'
  );
});
