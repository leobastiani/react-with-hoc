import { render } from "@testing-library/react";
import { componentDisplayName } from "../lib/componentDisplayName";
import { withClassName } from "./withClassName";

function Example({ className }: { className: string }): JSX.Element {
  return (
    <>
      <pre>{JSON.stringify({ className })}</pre>
    </>
  );
}

it("withClassName name with no args", () => {
  const Component = withClassName()(Example);
  expect(componentDisplayName.get(Component)).toBe("withClassName(Example)");
});

it("withClassName name with string", () => {
  const Component = withClassName("someClassName")(Example);
  expect(componentDisplayName.get(Component)).toBe(
    "withClassName.someClassName(Example)"
  );
});

it("withClassName name with function", () => {
  const Component = withClassName(({ x }: { x: boolean }) =>
    x ? "someClassName" : ""
  )(Example);
  expect(componentDisplayName.get(Component)).toBe(
    "withClassName.[unnamed function](Example)"
  );
});

it("withClassName name with array of strings", () => {
  const Component = withClassName(["someClassName1", "someClassName2"])(
    Example
  );
  expect(componentDisplayName.get(Component)).toBe(
    "withClassName.someClassName1.someClassName2(Example)"
  );
});

it("withClassName name with array mixed", () => {
  const Component = withClassName([
    "someClassName1",
    ({ x }: { x: boolean }): string => (x ? "someClassName" : ""),
  ])(Example);
  expect(componentDisplayName.get(Component)).toBe(
    "withClassName.someClassName1.[unnamed function](Example)"
  );
});

describe.each([undefined, "someClass", ["someClass1", "someClass2"]])(
  "when className={%s}",
  (className) => {
    it("with no args", () => {
      const Component = withClassName()(Example);
      render(<Component className={className} />);
      expect(document.body.children[0].innerHTML).toMatchSnapshot();
    });

    it("with string", () => {
      const Component = withClassName("someOtherClass")(Example);
      render(<Component className={className} />);
      expect(document.body.children[0].innerHTML).toMatchSnapshot();
    });

    it("with function", () => {
      const Component = withClassName(({ x }: { x?: number }) =>
        x ? "someOtherClass1" : "someOtherClass2"
      )(Example);
      render(<Component className={className} />);
      expect(document.body.children[0].innerHTML).toMatchSnapshot();
    });

    it("with array of strings", () => {
      const Component = withClassName(["someOtherClass1", "someOtherClass2"])(
        Example
      );
      render(<Component className={className} />);
      expect(document.body.children[0].innerHTML).toMatchSnapshot();
    });

    it("with array mixed", () => {
      const Component = withClassName<{ x?: number }>([
        "someOtherClass1",
        ({ x }): string => (x ? "someOtherClass2" : "someOtherClass3"),
        ({ x }): string[] =>
          x
            ? ["someOtherClass4", "someOtherClass5"]
            : ["someOtherClass6", "someOtherClass7"],
      ])(Example);
      render(<Component className={className} />);
      expect(document.body.children[0].innerHTML).toMatchSnapshot();
    });
  }
);
