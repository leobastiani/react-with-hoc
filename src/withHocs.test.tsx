import { render } from "@testing-library/react";
import { withHocs } from "./withHocs";
import { withProp } from "./withProp";

function Example(props: { someProp: number }): JSX.Element {
  return <pre>{JSON.stringify(props)}</pre>;
}

it("withHocs(withProps)", () => {
  const Component = withHocs(withProp("someProp", 1))(Example);
  render(<Component />);
  expect(document.body.children[0].innerHTML).toBe('<pre>{"someProp":1}</pre>');
});
