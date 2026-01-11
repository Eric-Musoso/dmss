import React, { useState } from 'react';
import { Search, Table, Map, Code, ChevronRight, Download } from 'lucide-react';

const mockDatasets = [
  { id: 1, name: 'nyc_taxi_trips_2024', type: 'Spatial (Point)', rows: '2.4M', size: '450MB' },
  { id: 2, name: 'customer_demographics', type: 'Tabular', rows: '150K', size: '24MB' },
  { id: 3, name: 'satellite_imagery_index', type: 'Spatial (Polygon)', rows: '12K', size: '4.2MB' },
  { id: 4, name: 'store_inventory_daily', type: 'Tabular', rows: '850K', size: '120MB' },
];

export const DataExplorer: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState<number | null>(null);

  return (
    <div className="h-full flex flex-col lg:flex-row">
      {/* Sidebar List */}
      <div className="w-full lg:w-80 border-r border-slate-800 bg-slate-900/50 flex flex-col">
        <div className="p-4 border-b border-slate-800">
          <h2 className="font-semibold text-slate-100 mb-4">Datasets</h2>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search data..." 
              className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {mockDatasets.map(ds => (
            <div 
              key={ds.id}
              onClick={() => setSelectedDataset(ds.id)}
              className={`p-4 border-b border-slate-800 cursor-pointer hover:bg-slate-800/50 transition-colors ${selectedDataset === ds.id ? 'bg-indigo-500/10 border-l-2 border-l-indigo-500' : ''}`}
            >
              <div className="flex justify-between items-start">
                <div className="font-medium text-slate-200 truncate">{ds.name}</div>
                {ds.type.includes('Spatial') ? <Map className="w-3 h-3 text-purple-400" /> : <Table className="w-3 h-3 text-blue-400" />}
              </div>
              <div className="flex gap-3 mt-2 text-xs text-slate-500">
                <span>{ds.rows} rows</span>
                <span>•</span>
                <span>{ds.size}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-slate-950 flex flex-col">
        {selectedDataset ? (
          <>
            <div className="h-14 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/30">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <span className="text-slate-500">Schema</span>
                <ChevronRight className="w-4 h-4 text-slate-600" />
                <span className="font-medium">{mockDatasets.find(d => d.id === selectedDataset)?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs transition-colors border border-slate-700">
                  <Code className="w-3 h-3" /> Query
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs transition-colors border border-slate-700">
                  <Download className="w-3 h-3" /> Export
                </button>
              </div>
            </div>

            {/* Mock Data Table Preview */}
            <div className="flex-1 overflow-auto p-6">
              <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm text-slate-400">
                  <thead className="bg-slate-950 text-slate-200 uppercase text-xs font-semibold">
                    <tr>
                      <th className="px-4 py-3 border-b border-slate-800">id</th>
                      <th className="px-4 py-3 border-b border-slate-800">timestamp</th>
                      <th className="px-4 py-3 border-b border-slate-800">value_a</th>
                      <th className="px-4 py-3 border-b border-slate-800">category</th>
                      <th className="px-4 py-3 border-b border-slate-800">geom</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {[1,2,3,4,5].map(i => (
                      <tr key={i} className="hover:bg-slate-800/30">
                        <td className="px-4 py-3 font-mono text-slate-500">{i}</td>
                        <td className="px-4 py-3">2024-03-10 14:2{i}:00</td>
                        <td className="px-4 py-3 text-emerald-400">{Math.floor(Math.random() * 100)}</td>
                        <td className="px-4 py-3"><span className="px-2 py-0.5 rounded bg-slate-800 text-xs">Category A</span></td>
                        <td className="px-4 py-3 font-mono text-xs text-purple-400">POINT(-73.9 {40.7 + i})</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
            <Table className="w-12 h-12 mb-4 text-slate-700" />
            <p>Select a dataset to preview content</p>
          </div>
        )}
      </div>
    </div>
  );
};