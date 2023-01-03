import { CSSProperties } from "react";

type WithStyle<Props> = "style" extends keyof Props
  ? Props extends { style?: unknown }
    ? { style?: CSSProperties }
    : { style: CSSProperties }
  : {};

export type BaseProperties<Props extends {}> = {
  [K in keyof Props as K extends "style" ? never : K]: Props[K];
} & WithStyle<Props>;
