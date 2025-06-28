import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

function LostItemFeed() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'lostItems'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const itemData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(itemData);
    });

    return () => unsubscribe();
  }, []);

 return (
  <div className="mt-8">
    <h2 className="text-2xl font-semibold text-blue-600 mb-4">📋 Reported Items</h2>
    {items.length === 0 ? (
      <p className="text-gray-600">No items reported yet.</p>
    ) : (
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow p-4 space-y-2">
            <h3 className="text-xl font-bold text-gray-700">{item.title}</h3>
            <p className="text-sm text-gray-600">
              <strong>📍 Location:</strong> {item.location}
            </p>
            <p className="text-sm text-gray-600">{item.description}</p>
            {item.imageUrl && (
              <img
                className="rounded-md w-full max-w-xs"
                src={item.imageUrl}
                alt={item.title}
              />
            )}
            <p className="text-xs text-gray-500 italic">
              🔒 Secret Q: {item.secretQuestion}
            </p>
          </div>
        ))}
      </div>
    )}
  </div>
);

}

export default LostItemFeed;
