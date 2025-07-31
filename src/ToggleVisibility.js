import React, { useState } from 'react';

function ToggleVisibility() {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'Hide Content' : 'Show Content'}
      </button>

      {visible && (
        <p style={{ marginTop: '15px' }}>
          Wassup bro
        </p>
      )}
    </div>
  );
}

export default ToggleVisibility;
