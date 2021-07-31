<div align="center">
   <p>
    <h1>react-form-planner</h1>
  </p>
  <p>
     <i>Build or view, you beautiful form is just a click away.</i>
  </p>

  <p>

  </p>
</div>

---

![GitHub watchers](https://img.shields.io/github/watchers/koustov/react-form-planner.svg?logo=github&label=Watch) ![GitHub watchers](https://img.shields.io/github/issues/koustov/react-form-planner?logo=github&label=Issues) ![GitHub watchers](https://img.shields.io/github/stars/koustov/react-form-planner?logo=github&label=Stars)

This is a **fully customizable** form builder based on [`React`](https://facebook.github.io/react/)
**Content**

- [Features](##features)
- [When do you need it?](##when_do_you_need_it?)
- [How to use](##Howtouse?)
- [Playground/Demo](##playground)
- [Screenshots](##screenshots)
- [Contribution](##contribution)
- [License](##license)

## Features ✨

- JSON based.
- Redux based.
- Responsive
- Customizable
- Quick and easy.
- Styled component based.
- Theme supported
- Full validation support
- Custom theme

## When do you need it? 🔥

- You have complex form to be created?
- Forms are dynamic in nature?
- You don't want to manage the form?
- You need a structured/organised form rendering?
- You are providing forms as service

## Usage

- Simple Form
- Dynamic Form
- Quiz
- Exams
- Tutorial
- Sky is the only limit

### Install 🐙

```bash
npm install react-form-planner
```

or

```bash
yarn add react-form-planner
```

## Highlight

This project contains an advanced Form Builder and a Form Viewer.

### Form Builder

- Capable of creating form of any type.
- Styled component theme support
- Endlesss Customization
- Add your own style
- Add your own properties

### How to use

Import FormPlanner component

```jsx
import { FormPlanner } from 'react-form-viewer'
```

Just drop it to desired place

```jsx
<FormPlanner
  onControlValueChanged={() => {
    console.log('onControlValueChanged')
  }}
  onFormValueChanged={() => {
    console.log('onFormValueChanged')
  }}
  theme={dark}
/>
```

### Supported Elements

FormPlanner comes with tons of prebuilt elements which are already grouped for convenience. Few of them are visible by default. Rest can be turned on when required

| Group         | Element       | Availability |
| ------------- | ------------- | ------------ |
| Basic         | Header        | Default      |
|               | Medium Header | Default      |
|               | Small Header  | Default      |
|               | Label         | Default      |
| Form Control  | Text Box      | On Demand    |
|               | Number Box    | On Demand    |
|               | Multiline Box | On Demand    |
|               | Checkbox      | On Demand    |
|               | Radio         | On Demand    |
|               | Select        | On Demand    |
| Media         | Image         | On Demand    |
|               | Video         | On Demand    |
|               | PDF           | On Demand    |
| Quiz          | Question      | On Demand    |
| Advanced      | Grid          | On Demand    |
|               | Rich Text     | On Demand    |
| Miscellaneous | Divider       | On Demand    |

### Form Viewer

This is a full fledged form viewer.

- Capable of rendering complex form layout.
- Multi line and multi row
- Theme support

### How to use

Import FormPlanner component

```jsx
import { FormPlanner } from 'react-form-viewer'
```

Just drop it to desired place

```jsx
<FormViewer
                  onChange={(a, b, c) => {
                    console.log('Value received')
                  }}
                  template={<template_data>}
                />
```

## Playground

Getting built

## Screenshots

Coming Soon

## Items in queue

- Localization

## Contribution 🍰

Feel free to create PR and make pull request
Refer [code of conduct ](./CODE_OF_CONDUCT.md)
Refer [contributing ](./CONTRIBUTING.md)

## License

MIT © [Koustov](https://github.com/koustov)
