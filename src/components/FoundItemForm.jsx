import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

function FoundItemForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    secretQuestion: '',
    secretAnswer: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'lostItems'), {
        ...formData,
        type: 'found',
        secretAnswer: formData.secretAnswer.toLowerCase(),
        createdAt: Timestamp.now()
      });

      alert('Found item posted!');
      setFormData({ title: '', description: '', location: '', imageUrl: '', secretQuestion: '', secretAnswer: '' });
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 space-y-4 mb-10">
      <input className="input" type="text" name="title" placeholder="Item Title" onChange={handleChange} value={formData.title} required />
      <textarea className="input" name="description" placeholder="Description" onChange={handleChange} value={formData.description} required />
      <input className="input" type="text" name="location" placeholder="Where was it found?" onChange={handleChange} value={formData.location} required />
      <input className="input" type="text" name="imageUrl" placeholder="Image URL (optional)" onChange={handleChange} value={formData.imageUrl} />
      <input className="input" type="text" name="secretQuestion" placeholder="Secret Question" onChange={handleChange} value={formData.secretQuestion} required />
      <input className="input" type="text" name="secretAnswer" placeholder="Answer" onChange={handleChange} value={formData.secretAnswer} required />
      <button className="bg-red-600 text-white px-4 py-2 rounded" type="submit">Submit Found Item</button>
    </form>
  );
}

export default FoundItemForm;
