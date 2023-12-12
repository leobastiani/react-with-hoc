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
      <Clock />
      <Clock MinuteMarks={null} />
      <Clock HourPointer={(): typeof RedHour => RedHour} />
      <Clock Circle={(): typeof Square => Square} />
    </>
  );
}

export default App;
