import React, { useState } from 'react';
import Fuse from 'fuse.js';
import type { Location } from '../lib/getLocations';

interface ListaPersonajesProps {
  locations: Location[];
}

const ListaPersonajes: React.FC<ListaPersonajesProps> = ({ locations }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLocations, setFilteredLocations] = useState<Location[]>(locations);

  // Configure Fuse.js for fuzzy searching
  const fuse = new Fuse(locations, {
    keys: ['name', 'history', 'additional_notes'],
    threshold: 0.3, // Adjust the sensitivity of the search
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleSearch se ha llamado');
    const value = event.target.value;
    setSearchTerm(value);
    const results = fuse.search(value);
    console.log("results"); // Verifica si hay resultados aquí
    setFilteredLocations(value ? results.map(result => result.item) : locations);
  };

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        className="border rounded-lg p-2 w-full mb-4"
        placeholder="Buscar personaje..."
        value={searchTerm}
        onChange={handleSearch}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLocations.map((location, index) => (
          <div key={index} className="card border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
            <img src={location.photo_url} alt={location.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2 text-indigo-400">{location.name}</h2>
              <p className="text-sm text-white mb-2">{location.history}</p>
              <p className="text-sm text-white">{location.additional_notes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaPersonajes;