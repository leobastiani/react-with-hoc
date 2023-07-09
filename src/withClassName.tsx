import { ComponentType, FunctionComponent } from "react";
import { IntersectionFn, KeepNeversFn, ReplaceFn, ToSchema } from "./Fn";
import { Hoc } from "./Hoc";
import { newHoc } from "./newHoc";

type ClassNameArg<DependencyProps extends {}> =
  | string
  | ((props: DependencyProps) => string | string[])
  | (string | ((props: DependencyProps) => string | string[]))[];

interface WithClassNameHoc {
  <DependencyProps extends {}>(className?: ClassNameArg<DependencyProps>): Hoc<
    [
      IntersectionFn<ToSchema<DependencyProps>>,
      KeepNeversFn<ReplaceFn<["className", string | string[] | undefined]>>
    ]
  >;
}

export const withClassName = newHoc<WithClassNameHoc>(function withClassName(
  Component: ComponentType,
  classNameArg: any = []
): FunctionComponent {
  return function WithClassName(props: any): JSX.Element {
    if (typeof classNameArg === "function") {
      classNameArg = classNameArg(props);
    }
    if (Array.isArray(classNameArg)) {
      classNameArg = classNameArg
        .map((c) => (typeof c === "function" ? c(props) : c))
        .flat();
    }
    const className = new Set<string>();
    for (const prop of [classNameArg, props.className].filter(
      (c) => c?.length
    )) {
      if (typeof prop === "string" && prop) {
        className.add(prop);
      } else if (Array.isArray(prop)) {
        for (const p of prop) {
          if (p) {
            className.add(p);
          }
        }
      }
    }
    return <Component {...props} className={Array.from(className).join(" ")} />;
  };
});
