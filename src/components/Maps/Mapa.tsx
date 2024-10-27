'use client';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import Loader from '../Loader';

// URL del icono del marcador (puedes usar un icono de Leaflet o uno personalizado)
const customIcon = new L.Icon({
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', // URL del icono del marcador
  iconSize: [25, 41], // Tamaño del icono
  iconAnchor: [12, 41], // Punto de anclaje del icono
  popupAnchor: [1, -34], // Punto de anclaje del popup
});

// Componente para centrar el mapa cuando cambie la posición
const ChangeMapView = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom()); // Actualiza la vista del mapa
  }, [position, map]);

  return null;
};

const Mapa = ({
  location,
  setFormData,
}: {
  location: string;
  setFormData: any;
}) => {
  const [position, setPosition] = useState<[number, number]>([51.505, -0.09]);
  const [loading, setLoading] = useState(true);

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

  const handleMarkerDrag = (event: L.DragEndEvent) => {
    const { lat, lng } = event.target.getLatLng();
    setPosition([lat, lng]); // Actualiza el estado con la nueva posición
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;
        setPosition([lat, lng]); // Actualiza la posición del marcador a donde se hizo clic
      },
    });
    return null;
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      if (confirm('Permitir que bookhub acceda a tu ubicación:')) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;

          setPosition([latitude, longitude]);
          setLoading(false);
        });
      }
    } else {
      if (location) {
        fetchCoordinates(location);
      }
    }
  }, [location]);

  // cuando se cambia la position asignamos al formData
  useEffect(() => {
    const [lat, lon] = position;
    setFormData({
      latitude: lat,
      longitude: lon,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  if (loading) {
    return (
      <div className='h-[400px] w-full flex items-center justify-center'>
        <Loader className='w-16 h-16' />
      </div>
    );
  }

  return (
    <MapContainer
      center={position}
      zoom={20}
      style={{ height: '400px', width: '100%' }}
    >
      <ChangeMapView position={position} />
      <TileLayer
        url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>'
      />
      {/* Componente para manejar clics en el mapa */}
      <MapClickHandler />
      <Marker
        position={position}
        draggable={true}
        eventHandlers={{
          dragend: handleMarkerDrag,
        }}
        icon={customIcon}
      >
        <Popup>Tu negocio! 😄</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Mapa;
