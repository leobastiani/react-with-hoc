import { withHocs, withProp } from "react-with-hoc";

export function Pointer({
  height,
  length,
  rotation,
  circleSize,
  circleBorder,
  color = "black",
}: {
  height: number;
  length: number;
  rotation: number;
  circleSize: number;
  circleBorder: number;
  color: string;
}): JSX.Element {
  return (
    <div
      style={{
        position: "absolute",
        width: `${length}px`,
        height: `${height}px`,
        transform: `translateY(calc(-${height}px / 2)) translateY(calc((${circleSize}px - ${circleBorder}px * 2) / 2)) translateX(calc((${circleSize}px - ${circleBorder}px * 2) / 2))`,
      }}
    >
      <div
        style={{
          background: color,
          width: "100%",
          height: "100%",
          transformOrigin: `0 ${height / 2}px`,
          transform: `rotate(${rotation - 90}deg)`,
        }}
      ></div>
    </div>
  );
}

export const SecondPointer = withHocs([
  withProp("height", 1),
  withProp(
    "length",
    ({ circleSize }: { circleSize: number }) => (circleSize / 2) * 0.9,
    ["circleSize"],
  ),
  withProp(
    "rotation",
    ({ time }: { time: number }) => ((time % 60000) * 360) / 60000,
    ["time"],
  ),
])(Pointer);

export const MinutePointer = withHocs([
  withProp("height", 5),
  withProp(
    "length",
    ({ circleSize }: { circleSize: number }) => (circleSize / 2) * 0.6,
    ["circleSize"],
  ),
  withProp(
    "rotation",
    ({ time }: { time: number }) =>
      ((time % (60 * 60000)) * 360) / (60 * 60000),
    ["time"],
  ),
])(Pointer);

export const HourPointer = withHocs([
  withProp("height", 10),
  withProp(
    "length",
    ({ circleSize }: { circleSize: number }) => (circleSize / 2) * 0.4,
    ["circleSize"],
  ),
  withProp(
    "rotation",
    ({ time }: { time: number }) => {
      const hour =
        ((time - new Date().getTimezoneOffset() * 60 * 1000) %
          (60 * 60 * 1000 * 24)) /
        (60 * 60 * 1000);
      const clockHour = hour % 12;

      return (clockHour * 360) / 12;
    },
    ["time"],
  ),
])(Pointer);
