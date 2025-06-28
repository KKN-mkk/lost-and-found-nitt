import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import imageCompression from 'browser-image-compression';

function LostItemForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    secretQuestion: '',
    secretAnswer: '',
    image: null,
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = '';

      if (formData.image) {
        console.log("🟡 Compressing image...");
        const compressedFile = await imageCompression(formData.image, {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        });

        console.log("🟢 Compressed size:", compressedFile.size, "bytes");

        const imageRef = ref(storage, `lostItems/${Date.now()}_${formData.image.name}`);
        console.log("📤 Uploading to Firebase Storage...");
        const snapshot = await uploadBytes(imageRef, compressedFile);
        console.log("✅ Upload complete");

        imageUrl = await getDownloadURL(snapshot.ref);
        console.log("🔗 Got image URL:", imageUrl);
      } else {
        console.log("📁 No image selected, skipping upload.");
      }

      await addDoc(collection(db, 'lostItems'), {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        secretQuestion: formData.secretQuestion,
        secretAnswer: formData.secretAnswer.toLowerCase(),
        imageUrl,
        claimed: false,
        createdAt: Timestamp.now()
      });

      alert("✅ Item posted successfully!");
      setFormData({
        title: '',
        description: '',
        location: '',
        secretQuestion: '',
        secretAnswer: '',
        image: null
      });
    } catch (error) {
      console.error("❌ Upload error:", error);
      alert("Upload failed: " + error.message);
    }

    setUploading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 space-y-4 mb-10">
      <h2 className="text-2xl font-semibold text-blue-600">📨 Report Lost/Found Item</h2>

      <input
        className="input"
        type="text"
        name="title"
        placeholder="Item Title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <textarea
        className="input"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <input
        className="input"
        type="text"
        name="location"
        placeholder="Where was it lost/found?"
        value={formData.location}
        onChange={handleChange}
        required
      />

      <input
        className="input"
        type="text"
        name="secretQuestion"
        placeholder="Secret Question (for claiming)"
        value={formData.secretQuestion}
        onChange={handleChange}
        required
      />

      <input
        className="input"
        type="text"
        name="secretAnswer"
        placeholder="Answer to the question"
        value={formData.secretAnswer}
        onChange={handleChange}
        required
      />

      <input
        className="input"
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
      />

      <button
        type="submit"
        disabled={uploading}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {uploading ? 'Posting...' : 'Submit Item'}
      </button>
    </form>
  );
}

export default LostItemForm;
