import React, { PropTypes } from 'react';
import Spinner from './ui/Spinner';

const LoadingIndicator = ({ wait, children }) => {
  let content = null;
  if (wait) {
    content = <Spinner />;
  } else {
    content = children;
  }

  return content;
};

LoadingIndicator.propTypes = {
  wait: PropTypes.bool.isRequired,
  children: PropTypes.element,
};

export default LoadingIndicator;
