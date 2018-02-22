/**
 * @class asHoc
 */

import React from 'react'

const asHoc = (RenderPropComponent, rpProps) => transform => Comp => props => (
  <RenderPropComponent {...(typeof rpProps === 'function' ? rpProps(props) : {})}>
    {(...renderProps) => {
      return <Comp {...props} {...transform(...renderProps)} />;
    }}
  </RenderPropComponent>
);

export default asHoc;
