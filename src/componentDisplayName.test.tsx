import { componentDisplayName } from "./componentDisplayName";

describe("get", () => {
  it("by .name", () => {
    function Example() {
      return <div />;
    }
    expect(componentDisplayName.get(Example)).toBe("Example");
  });

  it("by .displayName", () => {
    const SomeComponent = () => <div />;
    SomeComponent.displayName = "Example";
    expect(componentDisplayName.get(SomeComponent)).toBe("Example");
  });

  it("has no name", () => {
    const Example = (
      () =>
      // eslint-disable-next-line react/display-name
      () =>
        <div />
    )();
    expect(componentDisplayName.get(Example)).toBe(
      "UnkownComponentDisplayName"
    );
  });
});

it("set", () => {
  const Example = (
    () =>
    // eslint-disable-next-line react/display-name
    () =>
      <div />
  )();
  expect(componentDisplayName.get(Example)).not.toBe("Example");
  componentDisplayName.set("Example", Example);
  expect(componentDisplayName.get(Example)).toBe("Example");
});
