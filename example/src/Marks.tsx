import React from "react";
import { withHocs, withProp } from "react-with-hoc";

export function NumberMark({
  rotation = 0,
  widthWhenVertical = 3,
  heightWhenVertical = 10,
  circleSize = 100,
  circleBorder = 3,
  color = "black",
}: {
  rotation: number;
  widthWhenVertical: number;
  heightWhenVertical: number;
  circleSize: number;
  circleBorder: number;
  color: string;
}): JSX.Element {
  return (
    <div
      style={{
        position: "absolute",
        width: `${circleSize - circleBorder * 2}px`,
        height: `${widthWhenVertical}px`,
        transform: `translateY(calc((${circleSize}px - ${
          circleBorder * 2
        }px - ${widthWhenVertical}px) / 2)) rotate(${rotation + 90}deg)`,
      }}
    >
      <div
        style={{
          width: `${heightWhenVertical}px`,
          height: "100%",
          background: color,
        }}
      />
    </div>
  );
}

export const MinuteMark = withHocs([
  withProp("widthWhenVertical", 1),
  withProp("rotation", ({ i }: { i: number }) => (i * 360) / 60, ["i"]),
])(NumberMark);

export const HourMark = withHocs([
  withProp("widthWhenVertical", 3),
  withProp("rotation", ({ i }: { i: number }) => (i * 360) / 12, ["i"]),
])(NumberMark);
