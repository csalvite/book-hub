'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Importa los iconos predeterminados
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import { useEffect, useState } from 'react';

// Configurar el icono predeterminado
const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41], // Tamaño del icono
  iconAnchor: [12, 41], // Punto de anclaje del icono (base del icono)
  popupAnchor: [1, -34], // Punto donde aparecerá el popup
  shadowSize: [41, 41], // Tamaño de la sombra
});

L.Marker.prototype.options.icon = DefaultIcon;

export const MyMaps = ({ locationName }) => {
  const [position, setPosition] = useState([51.505, -0.09]); // Coordenadas iniciales por defecto.

  // Función para obtener las coordenadas basadas en el nombre de una ciudad o dirección.
  const fetchCoordinates = async (locationName) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        locationName
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
    if (locationName) {
      fetchCoordinates(locationName);
    }
  }, [locationName]);

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      <Marker position={position}>
        <Popup>Ubicación de {locationName}.</Popup>
      </Marker>
    </MapContainer>
  );
};
