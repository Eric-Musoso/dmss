import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar 
} from 'recharts';
import { Activity, Database, Server, Clock, AlertCircle } from 'lucide-react';
import { MetricCardProps } from '../types';

const data = [
  { name: '00:00', jobs: 400, latency: 240 },
  { name: '04:00', jobs: 300, latency: 139 },
  { name: '08:00', jobs: 900, latency: 980 },
  { name: '12:00', jobs: 1100, latency: 390 },
  { name: '16:00', jobs: 800, latency: 480 },
  { name: '20:00', jobs: 500, latency: 380 },
  { name: '23:59', jobs: 350, latency: 430 },
];

const resourceData = [
  { name: 'Worker 1', load: 85 },
  { name: 'Worker 2', load: 45 },
  { name: 'Worker 3', load: 60 },
  { name: 'Worker 4', load: 92 },
];

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, positive, icon: Icon }) => (
  <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg ${positive ? 'bg-indigo-500/10' : 'bg-rose-500/10'}`}>
        <Icon className={`w-5 h-5 ${positive ? 'text-indigo-400' : 'text-rose-400'}`} />
      </div>
      <span className={`text-xs font-medium px-2 py-1 rounded-full ${positive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
        {change}
      </span>
    </div>
    <div className="text-2xl font-bold text-slate-100 mb-1">{value}</div>
    <div className="text-sm text-slate-500">{title}</div>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Active Pipelines" 
          value="24" 
          change="+12%" 
          positive={true} 
          icon={Activity} 
        />
        <MetricCard 
          title="Total Processed (GB)" 
          value="1.2 TB" 
          change="+5.4%" 
          positive={true} 
          icon={Database} 
        />
        <MetricCard 
          title="Avg Latency (ms)" 
          value="142ms" 
          change="-12ms" 
          positive={true} 
          icon={Clock} 
        />
        <MetricCard 
          title="Failed Jobs" 
          value="3" 
          change="+2" 
          positive={false} 
          icon={AlertCircle} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-slate-100">Job Throughput (24h)</h3>
            <select className="bg-slate-950 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-1 outline-none">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="jobs" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorJobs)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-slate-100">Worker Load</h3>
            <Server className="w-4 h-4 text-slate-500" />
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resourceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} width={80} />
                <Tooltip 
                  cursor={{fill: '#1e293b'}}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Bar dataKey="load" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};