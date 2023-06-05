import { Call, Fn } from "hotscript";
import { ComponentType, FunctionComponent } from "react";
import { ClosurePick } from "./@types/ClosurePick";
import { NormalizeObject } from "./@types/NormalizeObject";
import { newHoc } from "./newHoc";
import { render } from "./render";
import { withHocs } from "./withHocs";

interface PickHoc<PickNames extends readonly string[]> extends Fn {
  return: ClosurePick<this["arg0"], PickNames>;
}

type HocResult<
  FnApplier extends Fn,
  ComponentArg extends [ComponentType] | []
> = ComponentArg extends [ComponentType<infer Props>]
  ? FunctionComponent<NormalizeObject<Call<FnApplier, Props>>>
  : FnApplier &
      (<Props extends {}>(
        Component: ComponentType<Props>
      ) => FunctionComponent<NormalizeObject<Call<FnApplier, Props>>>);

type WithPickHoc = <
  PickNames extends readonly string[],
  ComponentArg extends [ComponentType<any>] | []
>(
  pickNames: PickNames,
  ...Component: ComponentArg
) => HocResult<PickHoc<PickNames>, ComponentArg>;

export const withPick = ((): WithPickHoc => {
  function withPick(
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
  }

  return newHoc(withPick) as WithPickHoc;
})();

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
const withPickHoc = withPick(["a", "b"] as const, Example);
const withPickHoc2 = withPick(["b"] as const);
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

const WithPickExample2 = withHocs(withPickHoc, withPickHoc2)(Example);
