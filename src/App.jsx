import React, { useState } from 'react'

import Foot from './components/Foot'
const App = () => {
  
    const [formData, setFormData] = useState({ name: '', email: '', age: '', gender:'', eating_style:'', food: '', bio: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch('/api/send-email', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData),
          });
          if (response.ok) {
              alert('Message sent successfully!');
              setFormData({name: '', email: '', age: '', gender:'', eating_style:'', food: '', bio: ''  });
          } else {
              alert('Failed to send message.');
          }
      } catch (error) {
          console.error('Error:', error);
          alert('An error occurred.');
      }
  };

  return (
    <div>
       <div className="bg-cover bg-no-repeat bg-center" style={{ backgroundImage: 'url("https://images.pexels.com/photos/1766838/pexels-photo-1766838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")' }}>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-slate-300 p-4 rounded-lg shadow-lg max-w-xl w-full">
          <h1 className="text-3xl text-center text-cyan-400 shadow-md mt-4">Survey Form</h1>
          <p className="text-center text-gray-600 font-bold mb-4 shadow-md">(This is a basic Survey Form)</p>
          <form onSubmit={handleSubmit} id="survey-form" className="space-y-4">
            <label htmlFor="name" className="block">
              <p className="text-center mb-2">Enter Your Name</p>
              <input
               value={formData.name} onChange={handleChange} 
               name='name'
                id="name"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Write Name Here"
                type="text"
                required
              />
            </label>

            <label htmlFor="email" className="block">
              <p className="text-center mb-2">Enter Your Email</p>
              <input
              name="email" value={formData.email} onChange={handleChange}
                id="email"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Write Email Here"
                type="email"
                required
              />
            </label>

            <label htmlFor="number" className="block">
              <p className="text-center mb-2">Enter Your Age</p>
              <input
              value={formData.age} onChange={handleChange} 
               name='age'
                id="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Write Age Here"
                type="number"
                required
                min="13"
                max="120"
              />
            </label>

            <label htmlFor="dropdown" className="block">
              <p className="text-center mb-2">Select Gender</p>
              <select id="dropdown" 
              value={formData.gender} onChange={handleChange} 
               name='gender'
              className="w-full p-2 border border-gray-300 rounded-md" required>
                <option value="">Select Gender</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
              </select>
            </label>

            <fieldset className="space-y-2">
              <p className="text-center mb-2">What is your eating style?</p>
              <label className="block">
                <input
                 onChange={handleChange} 
               name='eating_style'
                type="radio" value={formData.name}  className="mr-2" required /> Vegetarian
              </label>
              <label className="block">
                <input type="radio"
                value={formData.name} onChange={handleChange} 
               
                 name="eating_style" className="mr-2" /> Non-Vegetarian
              </label>
            </fieldset>

            <fieldset className="space-y-2">
              <p className="text-center mb-2">Which Food?</p>
              <label className="block">
                <input 
                value={formData.name} onChange={handleChange} 
               name='burger'
                type="checkbox"  className="mr-2" /> Burger
              </label>
              <label className="block">
                <input type="checkbox"
                value={formData.name} onChange={handleChange} 
               name='pizza'
                 className="mr-2" /> Pizza
              </label>
            </fieldset>

            <label htmlFor="bio" className="block">
              <p className="text-center mb-2">Write Something About Yourself....</p>
              <textarea
               value={formData.bio} onChange={handleChange}
                id="bio"
                name="bio"
                rows="10"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="I like coding on the beach..."
              ></textarea>
            </label>

            <input
              id="submit"
              type="submit"
              value="Submit"
              className="w-full p-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 cursor-pointer"
            />
          </form>
        </div>
      </div>
    </div>
  <Foot />
    </div>
  )
}

export default App
