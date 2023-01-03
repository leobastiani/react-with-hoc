import { render } from "@testing-library/react";
import { CSSProperties } from "react";
import { componentDisplayName } from "./componentDisplayName";
import { withHocs } from "./withHocs";
import { withProps } from "./withProps";

function Example(props: { someProp: number }): JSX.Element {
  return <pre>{JSON.stringify(props)}</pre>;
}

it("withProps name", () => {
  const Component = withProps({ someProp: 1 })(Example);
  expect(componentDisplayName.get(Component)).toBe(
    "withProps.someProp(Example)"
  );
});

it("withProps with value", () => {
  const Component = withProps({ someProp: 1 })(Example);
  render(<Component />);
  expect(document.body.children[0].innerHTML).toBe('<pre>{"someProp":1}</pre>');
});

it("withProp with another value", () => {
  const Component = withProps({ anotherProp: 1 })(Example);
  render(<Component someProp={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"anotherProp":1,"someProp":2}</pre>'
  );
});

it("withProp overridden", () => {
  const Component = withProps({ someProp: 10 })(Example);
  render(<Component someProp={20} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someProp":20}</pre>'
  );
});

it("withProp with className", () => {
  const Component = withProps({ className: ["myClass1"] })(Example);
  render(<Component className={["myClass2"]} someProp={1} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"className":["myClass1","myClass2"],"someProp":1}</pre>'
  );
});

it("withProp with style", () => {
  const Component = withProps({
    style: {
      background: "black",
    } as CSSProperties,
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
  const Component = withHocs(
    withProps({
      style: {
        background: "black",
        borderColor: "white",
      },
    }),
    withProps({
      style: {
        borderColor: "red",
        display: "block",
      },
    })
  )(Example);
  render(<Component someProp={1} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"style":{"borderColor":"white","display":"block","background":"black"},"someProp":1}</pre>'
  );
});
