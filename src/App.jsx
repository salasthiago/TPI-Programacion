import './App.css'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Contact from './pages/Contact'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Catalogo from './components/Catalogue'
import Fathercatalogue from './components/Fathercatalogue'
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./pages/Cart";
import AdminProductos from './pages/AdminProductos';
import AdminUsuarios from './pages/AdminUsuarios';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Auth />} />
            <Route path='/contacto' element={<Contact />} />

            {/* Rutas protegidas */}
            <Route 
              path='/home' 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            <Route 
              path='/catalogo' 
              element={
                <ProtectedRoute>
                  <Fathercatalogue />
                </ProtectedRoute>
              } 
            />
            <Route
              path='/cart'
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />

            {/* Rutas de administración - Solo Admin y SuperAdmin */}
            <Route
              path='/admin/productos'
              element={
                <ProtectedRoute requiredRole="Admin">
                  <AdminProductos />
                </ProtectedRoute>
              }
            />

            {/* Rutas de SuperAdmin - Solo SuperAdmin */}
            <Route
              path='/admin/usuarios'
              element={
                <ProtectedRoute requiredRole="SuperAdmin">
                  <AdminUsuarios />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
