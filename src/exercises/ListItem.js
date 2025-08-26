import React from 'react';

const ListItem = React.memo(({ id, text, onDelete }) => {
  console.log(`ListItem ${id} is re-rendering`);

  return (
    <li style={{
      padding: '8px',
      margin: '4px 0',
      backgroundColor: 'white',
      border: '1px solid black',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <span>{text}</span>
      <button
        onClick={() => onDelete(id)}
        style={{
          backgroundColor: 'white',
          color: 'black',
          border: '1px solid black',
          padding: '4px 8px',
          cursor: 'pointer',
          fontSize: '12px'
        }}
      >
        Delete
      </button>
    </li>
  );
});

ListItem.displayName = 'ListItem';

export default ListItem;
