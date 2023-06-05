import { Objects } from "hotscript";
import { ComponentType, FunctionComponent } from "react";
import { Hoc } from "./Hoc";
import { newHoc } from "./newHoc";
import { render } from "./render";
import { withHocs } from "./withHocs";

type WithPickHoc = <PickNames extends string>(
  pickNames: PickNames[]
) => Hoc<Objects.Pick<PickNames>>;

export const withPick = newHoc(function withPick(
  Component: ComponentType,
  pickNames: string[]
): FunctionComponent {
  function WithPick(props: any): JSX.Element {
    const pickSet = new Set(pickNames);
    for (const key in props) {
      if (!pickSet.has(key) && key in props) {
        delete props[key];
      }
    }

    return render(Component, props);
  }
  return WithPick;
}) as unknown as WithPickHoc;
function Example({
  a,
  b,
  c,
}: {
  a: string;
  b: number;
  c: boolean;
}): JSX.Element {
  return (
    <div>
      {a}
      {b}
      {c}
    </div>
  );
}
const withPickHoc = withPick(["a", "b"]);
const withPickHoc2 = withPick(["b"]);
const WithPickExample = withPickHoc(Example);
<WithPickExample a="a" b={1} />;
// type ToAPIPayload = Pipe<
//   {
//     a: string;
//     b: number;
//     c: boolean;
//   },
//   [typeof withPickHoc]
// >;

const withHocsResult = withHocs(
  withPickHoc,
  withPickHoc2,
  (Component: any) => Component
);
const WithPickExample2 = withHocsResult(Example);

<WithPickExample2 b={1} />;
