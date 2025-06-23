import React from "react";
import PropTypes from 'prop-types';

const Button = ({ children, onClick, className = "", ...props }) => {
  return (
    <button
      className={`custom-button ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
