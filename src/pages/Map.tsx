import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { MapPin, Plus } from 'lucide-react';
import { useCityStore } from '../stores/cityStore';
import { AddCityModal } from '../components/AddCityModal';
import { Icon } from 'leaflet';

// Create a custom icon using Lucide React's MapPin as a template
const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/lucide-static/icons/map-pin.svg',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function SetViewOnClick({ coords }: { coords: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, map.getZoom());
  }, [coords, map]);
  return null;
}

export function Map() {
  const [center, setCenter] = useState<[number, number]>([20, 0]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { cities, loading, fetchCities } = useCityStore();

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Travel Map</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          <span>Add City</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-1 h-[600px]">
        <MapContainer
          center={center}
          zoom={2}
          style={{ height: '100%', width: '100%' }}
          className="rounded-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <SetViewOnClick coords={center} />
          {cities.map((city) => (
            <Marker
              key={city.id}
              position={[city.latitude, city.longitude]}
              icon={customIcon}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{city.name}</h3>
                  <p className="text-sm text-gray-600">{city.country}</p>
                  <p className="text-sm">Rating: {'⭐'.repeat(city.rating)}</p>
                  {city.notes && (
                    <p className="text-sm mt-2 italic">"{city.notes}"</p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <AddCityModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}