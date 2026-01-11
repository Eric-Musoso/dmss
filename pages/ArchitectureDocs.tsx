import React, { useState } from 'react';
import { Copy, Terminal, Database, Server, Code } from 'lucide-react';
import { DATABASE_SCHEMA, PROJECT_STRUCTURE, API_SPEC } from '../constants';

const CodeBlock: React.FC<{ title: string; code: string; icon: React.ElementType }> = ({ title, code, icon: Icon }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-full shadow-lg">
    <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-indigo-400" />
        <span className="font-mono text-sm text-slate-300 font-semibold">{title}</span>
      </div>
      <button 
        className="p-1.5 hover:bg-slate-800 rounded-md transition-colors text-slate-500 hover:text-slate-200"
        title="Copy to clipboard"
      >
        <Copy className="w-4 h-4" />
      </button>
    </div>
    <div className="flex-1 overflow-auto p-4 bg-[#0d1117] custom-scrollbar">
      <pre className="font-mono text-xs leading-relaxed text-slate-300 whitespace-pre">
        {code}
      </pre>
    </div>
  </div>
);

export const ArchitectureDocs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'api'>('architecture');

  return (
    <div className="p-6 h-full flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-slate-100">System Architecture</h2>
            <p className="text-slate-400">Generated artifacts for the DataNexus backend.</p>
          </div>
          <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'architecture' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Schema & Structure
            </button>
            <button
              onClick={() => setActiveTab('api')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'api' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              API Specification
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        {activeTab === 'architecture' ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-full">
            <CodeBlock 
              title="Monorepo Structure" 
              code={PROJECT_STRUCTURE} 
              icon={Terminal} 
            />
            <CodeBlock 
              title="PostgreSQL Schema" 
              code={DATABASE_SCHEMA} 
              icon={Database} 
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-full">
            <CodeBlock 
              title="REST API Endpoints" 
              code={API_SPEC} 
              icon={Server} 
            />
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col gap-4">
               <h3 className="font-semibold text-slate-100 flex items-center gap-2">
                 <Code className="w-4 h-4 text-indigo-400" />
                 Implementation Notes
               </h3>
               <ul className="space-y-3 text-sm text-slate-400">
                 <li className="flex gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5"></span>
                   <span>Authentication uses <strong>JWT</strong> with short-lived access tokens (15m) and long-lived refresh tokens (7d).</span>
                 </li>
                 <li className="flex gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5"></span>
                   <span>Input validation implemented using <strong>Zod</strong> schemas for all POST/PUT requests.</span>
                 </li>
                 <li className="flex gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5"></span>
                   <span><strong>Rate Limiting</strong> enabled globally (100 req/15min) using <code>express-rate-limit</code>.</span>
                 </li>
                 <li className="flex gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5"></span>
                   <span>Database connection pooling via <code>pg.Pool</code> and Redis for job queues.</span>
                 </li>
                 <li className="flex gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5"></span>
                   <span>Pipeline execution offloads to <strong>BullMQ/Redis</strong> for Python worker processing.</span>
                 </li>
               </ul>
               <div className="mt-auto p-4 bg-slate-950 rounded border border-slate-800">
                 <div className="text-xs font-mono text-emerald-400 mb-2">backend/src/server.ts</div>
                 <div className="text-xs text-slate-500 font-mono">
                   app.use(helmet());<br/>
                   app.use(cors());<br/>
                   app.use('/api/auth', authRoutes);<br/>
                   app.use('/api/pipelines', pipelineRoutes);
                 </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};