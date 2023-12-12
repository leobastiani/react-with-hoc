import { CSSProperties, ReactNode } from "react";
import { withStyle } from "./hocs/withStyle";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Circle = (() => {
  function Circle({
    style,
    children,
  }: {
    style: CSSProperties;
    children: ReactNode;
  }): JSX.Element {
    return <div style={style}>{children}</div>;
  }

  return withStyle(
    ({ size, border }: { size: number; border: number }) => ({
      display: "inline-block",
      boxSizing: "border-box",
      border: `${border}px solid black`,
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      position: "relative",
    }),
    ["border", "size"],
  )(Circle);
})();
