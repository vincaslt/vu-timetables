import React, { PropTypes } from 'react';
import { Spinner } from 'react-mdl';

import './styles.scss';

const LoadingIndicator = ({ wait, children }) => {
  let content = null;
  if (wait) {
    content = (
      <div className="loading-indicator">
        <Spinner className="spinner" singleColor />
        <div className="text"> Loading...</div>
      </div>
    );
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
