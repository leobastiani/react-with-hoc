import React, { Dispatch, SetStateAction } from "react";
import {
  PartialComponent,
  withComponents,
  withForEach,
  withHocs,
  withProp,
  withRenames,
  withState,
} from "react-with-hoc";
import { Circle } from "./Circle";
import { HourMark, MinuteMark } from "./Marks";
import { HourPointer, MinutePointer, SecondPointer } from "./Pointers";
import { useAnimationFrame } from "./useRequestAnimationFrame";

const MinuteMarks = withForEach(60)(MinuteMark);
const HourMarks = withForEach(12)(HourMark);

type MinuteMarks = typeof MinuteMarks;
type HourMarks = typeof HourMarks;

export const ClockCircle = withRenames({
  circleSize: "size",
  circleBorder: "border",
})(Circle);

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
    setTime: Dispatch<SetStateAction<number>>;
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

  return withHocs([
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
    }),
  ])(Clock);
})();
