'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

// URL del icono del marcador (puedes usar un icono de Leaflet o uno personalizado)
const customIcon = new L.Icon({
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', // URL del icono del marcador
  iconSize: [25, 41], // Tamaño del icono
  iconAnchor: [12, 41], // Punto de anclaje del icono
  popupAnchor: [1, -34], // Punto de anclaje del popup
});

const Mapa = ({ location }: { location: string }) => {
  const [position, setPosition] = useState<[number, number]>([51.505, -0.09]); // Coordenadas iniciales por defecto.

  // Función para obtener las coordenadas basadas en el nombre de una ciudad o dirección.
  const fetchCoordinates = async (location: string) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        location
      )}`
    );
    const data = await res.json();
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      setPosition([parseFloat(lat), parseFloat(lon)]);
    } else {
      console.log('No se encontraron resultados para la ubicación.');
    }
  };

  useEffect(() => {
    if (location) {
      fetchCoordinates(location);
    }
  }, [location]);

  return (
    <MapContainer
      center={[42.84064, -8.90257]}
      zoom={10}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>'
      />
      <Marker position={position} icon={customIcon}>
        <Popup>holi 😄</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Mapa;
