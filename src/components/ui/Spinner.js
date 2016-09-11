import React, { PropTypes } from 'react';

const Spinner = ({ color = 'blue' }) => (
  <div className="preloader-wrapper big active">
    <div className={`spinner-layer spinner-${color}-only`}>
      <div className="circle-clipper left">
        <div className="circle"></div>
      </div><div className="gap-patch">
        <div className="circle"></div>
      </div><div className="circle-clipper right">
        <div className="circle"></div>
      </div>
    </div>
  </div>
);

Spinner.propTypes = {
  color: PropTypes.string
};

export default Spinner;
