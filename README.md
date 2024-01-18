# react-with-hoc <!-- omit in toc -->

<a href="https://leobastiani.github.io/react-with-hoc/">
  <img src="https://raw.githubusercontent.com/leobastiani/react-with-hoc/main/.github/logo/logo.png" />
</a>

**Type safe** and **Zero-cost** React library to work with higher-order component (HOC)

[![Documentation](https://img.shields.io/badge/docs-blue)](https://leobastiani.github.io/react-with-hoc/)
[![NPM version](https://img.shields.io/npm/v/react-with-hoc)](https://www.npmjs.com/package/react-with-hoc)
[![Build](https://github.com/leobastiani/react-with-hoc/actions/workflows/test.yml/badge.svg)](https://github.com/leobastiani/react-with-hoc/actions/workflows/test.yml)
![Typescript](https://img.shields.io/npm/types/react-with-hoc)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/react-with-hoc)](https://bundlephobia.com/package/react-with-hoc)
[![Bundle dependency](https://badgen.net/bundlephobia/dependency-count/react-with-hoc)](https://www.npmjs.com/package/react-with-hoc?activeTab=dependencies)
[![License](https://img.shields.io/github/license/leobastiani/react-with-hoc)](https://github.com/leobastiani/react-with-hoc/blob/main/LICENSE)

- [Getting Started](#getting-started)
- [Usage example](#usage-example)
  - [Hello World](#hello-world)
  - [Example with react-query](#example-with-react-query)
  - [Clock](#clock)

## Getting Started

[Read the docs](https://leobastiani.github.io/react-with-hoc/)

Install with npm

```bash
npm install react-with-hoc
```

Or install with yarn

```bash
yarn add react-with-hoc
```

## Usage example

### Hello World

```tsx
import { withDefault, withOverride, withHocs } from "react-with-hoc";

export const Hello = (() => {
  function Hello({ name }: { name: string }) {
    return <div>Hello {name}!</div>;
  }

  return withHocs([withDefault({ name: "World" })])(Hello);
})();

// <Hello /> is equivalent to <div>Hello World!</div>
// <Hello name="You" /> is equivalent to <div>Hello You!</div>

export const HelloYou = withOverride("name", "You")(Hello);

// <HelloYou /> is equivalent to <div>Hello You!</div>
// <HelloYou name="..." /> is a typescript error ❌
```

### Example with react-query

Lets suppose you have the following code and then you need a query inside your App component

```tsx
const queryClient = new QueryClient();

function App() {
  // Oops... ❌
  // This is an error because App is not wrapped by QueryClientProvider
  const query = useQuery({...});

  return (
    <QueryClientProvider client={queryClient}>
      <>...</>
    </QueryClientProvider>
  );
}

export default App;
```

Using `react-with-hoc`, you can easily fix this with:

```tsx
import {withWrapper, withOverride} from "react-with-hoc";

const queryClient = new QueryClient();

function App() {
  // ✅
  const query = useQuery({...});

  return (
    <>...</>
  );
}

export default withWrapper(
  withOverride({ client: queryClient })(QueryClientProvider)
)(App);

// for didactic purpose, the following code could also be applied
// const MyQueryClientProvider = withOverride({ client: queryClient })(QueryClientProvider)
// export default withWrapper(MyQueryClientProvider)(App);
```

Using [IIFE](https://developer.mozilla.org/pt-BR/docs/Glossary/IIFE)

```tsx
import { withWrapper, withOverride, withHocs } from "react-with-hoc";

const queryClient = new QueryClient();

const App = (() => {
  function App() {
    // ✅
    const query = useQuery({...});

    return <>...</>;
  }

  return withHocs([
    withWrapper(withOverride({ client: queryClient })(QueryClientProvider)),
  ])(App);
})();

export default App;
```

### Clock

- [Demo](https://leobastiani.github.io/react-with-hoc/example/)
- [Source](https://github.com/leobastiani/react-with-hoc/tree/main/example/src/App.tsx)

Check out an entire project with react-with-hoc, see the [demo](https://leobastiani.github.io/react-with-hoc/example/) and try to imagine creating a reusable component with the same flexibility

Take a look on how simple it's the final result

```tsx
const RedHour = withOverride("color", "red")(HourPointer);

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
```
