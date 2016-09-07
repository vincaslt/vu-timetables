import React, { PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const LoadingIndicator = ({ wait, children }) => {
  let content = null;
  if (wait) {
    content = <CircularProgress />;
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
