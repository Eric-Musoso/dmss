import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { Layers, Database, Filter, Eye, EyeOff, Globe, Settings } from 'lucide-react';

const MAPTILER_KEY = 'get_your_own_free_key'; 

interface Layer {
  id: string;
  name: string;
  type: 'circle' | 'fill' | 'heatmap';
  visible: boolean;
  sourceId: string;
  color: string;
}

const mockLayers: Layer[] = [
  { id: 'buildings', name: 'NY Building Footprints', type: 'fill', visible: true, sourceId: 'buildings_src', color: '#6366f1' },
  { id: 'pickups', name: 'Taxi Pickups Heatmap', type: 'heatmap', visible: true, sourceId: 'pickups_src', color: '#f43f5e' },
  { id: 'sensors', name: 'IoT Sensors', type: 'circle', visible: false, sourceId: 'sensors_src', color: '#10b981' },
];

export const MapExplorer: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [layers, setLayers] = useState<Layer[]>(mockLayers);
  const [activeStyle, setActiveStyle] = useState('streets');

  useEffect(() => {
    if (map.current) return;
    if (!mapContainer.current) return;

    // Default to free demo style if no key
    const styleUrl = MAPTILER_KEY === 'get_your_own_free_key' 
      ? 'https://demotiles.maplibre.org/style.json'
      : `https://api.maptiler.com/maps/${activeStyle}/style.json?key=${MAPTILER_KEY}`;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: styleUrl,
      center: [-74.006, 40.7128],
      zoom: 11,
      pitch: 45,
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
    map.current.addControl(new maplibregl.FullscreenControl(), 'top-right');

    map.current.on('load', () => {
      // Add Dummy Sources
      // In real app, these fetch GeoJSON from our /api/datasets/:id/preview
      
      // 1. Buildings (Polygon)
      map.current?.addSource('buildings_src', {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: [
                { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[-74.01, 40.71], [-74.00, 40.71], [-74.00, 40.72], [-74.01, 40.72], [-74.01, 40.71]]] }, properties: { height: 100 } }
            ]
        }
      });

      // 2. Pickups (Points for Heatmap)
      map.current?.addSource('pickups_src', {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: Array.from({length: 50}, () => ({
                type: 'Feature',
                geometry: { type: 'Point', coordinates: [-74.006 + (Math.random()-0.5)*0.05, 40.7128 + (Math.random()-0.5)*0.05] },
                properties: { val: Math.random() }
            }))
        }
      });

      // Add Layers based on state
      addLayersToMap();
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  // Update visibility when state changes
  useEffect(() => {
    if (!map.current || !map.current.isStyleLoaded()) return;
    layers.forEach(l => {
        if (map.current?.getLayer(l.id)) {
            map.current.setLayoutProperty(l.id, 'visibility', l.visible ? 'visible' : 'none');
        }
    });
  }, [layers]);

  const addLayersToMap = () => {
    if (!map.current) return;

    // Buildings Fill
    if (!map.current.getLayer('buildings')) {
        map.current.addLayer({
            id: 'buildings',
            type: 'fill-extrusion',
            source: 'buildings_src',
            paint: {
                'fill-extrusion-color': '#6366f1',
                'fill-extrusion-height': 50,
                'fill-extrusion-opacity': 0.8
            }
        });
    }

    // Heatmap
    if (!map.current.getLayer('pickups')) {
        map.current.addLayer({
            id: 'pickups',
            type: 'heatmap',
            source: 'pickups_src',
            paint: {
                'heatmap-weight': 1,
                'heatmap-intensity': 1,
                'heatmap-color': [
                    'interpolate',
                    ['linear'],
                    ['heatmap-density'],
                    0, 'rgba(33,102,172,0)',
                    0.2, 'rgb(103,169,207)',
                    0.4, 'rgb(209,229,240)',
                    0.6, 'rgb(253,219,199)',
                    0.8, 'rgb(239,138,98)',
                    1, 'rgb(178,24,43)'
                ],
                'heatmap-radius': 20
            }
        });
    }
  };

  const toggleLayer = (id: string) => {
    setLayers(prev => prev.map(l => l.id === id ? { ...l, visible: !l.visible } : l));
  };

  return (
    <div className="relative w-full h-full flex">
      {/* Map Control Panel Overlay */}
      <div className="absolute top-4 left-4 z-10 w-80 bg-slate-900/95 backdrop-blur border border-slate-700 rounded-lg shadow-xl flex flex-col max-h-[calc(100vh-200px)]">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
          <h3 className="font-semibold text-slate-100 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            Layer Manager
          </h3>
          <div className="flex gap-2">
            <button className="p-1.5 hover:bg-slate-800 rounded text-slate-400" title="Change Base Map">
                <Globe className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-2 overflow-y-auto space-y-1">
          {layers.map(layer => (
            <div 
                key={layer.id} 
                className="flex items-center gap-3 p-2 rounded hover:bg-slate-800/50 border border-transparent hover:border-slate-700 transition-colors"
            >
             <button onClick={() => toggleLayer(layer.id)} className="text-slate-400 hover:text-slate-200">
                {layer.visible ? <Eye className="w-4 h-4 text-indigo-400" /> : <EyeOff className="w-4 h-4" />}
             </button>
             
             <div className="flex-1">
                <div className="text-sm text-slate-200 font-medium">{layer.name}</div>
                <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: layer.color }}></span>
                    {layer.type} layer
                </div>
             </div>

             <button className="text-slate-600 hover:text-slate-400">
                <Settings className="w-3 h-3" />
             </button>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-slate-700 mt-auto">
          <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-sm transition-colors border border-slate-600 border-dashed">
            <Database className="w-4 h-4" /> Add Data Source
          </button>
        </div>
      </div>

      {/* Actual Map */}
      <div ref={mapContainer} className="w-full h-full bg-slate-950" />
    </div>
  );
};