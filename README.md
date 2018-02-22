# react-as-hoc

> When you wanted an HOC but some jerk gave you a render-prop component.

[![NPM](https://img.shields.io/npm/v/react-as-hoc.svg)](https://www.npmjs.com/package/react-as-hoc) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add react-as-hoc
```

## Usage

This example is based on [react-motion](https://github.com/chenglou/react-motion)'s render Prop API.

```jsx
// react-motion-hoc.js
import asHoc from 'react-as-hoc';
import { Motion, spring } from 'react-motion';

export default asHoc(Motion, (ownProps) => ({defaultStyle: {x: 0}, style={x: spring(10)}}))(value => ({value}));
```

```jsx
// my-component.js
import React from 'react';
import motionHoc from './react-motion-hoc';


class MyComponent extends React.Component<{value: Object}> {
  constructor(props) {
    super(props)

    // value from Motion's render prop API
    console.log(props.value.x);
  }
}

export default motionHoc(MyComponent);
```

## Why

There are some situations where render props just _don't make sense._ Other times, stylisticly you'd rather have an HOC. The decision should be in your court.
Check out [all the _cool_](https://github.com/jaredpalmer/awesome-react-render-props) render-prop APIs you can make into HOCs!

## License

MIT © [Blaine Kasten](https://github.com/blainekasten)
