import { render } from "@testing-library/react";
import { CSSProperties } from "react";
import { componentDisplayName } from "./componentDisplayName";
import { withProp } from "./withProp";
import { withRevHocs } from "./withRevHocs";

function Example(props: { someProp: number }): JSX.Element {
  return <pre>{JSON.stringify(props)}</pre>;
}

it("withProp name", () => {
  const Component = withProp("someProp", 1)(Example);
  expect(componentDisplayName.get(Component)).toBe(
    "withProp.someProp(Example)"
  );
});

it("withProp with value", () => {
  const Component = withProp("someProp", 1)(Example);
  render(<Component />);
  expect(document.body.children[0].innerHTML).toBe('<pre>{"someProp":1}</pre>');
});

it("withProp with another value", () => {
  const Component = withProp("anotherProp", 1)(Example);
  render(<Component someProp={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"anotherProp":1,"someProp":2}</pre>'
  );
});

it("withProp with function", () => {
  const Component = withProp("someProp", () => 1, [])(Example);
  render(<Component />);
  expect(document.body.children[0].innerHTML).toBe('<pre>{"someProp":1}</pre>');
});

it("withProp a new property as value", () => {
  const Component = withProp("anotherProp", 10)(Example);
  render(<Component someProp={5} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"anotherProp":10,"someProp":5}</pre>'
  );
});

it("withProp a new property in dependencyNames", () => {
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

it("withProp overridden", () => {
  const Component = withProp("someProp", 10)(Example);
  render(<Component someProp={20} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someProp":20}</pre>'
  );
});

it("withProp rewritten", () => {
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

it("withProp rewritten with different type", () => {
  const Component = withProp(
    "someProp",
    ({ someProp }: { someProp: string }) => {
      if (typeof someProp !== "string") {
        throw new Error("it should be a string");
      }
      return parseInt(someProp) + 10;
    },
    ["someProp"]
  )(Example);
  render(<Component someProp="20" />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someProp":30}</pre>'
  );
});

it("withProp with className", () => {
  const Component = withProp("className", ["myClass1"])(Example);
  render(<Component className={["myClass2"]} someProp={1} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"className":["myClass1","myClass2"],"someProp":1}</pre>'
  );
});

it("withProp with style", () => {
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

it("withProp with style twice", () => {
  const Component = withRevHocs(
    withProp<CSSProperties, "style">("style", {
      borderColor: "red",
      display: "block",
    }),
    withProp<CSSProperties, "style">("style", {
      background: "black",
      borderColor: "white",
    })
  )(Example);
  render(<Component someProp={1} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"style":{"borderColor":"white","display":"block","background":"black"},"someProp":1}</pre>'
  );
});
