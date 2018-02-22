# react-as-hoc

> When you wanted an HOC but some jerk gave you a render-prop component.

[![NPM](https://img.shields.io/npm/v/react-as-hoc.svg)](https://www.npmjs.com/package/react-as-hoc) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add react-as-hoc
```

## API

This function curries a few functions to properly translate all the data in the correct ways. The API is effectively:

```js
type RenderPropFunction = ({children: Function}) => Function;
type PropFn = (props: Object) => Object;
type TransformMethod = (...renderArgs:any) => Object;

type AsHoc = (RenderPropsFunction, ?PropFn) => TransformMethod => React$Component;
```

Explanation:

```js
const wrappedButNeedsTransform = asHoc(
  // This is the render prop component you are wanting to change into an HOC
  renderPropFn,

  // If this render prop component takes an props itself, you can optionally create the object of props
  // it will receive. The function takes in the props of the finally wrapped component so you can dynamically
  // pass props into the render prop component.
  props => ({foo: props.foo, bar: 2})
);

/*
 * Since render prop functions give you named arguments, there isnt a great way for us to know what the key name for the prop should be.
 * This `TransformMethod` lets you assign proper keys. It does require you to know what the render prop will return. But That is a requirement
 * for using any render prop component.
 * For this example, let's assume our render prop component internally looks like this:
 *
 * ```js
 * const GetCoordinates = ({children}) => children(1, 2);
 * ```
 *
 * Our GetCoordinates would often be used like `<GetCoordinates>{(x, y) => ...}</GetCoordinates>`
 *
 * Here we just trasform the names args into an object to spread into our component
 */
const hoc = wrappedButNeedsTransform((x, y) => ({x, y}));

/*
 * Now we have our HOC and can wrap our component with it. Which will then get x and y as props.
 */
const Component = hoc(({x, y}) => <div>{x} {y}</div>);
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
