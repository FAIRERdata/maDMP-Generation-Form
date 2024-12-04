import React from 'react';
import './Modal.css'; // Optional: add your modal styles here

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Don't render anything if modal is not open

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Prevents click inside modal from closing */}
        <button className="modal-close" onClick={onClose}>&times;</button>
        {children} {/* Render the modal content */}
      </div>
    </div>
  );
};

export default Modal;
