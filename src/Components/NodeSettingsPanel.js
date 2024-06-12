import React, { useEffect, useState } from 'react';

const NodeSettingsPanel = ({ selectedNode, setNodes, setSelectedNode, handleBack }) => {
  const [nodeName, setNodeName] = useState('');

  useEffect(() => {
    if (selectedNode) {
      setNodeName(selectedNode.data.label);
    }
  }, [selectedNode]);

  const handleChange = (event) => {
    setNodeName(event.target.value);
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode.id ? { ...node, data: { ...node.data, label: event.target.value } } : node
      )
    );
  };

  return (
    <div className="update-node">
      <input type="text" value={nodeName} onChange={handleChange} />
      <button onClick={handleBack}>Back</button>
    </div>
  );
};

export default NodeSettingsPanel;
