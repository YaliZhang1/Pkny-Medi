import React from "react";
import "../../styles/modal.css"; 

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null; 

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={closeModal}>X</button>
        <div className="children">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
