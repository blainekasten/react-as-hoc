import React from 'react';
import { configure, shallow, mount } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import asHoc from './'

class Component extends React.Component {
  render() {
    return <div>{JSON.stringify(this.props)}</div>
  }
}

describe('asHoc', () => {
  it('Transforms the render prop arguments into props properly', () => {
    const hoc = asHoc(
      ({children}) => children(1, true, 2)
    )((foo, bar, baz) => ({foo, bar, baz}));

    const WrappedComponent = hoc(Component);
    const wrapper = mount(<WrappedComponent />);

    expect(wrapper.find(Component).prop('foo')).toEqual(1);
    expect(wrapper.find(Component).prop('bar')).toEqual(true);
    expect(wrapper.find(Component).prop('baz')).toEqual(2);
  });

  it('Passes props through into the render prop', () => {
    const wrap = asHoc(
      ({children, foo}) => children(foo),
      props => ({foo: props.foo + 1})
    )((foo) => ({foo}));

    const WrappedComponent = wrap(Component);
    const wrapper = mount(<WrappedComponent foo={1} />);

    expect(wrapper.find(Component).prop('foo')).toEqual(2);
  });
});
