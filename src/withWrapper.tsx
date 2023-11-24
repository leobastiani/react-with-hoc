import { ComponentType, FunctionComponent } from "react";
import { newHoc } from "./newHoc";
import { Hoc } from "./types/Hoc";

interface WithWrapperHoc {
  (
    Wrapper: ComponentType<any>,
    options?:
      | {
          pickProps: string[];
          omitProps?: undefined;
        }
      | {
          omitProps: string[];
          pickProps?: undefined;
        }
  ): Hoc<[]>;
}

export const withWrapper = newHoc<WithWrapperHoc>(function withWrapper(
  Component: ComponentType<any>,
  Wrapper: ComponentType<any>,
  {
    pickProps,
    omitProps,
  }: {
    pickProps?: string[];
    omitProps?: string[];
  } = { pickProps: [] }
): FunctionComponent {
  if (process.env.NODE_ENV !== "production") {
    const bothAssigned = pickProps && omitProps;
    const noneAssigned = !pickProps && !omitProps;
    if (bothAssigned || noneAssigned) {
      throw new Error(
        "withWrapper should have either pickProps or omitProps assigned"
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
