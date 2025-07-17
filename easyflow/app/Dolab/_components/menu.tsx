import React from "react";

const NodePalette = ({ selectedNodeId, nodes, handleAddNodeFromPalette }) => {
  const handleNodeClick = (label: string, type: string) => {
    handleAddNodeFromPalette(label, type);
  };

  const paletteStyle = {
    position: "fixed",
    right: "1rem", // Fixed to the right edge with 1rem padding
    top: "6.5rem", // Below Navbar (5rem) + mt-4 (1rem) + estimated TopBarControls height (0.5rem)
    backgroundColor: "#f9fafb",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "0.375rem",
    padding: "1rem",
    zIndex: 50,
    width: "20rem", // Increased width
    maxHeight: "50vh", // Reduced height constraint
    overflowY: "auto", // Scroll if content exceeds height
    userSelect: "none",
  };

  return (
    <div style={paletteStyle}>
      <p className="font-bold mb-2 text-center text-gray-800">➕ เพิ่ม Node</p>
      
      <div className="mb-3">
        <p className="font-semibold text-gray-700 mb-1">Statement</p>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => handleNodeClick('Input', 'input')}
            className="w-full rounded-md px-2 py-1 font-medium text-gray-800 hover:text-white hover:shadow-md transition-colors duration-200"
            style={{ backgroundColor: '#ADD8E6', boxShadow: '0 2px 4px #ADD8E688' }}
          >
            Input
          </button>
          <button
            onClick={() => handleNodeClick('Output', 'output')}
            className="w-full rounded-md px-2 py-1 font-medium text-gray-800 hover:text-white hover:shadow-md transition-colors duration-200"
            style={{ backgroundColor: '#90EE90', boxShadow: '0 2px 4px #90EE9088' }}
          >
            Output
          </button>
        </div>
      </div>

      <div className="mb-3">
        <p className="font-semibold text-gray-700 mb-1">Variables</p>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => handleNodeClick('Declare', 'declare')}
            className="w-full rounded-md px-2 py-1 font-medium text-gray-800 hover:text-white hover:shadow-md transition-colors duration-200"
            style={{ backgroundColor: '#FFFFE0', boxShadow: '0 2px 4px #FFFFE088' }}
          >
            Declare
          </button>
        </div>
      </div>

      <div className="mb-3">
        <p className="font-semibold text-gray-700 mb-1">Control</p>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => handleNodeClick('If', 'if')}
            className="w-full rounded-md px-2 py-1 font-medium text-gray-800 hover:text-white hover:shadow-md transition-colors duration-200"
            style={{ backgroundColor: '#FFB6C1', boxShadow: '0 2px 4px #FFB6C188' }}
          >
            If
          </button>
        </div>
      </div>

      <div className="mb-3">
        <p className="font-semibold text-gray-700 mb-1">Looping</p>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => handleNodeClick('While', 'while')}
            className="w-full rounded-md px-2 py-1 font-medium text-gray-800 hover:text-white hover:shadow-md transition-colors duration-200"
            style={{ backgroundColor: '#FFA500', boxShadow: '0 2px 4px #FFA50088' }}
          >
            While
          </button>
        </div>
      </div>

      <div className="mb-3">
        <p className="font-semibold text-gray-700 mb-1">Turtle Graphics</p>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => handleNodeClick('Forward', 'forward')}
            className="w-full rounded-md px-2 py-1 font-medium text-gray-800 hover:text-white hover:shadow-md transition-colors duration-200"
            style={{ backgroundColor: '#90EE90', boxShadow: '0 2px 4px #90EE9088' }}
          >
            Forward
          </button>
        </div>
      </div>

      <div className="mb-3">
        <p className="font-semibold text-gray-700 mb-1">Files</p>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => handleNodeClick('Read', 'read')}
            className="w-full rounded-md px-2 py-1 font-medium text-gray-800 hover:text-white hover:shadow-md transition-colors duration-200"
            style={{ backgroundColor: '#ADD8E6', boxShadow: '0 2px 4px #ADD8E688' }}
          >
            Read
          </button>
        </div>
      </div>
    </div>
  );
};

export default NodePalette;