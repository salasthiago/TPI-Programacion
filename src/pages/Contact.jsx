import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('¡Gracias por contactarnos! Te responderemos pronto.')
    setFormData({ nombre: '', email: '', telefono: '', mensaje: '' })
  }

  return (
    <div className="contact-page">
      <Header />
      <div className="contact-container">
        <div className="contact-header">
          <h1>Contactanos</h1>
          <p>¿Tenés alguna pregunta? ¡Estamos para ayudarte!</p>
        </div>
        
        <div className="contact-content">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre Completo</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Tu nombre"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Tu teléfono"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                placeholder="Contanos tu consulta..."
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn">
              Enviar Mensaje
            </button>
          </form>

          <div className="contact-info">
            <h3>Información de Contacto</h3>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon">📍</div>
                <h4>Dirección</h4>
                <p>Av. Musical 1234<br/>Buenos Aires, Argentina</p>
              </div>
              <div className="info-item">
                <div className="info-icon">📞</div>
                <h4>Teléfono</h4>
                <p>+54 11 1234-5678</p>
              </div>
              <div className="info-item">
                <div className="info-icon">📧</div>
                <h4>Email</h4>
                <p>info@purplecat.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contact
