import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { uploadProfilePicture } from '../services/profileService';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/authSlice';
import { auth } from '../firebaseConfig';

const UploadProfilePicture = ({ onUploaded }) => {
  const { currentUser } = useAuth() || {};
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  if (!currentUser) return <p>Please log in to upload a profile picture.</p>;

  const compressImageInline = (file, maxWidth = 1024, quality = 0.8) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          try {
            const ratio = Math.min(1, maxWidth / img.width);
            const canvas = document.createElement('canvas');
            canvas.width = Math.round(img.width * ratio);
            canvas.height = Math.round(img.height * ratio);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(
              (blob) => (blob ? resolve(blob) : reject(new Error('No blob'))),
              file.type === 'image/png' ? 'image/png' : 'image/jpeg',
              quality
            );
          } catch (err) {
            reject(err);
          }
        };
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });

  const runUpload = async (fileToUpload) => {
    setPreview(URL.createObjectURL(fileToUpload));
    const url = await uploadProfilePicture(currentUser.uid, fileToUpload);
    setUploading(false);
    try {
      dispatch(setUser(auth.currentUser));
    } catch (err) {
      console.warn('Failed to dispatch updated user', err);
    }
    if (onUploaded) onUploaded(url);
  };

  const handleFile = (file) => {
    if (!file) return;
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) return setError('Only JPG and PNG images are allowed');

    setError(null);
    setUploading(true);

    compressImageInline(file)
      .then(async (blob) => {
        try {
          const fileToUpload = blob instanceof File ? blob : new File([blob], file.name || 'upload.jpg', { type: blob.type || file.type });
          await runUpload(fileToUpload);
        } catch (err) {
          console.error(err);
          setError('Upload failed');
          setUploading(false);
        }
      })
      .catch((err) => {
        console.error('Compression failed', err);
        setError('Compression failed');
        setUploading(false);
      });
  };

  const onChange = (ev) => {
    const file = ev.target.files && ev.target.files[0];
    handleFile(file);
  };

  return (
    <div>
      <label>
        Upload profile picture (JPG/PNG):
        <input type="file" accept="image/png, image/jpeg" onChange={onChange} />
      </label>
      {uploading && <p>Uploading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {preview && (
        <div>
          <p>Preview:</p>
          <img src={preview} alt="preview" style={{ maxWidth: 200, maxHeight: 200 }} />
        </div>
      )}
    </div>
  );
};

export default UploadProfilePicture;
