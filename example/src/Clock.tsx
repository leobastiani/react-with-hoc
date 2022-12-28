import {
  withComponent,
  withHocs,
  withMap,
  withProp,
  withRename,
  withState,
} from "react-new-hoc";
import { Circle } from "./Circle";
import { HourMark, MinuteMark } from "./Marks";
import { HourPointer, MinutePointer, SecondPointer } from "./Pointers";
import { useAnimationFrame } from "./useRequestAnimationFrame";

const MinuteMarks = withMap(60)(MinuteMark);
const HourMarks = withMap(12)(HourMark);

type MinuteMarks = typeof MinuteMarks;
type HourMarks = typeof HourMarks;

export const ClockCircle = withHocs(
  withRename("circleSize", "size"),
  withRename("circleBorder", "border")
)(Circle);

type SecondPointer = typeof SecondPointer;
type MinutePointer = typeof MinutePointer;
type HourPointer = typeof HourPointer;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Clock = (() => {
  function Clock({
    setTime,
    Circle,
    MinuteMarks,
    HourMarks,
    SecondPointer,
    MinutePointer,
    HourPointer,
  }: {
    setTime: (n: number) => void;
    Circle: typeof ClockCircle;
    MinuteMarks: MinuteMarks;
    HourMarks: HourMarks;
    SecondPointer: SecondPointer;
    MinutePointer: MinutePointer;
    HourPointer: HourPointer;
  }): JSX.Element {
    useAnimationFrame(() => setTime(Date.now()));

    return (
      <Circle>
        <MinuteMarks />
        <HourMarks />
        <SecondPointer />
        <MinutePointer />
        <HourPointer />
      </Circle>
    );
  }

  return withHocs(
    withState("time", { init: () => Date.now() }),
    withProp("circleSize", 400),
    withProp("circleBorder", 3),
    withComponent("Circle", ClockCircle),
    withComponent("MinuteMarks", MinuteMarks),
    withComponent("HourMarks", HourMarks),
    withComponent("SecondPointer", SecondPointer),
    withComponent("MinutePointer", MinutePointer),
    withComponent("HourPointer", HourPointer)
  )(Clock);
})();
