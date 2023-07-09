import React, { CSSProperties, ReactNode } from "react";
import { withHocs, withStyleObjectStrategy, withWrapper } from "react-with-hoc";

/**
 * Testing withHocs in the browser
 */

const ProviderTop: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div id="provider-top">{children}</div>;
};

const ProviderBottom: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div id="provider-bottom">{children}</div>;
};

export const App = ((): React.FC => {
  function App({ style }: { style: CSSProperties }): JSX.Element {
    return <pre>{JSON.stringify(style, null, 2)}</pre>;
  }

  return withHocs([
    withWrapper(ProviderTop),
    withStyleObjectStrategy({
      background: "black",
      borderColor: "white",
    }),
    withWrapper(ProviderBottom),
    withStyleObjectStrategy({
      borderColor: "red",
      display: "block",
    }),
  ])(App);
})();
