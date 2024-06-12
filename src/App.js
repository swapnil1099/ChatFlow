import { useState, useRef, useCallback, useMemo } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';
import NodesPanel from './Components/NodesPanel';
import NodeSettingsPanel from './Components/NodeSettingsPanel';
import AlertNotification from './Components/AlertNotification';
import NodeComponent from './Components/NodeComponent';
import './index.css';
import FlowTopbar from './Components/FlowTopbar';

let id = 0; // Initial ID for nodes

const App = () => {
  // Reference to the ReactFlow wrapper
  const reactFlowWrapper = useRef(null);
  // State for nodes
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  // State for edges
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  // ReactFlow instance
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  // State to check if a node is selected
  const [nodeSelected, setNodeSelected] = useState(false);
  // State to track the selected node
  const [changeNode, setChangeNode] = useState(null);
  // State for error messages
  const [errorMessage, setErrorMessage] = useState(null);
  // State for message color (error/success)
  const [messageColor, setMessageColor] = useState(null);
  // State to track target handles when new edges are created
  const [targetHandles, setTargetHandles] = useState([]);
  // Refs to preserve values across renders
  const sourceHandlesRef = useRef([]);
  const targetHandleRef = useRef([]);

  // Function to update the selected node
  const update = useCallback((event, node) => {
    setChangeNode(node);
    setNodeSelected(true);
  }, []);

  // onConnect is called when only making a sourceHandle connection
  const onConnect = useCallback(
    (params) => {
      if (sourceHandlesRef.current.includes(params.source)) return;
      sourceHandlesRef.current = sourceHandlesRef.current.concat(params.source);

      // Add edge with arrowhead
      setEdges((eds) =>
        addEdge({ ...params, markerEnd: { type: 'arrowclosed' } }, eds)
      );

      // Keep track of which target handles are connected
      if (targetHandleRef.current.includes(params.target)) return;
      targetHandleRef.current = targetHandleRef.current.concat(params.target);
      setTargetHandles(targetHandleRef.current);
    },
    [setEdges]
  );

  // Handle drag over event
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Handle drop event
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // Check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      // Create a new node
      const newerNode = {
        id: `node_${id}`,
        type: 'nodeComponent',
        position,
        data: { heading: 'Send Message', label: `text message ${id}` },
      };

      id++;
      setNodes((nds) => nds.concat(newerNode));
    },
    [reactFlowInstance, setNodes]
  );

  // Hide the ReactFlow attribution for personal/hobby projects
  let proOptions = { hideAttribution: true };

  // Use custom node types to add a header to the nodes along with a label
  const nodeTypes = useMemo(
    () => ({
      nodeComponent: NodeComponent,
    }),
    []
  );

  // Save node flow on click of save changes button & validate for not more than one node target handles are unconnected
  const saveFlow = () => {
    const totalNodes = reactFlowInstance.getNodes().length;

    if (targetHandles.length !== totalNodes - 1) {
      setErrorMessage('Cannot save Flow');
      setMessageColor('redMessage');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } else {
      setErrorMessage('Saved Flow');
      setMessageColor('greenMessage');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div className="appflow" style={{ width: '100vw', height: '100vh' }}>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <div>
            <AlertNotification
              errorMessage={errorMessage}
              messageColor={messageColor}
            />
          </div>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            proOptions={proOptions}
            onNodeClick={update}
            nodeTypes={nodeTypes}
          >
            <Controls />
          </ReactFlow>
        </div>
        <div className="rightbar" >
          {nodeSelected ? (
            <NodeSettingsPanel
              selectedNode={changeNode}
              setNodes={setNodes}
              setSelectedNode={setNodeSelected}
              handleBack={() => setNodeSelected(false)}
            />
          ) : (
            <NodesPanel />
          )}
          <FlowTopbar saveFlow={saveFlow} />
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default App;
