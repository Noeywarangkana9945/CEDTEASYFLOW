import React from "react";
import { Handle, Position } from "@xyflow/react";

export default function InputNode({ data }: any) {
  return (
    <div className="bg-blue-200 border border-gray-700 text-center px-4 py-2 skew-x-[-20deg]">
      <div className="skew-x-[20deg]">{data.label || "Input"}</div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
