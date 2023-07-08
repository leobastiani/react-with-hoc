import { ComponentType } from "react";
import { componentDisplayName } from "./componentDisplayName";
import { defaultHocName } from "./hocNameForWithStyle";

type Name<Props, HocArgs extends any[]> =
  | string
  | ((
      functions: {
        Component: ComponentType<Props>;
        hoc: HocDefinition<Props, HocArgs>;
      },
      ...args: HocArgs
    ) => string);

export type HocDefinition<Props, HocArgs extends any[]> = (
  Component: ComponentType<Props>,
  ...args: HocArgs
) => ComponentType<any>;

type FirstArgumentOptional<T extends any[]> = T extends [unknown, ...infer Rest]
  ? Rest | T
  : never;

export function newHoc<Props, HocArgs extends any[]>(
  hoc: HocDefinition<Props, HocArgs>
): unknown;
export function newHoc<Props, HocArgs extends any[]>(
  name: Name<Props, HocArgs>,
  hoc: HocDefinition<Props, HocArgs>
): unknown;

export function newHoc<Props, HocArgs extends any[]>(
  ...args: FirstArgumentOptional<
    [Name<Props, HocArgs>, HocDefinition<Props, HocArgs>]
  >
): unknown {
  const name =
    args.length === 2 ? args[0] : (defaultHocName as Name<Props, HocArgs>);
  const hoc = args.length === 2 ? args[1] : args[0];

  return (...args: HocArgs) =>
    (Component: ComponentType<Props>): ComponentType => {
      if (process.env.NODE_ENV !== "production") {
        if (!hoc.name) {
          throw new Error(`Trying to create a new hoc without a name: ${hoc}`, {
            cause: hoc,
          });
        }
      }
      const Ret = hoc(Component, ...args);
      if (process.env.NODE_ENV !== "production") {
        componentDisplayName.set(
          typeof name === "string" ? name : name({ Component, hoc }, ...args),
          Ret
        );
      }
      return Ret;
    };
}
