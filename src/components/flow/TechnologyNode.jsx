
import React from 'react';
import { Handle, Position } from '@xyflow/react';

const TechnologyNode = ({ data, id }) => {
  return (
    <div className={`technology-node node-${data.type} animate-fade-in`}>
      <Handle type="target" position={Position.Left} />
      <div className="flex flex-col items-center gap-2 p-2">
        <img 
          src={data.icon} 
          alt={data.label} 
          className="tech-logo w-10 h-10 object-contain"
        />
        <div className="text-xs font-medium">{data.label}</div>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default TechnologyNode;
