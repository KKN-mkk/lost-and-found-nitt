import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

function FoundItemFeed() {
  const [items, setItems] = useState([]);

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

  return (
  <div className="space-y-4">
    {items.map(item => (
      <div key={item.id} className="bg-gray-100 p-4 rounded shadow">
        <h3 className="font-bold text-lg">{item.title}</h3>
        <p>{item.description}</p>
        <p className="text-sm text-gray-600">📍 {item.location}</p>
        {item.imageUrl && (
          <a
            href={item.imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View Image
          </a>
        )}
        <p className="text-sm text-gray-500 italic">🔐 Q: {item.secretQuestion}</p>
      </div>
    ))}
  </div>
);

}

export default FoundItemFeed;
