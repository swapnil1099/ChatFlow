import { useEffect, useState } from 'react';

const NodesPanel = () => {
  const [showUsage, setShowUsage] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowUsage(false);
    }, 5000);
  }, [showUsage]);

  const displayUsage = showUsage ? '' : 'none';

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <>
      <div className="description" style={{ display: displayUsage }}></div>
      <aside>
        <div
          className="appnode"
          onDragStart={(event) => onDragStart(event, 'default')}
          draggable
        >
          <span className="material-symbols-outlined" style={{ paddingBottom: 5 }}>
            Message
          </span>
        </div>
      </aside>
    </>
  );
};

export default NodesPanel;
