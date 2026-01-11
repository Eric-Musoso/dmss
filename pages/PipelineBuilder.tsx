import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, { 
  addEdge, 
  Background, 
  Controls, 
  Connection, 
  Edge, 
  Node, 
  useNodesState, 
  useEdgesState,
  MarkerType,
  ReactFlowProvider,
  NodeTypes,
  Panel,
  useReactFlow
} from 'reactflow';
import { Play, Save, Database, Filter, Globe, Server, MousePointer2, Settings, Loader2 } from 'lucide-react';
import { SourceNode, TransformNode, SpatialNode, DestinationNode } from '../components/pipeline/CustomNodes';
import { api } from '../services/api';

const nodeTypes: NodeTypes = {
  source: SourceNode,
  transform: TransformNode,
  spatial: SpatialNode,
  destination: DestinationNode,
};

const initialNodes: Node[] = [
  { 
    id: '1', 
    type: 'source', 
    data: { label: 'Raw Sales Data', type: 'S3 CSV' }, 
    position: { x: 50, y: 100 },
  },
  { 
    id: '2', 
    type: 'spatial', 
    data: { label: 'Geocode Addresses', operation: 'Geocode' }, 
    position: { x: 300, y: 100 },
  },
  { 
    id: '3', 
    type: 'destination', 
    data: { label: 'Spatial DW', type: 'PostGIS' }, 
    position: { x: 600, y: 180 },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#64748b' } },
  { id: 'e2-3', source: '2', target: '3', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#64748b' } },
];

const PipelineFlow = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { project, toObject } = useReactFlow();
  const [isRunning, setIsRunning] = useState(false);

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onDragStart = (event: React.DragEvent, nodeType: string, nodeData: any) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/nodedata', JSON.stringify(nodeData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      const dataString = event.dataTransfer.getData('application/nodedata');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowWrapper.current?.getBoundingClientRect();
      const p = project({
        x: event.clientX - (position?.left || 0),
        y: event.clientY - (position?.top || 0),
      });

      const newNode: Node = {
        id: `node_${Date.now()}`,
        type,
        position: p,
        data: JSON.parse(dataString),
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [project, setNodes]
  );

  const handleSave = async () => {
    const pipelineData = toObject();
    // In a real app, this would create/update via API
    console.log("Saving pipeline:", pipelineData);
    // Mock save
    alert("Pipeline definition saved (Mock)");
  };

  const handleRun = async () => {
    setIsRunning(true);
    try {
      // Create a new pipeline first (Mock ID) or use existing
      const pipelineId = '22222222-2222-2222-2222-222222222222';
      // Trigger run
      await api.post(`/pipelines/${pipelineId}/run`);
      alert("Pipeline run started! Check dashboard.");
    } catch (err) {
      console.error(err);
      alert("Failed to start pipeline run");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
       {/* Toolbar */}
       <div className="h-14 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h2 className="font-semibold text-slate-100">Pipeline Editor</h2>
            <div className="h-4 w-px bg-slate-700"></div>
            <span className="text-sm text-slate-400 font-mono">My Geospatial ETL</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-sm transition-colors border border-slate-700"
            >
              <Save className="w-4 h-4" /> Save
            </button>
            <button 
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-sm transition-colors shadow-lg shadow-indigo-500/20 disabled:opacity-50"
            >
              {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              {isRunning ? 'Running...' : 'Run Pipeline'}
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Node Palette */}
          <div className="w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col gap-4 overflow-y-auto z-10">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Node Palette</div>
            
            <div className="space-y-3">
              <div 
                draggable 
                onDragStart={(e) => onDragStart(e, 'source', { label: 'New Source', type: 'S3 CSV' })}
                className="bg-slate-800 p-3 rounded border border-slate-700 cursor-move hover:border-emerald-500/50 transition-colors group"
              >
                <div className="flex items-center gap-2 text-slate-200 font-medium">
                  <Database className="w-4 h-4 text-emerald-400" /> Source
                </div>
                <div className="text-xs text-slate-500 mt-1">S3, Postgres, API input</div>
              </div>

              <div 
                draggable 
                onDragStart={(e) => onDragStart(e, 'transform', { label: 'Transform', operation: 'Filter' })}
                className="bg-slate-800 p-3 rounded border border-slate-700 cursor-move hover:border-blue-500/50 transition-colors"
              >
                <div className="flex items-center gap-2 text-slate-200 font-medium">
                  <Filter className="w-4 h-4 text-blue-400" /> Transform
                </div>
                <div className="text-xs text-slate-500 mt-1">Filter, Join, Aggregate</div>
              </div>

              <div 
                draggable 
                onDragStart={(e) => onDragStart(e, 'spatial', { label: 'Spatial Op', operation: 'Geocode' })}
                className="bg-slate-800 p-3 rounded border border-slate-700 cursor-move hover:border-purple-500/50 transition-colors"
              >
                <div className="flex items-center gap-2 text-slate-200 font-medium">
                  <Globe className="w-4 h-4 text-purple-400" /> Spatial
                </div>
                <div className="text-xs text-slate-500 mt-1">Buffer, Intersect, Geocode</div>
              </div>

              <div 
                draggable 
                onDragStart={(e) => onDragStart(e, 'destination', { label: 'Output', type: 'PostGIS' })}
                className="bg-slate-800 p-3 rounded border border-slate-700 cursor-move hover:border-orange-500/50 transition-colors"
              >
                <div className="flex items-center gap-2 text-slate-200 font-medium">
                  <Server className="w-4 h-4 text-orange-400" /> Destination
                </div>
                <div className="text-xs text-slate-500 mt-1">Database, File Storage</div>
              </div>
            </div>

            <div className="mt-auto border-t border-slate-800 pt-4">
              <div className="text-xs text-slate-500 flex items-center gap-2">
                <MousePointer2 className="w-3 h-3" /> Drag nodes to canvas
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 bg-slate-950 relative" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onDragOver={onDragOver}
              onDrop={onDrop}
              fitView
              className="bg-slate-950"
              snapToGrid
            >
              <Background color="#334155" gap={16} />
              <Controls className="bg-slate-800 border-slate-700 fill-slate-200 text-slate-200" />
              <Panel position="top-right">
                <div className="bg-slate-800 p-2 rounded border border-slate-700 text-xs text-slate-400">
                  Right-click to config
                </div>
              </Panel>
            </ReactFlow>
          </div>
        </div>
    </div>
  );
};

export const PipelineBuilder = () => (
  <ReactFlowProvider>
    <PipelineFlow />
  </ReactFlowProvider>
);
