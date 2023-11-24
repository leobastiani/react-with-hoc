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

/* Regular object */ {
  const myRegularObject: {
    displayName: string;
  } = undefined as any;

  const asHoc = withDisplayName("As Hoc")(myRegularObject);
  const asFunction = withDisplayName("As Function", myRegularObject);

  expectType<typeof myRegularObject>(asHoc);
  expectType<typeof myRegularObject>(asFunction);
}

/* object with no displayName */ {
  const myRegularObject: {
    nonDisplayName: string;
  } = undefined as any;

  // @ts-expect-error
  withDisplayName("As Hoc")(myRegularObject);
  // @ts-expect-error
  withDisplayName("As Function", myRegularObject);
}
