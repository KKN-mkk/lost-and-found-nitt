import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';

const INDIGO = "#4F46E5";
const INDIGO_LIGHT = "#eef2ff";
const INDIGO_DARK = "#3730a3";

function LostItemFeed() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'lostItems'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const filtered = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(item => item.type === 'lost');
      setItems(filtered);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="w-screen max-w-none relative left-1/2 right-1/2 -mx-[50vw] px-0" style={{ position: 'relative', right: '50%', left: '50%', width: '100vw' }}>
      <div className="w-full px-4 md:px-12 lg:px-24 mb-4 mt-8">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-indigo-600 tracking-tight font-display">
          Lost Items
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
            No lost items yet.
          </motion.div>
        )}
      </AnimatePresence>
      {items.length > 0 && (
        <div className="flex space-x-6 overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent px-4 md:px-12 lg:px-24 pb-6">
          {items.map(item => (
            <motion.div
              key={item.id}
              className="min-w-[320px] max-w-xs flex-shrink-0 relative bg-gradient-to-br from-indigo-50 to-violet-100 border border-indigo-200 rounded-2xl shadow-xl p-6 flex flex-col gap-2 hover:scale-[1.03] hover:shadow-2xl transition-all duration-200 font-sans"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              layout
            >
              <div
                className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold shadow-sm"
                style={{
                  background: INDIGO_LIGHT,
                  color: INDIGO_DARK,
                  border: `1px solid ${INDIGO}`,
                }}
              >
                LOST
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
                <h3 className="text-lg font-bold text-indigo-700 tracking-tight leading-snug mb-1 font-display">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-sm leading-snug font-medium">
                  {item.description && <span>{item.description}<br /></span>}
                  {item.time && <span className="text-xs text-gray-500">Lost at {item.time}. </span>}
                  {item.location && <span className="text-xs text-gray-500">Location: {item.location}.</span>}
                </p>
              </div>
              <div className="mt-1 text-xs text-gray-500">
                If found, please contact: <span className="text-indigo-700 font-semibold">{item.contact || <span className="italic text-gray-400">No contact provided</span>}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LostItemFeed;
