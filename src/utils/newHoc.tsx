import { ComponentType, FunctionComponent } from "react";
import { Hoc } from "../types/Hoc";
import { componentDisplayName } from "./componentDisplayName";
import { HocNameFactory, defaultHocName } from "./hocNameForWithStyle";

export type NewHocReturn<HocArgs extends any[]> = (
  ...args: HocArgs
) => Hoc<any[]>;

export type HocDefinition<HocArgs extends any[]> = (
  Component: ComponentType<any>,
  ...args: HocArgs
) => FunctionComponent<any>;

export type GetHocArgs<T> = Extract<
  T extends NewHocReturn<infer R>
    ? R
    : T extends HocDefinition<infer R>
      ? R
      : never,
  any[]
>;

type Name<HocArgs extends any[]> =
  | string
  | ((
      functions: {
        Component: ComponentType<any>;
        hoc: HocDefinition<HocArgs>;
      },
      ...args: HocArgs
    ) => string);

type FirstArgumentOptional<T extends any[]> = T extends [unknown, ...infer Rest]
  ? Rest | T
  : never;
function newHoc<TNewHocReturn extends NewHocReturn<any>>(
  hoc: HocDefinition<GetHocArgs<TNewHocReturn>>,
): TNewHocReturn;
function newHoc<TNewHocReturn extends NewHocReturn<any>>(
  name: Name<GetHocArgs<TNewHocReturn>>,
  hoc: HocDefinition<GetHocArgs<TNewHocReturn>>,
): TNewHocReturn;

function newHoc<TNewHocReturn extends NewHocReturn<any>>(
  ...args: FirstArgumentOptional<
    [Name<GetHocArgs<TNewHocReturn>>, HocDefinition<GetHocArgs<TNewHocReturn>>]
  >
): TNewHocReturn {
  const name: HocNameFactory | string =
    process.env.NODE_ENV != "production" && args.length === 2
      ? args[0]
      : defaultHocName;
  const hoc: HocDefinition<GetHocArgs<TNewHocReturn>> =
    args.length === 2 ? args[1] : args[0];

  return ((...args: any) =>
    (Component: ComponentType<any>): FunctionComponent<any> => {
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
          Ret,
        );
      }
      return Ret;
    }) as TNewHocReturn;
}

const newHocProduction: any = (...args: any[]) => {
  const hoc: any = args[args.length - 1];
  return (...args: any) =>
    (Component: ComponentType<any>): FunctionComponent<any> => {
      return hoc(Component, ...args);
    };
};

const exportNewHoc: typeof newHoc =
  process.env.NODE_ENV === "production" ? newHocProduction : newHoc;

export { exportNewHoc as newHoc };
