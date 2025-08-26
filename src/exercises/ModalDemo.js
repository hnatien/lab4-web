import React, { useState } from 'react';
import Modal from './Modal';

function ModalDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '16px' }}>
      <h2>Modal with Portals Demo</h2>
      
      <button
        onClick={openModal}
        style={{
          backgroundColor: 'white',
          color: 'black',
          border: '1px solid black',
          padding: '8px 16px',
          cursor: 'pointer'
        }}
      >
        Open Modal
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h3>Modal Content</h3>
        <p>This modal is rendered using ReactDOM.createPortal!</p>
        <p>It appears outside the normal DOM hierarchy.</p>
        <p>You can close it by:</p>
        <ul>
          <li>Clicking the ✕ button</li>
          <li>Clicking outside the modal content</li>
        </ul>
        <button
          onClick={closeModal}
          style={{
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid black',
            padding: '8px 16px',
            cursor: 'pointer',
            marginTop: '16px'
          }}
        >
          Close Modal
        </button>
      </Modal>
    </div>
  );
}

export default ModalDemo;
