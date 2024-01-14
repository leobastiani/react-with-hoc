import { act, render } from "@testing-library/react";
import React, { Dispatch, FunctionComponent, SetStateAction } from "react";
import { componentDisplayName } from "../utils/componentDisplayName";
import { withState } from "./withState";

let setSomeState: (n: number) => void;
interface ExampleProps {
  someState: number;
  setSomeState: Dispatch<SetStateAction<number>>;
}
let Example: FunctionComponent<ExampleProps>;

beforeEach(() => {
  // eslint-disable-next-line react/display-name
  Example = (props: ExampleProps): JSX.Element => {
    setSomeState = props.setSomeState;
    return <pre>{JSON.stringify(props)}</pre>;
  };
});

it("withState name", () => {
  const Component = withState<number, "someState">("someState")(Example);
  expect(componentDisplayName.get(Component)).toBe(
    "withState.someState(Example)",
  );
});

it("withState", () => {
  const Component = withState("someState", {
    init: 0,
  })(Example);
  render(<Component />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someState":0}</pre>',
  );
  act(() => {
    setSomeState(1);
  });
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someState":1}</pre>',
  );
});

it("withState init as function", () => {
  const Component = withState("someState", {
    init: ({ a }: { a: number }) => a,
  })(Example);
  render(<Component a={10} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someState":10,"a":10}</pre>',
  );
  act(() => {
    setSomeState(1);
  });
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someState":1,"a":10}</pre>',
  );
});

it("withState with different setterName", () => {
  function Example(props: {
    someState: number;
    setState: Dispatch<SetStateAction<number>>;
  }): JSX.Element {
    props.setState(10);
    return <pre>{JSON.stringify(props)}</pre>;
  }

  const Component = withState<number, "someState", "setState">("someState", {
    setterName: "setState",
  })(Example);
  const mock = jest.fn();
  render(<Component someState={20} setState={mock} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someState":20}</pre>',
  );
});

it("withState overridden", () => {
  const Component = withState("someState", { init: 0 })(Example);
  render(<Component someState={10} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someState":10}</pre>',
  );
  act(() => {
    setSomeState(1);
  });
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someState":10}</pre>',
  );
});
