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
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-white text-4xl font-bold mb-8">Mapa de Ubicaciones</h1>
      
      <div className="w-full max-w-4xl h-[50vh] md:h-[70vh] lg:h-[80vh] rounded-lg shadow-lg overflow-hidden border border-gray-300">
        <MapContainer center={[38.3452, -0.4815]} zoom={5} minZoom={3} maxBounds={[[-90, -180], [90, 180]]}  className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locations.map((location) => (
            <Marker key={location.id} position={location.position} icon={customIcon}>
              <Popup>
                <div className="text-sm text-gray-800">
                  <strong>{location.name}</strong>
                  <p>Lat: {location.position[0]}</p>
                  <p>Lon: {location.position[1]}</p>
                  <p>{location.history}</p>
                  <img src={location.photo_url} alt={location.name} style={{ maxWidth: '100px' }} />
                  <p>{location.additional_notes}</p>
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