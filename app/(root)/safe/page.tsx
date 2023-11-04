// @ts-nocheck
"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-heatmap';
import HeatmapOverlay from 'leaflet-heatmap';
import { useEffect } from "react";

const SafePage = () => {
  useEffect(() => {
    if (!L.DomUtil.get('map-canvas') || !L.DomUtil.get('map-canvas')._leaflet_id) {
      // Configuration for the heatmap
      var cfg = {
        "radius": 2,
        "maxOpacity": .8,
        "scaleRadius": true,
        "useLocalExtrema": true,
        latField: 'lat',
        lngField: 'lng',
        valueField: 'count'
      };

      // Data for the heatmap
      var testData = {
        max: 8,
        data: [
          { lat: 24.6408, lng: 46.7728, count: 3 },
          { lat: 50.75, lng: -1.55, count: 1 },
          // ... more data
        ]
      };

      // Base layer for the map
      var baseLayer = L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '...',
          maxZoom: 18
        }
      );

      // Initialize the heatmap layer
      var heatmapLayer = new HeatmapOverlay(cfg);

      // Initialize the map
      var map = new L.Map('map-canvas', {
        center: new L.LatLng(25.6586, -80.3568),
        zoom: 4,
        layers: [baseLayer, heatmapLayer]
      });

      // Set heatmap data
      heatmapLayer.setData(testData);
    }
  }, []);

  return (
    <div className="container py-10">
      <div className="flex gap-5 relative">
        <div className="flex items-center justify-center w-[30%] absolute p-3 bg-background border shadow rounded-lg">
          <div className="flex flex-col w-full max-w-sm space-y-2">
            <Input type="text" placeholder="Enter places to search for" />
            <Button type="submit">Search</Button>
          </div>
        </div>
        <div id="map-canvas" style={{ height: '500px', width: '100%' }}></div>
      </div>
    </div>
  );
};

export default SafePage;
