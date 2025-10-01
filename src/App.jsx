import './App.css'
import Home from './pages/Home'
import Contact from './pages/Contact'
import {BrowserRouter , Routes, Route} from "react-router-dom"
import Catalogo from './components/Catalogue'
import Fathercatalogue from './components/Fathercatalogue'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/contacto' element={<Contact/>} />
        <Route path='/catalogo' element ={<Fathercatalogue/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App