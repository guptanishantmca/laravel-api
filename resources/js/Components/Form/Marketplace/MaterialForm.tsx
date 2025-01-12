import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import useLoadNamespaces from '../../../hooks/useLoadNamespaces';
import FileManagerPopup from '@/Pages/MyBusiness/FileManager/FileManagerPopup';
interface MaterialFormProps {
    material: any; // Define a specific type if possible
    onSubmit: (e: React.FormEvent) => void;
    submitUrl: string;
    submitMethod: string;
    isEdit: boolean;
}

const MaterialForm: React.FC<MaterialFormProps> = ({ material, onSubmit, submitUrl, submitMethod ,isEdit}) => {
    const { t } = useTranslation('material'); // Use the 'dashboard' namespace
    useLoadNamespaces(['material']);
    const [type, setType] = useState('Offer');
    const [country_id, setCountry] = useState(1);
    // const [formData, setFormData] = useState({
    //     country_id: 1,
    //     title: '',
    //     category_id: '',
    //     cost_per_unit: '',
    //     unit: '',
    //     quantity: '',
    //     delivery_type: '',
    //     expiry_date: '',
    //     description: '',
    //     state_id: '',
    //     city: '',
    //     warranty: '',
    //     main_image: null,
    //     product_images: [],
    // });
    const [formData, setFormData] = useState(() => ({
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
        ...material,
    }));
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [successMessage, setSuccessMessage] = useState('');
    const [showFileManager, setShowFileManager] = useState(false); // State for showing the file manager

    const [states, setStates] = useState([]);
    const [categories, setCategories] = useState([]);
    
    // Update formData when material changes
    useEffect(() => {
        setFormData({
            ...material,
        });
    }, [material]);

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

    // Handle File Selection from File Manager
    const handleFileSelect = (filePath: string) => {
        setFormData({ ...formData, main_image: filePath });
        setShowFileManager(false);
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            setFormData({ ...formData, [name]: files });
        }
    };
    


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const formElement = e.target as HTMLFormElement;
        const data = new FormData(formElement);
    
        // Add `_method` to mimic PUT request if editing
        if (isEdit) {
            data.append('_method', 'PUT');
        }
    
        try {
            const response = await axios.post(submitUrl, data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
    
            setSuccessMessage(response.data.message);
            setErrors({}); // Clear errors
            router.visit('/marketplace/materials'); // Redirect
        } catch (error: any) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
        }
    };
    
    

    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-8xl mx-auto">
            {/* Type Selection */}
            <div className="flex mb-6">
                <button
                    className={`flex-1 p-3 text-center ${type === 'Offer' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                    onClick={() => setType('Offer')}
                >
                    {t('Offer')}
                </button>
                <button
                    className={`flex-1 p-3 text-center ${type === 'Request' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                    onClick={() => setType('Request')}
                >
                    {t('Request')}
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    {/* Left Side */}
                    <input type='hidden' name='type' value={type} />
                    <input type='hidden' name='country_id' value={country_id} />
                    <div>
                        <label className="block mb-2">{t('form.title')} </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />

                        <label className="block mt-4 mb-2">{t('form.Category')}</label>
                         
                        <select
                name="category_id"
                value={formData.category_id || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
            >
                <option value="">{t('form.Select a category')}</option>
                {categories.map((category: any) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select> 
                        <label className="block mt-4 mb-2">{t('form.Cost/Unit')}</label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                name="cost_per_unit"
                                value={formData.cost_per_unit || ''}
                                onChange={handleInputChange}
                                className="w-2/3 p-2 border rounded"
                            />
                            <select
                                name="unit"
                                value={formData.unit || ''}
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

                        <label className="block mt-4 mb-2">{t('form.Quantity')}</label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    {/* Right Side */}
                    <div>
                        <label className="block mb-2">{t('form.State')}</label>
                        <select
                name="state_id"
                value={formData.state_id || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
            >
                <option value="">{t('form.Select a state')}</option>
                {states.map((state: any) => (
                    <option key={state.id} value={state.id}>
                        {state.name}
                    </option>
                ))}
            </select> 

                        <label className="block mt-4 mb-2">{t('form.City')}</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />

                        <label className="block mt-4 mb-2">{t('form.Warranty')}</label>
                        <input
                            type="number"
                            name="warranty"
                            value={formData.warranty || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />

                        <label className="block mt-4 mb-2">{t('form.Image')} </label>
                        <input
                            type="file"
                            name="featured_image"
                            onChange={handleFileChange}
                            className="w-full p-2 border rounded"
                        />
                        <button
                            type="button"
                            onClick={() => setShowFileManager(true)}
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            {t('Select from File Manager')}
                        </button>
                    </div>
                </div>

                {/* Additional Fields */}
                <label className="block mt-4 mb-2">{t('form.Description')}</label>
                <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                />

                <label className="block mt-4 mb-2">{t('form.Product Images')}</label>
                <input
                    type="file"
                    name="slider_images[]"
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
                        {t('form.Submit')}
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-100"
                    >
                        {t('form.Preview Offer')}
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-100"
                    >
                        {t('form.Preview Offer')}
                    </button>
                </div>
            </form>
            {/* File Manager Popup */}
            {showFileManager && (
                <FileManagerPopup
                    onClose={() => setShowFileManager(false)}
                    onFileSelect={handleFileSelect}
                />
            )}
        </div>
    );
};

export default MaterialForm;
