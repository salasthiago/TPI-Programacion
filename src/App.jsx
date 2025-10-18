import './App.css'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Contact from './pages/Contact'
import {BrowserRouter , Routes, Route} from "react-router-dom"
import Catalogo from './components/Catalogue'
import Fathercatalogue from './components/Fathercatalogue'
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart";
import Usuarios from './components/Usuarios'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/contacto' element={<Contact/>} />
        <Route path='/catalogo' element ={<Fathercatalogue/>}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/usuarios" element={<Usuarios />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App