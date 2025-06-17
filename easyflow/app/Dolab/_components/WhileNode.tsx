import React from "react";
import { Handle, Position } from "@xyflow/react";

export default function WhileNode({ data }: any) {
  return (
    <div className="bg-orange-200 border border-gray-700 text-center px-4 py-2 rounded-[25%/50%]">
      {data.label || "While"}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
