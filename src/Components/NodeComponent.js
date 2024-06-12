import { Handle, Position } from "reactflow";

// Custom node with header & custom styling
const NodeComponent = ({ data }) => {
  return (
    <div>
      {/* Node header styling */}
      <div
        style={{
          backgroundColor: "#b2f0e3",
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          fontWeight: "bold",
          color: "black",
          paddingLeft: 15,
          paddingTop: 3,
          paddingBottom: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: 150,
        }}
      >
        {/* Icon in the header */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 13, paddingRight: 7, paddingTop: 5 }}
          >
            chat
          </span>
        </div>
        {/* WhatsApp icon in the header */}
        <div style={{ paddingRight: 15 }}>
          <img src="whatsapp.svg" alt="whatsapp icon" height={15} />
        </div>
      </div>
      {/* Node body styling */}
      <div
        style={{
          padding: 15,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          backgroundColor: "white",
        }}
      >
        <div style={{ color: "black" }}>{data.label}</div>
      </div>
      {/* Handles for connecting nodes */}
      <Handle type="source" position={Position.Right} id="source" />
      <Handle type="target" position={Position.Left} id="target" />
    </div>
  );
};

export default NodeComponent;
