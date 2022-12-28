import React from "react";
import ReactDOM from "react-dom/client";
import { withProp } from "react-new-hoc";
import { Clock } from "./Clock";
import { HourPointer } from "./Pointers";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const RedHour = withProp("color", "red")(HourPointer);

root.render(
  <React.StrictMode>
    <Clock />
    <Clock MinuteMarks={null} />
    <Clock HourPointer={(): typeof RedHour => RedHour} />
  </React.StrictMode>
);
