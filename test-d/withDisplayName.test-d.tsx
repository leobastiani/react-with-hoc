import { expectType } from "tsd";
import { withDisplayName, withHocs, withPick } from "../src";

/* MyRFCComponent */ {
  const MyRFCComponent: React.FC<{
    prop: boolean;
  }> = undefined as any;

  const asHoc = withDisplayName("As Hoc")(MyRFCComponent);
  const asFunction = withDisplayName("As Function", MyRFCComponent);
  const asWithHocs = withHocs([
    withDisplayName("asWithHocs"),
    withPick(["prop"]),
  ])(MyRFCComponent);

  expectType<typeof MyRFCComponent>(asHoc);
  expectType<typeof MyRFCComponent>(asFunction);
  expectType<typeof MyRFCComponent>(asWithHocs);
}

/* regular function */ {
  // eslint-disable-next-line no-inner-declarations
  function MyComponent(_props: { prop: boolean }): null {
    return null;
  }

  withDisplayName("As Hoc")(MyComponent);
  withDisplayName("As Function", MyComponent);
}
