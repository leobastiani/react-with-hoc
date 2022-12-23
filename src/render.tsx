import { ComponentType } from "react";
import { combineProps } from "./combineProps";

export function render<T, Old extends object, New extends object>(
  Component: ComponentType<T>,
  oldProps: Old,
  newProps: New
): JSX.Element {
  return <Component {...combineProps(oldProps, newProps)} />;
}
