import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

function LostItemForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    secretQuestion: '',
    secretAnswer: '',
    imageUrl: '',  // Now using a URL instead of file
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      await addDoc(collection(db, 'lostItems'), {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        secretQuestion: formData.secretQuestion,
        secretAnswer: formData.secretAnswer.toLowerCase(),
        imageUrl: formData.imageUrl,
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
        imageUrl: '',
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
        type="text"
        name="imageUrl"
        placeholder="Image URL (optional)"
        value={formData.imageUrl}
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
