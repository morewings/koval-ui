[![Deploy Storybook](https://github.com/morewings/react-forge-ui/actions/workflows/pages.yml/badge.svg)](https://github.com/morewings/react-forge-ui/actions/workflows/pages.yml)
[![Post-merge tasks](https://github.com/morewings/react-forge-ui/actions/workflows/merge-jobs.yml/badge.svg)](https://github.com/morewings/react-forge-ui/actions/workflows/merge-jobs.yml)
[![types included](https://img.shields.io/github/package-json/types/morewings/react-forge-ui)](https://github.com/morewings/react-forge-ui)
[![npm version](https://badge.fury.io/js/react-forge-ui.svg)](https://www.npmjs.com/package/react-forge-ui)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-forge-ui)](https://bundlephobia.com/result?p=react-forge-ui)

# Forge React components library

[![NPM library Create React App template logo](./design/logo.png)](#)

React Forge UI is component library built for modern browsers. Each component tries to utilize built in browser APIs to full extent.

## Features

- Supports **Typescript**, bundled types.
- **ESM** and **commonjs** bundles.
- Compatible with **Nextjs**.
- CSS Flex column-based layout.
- Inputs compatible with **react-hook-form** and similar libraries.
- Built-in form validation.
- Typography components.

See [Forge Storybook](https://morewings.github.io/react-forge-ui/).

## Quickstart

Install library with the package manager of your choice

```bash
npm i react-forge-ui
```

Include Forge css styles and wrap your application with Provider.

```jsx
import {Provider} from 'react-forge-ui';
import 'react-forge-ui/dist/style.css'

const App = ({children}) => {
    //...
    return <Provider>{children}</Provider>
}
```

## Acknowledgments

<img width="222" src="https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.png" alt="JetBrains Logo (Main) logo.">

This project is developed using amazing **Webstorm IDE** provided by [Jetbrains](https://www.jetbrains.com).


