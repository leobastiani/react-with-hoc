import React, {
  ComponentType,
  Fragment,
  FunctionComponent,
  Key,
  ReactNode,
  createElement,
  isValidElement,
} from "react";
import { SetOptionalFn } from "../types/Fn";
import { Hoc } from "../types/Hoc";
import { newHoc } from "../utils/newHoc";

interface Options<IndexName extends string, ValueName extends string> {
  /**
   * @default "i"
   *
   * @example
   * //                                            ↓ "someName" here as well
   * const Component = withForEach(3, {indexName: "someName"})(Example)
   * <Component {...props} />
   * // is equivalent to
   * <>
   *   //                          ↓ "someName" here as well
   *   <Example key={0} {...props} someName={0} />
   *   <Example key={1} {...props} someName={1} />
   *   <Example key={2} {...props} someName={2} />
   * </>
   */
  indexName?: IndexName;
  /**
   * @default "children"
   *
   * @example
   * const Component = withForEach(
   *   ["a", "b"],
   *   //           ↓ "someName" here as well
   *   {valueName: "someName"}
   * )(Example)
   * <Component {...props} />
   * // is equivalent to
   * <>
   *   //                                ↓ "someName" here as well
   *   <Example key={0} {...props} i={0} someName="a" />
   *   <Example key={1} {...props} i={1} someName="b" />
   * </>
   */
  valueName?: ValueName;
  /**
   * @default (props) => props[indexName] // which is props.i
   *
   * @example
   * // makes key = 2^x
   * const Component = withForEach(4, {key: ({i}) => 2 ** i})(Example)
   * <Component {...props} />
   * // is equivalent to
   * <>
   *   //            ↓ note key values
   *   <Example key={1} {...props} someName={0} />
   *   <Example key={2} {...props} someName={1} />
   *   <Example key={4} {...props} someName={2} />
   *   <Example key={8} {...props} someName={2} />
   * </>
   */
  key?: (props: object) => Key;
}

interface WithForEachHoc {
  <IndexName extends string, ValueName extends string>(
    target: number | Array<unknown> | object,
    options?: Options<IndexName, ValueName>,
  ): Hoc<
    [
      SetOptionalFn<
        | ([IndexName & ""] extends [never] ? IndexName : "i")
        | ([ValueName & ""] extends [never] ? ValueName : "children")
      >,
    ]
  >;
}

const isReactNode = (value: unknown): boolean =>
  isValidElement(value) || typeof value !== "object" || value === null;

/**
 * Like Array.map but for React components.
 * Concatenates components for each item in array, range or object
 *
 * @experimental It needs to discuss its name
 *
 * @example
 * const Component = withForEach(3)(Example)
 * <Component {...props} />
 * // is equivalent to
 * <>
 *   <Example key={0} {...props} i={0} />
 *   <Example key={1} {...props} i={1} />
 *   <Example key={2} {...props} i={2} />
 * </>
 *
 * @example
 * const Component = withForEach(["a", "b"])(Example)
 * <Component {...props} />
 * // is equivalent to
 * <>
 *   <Example key={0} {...props} i={0}>a</Example>
 *   <Example key={1} {...props} i={1}>b</Example>
 * </>
 *
 * @example
 * const Component = withForEach({
 *   a: 100,
 *   b: 200,
 * })(Example)
 * <Component {...props} />
 * // is equivalent to
 * <>
 *   <Example key="a" {...props} i="a">100</Example>
 *   <Example key="b" {...props} i="b">200</Example>
 * </>
 */
export const withForEach = newHoc<WithForEachHoc>(function withForEach(
  Component: ComponentType,
  target: number | Array<unknown> | object,
  {
    indexName = "i",
    key = (props: any): Key => props[indexName],
    valueName = "children",
  } = {},
): FunctionComponent {
  function componentWithKey(newProps: any): ReactNode {
    if (valueName === "children") {
      const { children, ...rest } = newProps;
      return (
        <Component key={key(newProps)} {...rest}>
          {children}
        </Component>
      );
    }
    return <Component key={key(newProps)} {...newProps} />;
  }

  return function WithForEach(props: any): ReactNode {
    const children = ((): ReactNode[] => {
      if (typeof target === "number") {
        return Array.from({ length: target }).map((_v, i) =>
          componentWithKey({ ...props, [indexName]: i }),
        );
      }

      if (Array.isArray(target)) {
        if (target.length === 0) {
          return [];
        }

        if (isReactNode(target[0])) {
          return target.map((v, i) =>
            componentWithKey({ ...props, [indexName]: i, [valueName]: v }),
          );
        }

        return target.map((v, i) =>
          componentWithKey({ ...v, ...props, [indexName]: i }),
        );
      }

      if (typeof target === "object" && target !== null) {
        if (Object.keys(target).length === 0) {
          return [];
        }

        if (isReactNode(Object.values(target)[0])) {
          return Object.entries(target).map(([index, value]) => {
            return componentWithKey({
              ...props,
              [indexName]: index,
              [valueName]: value,
            });
          });
        }

        return Object.entries(target).map(([index, value]) => {
          return componentWithKey({ ...value, ...props, [indexName]: index });
        });
      }

      if (process.env.NODE_ENV !== "production") {
        const never: never = target;
        never;
      }
      throw new Error(
        "withForEach: should be used with number, Array or object",
      );
    })();

    return createElement(Fragment, null, ...children);
  };
});
