import { render } from "@testing-library/react";
import { componentDisplayName } from "./componentDisplayName";
import { withComponent } from "./withComponent";

interface ExampleProps {
  a: number;
  b: number;
  Side: typeof Side;
}

function Example({ a, b, Side }: ExampleProps): JSX.Element {
  return (
    <>
      <Side />
      <pre id="main">{JSON.stringify({ a, b })}</pre>
    </>
  );
}

function Side(props: any): JSX.Element {
  return <pre id="side">{JSON.stringify(props)}</pre>;
}

function AnotherSide(props: any): JSX.Element {
  return <pre id="another-side">{JSON.stringify(props)}</pre>;
}

it("withComponent name", () => {
  const Component = withComponent({ Side })(Example);
  expect(componentDisplayName.get(Component)).toBe(
    "withComponent.Side(Example)"
  );
});

it("withComponent with default behavior", () => {
  const Component = withComponent({ Side })(Example);
  render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="side">{"a":1,"b":2}</pre><pre id="main">{"a":1,"b":2}</pre>'
  );
});

it("withComponent disabled", () => {
  const Component = withComponent({ Side })(Example);
  render(<Component a={1} b={2} Side={null} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="main">{"a":1,"b":2}</pre>'
  );
});

it("withComponent overridden", () => {
  const Component = withComponent({ Side })(Example);
  render(<Component a={1} b={2} Side={10} />);
  expect(document.body.children[0].innerHTML).toBe(
    '10<pre id="main">{"a":1,"b":2}</pre>'
  );
});

it("withComponent hiddenByDefault", () => {
  const Component = withComponent({ Side, hiddenByDefault: true })(Example);
  const { rerender } = render(<Component a={1} b={2} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="main">{"a":1,"b":2}</pre>'
  );
  rerender(<Component a={1} b={2} Side={true} />);
  expect(document.body.children[0].innerHTML).toBe(
    '<pre id="side">{"a":1,"b":2,"Side":true}</pre><pre id="main">{"a":1,"b":2}</pre>'
  );
});

describe("passing a function as an attribute", () => {
  it("hiddenByDefault = false", () => {
    const Component = withComponent({ Side })(Example);
    render(
      <Component
        a={1}
        b={2}
        Side={(MySide) =>
          // eslint-disable-next-line react/display-name
          (props): JSX.Element => {
            expect(MySide).toBe(Side);
            return <AnotherSide {...props} />;
          }}
      />
    );
    expect(document.body.children[0].innerHTML).toBe(
      '<pre id="another-side">{"a":1,"b":2}</pre><pre id="main">{"a":1,"b":2}</pre>'
    );
  });

  it("hiddenByDefault = true", () => {
    const Component = withComponent({ Side, hiddenByDefault: true })(Example);
    render(
      <Component
        a={1}
        b={2}
        Side={(MySide) =>
          // eslint-disable-next-line react/display-name
          (props): JSX.Element => {
            expect(MySide).toBe(Side);
            return <AnotherSide {...props} />;
          }}
      />
    );
    expect(document.body.children[0].innerHTML).toBe(
      '<pre id="another-side">{"a":1,"b":2}</pre><pre id="main">{"a":1,"b":2}</pre>'
    );
  });
});
