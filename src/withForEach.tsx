import { ComponentType, FunctionComponent, Key } from "react";
import { IsLiteral } from "type-fest";
import { PartialBy } from "./@types/PartialBy";
import { Hoc } from "./Hoc";
import { newHoc } from "./newHoc";

interface Options<IndexName extends string, ValueName extends string> {
  indexName?: IndexName;
  valueName?: ValueName;
  key?: (props: object) => Key;
}

interface WithForEachHoc {
  <IndexName extends string, ValueName extends string>(
    target: number | Array<unknown> | object,
    options?: Options<IndexName, ValueName>
  ): Hoc<
    PartialBy<
      | (IsLiteral<IndexName> extends true ? IndexName : "i")
      | (IsLiteral<ValueName> extends true ? ValueName : "children")
    >
  >;
}

export const withForEach = newHoc(function withForEach(
  Component: ComponentType,
  target: number | Array<unknown> | object | string,
  {
    indexName = "i",
    key = (props: any): Key => props[indexName],
    valueName = "children",
  } = {}
): FunctionComponent {
  return function WithForEach(props: any): JSX.Element {
    let ret: any;
    if (typeof target === "number") {
      ret = Array.from({ length: target }).map((_v, i) => (
        <Component
          key={key({ ...props, [indexName]: i })}
          {...{ ...props, [indexName]: i }}
        />
      ));
    } else if (Array.isArray(target)) {
      if (target.length > 0 && typeof target[0] != "object") {
        ret = target.map((v, i) => (
          <Component
            key={key({ ...props, [indexName]: i, [valueName]: v })}
            {...{ ...props, [indexName]: i, [valueName]: v }}
          />
        ));
      } else {
        ret = target.map((v, i) => (
          <Component
            key={key({ ...props, [indexName]: i })}
            {...{ [valueName]: v, ...v, ...props, [indexName]: i }}
          />
        ));
      }
    } else if (typeof target === "object" && target !== null) {
      ret = Object.entries(target).map(([index, value]) => (
        <Component
          key={key({ ...props, [indexName]: index })}
          {...{ [valueName]: value, ...props, [indexName]: index }}
        />
      ));
    } else if (process.env.NODE_ENV !== "production") {
      throw new Error(
        "withForEach: should be used with number, Array or object"
      );
    }

    return ret;
  };
}) as WithForEachHoc;
