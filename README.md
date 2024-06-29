[![Deploy Storybook](https://github.com/morewings/koval-ui/actions/workflows/pages.yml/badge.svg)](https://github.com/morewings/koval-ui/actions/workflows/pages.yml)
[![Post-merge tasks](https://github.com/morewings/koval-ui/actions/workflows/merge-jobs.yml/badge.svg)](https://github.com/morewings/koval-ui/actions/workflows/merge-jobs.yml)
[![types included](https://img.shields.io/github/package-json/types/morewings/koval-ui)](https://github.com/morewings/koval-ui)
[![npm version](https://badge.fury.io/js/koval-ui.svg)](https://www.npmjs.com/package/koval-ui)
[![npm bundle size](https://deno.bundlejs.com/badge?q=koval-ui@latest&config={"esbuild":{"external":["react","react-dom"]}})](https://bundlejs.com/?bundle&q=koval-ui@latest&config={"analysis":"treemap","esbuild":{"external":["react","react-dom"]}})
[![Maintainability](https://api.codeclimate.com/v1/badges/bd5faa98bfe0416e4ce4/maintainability)](https://codeclimate.com/github/morewings/koval-ui/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/bd5faa98bfe0416e4ce4/test_coverage)](https://codeclimate.com/github/morewings/koval-ui/test_coverage)

# Koval components library

[![NPM library Create React App template logo](./design/logo.png)](#)

Koval UI is component library built for modern browsers. Each component tries to utilize built in browser APIs to full extent.

## Features

- Supports **Typescript**, bundled types.
- **ESM** and **commonjs** bundles.
- Compatible with **Nextjs**.
- CSS Flex column-based layout.
- Inputs compatible with **react-hook-form** and similar libraries.
- Built-in form validation.
- Typography components.

Read [Koval docs](https://koval.support/)
See [Koval Storybook](https://morewings.github.io/koval-ui/).

## Quickstart

Install library with the package manager of your choice

```bash
npm i koval-ui
```

Include Koval css styles and wrap your application with Provider.

```jsx
import {Provider} from 'koval-ui';
import 'koval-ui/dist/style.css'

const App = ({children}) => {
    //...
    return <Provider>{children}</Provider>
}
```

## Acknowledgments

<img width="222" src="https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.png" alt="JetBrains Logo (Main) logo.">

This project is developed using amazing **Webstorm IDE** provided by [Jetbrains](https://www.jetbrains.com).


