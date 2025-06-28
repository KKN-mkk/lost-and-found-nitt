import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

function ClaimForm({ item }) {
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (answer.toLowerCase() === item.secretAnswer.toLowerCase()) {
      setMessage("✅ Correct! Marking as claimed...");

      // update Firestore
      const itemRef = doc(db, 'lostItems', item.id);
      await updateDoc(itemRef, {
        claimed: true
      });

      setMessage("✅ Claimed! The owner will be notified.");
    } else {
      setMessage("❌ Incorrect answer. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-2">
      <input
        type="text"
        className="input"
        placeholder="Answer the secret question"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
      >
        Claim
      </button>
      {message && <p className="text-sm text-gray-700 italic">{message}</p>}
    </form>
  );
}

export default ClaimForm;

