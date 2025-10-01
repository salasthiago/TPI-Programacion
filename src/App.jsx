import './App.css'
import Home from './pages/Home'
import Contact from './pages/Contact'
import {BrowserRouter , Routes, Route} from "react-router-dom"
import Catalogo from './components/Catalogue'

const products = [
  { id: 5, name: "Plastic Beach", artist: "Gorillaz", price: "$25.99" },
  { id: 6, name: "Ballads 1", artist: "Joji", price: "$28.99" },
  { id: 7, name: "Thriller", artist: "Michael Jackson", price: "$24.99" },
  { id: 8, name: "Demon Days", artist: "Gorillaz", price: "$22.99" },
  { id: 9, name: "Mint Jams", artist: "Casiopea", price: "$69.99" },
  { id: 10, name: "Dirt", artist: "Alice In Chains", price: "$22.99"},
  { id: 44, name: "Oktubre", artist: "Patricio rey y sus redonditos de ricota", price: "$22.99" },
  { id: 92, name: "Gulp", artist: "Patricio rey y sus redonditos de ricota", price: "$22.99" },
  { id: 54, name: "Audioslave", artist: "Audioslave", price: "$22.99" },
  { id: 423, name: "Verde Paisaje del infierno", artist: "Los piojos", price: "$22.99" },
  { id: 873, name: "Cuarteto Característico (A2000)", artist: "Rodrigo", price: "$22.99" },
  { id: 873, name: "Master of puppets", artist: "Metallica", price: "$22.99" }
]


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/contacto' element={<Contact/>} />
        <Route path='/catalogo' element ={<Catalogo products={products}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App