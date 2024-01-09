import React, { ComponentType, FunctionComponent } from "react";
import { IntersectionFn, ToSchema } from "../types/Fn";
import { Hoc } from "../types/Hoc";
import { newHoc } from "../utils/newHoc";

export interface WithWrapperHoc {
  <
    const WrapperProps,
    const PickOptions extends string[] = [never],
    const OmitOptions extends string[] = [never],
  >(
    Wrapper: ComponentType<WrapperProps>,
    options?:
      | {
          /**
           * @example
           * const NewComponent = withWrapper(Wrapper, { pickProps: ['a', 'b'] })(Component)
           * <NewComponent a="a" b="b" c="c" />
           * // is equivalent to
           * <Wrapper a="a" b="b">
           *   <Component a="a" b="b" c="c" />
           * </Wrapper>
           */
          pickProps: PickOptions;
          omitProps?: undefined;
        }
      | {
          /**
           * @example
           * const NewComponent = withWrapper(Wrapper, { omitProps: ['a', 'b'] })(Component)
           * <NewComponent a="a" b="b" c="c" />
           * // is equivalent to
           * <Wrapper c="c">
           *   <Component a="a" b="b" c="c" />
           * </Wrapper>
           */
          omitProps: OmitOptions;
          pickProps?: undefined;
        },
  ): PickOptions extends [never]
    ? OmitOptions extends [never]
      ? // has none
        Hoc<[]>
      : // has omit
        Hoc<
          [
            IntersectionFn<
              Exclude<
                ToSchema<WrapperProps>,
                [OmitOptions[number] | "children", any]
              >
            >,
          ]
        >
    : // has pick
      Hoc<
        [
          IntersectionFn<
            Extract<
              Exclude<ToSchema<WrapperProps>, ["children", any]>,
              [PickOptions[number], any]
            >
          >,
        ]
      >;
}

/**
 * Wraps the component with the provided Component Wrapper
 * ```tsx
 * const NewComponent = withWrapper(Wrapper)(Component)
 * <NewComponent a="a" b="b" c="c" />
 * // is equivalent to
 * <Wrapper> // by default, it does not bring any prop
 *   <Component a="a" b="b" c="c" />
 * </Wrapper>
 * ```
 *
 * @example
 * const NewComponent = withWrapper(Wrapper, { pickProps: ['a', 'b'] })(Component)
 * <NewComponent a="a" b="b" c="c" />
 * // is equivalent to
 * <Wrapper a="a" b="b">
 *   <Component a="a" b="b" c="c" />
 * </Wrapper>
 * @example
 * const NewComponent = withWrapper(Wrapper, { omitProps: ['a', 'b'] })(Component)
 * <NewComponent a="a" b="b" c="c" />
 * // is equivalent to
 * <Wrapper c="c">
 *   <Component a="a" b="b" c="c" />
 * </Wrapper>
 * @example
 * // to carry all props, use omitProps with empty array
 * const NewComponent = withWrapper(Wrapper, { omitProps: [] })(Component)
 * <NewComponent a="a" b="b" c="c" />
 * // is equivalent to
 * <Wrapper a="a" b="b" c="c">
 *   <Component a="a" b="b" c="c" />
 * </Wrapper>
 */
export const withWrapper = newHoc<WithWrapperHoc>(function withWrapper(
  Component: ComponentType<any>,
  Wrapper: ComponentType<any>,
  {
    pickProps,
    omitProps,
  }: {
    pickProps?: string[];
    omitProps?: string[];
  } = { pickProps: [] },
): FunctionComponent {
  if (process.env.NODE_ENV !== "production") {
    const bothAssigned = pickProps && omitProps;
    const noneAssigned = !pickProps && !omitProps;
    if (bothAssigned || noneAssigned) {
      throw new Error(
        "withWrapper should have either pickProps or omitProps assigned",
      );
    }
  }

  const set = new Set(pickProps || omitProps);

  return function WithWrapper(props: any): JSX.Element {
    if (set.size === 0 && pickProps) {
      return (
        <Wrapper>
          <Component {...props} />
        </Wrapper>
      );
    }

    if (set.size === 0 && omitProps) {
      return (
        <Wrapper {...props}>
          <Component {...props} />
        </Wrapper>
      );
    }

    const parentProps = {} as any;
    if (pickProps) {
      for (const prop in props) {
        if (set.has(prop)) {
          parentProps[prop] = props[prop];
        }
      }
    } else if (omitProps) {
      for (const prop in props) {
        if (!set.has(prop)) {
          parentProps[prop] = props[prop];
        }
      }
    }

    return (
      <Wrapper {...parentProps}>
        <Component {...props} />
      </Wrapper>
    );
  };
});
