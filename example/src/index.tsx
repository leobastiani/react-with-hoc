import React from "react";
import ReactDOM from "react-dom/client";
import { componentDisplayName } from "react-new-hoc";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

function Example(): JSX.Element {
  return <div />;
}

console.log(
  "componentDisplayName.get(Example):",
  componentDisplayName.get(Example)
);

root.render(
  <React.StrictMode>
    <div>
      <h2>Default counter</h2>
    </div>
    <hr />
    <div>
      <h2>Counter with predefined value</h2>
    </div>
  </React.StrictMode>
);
