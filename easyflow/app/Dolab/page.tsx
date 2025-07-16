"use client";

import React, { useCallback, useState, useRef } from "react";
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
  ReactFlowInstance,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import Navbar from "@/components/Navbar";

import WhileNode from "./_components/WhileNode";
import InputNode from "./_components/InputNode";
import DefaultNode from "./_components/DefaultNode";
import IfNode from "./_components/IfNode";
import TopBarControls from "./_components/TopBarControls";

// Constants
const START_NODE_ID = "1";
const END_NODE_ID = "2";
const FIXED_X = 200;
const VERTICAL_GAP = 120;

// Node Templates
const nodeTemplates = [
  { label: "Input", type: "input", color: "#a6dcef" },
  { label: "While", type: "while", color: "#ffd89c" },
  { label: "If", type: "if", color: "#f7d6e0" },
  { label: "Default", type: "default", color: "#ccc" },
];

// Custom Node Types
const nodeTypes = {
  if: IfNode,
  while: WhileNode,
  input: InputNode,
  default: DefaultNode,
};

// Initial Nodes and Edges
const initialNodes: Node[] = [
  {
    id: START_NODE_ID,
    position: { x: FIXED_X, y: 10 },
    data: { label: "Start" },
    type: "default",
    draggable: false,
  },
  {
    id: END_NODE_ID,
    position: { x: FIXED_X, y: 300 },
    data: { label: "End" },
    type: "default",
    draggable: false,
  },
];

const initialEdges: Edge[] = [
  createEdge(START_NODE_ID, END_NODE_ID),
];

// Helper to create standardized edges
function createEdge(source: string, target: string): Edge {
  return {
    id: `e${source}-${target}`,
    source,
    target,
    markerEnd: { type: "arrowclosed", color: "#333" },
    style: { strokeWidth: 2, stroke: "#333" },
    updatable: false,
    selectable: false,
  };
}

function Dolab() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);

  const onInit = useCallback((rfi: ReactFlowInstance) => {
    reactFlowInstance.current = rfi;
  }, []);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) => addEdge(createEdge(params.source!, params.target!), eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    event.preventDefault();
    setSelectedNodeId(node.id);
  }, []);

  const handleAddNodeFromPalette = (label: string, type: string) => {
    if (!selectedNodeId) return;

    const parentNode = nodes.find((n) => n.id === selectedNodeId);
    if (!parentNode || parentNode.data.label === "End") return;

    const newId = `${nodes.length + 1}`;
    const parentY = parentNode.position.y;
    const newY = parentY + VERTICAL_GAP;

    const endNodeIndex = nodes.findIndex((n) => n.id === END_NODE_ID);
    const endNode = nodes[endNodeIndex];

    const newNode: Node = {
      id: newId,
      position: { x: FIXED_X, y: newY },
      data: { label },
      type,
      draggable: false,
    };

    let updatedNodes = [...nodes];
    let updatedEdges = edges.filter((e) => e.source !== parentNode.id); // remove all edges from parent

    const isDirectFromStartToEnd = edges.some(
      (e) => e.source === START_NODE_ID && e.target === END_NODE_ID
    );

    if (parentNode.id === START_NODE_ID && isDirectFromStartToEnd) {
      // Insert between Start -> End
      updatedEdges.push(createEdge(START_NODE_ID, newId));
      updatedEdges.push(createEdge(newId, END_NODE_ID));
    } else {
      updatedEdges.push(createEdge(parentNode.id, newId));

      // Ensure there is always a connection to End node
      if (
        endNode &&
        !updatedEdges.some((e) => e.source === newId && e.target === END_NODE_ID)
      ) {
        updatedEdges.push(createEdge(newId, END_NODE_ID));
      }
    }

    // Move End node down if overlapping
    if (endNode && newY + 80 >= endNode.position.y) {
      const newEndY = newY + VERTICAL_GAP;
      updatedNodes[endNodeIndex] = {
        ...endNode,
        position: { x: FIXED_X, y: newEndY },
      };
    }

    updatedNodes.push(newNode);
    setNodes(updatedNodes);
    setEdges(updatedEdges);
    setSelectedNodeId(null);

    if (reactFlowInstance.current) {
      reactFlowInstance.current.setCenter(FIXED_X, newY, { duration: 800 });
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-100">
      <Navbar />
      <div className="relative w-full h-[100vh]">

        {/* Controls bar */}
        <div className="mt-4 ml-4">
          <TopBarControls />
        </div>

        {/* ReactFlow Canvas */}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          onInit={onInit}
          defaultEdgeOptions={{
            markerEnd: { type: "arrowclosed", color: "#333" },
            style: { strokeWidth: 2, stroke: "#333" },
            updatable: false,
            selectable: false,
          }}
        >
          <Controls />
          <MiniMap
            nodeStrokeColor={(n) => {
              if (n.type === "input") return "#0041d0";
              if (n.type === "default") return "#ff0072";
              if (n.type === "while") return "#1a192b";
              if (n.type === "if") return "#ff0072";
              return "#eee";
            }}
            nodeColor={(n) => {
              if (n.type === "input") return "#daeaff";
              if (n.type === "default") return "#ffcccb";
              if (n.type === "while") return "#9ca8b3";
              if (n.type === "if") return "#ffcccb";
              return "#fff";
            }}
            nodeBorderRadius={2}
          />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>

        {/* Node Palette */}
        {selectedNodeId && (() => {
          const selectedNode = nodes.find((n) => n.id === selectedNodeId);
          if (!selectedNode || selectedNode.data.label === "End") return null;

          return (
            <div className="fixed top-24 right-6 bg-white shadow-lg rounded-md p-4 z-50 w-48" style={{ userSelect: "none" }}>
              <p className="font-semibold mb-3 text-center text-gray-700">
                ➕ เพิ่ม Node จาก {selectedNodeId}
              </p>
              <div className="flex flex-col gap-2">
                {nodeTemplates.map(({ label, type, color }) => (
                  <button
                    key={label}
                    onClick={() => handleAddNodeFromPalette(label, type)}
                    className="rounded-md px-3 py-2 font-medium text-gray-800 hover:text-white hover:shadow-md transition-colors duration-200"
                    style={{
                      backgroundColor: color,
                      boxShadow: `0 2px 6px ${color}88`,
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setSelectedNodeId(null)}
                className="mt-4 w-full text-center text-red-600 font-semibold hover:text-red-800"
              >
                ปิด
              </button>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

export default Dolab;
