import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';

const FOUND_PINK = "#ED4B86";
const VIOLET = "#8B5CF6";
const BORDER = "#E5E7EB";

function FoundItemForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    secretQuestion: '',
    secretAnswer: '',
    time: '',
    contact: ''
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
      setFormData({
        title: '',
        description: '',
        location: '',
        imageUrl: '',
        secretQuestion: '',
        secretAnswer: '',
        time: '',
        contact: ''
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-10 rounded-3xl shadow-lg border"
      style={{
        background: `linear-gradient(135deg, ${FOUND_PINK}11 0%, ${VIOLET}22 100%)`,
        borderColor: BORDER,
        backgroundBlendMode: "lighten"
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.4, delay: 0.05, type: "spring", stiffness: 120 }}
    >
      <h2 className="text-2xl font-bold text-center mb-2 tracking-tight" style={{ color: FOUND_PINK }}>
        Report Found Item
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Found something? Help return it to its owner by filling out the details below.
      </p>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="title">
            Item Title
          </label>
          <input
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-pink-100 focus:border-pink-300 transition duration-150 outline-none bg-white"
            type="text"
            name="title"
            id="title"
            placeholder="e.g. Silver Bracelet"
            onChange={handleChange}
            value={formData.title}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-pink-100 focus:border-pink-300 transition duration-150 outline-none bg-white resize-none"
            name="description"
            id="description"
            placeholder="Describe the item, any unique features..."
            onChange={handleChange}
            value={formData.description}
            rows={3}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="time">
            When was it found?
          </label>
          <input
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-pink-100 focus:border-pink-300 transition duration-150 outline-none bg-white"
            type="text"
            name="time"
            id="time"
            placeholder="e.g.30th June Morning 10 AM"
            onChange={handleChange}
            value={formData.time}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="location">
            Where was it found?
          </label>
          <input
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-pink-100 focus:border-pink-300 transition duration-150 outline-none bg-white"
            type="text"
            name="location"
            id="location"
            placeholder="e.g. Orion, 2k"
            onChange={handleChange}
            value={formData.location}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="imageUrl">
            Image URL <span className="text-gray-400">(optional)</span>
          </label>
          <input
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-pink-50 focus:border-pink-200 transition duration-150 outline-none bg-white"
            type="text"
            name="imageUrl"
            id="imageUrl"
            placeholder="Paste a link to an image"
            onChange={handleChange}
            value={formData.imageUrl}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="secretQuestion">
            Security Question
          </label>
          <input
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-pink-50 focus:border-pink-200 transition duration-150 outline-none bg-white"
            type="text"
            name="secretQuestion"
            id="secretQuestion"
            placeholder="e.g. What is engraved on the back?"
            onChange={handleChange}
            value={formData.secretQuestion}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="secretAnswer">
            Answer <span className="text-gray-400">(case-insensitive)</span>
          </label>
          <input
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-pink-50 focus:border-pink-200 transition duration-150 outline-none bg-white"
            type="text"
            name="secretAnswer"
            id="secretAnswer"
            placeholder="e.g. Daisy"
            onChange={handleChange}
            value={formData.secretAnswer}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="contact">
            Contact details
          </label>
          <input
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-pink-50 focus:border-pink-200 transition duration-150 outline-none bg-white"
            type="text"
            name="contact"
            id="contact"
            placeholder="e.g. Name, Room no. & Hostel, Mobile number(optional)"
            onChange={handleChange}
            value={formData.contact}
            required
          />
        </div>
      </div>
      <motion.button
        className="w-full mt-8 bg-pink-500 hover:from-pink-600 hover:to-violet-600 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        Submit Found Item
      </motion.button>
    </motion.form>
  );
}

export default FoundItemForm;
