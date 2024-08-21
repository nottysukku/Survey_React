import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Foot from './components/Foot';

const App = () => {
    const [formData, setFormData] = useState({ 
        from_name: '', 
        from_message: '', 
        from_age: '', 
        from_gender: '', 
        from_eating_style: '', 
        from_food: [], 
        from_food2: '' 
    });

    const form = useRef();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => {
                const updatedFood = checked 
                    ? [...prev.from_food, value] 
                    : prev.from_food.filter(item => item !== value);
                return { ...prev, from_food: updatedFood };
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_sukku10', 'template_1fhvqpn', form.current, '1NxF60wUG2YY1U3OU')
            .then(
                () => {
                    alert('Message sent successfully!');
                    setFormData({ from_name: '', from_email: '', from_age: '', from_gender: '', from_eating_style: '', from_food: [] });
                },
                (error) => {
                    console.error('Failed to send email:', error.text);
                    alert('Failed to send message.');
                },
            );
    };

    return (
        <div>
            <div className="bg-cover bg-no-repeat bg-center" style={{ backgroundImage: 'url("https://images.pexels.com/photos/1766838/pexels-photo-1766838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")' }}>
                <div className="flex justify-center items-center min-h-screen">
                    <div className="bg-slate-300 p-4 rounded-lg shadow-lg max-w-xl w-full">
                        <h1 className="text-3xl text-center text-cyan-400 shadow-md mt-4">Survey Form</h1>
                        <p className="text-center text-gray-600 font-bold mb-4 shadow-md">(This is a basic Survey Form)</p>
                        <form ref={form} onSubmit={handleSubmit} id="survey-form" className="space-y-4">
                            <label htmlFor="from_name" className="block">
                                <p className="text-center mb-2">Enter Your Name</p>
                                <input
                                    value={formData.from_name} 
                                    onChange={handleChange} 
                                    name='from_name' 
                                    id="from_name"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Write Name Here"
                                    type="text"
                                    required
                                />
                            </label>

                            <label htmlFor="from_email" className="block">
                                <p className="text-center mb-2">Enter Your Email</p>
                                <input
                                    name="from_email" 
                                    value={formData.from_email} 
                                    onChange={handleChange}
                                    id="from_email"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Write Email Here"
                                    type="email"
                                    required
                                />
                            </label>

                            <label htmlFor="from_age" className="block">
                                <p className="text-center mb-2">Enter Your Age</p>
                                <input
                                    value={formData.from_age} 
                                    onChange={handleChange} 
                                    name='from_age'
                                    id="from_age"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Write Age Here"
                                    type="number"
                                    required
                                    min="13"
                                    max="120"
                                />
                            </label>

                            <label htmlFor="from_gender" className="block">
                                <p className="text-center mb-2">Select Gender</p>
                                <select 
                                    id="from_gender" 
                                    value={formData.from_gender} 
                                    onChange={handleChange} 
                                    name='from_gender'
                                    className="w-full p-2 border border-gray-300 rounded-md" 
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </label>

                            <fieldset className="space-y-2">
                                <p className="text-center mb-2">What is your eating style?</p>
                                <label className="block">
                                    <input
                                        onChange={handleChange} 
                                        name='from_eating_style'
                                        type="radio" 
                                        value="Vegetarian"  
                                        checked={formData.from_eating_style === 'Vegetarian'}
                                        className="mr-2" 
                                        required 
                                    /> Vegetarian
                                </label>
                                <label className="block">
                                    <input 
                                        type="radio"
                                        value="Non-Vegetarian" 
                                        onChange={handleChange} 
                                        name="from_eating_style" 
                                        checked={formData.from_eating_style === 'Non-Vegetarian'}
                                        className="mr-2" 
                                    /> Non-Vegetarian
                                </label>
                            </fieldset>

                            <fieldset className="space-y-2">
                                <p className="text-center mb-2">Which Food?</p>
                                <label className="block">
                                    <input 
                                        value="Burger" 
                                        onChange={handleChange} 
                                        name='from_food' 
                                        type="checkbox"  
                                        checked={formData.from_food.includes('Burger')} 
                                        className="mr-2" 
                                    /> Burger
                                </label>
                                <label className="block">
                                    <input 
                                        value="Pizza" 
                                        onChange={handleChange} 
                                        name='from_food' 
                                        type="checkbox" 
                                        checked={formData.from_food.includes('Pizza')}
                                        className="mr-2" 
                                    /> Pizza
                                </label>
                            </fieldset>

                            <label htmlFor="from_message" className="block">
                                <p className="text-center mb-2">Write Something About Yourself....</p>
                                <textarea
                                    value={formData.from_message} 
                                    onChange={handleChange}
                                    id="from_message"
                                    name="from_message"
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
    );
};

export default App;
