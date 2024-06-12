// src/SettingsPanel.js
import React, { useState, useEffect } from 'react';

const SettingsPanel = ({ node, setNodes }) => {
  const [text, setText] = useState(node.data.label);

  useEffect(() => {
    setText(node.data.label);
  }, [node]);

  const handleChange = (event) => {
    setText(event.target.value);
    setNodes((nodes) =>
      nodes.map((n) => (n.id === node.id ? { ...n, data: { ...n.data, label: event.target.value } } : n))
    );
  };

  return (
    <div className="settings-panel">
      <input type="text" value={text} onChange={handleChange} />
    </div>
  );
};

export default SettingsPanel;
