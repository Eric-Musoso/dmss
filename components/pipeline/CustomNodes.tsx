import React, { memo } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import { Database, Filter, Globe, Server } from 'lucide-react';

interface NodeWrapperProps {
  children?: React.ReactNode;
  selected: boolean;
  color: string;
}

const NodeWrapper = ({ children, selected, color }: NodeWrapperProps) => (
  <div className={`
    min-w-[180px] bg-slate-900 border rounded-lg shadow-lg p-3
    ${selected ? 'border-indigo-500 ring-2 ring-indigo-500/20' : `border-slate-700 hover:border-${color}-500/50`}
    transition-all
  `}>
    {children}
  </div>
);

export const SourceNode = memo(({ data, selected }: NodeProps) => {
  return (
    <NodeWrapper selected={!!selected} color="emerald">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded bg-emerald-500/20 text-emerald-400">
          <Database className="w-4 h-4" />
        </div>
        <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">Source</div>
      </div>
      <div className="text-sm font-medium text-slate-100">{data.label}</div>
      <div className="text-xs text-slate-500 mt-1">{data.type || 'PostgreSQL'}</div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-emerald-500 border-2 border-slate-900" />
    </NodeWrapper>
  );
});

export const TransformNode = memo(({ data, selected }: NodeProps) => {
  return (
    <NodeWrapper selected={!!selected} color="blue">
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-blue-500 border-2 border-slate-900" />
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded bg-blue-500/20 text-blue-400">
          <Filter className="w-4 h-4" />
        </div>
        <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">Transform</div>
      </div>
      <div className="text-sm font-medium text-slate-100">{data.label}</div>
      <div className="text-xs text-slate-500 mt-1">{data.operation || 'Filter'}</div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-blue-500 border-2 border-slate-900" />
    </NodeWrapper>
  );
});

export const SpatialNode = memo(({ data, selected }: NodeProps) => {
  return (
    <NodeWrapper selected={!!selected} color="purple">
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-purple-500 border-2 border-slate-900" />
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded bg-purple-500/20 text-purple-400">
          <Globe className="w-4 h-4" />
        </div>
        <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">Spatial</div>
      </div>
      <div className="text-sm font-medium text-slate-100">{data.label}</div>
      <div className="text-xs text-slate-500 mt-1">{data.operation || 'Buffer'}</div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-purple-500 border-2 border-slate-900" />
    </NodeWrapper>
  );
});

export const DestinationNode = memo(({ data, selected }: NodeProps) => {
  return (
    <NodeWrapper selected={!!selected} color="orange">
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-orange-500 border-2 border-slate-900" />
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded bg-orange-500/20 text-orange-400">
          <Server className="w-4 h-4" />
        </div>
        <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">Output</div>
      </div>
      <div className="text-sm font-medium text-slate-100">{data.label}</div>
      <div className="text-xs text-slate-500 mt-1">{data.type || 'S3 Bucket'}</div>
    </NodeWrapper>
  );
});