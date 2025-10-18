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
import Usuarios from './components/Usuarios';

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
            <Route 
              path='/usuarios' 
              element={
                <ProtectedRoute>
                  <Usuarios />
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
