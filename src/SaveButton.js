// src/SaveButton.js
import React from 'react';

const SaveButton = ({ nodes, edges }) => {
  const handleSave = () => {
    const errors = nodes.filter((node) => edges.every((edge) => edge.source !== node.id));
    if (errors.length > 1) {
      alert('More than one node has empty target handles.');
    } else {
      const flow = { nodes, edges };
      console.log('Saved flow:', flow);
    }
  };

  return <button onClick={handleSave}>Save</button>;
};

export default SaveButton;
