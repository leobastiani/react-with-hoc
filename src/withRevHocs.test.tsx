import { render } from "@testing-library/react";
import { withProp } from "./withProp";
import { withRevHocs } from "./withRevHocs";

function Example(props: { someProp: number }): JSX.Element {
  return <pre>{JSON.stringify(props)}</pre>;
}

it("withRevHocs(withProps)", () => {
  const Component = withRevHocs(withProp("someProp", 1))(Example);
  render(<Component />);
  expect(document.body.children[0].innerHTML).toBe('<pre>{"someProp":1}</pre>');
});

it("withRevHocs uses reduceRight", () => {
  const Component = withRevHocs(
    withProp(
      "someProp",
      ({ someProp }: { someProp: number }) => someProp + 10,
      ["someProp"]
    ),
    withProp("someProp", 1)
  )(Example);
  render(<Component />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre>{"someProp":11}</pre>'
  );
});
