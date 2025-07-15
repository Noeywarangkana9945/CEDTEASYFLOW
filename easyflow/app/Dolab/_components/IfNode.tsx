import React from "react";
import { Handle, Position } from "@xyflow/react";

export default function IfNode({ data }: any) {
  return (
    <div className="w-28 h-28 relative transform rotate-45 bg-pink-200 border border-gray-700 text-center">
      <div className="absolute inset-0 flex items-center justify-center transform -rotate-45">
        {data.label || "If"}
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
