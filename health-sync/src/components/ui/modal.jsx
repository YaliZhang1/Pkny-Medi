import React from "react";
import "../../styles/modal.css";
import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose, children, className, style }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`modal-overlay ${className}`}
      style={style}
      onClick={onClose}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          X
        </button>
        <div className="children">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};
