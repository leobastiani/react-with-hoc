import React from "react";
import { componentDisplayName } from "./componentDisplayName";

describe("get", () => {
  it("by .name", () => {
    function Example(): JSX.Element {
      return <div />;
    }
    expect(componentDisplayName.get(Example)).toBe("Example");
  });

  it("by .displayName", () => {
    const SomeComponent = (): JSX.Element => <div />;
    SomeComponent.displayName = "Example";
    expect(componentDisplayName.get(SomeComponent)).toBe("Example");
  });

  it("has no name", () => {
    const Example = (
      () =>
      // eslint-disable-next-line react/display-name
      (): JSX.Element => <div />
    )();
    expect(componentDisplayName.get(Example)).toBe("Unknown");
  });
});

it("set", () => {
  const Example = (
    () =>
    // eslint-disable-next-line react/display-name
    (): JSX.Element => <div />
  )();
  expect(componentDisplayName.get(Example)).not.toBe("Example");
  componentDisplayName.set("Example", Example);
  expect(componentDisplayName.get(Example)).toBe("Example");
});
