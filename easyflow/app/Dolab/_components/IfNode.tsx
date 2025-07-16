import React from "react";
import { Handle, Position } from "@xyflow/react";

export default function IfNode({ data }: any) {
  return (
    <div className="relative w-16 h-16">
      {/* จุดเชื่อมด้านบน (รับ) */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ top: -10, left: "50%", transform: "translateX(-50%)" }}
      />

      {/* จุดเชื่อมด้านล่าง (ส่ง) */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ bottom: -10, left: "50%", transform: "translateX(-50%)" }}
      />

      {/* จุดเชื่อมด้านซ้าย (เส้นตัดสินใจ True) */}
      <Handle
        type="source"
        position={Position.Left}
        style={{ left: -10, top: "50%", transform: "translateY(-50%)" }}
      />

      {/* จุดเชื่อมด้านขวา (เส้นตัดสินใจ False) */}
      <Handle
        type="source"
        position={Position.Right}
        style={{ right: -10, top: "50%", transform: "translateY(-50%)" }}
      />

      {/* กล่องข้าวหลามตัด */}
      <div className="w-full h-full transform rotate-45 bg-pink-200 border border-gray-700 flex items-center justify-center">
        <div className="transform -rotate-45 select-none">{data.label || "If"}</div>
      </div>
    </div>
  );
}
