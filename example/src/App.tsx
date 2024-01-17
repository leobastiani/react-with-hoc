import { withProp } from "react-with-hoc";
import { Clock, ClockCircle } from "./Clock";
import { HourPointer } from "./Pointers";
import { withStyle } from "./hocs/withStyle";

const RedHour = withProp("color", "red")(HourPointer);

const Square = withStyle({
  borderRadius: 0,
})(ClockCircle);

function App(): JSX.Element {
  return (
    <>
      <div>
        <h1>The default clock</h1>
        <Clock />
      </div>
      <div>
        <h1>#1 Variant: without minute marks</h1>
        <Clock MinuteMarks={null} />
      </div>
      <div>
        <h1>#2 With a red hour pointer</h1>
        <Clock HourPointer={(): typeof RedHour => RedHour} />
      </div>
      <div>
        <h1>#3 Inside a square</h1>
        <Clock Circle={(): typeof Square => Square} />
      </div>
    </>
  );
}

export default App;
