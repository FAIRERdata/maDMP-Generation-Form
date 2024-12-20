import React from 'react';
import './Modal.css'; // Optional: Add your modal styles here

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; // Accept dynamic children content
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Don't render anything if the modal is not open

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Prevent clicks inside modal from closing it */}
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children} {/* Render dynamic content */}
      </div>
    </div>
  );
};

export default Modal;
