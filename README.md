# react-with-hoc <!-- omit in toc -->

<a href="https://leobastiani.github.io/react-with-hoc/">
  <img src="./.github/logo/logo.png" />
</a>

**Type safe** and **Zero-cost** React library to work with higher-order components (HOCs)

[![NPM version](https://img.shields.io/npm/v/react-with-hoc)](https://www.npmjs.com/package/react-with-hoc)
[![Build](https://github.com/leobastiani/react-with-hoc/actions/workflows/publish.yml/badge.svg)](https://github.com/leobastiani/react-with-hoc/actions/workflows/publish.yml)
![Typescript](https://img.shields.io/npm/types/react-with-hoc)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/react-with-hoc)](https://bundlephobia.com/package/react-with-hoc)
[![Bundle dependency](https://badgen.net/bundlephobia/dependency-count/react-with-hoc)](https://www.npmjs.com/package/react-with-hoc?activeTab=dependencies)
[![License](https://img.shields.io/github/license/leobastiani/react-with-hoc)](https://github.com/leobastiani/react-with-hoc/blob/main/LICENSE)

- [Getting Started](#getting-started)
- [Usage example](#usage-example)
  - [Example with react-query](#example-with-react-query)

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
