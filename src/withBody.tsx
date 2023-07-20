import { ComponentType, FunctionComponent } from "react";
import { Fn, IntersectionFn, ToSchema } from "./Fn";
import { Hoc } from "./Hoc";
import { newHoc } from "./newHoc";

type Values<T> = T[keyof T];

interface RemoveSameFn<T extends [any, any]> extends Fn {
  return:
    | Exclude<this["arg0"], [T[0], any]>
    | Values<{
        [K in Extract<this["arg0"], any[]>[0] & T[0] as Extract<
          this["arg0"],
          [K, any]
        >[1] extends Extract<T, [K, any]>[1]
          ? never
          : K]: [K, never];
      }>;
}

type WithBodyHoc = <Props, Ret>(
  body: (props: Props) => Ret
) => Hoc<[IntersectionFn<ToSchema<Props>>, RemoveSameFn<ToSchema<Ret>>]>;

export const withBody = newHoc<WithBodyHoc>(function withBody(
  Component: ComponentType,
  body: Function
): FunctionComponent {
  return function WithBody(props: any): JSX.Element {
    return <Component {...props} {...body(props)} />;
  };
});
