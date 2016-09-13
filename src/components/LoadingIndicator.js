import React, { PropTypes } from 'react';
import { Spinner } from 'react-mdl';

const LoadingIndicator = ({ wait, children }) => {
  let content = null;
  if (wait) {
    content = <Spinner singleColor />;
  } else {
    content = children;
  }

  return content;
};

LoadingIndicator.propTypes = {
  wait: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default LoadingIndicator;
