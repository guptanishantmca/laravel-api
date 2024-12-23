import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { router } from '@inertiajs/react';
const MaterialForm: React.FC = () => { 

    const [type, setType] = useState('Offer');
    const [country_id, setCountry] = useState(1);
    const [formData, setFormData] = useState({
        country_id: 1,
        title: '',
        category_id: '',
        cost_per_unit: '',
        unit: '',
        quantity: '',
        delivery_type: '',
        expiry_date: '',
        description: '',
        state_id: '',
        city: '',
        warranty: '',
        main_image: null,
        product_images: [],
    });
    
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [successMessage, setSuccessMessage] = useState('');
 
    const [states, setStates] = useState([]);
    const [categories, setCategories] = useState([]);
    
    // useEffect(() => {
    //     if (formData.country_id) {
    //         axios.get(`/states/${formData.country_id}`).then((response) => {
    //             setStates(response.data);
    //         });
    //     }
    // }, [formData.country_id]);
    useEffect(() => {
        if (formData.country_id) {
            axios.get(`/states/${formData.country_id}`).then((response) => {
                const states = response.data.map((state: any) => ({
                    id: state.id,
                    name: state.translation ? state.translation.name : 'Unknown',
                }));
                setStates(states);
            });
        }
    }, [formData.country_id]);

    useEffect(() => {
        
            axios.get(`/categories`).then((response) => {
                const categories = response.data.map((category: any) => ({
                    id: category.id,
                    name: category.translation ? category.translation.name : 'Unknown',
                }));
                setCategories(categories);
            });
        
    }, [formData.category_id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target);
console.log(formData);
 
        // Prepare data for submission
        //const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value instanceof FileList) {
                // If it's a file list, append all files
                Array.from(value).forEach((file) => formData.append(key, file));
            } else {
                formData.append(key, value as string);
            }
        });

        try {
            // Submit the form data
            const response = await axios.post('/marketplace/materials/store', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setSuccessMessage(response.data.message);
            setErrors({}); // Clear errors
            // Use Inertia to navigate to the listing page
        router.visit('/marketplace/materials');
        } catch (error: any) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors); // Set validation errors
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            {/* Tabs for Offer and Request */}
            <div className="flex mb-4 border-b">
                <button
                    className={`flex-1 p-2 text-center ${type === 'Offer' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
                    onClick={() => setType('Offer')}
                >
                    Offer
                </button>
                <button
                    className={`flex-1 p-2 text-center ${type === 'Request' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
                    onClick={() => setType('Request')}
                >
                    Request
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    {/* Left Side */}
                    <input type='hidden' name='type' value={type} />
                    <input type='hidden' name='country_id' value={country_id} />
                    <div>
                        <label className="block mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />

                        <label className="block mt-4 mb-2">Category</label>
                         
                        <select
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
            >
                <option value="">Select a category</option>
                {categories.map((category: any) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select> 
                        <label className="block mt-4 mb-2">Cost/Unit</label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                name="cost_per_unit"
                                value={formData.cost_per_unit}
                                onChange={handleInputChange}
                                className="w-2/3 p-2 border rounded"
                            />
                            <select
                                name="unit"
                                value={formData.unit}
                                onChange={handleInputChange}
                                className="w-1/3 p-2 border rounded"
                            >
                                <option value="">Select</option>
                                <option value="Kg">Kg</option>
                                <option value="Pcs">Pcs</option>
                                <option value="M²">M²</option>
                                <option value="Liter">Liter</option>
                                <option value="Per package">Per package</option>
                                <option value="Total cost">Total cost</option>
                            </select>
                        </div>

                        <label className="block mt-4 mb-2">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    {/* Right Side */}
                    <div>
                        <label className="block mb-2">State</label>
                        <select
                name="state_id"
                value={formData.state_id}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
            >
                <option value="">Select a state</option>
                {states.map((state: any) => (
                    <option key={state.id} value={state.id}>
                        {state.name}
                    </option>
                ))}
            </select> 

                        <label className="block mt-4 mb-2">City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />

                        <label className="block mt-4 mb-2">Warranty (Optional)</label>
                        <input
                            type="number"
                            name="warranty"
                            value={formData.warranty}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />

                        <label className="block mt-4 mb-2">Main Image</label>
                        <input
                            type="file"
                            name="main_image"
                            onChange={handleFileChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>

                {/* Additional Fields */}
                <label className="block mt-4 mb-2">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                />

                <label className="block mt-4 mb-2">Product Images</label>
                <input
                    type="file"
                    name="product_images"
                    multiple
                    onChange={handleFileChange}
                    className="w-full p-2 border rounded"
                />

                {/* Submit Button */}
                <div className="mt-6 flex space-x-4">
                    <button
                        type="submit"
                        className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-100"
                    >
                        Preview Offer
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-100"
                    >
                        Invite by Email
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MaterialForm;
