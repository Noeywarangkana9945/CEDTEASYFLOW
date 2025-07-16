import React from "react";
import { Handle, Position } from "@xyflow/react";

export default function InputNode({ data }: any) {
  return (
    <div className="relative w-[140px] bg-blue-200 border border-gray-700 text-center px-4 py-2 rounded-md">
      {/* จุดเชื่อมด้านบน */}
      <Handle
        type="target"
        position={Position.Top}
        className="!absolute left-1/2 -translate-x-1/2 -top-2"
      />

      {/* ข้อความ */}
      {data.label || "Input"}

      {/* จุดเชื่อมด้านล่าง */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!absolute left-1/2 -translate-x-1/2 -bottom-2"
      />
    </div>
  );
}
