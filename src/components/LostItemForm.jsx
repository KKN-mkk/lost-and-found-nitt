import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';

const INDIGO = "#4F46E5";
const VIOLET = "#8B5CF6";
const BORDER = "#E5E7EB";

function LostItemForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    time: '',
    contact: ''
  });

  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  useEffect(() => {
    const onStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  if (!user) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'lostItems'), {
        ...formData,
        type: 'lost',
        createdAt: Timestamp.now()
      });
      alert('Lost item posted!');
      setFormData({ title: '', description: '', location: '', imageUrl: '', time: '', contact: '' });
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
        background: `linear-gradient(135deg, ${INDIGO}11 0%, ${VIOLET}22 100%)`,
        borderColor: BORDER,
        backgroundBlendMode: "lighten"
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.4, delay: 0.05, type: "spring", stiffness: 120 }}
    >
      <h2 className="text-2xl font-bold text-center mb-2" style={{ color: INDIGO }}>
        Report Lost Item
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Please fill out the details below. We'll help you get reunited!
      </p>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="title">
            Item Title
          </label>
          <input
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition duration-150 outline-none bg-white"
            type="text"
            name="title"
            id="title"
            placeholder="e.g. Black Wallet"
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
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition duration-150 outline-none bg-white resize-none"
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
          <label className="block text-sm font-semibold mb-1" htmlFor="location">
            Where was it lost?
          </label>
          <input
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition duration-150 outline-none bg-white"
            type="text"
            name="location"
            id="location"
            placeholder="e.g. CCD, Library, Coke station"
            onChange={handleChange}
            value={formData.location}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="time">
            When was it lost?
          </label>
          <input
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition duration-150 outline-none bg-white"
            type="text"
            name="time"
            id="time"
            placeholder="e.g. Evening 6 PM"
            onChange={handleChange}
            value={formData.time}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="imageUrl">
            Image URL <span className="text-gray-400">(optional)</span>
          </label>
          <input
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 transition duration-150 outline-none bg-white"
            type="text"
            name="imageUrl"
            id="imageUrl"
            placeholder="Paste a link to an image"
            onChange={handleChange}
            value={formData.imageUrl}
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
        className="w-full mt-8 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        Submit Lost Item
      </motion.button>
    </motion.form>
  );
}

export default LostItemForm;
