
import React from 'react';
import { Handle, Position } from '@xyflow/react';

const SubCategoryNode = ({ data, id }) => {
  return (
    <div className={`subcategory-node border-${data.type} border text-${data.type} animate-fade-in`}>
      <Handle type="target" position={Position.Left} />
      <div className="font-bold opacity-90">{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default SubCategoryNode;
