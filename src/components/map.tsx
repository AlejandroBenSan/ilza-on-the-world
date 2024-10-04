import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

interface Location {
  id: number;
  name: string;
  position: [number, number];
  history: string;
  photo_url: string;
  additional_notes: string;
}

interface MapProps {
  locations: Location[];
}

const MapComponent: React.FC<MapProps> = ({ locations }) => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 ">
      <h1 className="text-white text-3xl md:text-4xl font-extrabold mb-4 md:mb-6 tracking-wide text-center mt-4 md:mt-8">Mapa lokalizacji</h1>
      
      <div className="w-full max-w-4xl h-[80vh] md:h-[70vh] lg:h-[80vh] rounded-lg shadow-lg overflow-hidden border-2 border-gray-400 mt-4">
        <MapContainer 
          center={[38.3452, -0.4815]} 
          zoom={5} 
          minZoom={3} 
          maxBounds={[[-90, -180], [90, 180]]}  
          className="h-full w-full rounded-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locations.map((location) => (
            <Marker key={location.id} position={location.position} icon={customIcon}>
              <Popup>
                <div className="text-sm text-gray-900 p-2">
                  <strong className="block mb-1 text-lg text-blue-800">{location.name}</strong>
                  <p className="mb-2">{location.history}</p>
                  <img 
                    src={location.photo_url} 
                    alt={location.name} 
                    className="w-full h-auto max-w-xs rounded-md shadow-md mb-2 mx-auto"
                  />
                  <p className="italic text-gray-600">{location.additional_notes}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapComponent;