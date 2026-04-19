import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TopNav } from './components/layout/TopNav'
import { BottomNav } from './components/layout/BottomNav'
import HomePage from './pages/HomePage'
import MapPage from './pages/MapPage'
import SavedPage from './pages/SavedPage'
import ProfilePage from './pages/ProfilePage'
import EventDetailPage from './pages/EventDetailPage'
import SubmitEventPage from './pages/SubmitEventPage'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-cream">
          <TopNav />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/saved" element={<SavedPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/events/:slug" element={<EventDetailPage />} />
              <Route path="/submit" element={<SubmitEventPage />} />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
