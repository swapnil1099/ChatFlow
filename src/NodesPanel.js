// src/NodesPanel.js
import React from 'react';
import { useDrag } from 'react-dnd';

const ItemTypes = {
  NODE: 'node',
};

const NodesPanel = () => {
  const [, drag] = useDrag({
    type: ItemTypes.NODE,
    item: { type: 'text' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div className="nodes-panel">
      <div
        ref={drag}
        className="draggable-node"
        onDragStart={(event) => {
          event.dataTransfer.setData('application/reactflow', 'text');
          event.dataTransfer.effectAllowed = 'move';
        }}
      >
        Text Node
      </div>
    </div>
  );
};

export default NodesPanel;
