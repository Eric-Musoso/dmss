import React, { useState } from 'react';
import { Database, Plus, RefreshCw, Trash2, CheckCircle2, AlertCircle, FileSpreadsheet, Server, Globe } from 'lucide-react';

const mockSources = [
  { id: '1', name: 'Primary PGSQL', type: 'PostgreSQL', status: 'connected', lastSync: '2 mins ago', icon: Database },
  { id: '2', name: 'Raw Imagery Bucket', type: 'S3 Storage', status: 'connected', lastSync: '1 hour ago', icon: Server },
  { id: '3', name: 'Sales CSV Uploads', type: 'CSV File', status: 'error', lastSync: '1 day ago', icon: FileSpreadsheet },
  { id: '4', name: 'OpenStreetMap API', type: 'REST API', status: 'connected', lastSync: '5 mins ago', icon: Globe },
];

export const DataSources: React.FC = () => {
  const [sources, setSources] = useState(mockSources);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Data Sources</h2>
          <p className="text-slate-400">Manage connections to external databases, APIs, and file stores.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors shadow-lg shadow-indigo-500/20"
        >
          <Plus className="w-4 h-4" /> Add Source
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sources.map((source) => {
          const Icon = source.icon;
          return (
            <div key={source.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-800 rounded-lg text-indigo-400">
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full border ${
                  source.status === 'connected' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                }`}>
                  {source.status === 'connected' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                  {source.status === 'connected' ? 'Active' : 'Error'}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-slate-200 mb-1">{source.name}</h3>
              <p className="text-sm text-slate-500 mb-4">{source.type}</p>
              
              <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-800">
                <span>Synced: {source.lastSync}</span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-indigo-400" title="Test Connection">
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-rose-400" title="Delete">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Simple Modal for MVP */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md shadow-2xl">
            <div className="p-6 border-b border-slate-800">
              <h3 className="text-xl font-bold text-slate-100">Connect New Source</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Source Name</label>
                <input type="text" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500" placeholder="e.g. Production DB" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Type</label>
                <select className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500">
                  <option>PostgreSQL</option>
                  <option>S3 Bucket</option>
                  <option>REST API</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Connection String</label>
                <input type="password" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500" placeholder="postgres://..." />
              </div>
            </div>
            <div className="p-6 border-t border-slate-800 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-400 hover:text-slate-200">Cancel</button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg">Connect</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};