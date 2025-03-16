import React from 'react';
import { Handle, Position } from '@xyflow/react';

const CategoryNode = ({ data, id }) => {
  // Create a mapping of types to lighter background colors
  const typeToColor = {
    frontend: 'bg-blue-50',
    backend: 'bg-green-50',
    data: 'bg-purple-50',
    ml: 'bg-red-50',
    devops: 'bg-pink-50',
  };

  // Get the background color class for this node type or default to gray
  const bgColorClass = typeToColor[data.type] || 'bg-gray-50';

  return (
    <div className={`category-node ${bgColorClass} animate-fade-in p-3 rounded-lg font-bold shadow-sm`}>
      <Handle type="target" position={Position.Left} />
      <div className="font-semibold">{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default CategoryNode;
