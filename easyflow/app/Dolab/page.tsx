"use client";

import React, { useCallback, useState, useRef, useEffect } from "react";
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
import NodePalette from "./_components/menu";

// Constants
const START_NODE_ID = "1";
const END_NODE_ID = "2";
const FIXED_X = 200;
const VERTICAL_GAP = 120;
const CANVAS_OFFSET_X = 50; // Approximate initial canvas offset

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
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

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
    if (node.id === END_NODE_ID) {
      setSelectedNodeId(null);
      return;
    }
    if (selectedNodeId === node.id) {
      setSelectedNodeId(null); // Close menu if re-clicking the same node
    } else {
      setSelectedNodeId(node.id); // Open menu for a different node
    }
  }, [selectedNodeId]);

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

  const getNodePosition = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      return { x: node.position.x + CANVAS_OFFSET_X, y: node.position.y };
    }
    return { x: 0, y: 0 };
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (reactFlowWrapper.current && !reactFlowWrapper.current.contains(event.target as Node)) {
      setSelectedNodeId(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="pt-20 min-h-screen bg-gray-100 relative" style={{ position: "relative" }} ref={reactFlowWrapper}>
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
          nodeTypes={{
            if: IfNode,
            while: WhileNode,
            input: InputNode,
            default: DefaultNode,
          }}
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
        {selectedNodeId && selectedNodeId !== END_NODE_ID && (
          <NodePalette
            selectedNodeId={selectedNodeId}
            nodes={nodes}
            handleAddNodeFromPalette={handleAddNodeFromPalette}
          />
        )}
      </div>
    </div>
  );
}

export default Dolab;