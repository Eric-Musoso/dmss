import React, { useState, useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import { Truck, Navigation, Package, Settings, Play, CheckCircle2, AlertCircle, FileText, UploadCloud } from 'lucide-react';

export const LogisticsOptimizer: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [fileAttached, setFileAttached] = useState<string | null>(null);

  useEffect(() => {
    if (map.current) return;
    if (!mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [-74.006, 40.7128],
      zoom: 11,
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    return () => {
      map.current?.remove();
    };
  }, []);

  const handleFileUpload = () => {
    // Mock file upload
    setFileAttached("delivery_manifest_q4.csv");
  };

  const runOptimization = () => {
    if (!fileAttached) return;
    setIsAnalyzing(true);
    setHasResults(false);

    // Simulate AI processing
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasResults(true);
      drawRoute();
    }, 2000);
  };

  const drawRoute = () => {
    if (!map.current) return;

    // Remove existing if any
    if (map.current.getSource('route')) {
        map.current.removeLayer('route');
        map.current.removeLayer('route-arrows');
        map.current.removeSource('route');
    }

    // Mock Route Data (A simple zigzag in NYC)
    const routeGeoJSON: any = {
        type: 'Feature',
        properties: {},
        geometry: {
            type: 'LineString',
            coordinates: [
                [-74.01, 40.70],
                [-74.00, 40.71],
                [-73.99, 40.73],
                [-73.98, 40.75],
                [-73.97, 40.76]
            ]
        }
    };

    map.current.addSource('route', {
        type: 'geojson',
        data: routeGeoJSON
    });

    map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': '#6366f1', // Indigo 500
            'line-width': 4
        }
    });

    // Fit bounds
    const bounds = new maplibregl.LngLatBounds();
    routeGeoJSON.geometry.coordinates.forEach((coord: any) => bounds.extend(coord));
    map.current.fitBounds(bounds, { padding: 50 });
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-slate-950">
      {/* Control Panel */}
      <div className="w-full md:w-96 bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-xl">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                <Truck className="w-6 h-6" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-slate-100">Logistics AI</h2>
                <div className="text-xs text-slate-400">Route Optimization Engine</div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Step 1: Data */}
            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-xs">1</div>
                    Import Fleet Data
                </h3>
                
                <div 
                    onClick={handleFileUpload}
                    className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${fileAttached ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-slate-700 hover:border-indigo-500/50 hover:bg-slate-800'}`}
                >
                    {fileAttached ? (
                        <>
                            <FileText className="w-8 h-8 text-emerald-400 mb-2" />
                            <div className="text-sm text-emerald-400 font-medium">{fileAttached}</div>
                            <div className="text-xs text-slate-500">124 Stops • 15 Vehicles</div>
                        </>
                    ) : (
                        <>
                            <UploadCloud className="w-8 h-8 text-slate-500 mb-2" />
                            <div className="text-sm text-slate-300">Click to upload CSV</div>
                            <div className="text-xs text-slate-500">Coordinates, Time Windows, Load</div>
                        </>
                    )}
                </div>
            </div>

            {/* Step 2: Config */}
            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-xs">2</div>
                    Constraints
                </h3>
                
                <div className="space-y-3">
                    <div>
                        <label className="text-xs text-slate-400 block mb-1">Fleet Size</label>
                        <input type="number" defaultValue={15} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-slate-200 text-sm" />
                    </div>
                    <div>
                        <label className="text-xs text-slate-400 block mb-1">Optimization Goal</label>
                        <select className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-slate-200 text-sm">
                            <option>Minimize Distance</option>
                            <option>Minimize Time</option>
                            <option>Balance Workload</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                         <input type="checkbox" id="traffic" defaultChecked className="rounded bg-slate-950 border-slate-700 text-indigo-500" />
                         <label htmlFor="traffic" className="text-sm text-slate-300">Consider Live Traffic</label>
                    </div>
                </div>
            </div>

            {/* Action */}
            <button 
                onClick={runOptimization}
                disabled={!fileAttached || isAnalyzing}
                className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                    !fileAttached ? 'bg-slate-800 text-slate-500 cursor-not-allowed' :
                    isAnalyzing ? 'bg-indigo-600/80 text-white cursor-wait' :
                    'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                }`}
            >
                {isAnalyzing ? (
                    <>Processing Model...</>
                ) : (
                    <><Play className="w-4 h-4 fill-current" /> Optimize Routes</>
                )}
            </button>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-slate-950">
        <div ref={mapContainer} className="absolute inset-0" />
        
        {/* Results Overlay */}
        {hasResults && (
            <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur border border-slate-700 p-4 rounded-xl flex flex-col md:flex-row gap-6 animate-in slide-in-from-bottom-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-500/20 rounded-full text-emerald-400">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-lg font-bold text-slate-100">Optimization Complete</div>
                        <div className="text-xs text-slate-400">Model v2.4 • 0.8s Compute Time</div>
                    </div>
                </div>
                
                <div className="h-px w-full md:w-px md:h-12 bg-slate-700"></div>

                <div className="grid grid-cols-3 gap-8 flex-1">
                    <div>
                        <div className="text-sm text-slate-400">Total Distance</div>
                        <div className="text-xl font-bold text-slate-100">142.5 km</div>
                        <div className="text-xs text-emerald-400">-12% vs Baseline</div>
                    </div>
                    <div>
                        <div className="text-sm text-slate-400">Est. Time</div>
                        <div className="text-xl font-bold text-slate-100">4h 15m</div>
                        <div className="text-xs text-emerald-400">-35m Saved</div>
                    </div>
                    <div>
                        <div className="text-sm text-slate-400">Cost Savings</div>
                        <div className="text-xl font-bold text-slate-100">$240.50</div>
                        <div className="text-xs text-slate-500">Fuel & Labor</div>
                    </div>
                </div>

                <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm font-medium border border-slate-600">
                    Export Manifest
                </button>
            </div>
        )}
      </div>
    </div>
  );
};
