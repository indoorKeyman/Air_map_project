import React from "react";
import "./style1.css";
function Modal({ isOpen, onClose, children }) {
  if (isOpen) {
    console.log("open");

    return (
      <div className="modal-overlay">
        <div className="modal">
          <button className="modal-close" onClick={onClose}>
            닫기
          </button>
          {children}
        </div>
      </div>
    );
  } else {
    console.log("close");
    return null;
  }
}

export default React.memo(Modal);
