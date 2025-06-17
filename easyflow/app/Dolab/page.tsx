"use client";
import React, { useCallback, useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Navbar from "@/components/Navbar";

import WhileNode from "./_components/WhileNode";
import InputNode from "./_components/InputNode";
import DefaultNode from "./_components/DefaultNode";
import IfNode from "./_components/IfNode";

const nodeTypes = {
  if: IfNode,
  while: WhileNode,
  input: InputNode,
  default: DefaultNode,
};

const initialNodes: Node[] = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "Start" }, type: "default" },
  { id: "2", position: { x: 200, y: 100 }, data: { label: "End" }, type: "default",},
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
  },
];

function Dolab() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    event.preventDefault();
    setSelectedNodeId(node.id);
  }, []);

  const handleAddNodeFromPalette = (label: string, type: string) => {
    if (!selectedNodeId) return;
    const newId = `${nodes.length + 1}`;
    const parentNode = nodes.find((n) => n.id === selectedNodeId);

    const newNode: Node = {
      id: newId,
      position: {
        x: parentNode!.position.x + 200,
        y: parentNode!.position.y + 100,
      },
      data: { label },
      type,
    };

    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [...eds, { id: `e${selectedNodeId}-${newId}`, source: selectedNodeId, target: newId }]);
    setSelectedNodeId(null);
  };

  const nodeTemplates = [
    { label: "Input", type: "input", color: "#a6dcef" },
    { label: "While", type: "while", color: "#ffd89c" },
    { label: "If", type: "if", color: "#f7d6e0" },
    { label: "Default", type: "default", color: "#ccc" },
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-100">
      <Navbar />
      <div className="relative w-full h-[100vh]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>

        {selectedNodeId && (
          <div className="absolute top-24 right-4 bg-white shadow-md rounded p-4 z-50">
            <p className="font-semibold mb-2">➕ เพิ่มจาก Node {selectedNodeId}</p>
            {nodeTemplates.map((item) => (
              <button
                key={item.label}
                onClick={() => handleAddNodeFromPalette(item.label, item.type)}
                className="block w-full text-left px-3 py-1 mb-1 rounded"
                style={{ backgroundColor: item.color }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dolab;
