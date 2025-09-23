import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Phone, Clock, Star } from 'lucide-react';

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = ({ hospitals, onHospitalSelect, userLocation = [10.0889, 76.3378] }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView(userLocation, 13);
    mapInstanceRef.current = map;

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add user location marker
    const userIcon = L.divIcon({
      html: '<div style="background-color: #059669; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
      iconSize: [20, 20],
      className: 'user-location-marker'
    });

    L.marker(userLocation, { icon: userIcon })
      .addTo(map)
      .bindPopup('<b>Your Location</b><br>Kochi, Kerala')
      .openPopup();

    // Add hospital markers
    hospitals.forEach((hospital) => {
      const hospitalIcon = L.divIcon({
        html: `<div style="background-color: ${hospital.emergency ? '#dc2626' : '#2563eb'}; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">🏥</div>`,
        iconSize: [30, 30],
        className: 'hospital-marker'
      });

      const marker = L.marker([hospital.coordinates.lat, hospital.coordinates.lng], { 
        icon: hospitalIcon 
      }).addTo(map);

      const popupContent = `
        <div class="p-2 min-w-[200px]">
          <h3 class="font-bold text-gray-900 mb-2">${hospital.name}</h3>
          <div class="space-y-1 text-sm">
            <div class="flex items-center space-x-1">
              <span>📍</span>
              <span class="text-gray-600">${hospital.distance}</span>
            </div>
            <div class="flex items-center space-x-1">
              <span>⭐</span>
              <span class="text-gray-600">${hospital.rating}/5</span>
            </div>
            <div class="flex items-center space-x-1">
              <span>🕒</span>
              <span class="text-gray-600">${hospital.timings}</span>
            </div>
            ${hospital.emergency ? '<div class="text-red-600 font-medium text-xs">🚨 24/7 Emergency</div>' : ''}
          </div>
          <button 
            onclick="window.selectHospital(${hospital.id})"
            class="mt-2 bg-primary text-white px-3 py-1 rounded text-xs hover:bg-primary-dark transition-colors w-full"
          >
            View Details
          </button>
        </div>
      `;

      marker.bindPopup(popupContent);
    });

    // Global function for hospital selection
    window.selectHospital = (hospitalId) => {
      const hospital = hospitals.find(h => h.id === hospitalId);
      if (hospital && onHospitalSelect) {
        onHospitalSelect(hospital);
      }
    };

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      delete window.selectHospital;
    };
  }, [hospitals, onHospitalSelect, userLocation]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-96 rounded-lg border border-gray-200 shadow-sm"
      style={{ minHeight: '400px' }}
    />
  );
};

export default MapView;