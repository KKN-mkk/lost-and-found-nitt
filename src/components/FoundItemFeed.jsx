import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';

const FOUND_PINK = "#ED4B86";
const FOUND_PINK_LIGHT = "#fce7ef";
const FOUND_PINK_DARK = "#c72c5d";

function FoundItemFeed() {
  const [items, setItems] = useState([]);
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});

  useEffect(() => {
    const q = query(collection(db, 'lostItems'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const filtered = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(item => item.type === 'found');
      setItems(filtered);
    });
    return () => unsubscribe();
  }, []);

  const handleInputChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleCheckAnswer = async (item) => {
    const userAnswer = (answers[item.id] || '').trim().toLowerCase();
    const correctAnswer = (item.secretAnswer || '').trim().toLowerCase();
    if (userAnswer && userAnswer === correctAnswer) {
      try {
        await updateDoc(doc(db, 'lostItems', item.id), { claimed: true });
        setRevealed(prev => ({ ...prev, [item.id]: true }));
      } catch (err) {
        alert('Error marking as claimed. Please try again.');
      }
    } else {
      alert("Incorrect answer. Try again!");
    }
  };

  return (
    <div className="w-screen max-w-none relative left-1/2 right-1/2 -mx-[50vw] px-0" style={{ position: 'relative', right: '50%', left: '50%', width: '100vw' }}>
      <div className="w-full px-4 md:px-12 lg:px-24 mb-4 mt-8">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-pink-600 tracking-tight font-display">
          Found Items
        </h2>
      </div>
      <AnimatePresence>
        {items.length === 0 && (
          <motion.div
            className="text-center text-gray-400 text-lg font-medium py-12 font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            No found items yet.
          </motion.div>
        )}
      </AnimatePresence>
      {items.length > 0 && (
        <div className="flex space-x-6 overflow-x-auto scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-transparent px-4 md:px-12 lg:px-24 pb-6">
          {items.map(item => (
            <motion.div
              key={item.id}
              className="min-w-[320px] max-w-xs flex-shrink-0 relative bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 rounded-2xl shadow-xl p-6 flex flex-col gap-2 hover:scale-[1.03] hover:shadow-2xl transition-all duration-200 font-sans"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              layout
            >
              <div
                className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold shadow-sm"
                style={{
                  background: FOUND_PINK_LIGHT,
                  color: FOUND_PINK_DARK,
                  border: `1px solid ${FOUND_PINK}`,
                }}
              >
                {item.claimed ? "CLAIMED" : "FOUND"}
              </div>
              {item.imageUrl && (
                <a
                  href={item.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mb-2 rounded-lg overflow-hidden shadow"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="object-cover w-full h-36"
                  />
                </a>
              )}
              <div className="mb-1">
                <h3 className="text-lg font-bold text-pink-600 tracking-tight leading-snug mb-1 font-display">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-sm leading-snug font-medium">
                  {item.description && <span>{item.description}<br /></span>}
                  {item.time && <span className="text-xs text-gray-500">Found at {item.time}. </span>}
                  {item.location && <span className="text-xs text-gray-500">Location: {item.location}.</span>}
                </p>
              </div>
              <div className="mt-1">
                <div className="text-pink-500 font-semibold text-sm mb-1">
                  Security question: <span className="italic font-normal text-gray-600">{item.secretQuestion}</span>
                </div>
                {item.claimed ? (
                  revealed[item.id] ? (
                    <div className="font-semibold text-sm text-pink-700">
                      Contact: {item.contact || <span className="italic text-gray-400">No contact provided</span>}
                    </div>
                  ) : (
                    <div className="text-green-700 font-semibold text-sm">This item has been claimed.</div>
                  )
                ) : (
                  <div className="flex flex-col gap-2 mt-1">
                    <input
                      type="text"
                      className="px-3 py-2 rounded border border-pink-300 focus:ring-2 focus:ring-pink-200 outline-none text-sm"
                      placeholder="Enter answer to see contact"
                      value={answers[item.id] || ''}
                      onChange={e => handleInputChange(item.id, e.target.value)}
                      onKeyDown={e => {
                        if (e.key === "Enter") handleCheckAnswer(item);
                      }}
                    />
                    <button
                      className="bg-gradient-to-r from-pink-500 to-pink-400 text-white font-semibold rounded px-4 py-2 text-sm hover:from-pink-600 hover:to-pink-500 transition"
                      onClick={() => handleCheckAnswer(item)}
                      type="button"
                    >
                      Reveal Contact
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FoundItemFeed;
