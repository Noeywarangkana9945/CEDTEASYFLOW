import React from "react";
import { Handle, Position } from "@xyflow/react";

export default function DefaultNode({ data }: any) {
  return (
    <div className=" border-gray-400 rounded px-4 py-2 text-center">
      {data.label || "Default"}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
