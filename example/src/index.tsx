import React from "react";
import ReactDOM from "react-dom/client";
import { withProp, withStyleObjectStrategy } from "react-with-hoc";
import { Clock, ClockCircle } from "./Clock";
import { HourPointer } from "./Pointers";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const RedHour = withProp("color", "red")(HourPointer);

const Square = withStyleObjectStrategy({
  borderRadius: 0,
})(ClockCircle);

root.render(
  <React.StrictMode>
    <Clock />
    <Clock MinuteMarks={null} />
    <Clock HourPointer={(): typeof RedHour => RedHour} />
    <Clock Circle={(): typeof Square => Square} />
  </React.StrictMode>
);
