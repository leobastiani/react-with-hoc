import { render } from "@testing-library/react";
import { withProp } from "./withProp";

function Example(props: Record<string, never>) {
  return <pre>{JSON.stringify(props)}</pre>;
}

it("withProps", () => {
  const Component = withProp("someProp", 1, [])(Example);
  render(<Component />);
  expect(document.body.children[0].innerHTML).toBe('<pre>{"someProp":1}</pre>');
});
