import React from "react";
import "../../../component/button/button.css";
import "./Modal.css";

const Modal = ({ children, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="">
                <span className="close-button" onClick={onClose}>
                    &times;
                </span>
                {children}
            </div>
        </div>
    );
};

export default Modal;
