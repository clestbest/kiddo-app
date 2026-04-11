<<<<<<< HEAD
export default function MapPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4 px-6">
      <div className="text-6xl">🗺️</div>
      <h2 className="font-fraunces text-2xl font-bold text-ink">Map View</h2>
      <p className="text-muted text-center max-w-sm">
        Mapbox integration coming soon. You'll be able to explore events on an
        interactive map of the Treasure Valley.
      </p>
      <div className="h-20" />
=======
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { useEvents } from '../hooks/useEvents'
import { formatEventDate, formatPrice } from '../lib/eventUtils'

// Fix default marker icon broken by bundlers
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
})

// Treasure Valley / Boise center
const TREASURE_VALLEY: [number, number] = [43.615, -116.2023]

export default function MapPage() {
  const navigate = useNavigate()
  const { data: events = [], isLoading } = useEvents()

  return (
    <div className="flex flex-col h-[calc(100dvh-64px)]">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      )}
      <MapContainer
        center={TREASURE_VALLEY}
        zoom={11}
        className="flex-1 w-full"
        style={{ zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {events.map((event) => (
          <Marker key={event.id} position={[event.lat, event.lng]}>
            <Popup>
              <div className="text-sm min-w-[180px]">
                <p className="font-bold text-ink mb-1">{event.title}</p>
                <p className="text-muted mb-1">{formatEventDate(event.starts_at, event.ends_at)}</p>
                <p className="text-muted mb-2">{event.location_name}</p>
                <p className="font-semibold mb-2">
                  {event.price_cents === 0 ? 'Free' : formatPrice(event.price_cents)}
                </p>
                <button
                  onClick={() => navigate(`/events/${event.slug}`)}
                  className="bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-btn hover:bg-primary-dark transition-colors w-full"
                >
                  View event
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
    </div>
  )
}
