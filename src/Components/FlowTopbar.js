const FlowTopbar = ({ saveFlow }) => {
  return (
    <div className="savingChange">
      <button onClick={saveFlow}>Save Changes</button>
    </div>
  );
};

export default FlowTopbar;
