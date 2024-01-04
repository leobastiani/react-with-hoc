import React from "react";
import { componentDisplayName } from "../utils/componentDisplayName";
import { withDisplayName } from "./withDisplayName";
import { withHocs } from "./withHocs";
import { withOmit } from "./withOmit";

interface ExampleProps {
  a: number;
  b: number;
  i: number;
}

function Example(props: ExampleProps): JSX.Element {
  return <pre>{JSON.stringify(props)}</pre>;
}

it("applied withHocs with a string name", () => {
  const Component = withHocs([withDisplayName("SomeName"), withOmit(["x"])])(
    Example,
  );
  expect(componentDisplayName.get(Component)).toBe("SomeName");
});

it("applied withHocs with a factory name", () => {
  const Component = withHocs([
    withDisplayName((C) => "SomeName." + componentDisplayName.get(C)),
    withOmit(["x"]),
  ])(Example);
  expect(componentDisplayName.get(Component)).toBe(
    "SomeName.withOmit.x(Example)",
  );
});
