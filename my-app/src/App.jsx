import Home from './pages/Home'
import AdminUpload from './pages/AdminUpload'

function App() {
  const params = new URLSearchParams(window.location.search)
  const isAdmin =
    params.get('admin') === '1' ||
    params.get('admin') === 'true' ||
    window.location.hash === '#/admin'

  return isAdmin ? <AdminUpload /> : <Home />
}

export default App
