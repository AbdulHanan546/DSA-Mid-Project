import React from 'react';
import './Modal.css';
//This is used to show the message to the user about invalid move or game completion
function Modal({ message, onClose, type = "info" }) {
    return (
        <div className="modal-overlay">
            <div className={"modal "+type}>
                <h2>{message}</h2>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default Modal;
