import React, { ReactNode } from "react";
import { withHocs, withWrapper } from "react-with-hoc";

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
  function App(props: any): JSX.Element {
    return <pre>{JSON.stringify(props, null, 2)}</pre>;
  }

  return withHocs([withWrapper(ProviderTop), withWrapper(ProviderBottom)])(App);
})();
