import {
  PartialComponent,
  SetState,
  withComponents,
  withMap,
  withProp,
  withRenames,
  withRevHocs,
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

export const ClockCircle = withRenames({
  circleSize: "size",
  circleBorder: "border",
} as const)(Circle);

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
    setTime: SetState<number>;
    Circle: PartialComponent<typeof ClockCircle>;
    MinuteMarks: PartialComponent<MinuteMarks>;
    HourMarks: PartialComponent<HourMarks>;
    SecondPointer: PartialComponent<SecondPointer>;
    MinutePointer: PartialComponent<MinutePointer>;
    HourPointer: PartialComponent<HourPointer>;
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

  return withRevHocs(
    withState("time", { init: () => Date.now() }),
    withProp("circleSize", 400),
    withProp("circleBorder", 3),
    withComponents({
      Circle: ClockCircle,
      MinuteMarks,
      HourMarks,
      SecondPointer,
      MinutePointer,
      HourPointer,
    })
  )(Clock);
})();
