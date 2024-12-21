import React from 'react';

interface MaterialFormProps {
    material: any;
    onSubmit: (e: React.FormEvent) => void;
}

const MaterialForm: React.FC<MaterialFormProps> = ({ material, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    defaultValue={material?.title || ''}
                    required
                />
            </div>
            <div>
                <label>Description</label>
                <textarea name="description" defaultValue={material?.description || ''}></textarea>
            </div>
            <div>
                <label>Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    defaultValue={material?.quantity || ''}
                />
            </div>
            {/* Add other fields as needed */}
            <button type="submit">Save</button>
        </form>
    );
};

export default MaterialForm;
