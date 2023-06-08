import { ComposeLeft, Objects } from "hotscript";
import { ComponentType, FunctionComponent } from "react";
import { PartialBy } from "./@types/PartialBy";
import { Hoc } from "./Hoc";
import { newHoc } from "./newHoc";

type ClassNameArg<DependencyProps extends {}> =
  | string
  | ((props: DependencyProps) => string | string[])
  | (string | ((props: DependencyProps) => string | string[]))[];

interface WithClassNameHoc {
  <DependencyProps extends {}>(className?: ClassNameArg<DependencyProps>): Hoc<
    ComposeLeft<
      [
        Objects.Assign<DependencyProps>,
        Objects.Update<"className", string | string[]>,
        PartialBy<"className">
      ]
    >
  >;
}

export const withClassName = newHoc(function withClassName(
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
}) as WithClassNameHoc;
