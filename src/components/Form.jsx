import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSumbit = () => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSumbit} noValidate>
      <div>
        <label>Nombre:</label>
        <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange}
        />
        </div>
        <div>
            <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
            />     
        </div>
        <div>
            <input 
                type="tel" 
                name="phoneNumber" 
                value={formData.phoneNumber} 
                onChange={handleChange}
            />     
         </div>
         <div>
            <input 
                type="text" 
                name="message" 
                value={formData.message} 
                onChange={handleChange}
            />     
         </div>
         
        <button type="sumbit">Enviar</button>
    </form>
  );
};

export default Form;
