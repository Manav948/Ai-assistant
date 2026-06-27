import React, { useState } from 'react'
import api from '../lib/axios.js'
const UploadAvatar = ({ onUpload }) => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState('');
    const [preview, setPreview] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    const handleUpload = async () => {
        if (!image) {
            alert("Please Select an image to upload");
            return;
        }

        const formData = new FormData();
        formData.append('avatar', image);
        try {
            setLoading(true);
            const response = await api.post('api/user/upload-avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setUrl(response.data.imageUrl);
            onUpload(response.data.imageUrl);
        } catch (error) {
            console.log('Error uploading image:', error);
            alert('Error uploading image. Please try again.');
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="bg-[#09090d]/60 p-6 rounded-xl border border-white/[0.08] w-full max-w-md backdrop-blur-sm relative">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/20" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/20" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/20" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/20" />

            <h2 className="text-lg font-semibold mb-4 text-white">Upload Your AI Avatar </h2>

            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border file:border-white/20 file:text-xs file:font-semibold file:bg-white/5 file:text-white hover:file:bg-white/10 cursor-pointer"
            />

            {preview && <img src={preview} alt="Preview" className="h-32 mt-4 rounded-lg border border-white/20 object-cover" />}

            <button
                onClick={handleUpload}
                disabled={loading}
                className="mt-4 w-full bg-white hover:bg-neutral-200 text-neutral-950 font-bold py-2.5 rounded-lg transition active:scale-95 text-sm"
            >
                {loading ? 'Uploading...' : 'Upload'}
            </button>

            {url && (
                <div className="mt-4 font-mono text-xs">
                    <p className="text-white/80">SYSTEM: Upload Successful // Image Loaded</p>
                    <img src={url} alt="Uploaded" className="h-24 mt-2 rounded border border-white/30 object-cover" />
                </div>
            )}
        </div>
    );
}

export default UploadAvatar;
