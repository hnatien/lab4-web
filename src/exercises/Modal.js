import React from 'react';
import ReactDOM from 'react-dom';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return ReactDOM.createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}
      onClick={handleOverlayClick}
    >
      <div
        style={{
          backgroundColor: 'white',
          border: '1px solid black',
          padding: '20px',
          maxWidth: '400px',
          width: '90%',
          position: 'relative'
        }}
        onClick={handleContentClick}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid black',
            padding: '4px 8px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default Modal;
