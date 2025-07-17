'use client';
import { ReactFlow, Background, Controls, Node, Edge, BackgroundVariant, useNodesState, useEdgesState, Connection, addEdge, NodeTypes } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Navbar from '@/components/Navbar';
import TopBarControls from './_components/TopBarControls';
import FloatingPanel from './_components/FloatingPanel';
import InputNode from './_components/InputNode';
import { useState, useCallback } from 'react';

const initialNodes: Node[] = [
  {
    id: 'n1',
    position: { x: 50, y: 0 },
    data: { label: 'Start' },
    draggable: false,
  },
  {
    id: 'n2',
    position: { x: 50, y: 100 },
    data: { label: 'End' },
    draggable: false,
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: 'n1',
    target: 'n2',
    markerEnd: { type: 'arrowclosed' },
  },
];

const nodeTypes: NodeTypes = {
  inputNode: InputNode,
};

export default function Dolab() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [panelPosition, setPanelPosition] = useState({ x: 0, y: 0 });
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) =>
        addEdge({ ...connection, markerEnd: { type: 'arrowclosed' } }, eds)
      ),
    [setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    if (node.id === 'n1' || node.type === 'inputNode') {
      const rect = event.currentTarget.getBoundingClientRect();
      setPanelPosition({ x: rect.right + 10, y: rect.top + window.scrollY });
      setIsPanelOpen(true);
      setSelectedNodeId(node.id);
    } else {
      setIsPanelOpen(false);
      setSelectedNodeId(null);
    }
  }, []);

  const addInputNode = useCallback(() => {
    if (!selectedNodeId) return;

    const startNode = nodes.find((node) => node.id === 'n1');
    const endNode = nodes.find((node) => node.id === 'n2');
    const selectedNode = nodes.find((node) => node.id === selectedNodeId);

    if (startNode && endNode && selectedNode) {
      // กำหนดระยะห่างคงที่ระหว่างโหนด (เช่น 80 พิกเซล)
      const nodeSpacing = 80;

      // สร้างโหนด Input ใหม่
      const newNodeId = `input-${Date.now()}`;
      const newNode: Node = {
        id: newNodeId,
        type: 'inputNode',
        position: { x: startNode.position.x, y: 0 }, // y จะถูกปรับในขั้นตอนถัดไป
        data: { label: 'Input' },
        draggable: false,
      };

      // ดึงลำดับโหนด Input ที่เชื่อมต่อจาก Start ถึง End
      const inputNodes = nodes
        .filter((node) => node.type === 'inputNode')
        .sort((a, b) => a.position.y - b.position.y);

      // หาตำแหน่งของ selectedNode ในลำดับ
      const selectedNodeIndex = selectedNode.id === 'n1' ? -1 : inputNodes.findIndex((node) => node.id === selectedNodeId);

      // แทรกโหนดใหม่หลัง selectedNode
      const updatedInputNodes = [
        ...inputNodes.slice(0, selectedNodeIndex + 1),
        newNode,
        ...inputNodes.slice(selectedNodeIndex + 1),
      ];

      // ปรับตำแหน่ง y ของโหนด Input และ End
      const updatedNodes = [
        startNode, // Start node คงที่
        ...updatedInputNodes.map((node, index) => ({
          ...node,
          position: { x: node.position.x, y: startNode.position.y + (index + 1) * nodeSpacing },
        })),
        {
          ...endNode,
          position: { x: endNode.position.x, y: startNode.position.y + (updatedInputNodes.length + 1) * nodeSpacing },
        },
      ];

      // ลบ edge เดิมระหว่าง selectedNode และ End
      const edgeToRemove = edges.find(
        (edge) => edge.source === selectedNodeId && edge.target === 'n2'
      );
      const newEdges = edgeToRemove
        ? edges.filter((edge) => edge.id !== edgeToRemove.id)
        : edges;

      // เพิ่ม edge ใหม่: selectedNode -> newNode และ newNode -> End
      const newEdge1: Edge = {
        id: `${selectedNodeId}-${newNodeId}`,
        source: selectedNodeId,
        target: newNodeId,
        markerEnd: { type: 'arrowclosed' },
      };
      const newEdge2: Edge = {
        id: `${newNodeId}-2`,
        source: newNodeId,
        target: 'n2',
        markerEnd: { type: 'arrowclosed' },
      };

      // อัปเดต nodes และ edges
      setNodes(updatedNodes);
      setEdges([...newEdges, newEdge1, newEdge2]);
    }

    setIsPanelOpen(false);
    setSelectedNodeId(null);
  }, [nodes, edges, setNodes, setEdges, selectedNodeId]);

  return (
    <div className="pt-16 min-h-screen bg-gray-100 ">
      <Navbar />
      <div className="relative w-full ">
        <div className="mt-4 ml-2">
          <TopBarControls />
        </div>
        <div style={{ height: 'calc(100vh - 5rem)', width: '100%' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background
              variant={BackgroundVariant.Cross}
              color="#b0bec5"
              gap={10}
              size={1.5}
              style={{ background: '#ffffff' }}
            />
            <Controls />
          </ReactFlow>
        </div>
      </div>
      <FloatingPanel
        isOpen={isPanelOpen}
        x={panelPosition.x}
        y={panelPosition.y}
        onClose={() => {
          setIsPanelOpen(false);
          setSelectedNodeId(null);
        }}
        onAddInputNode={addInputNode}
      />
    </div>
  );
}