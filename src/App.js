import React from 'react';
import LostItemForm from './components/LostItemForm';
import LostItemFeed from './components/LostItemFeed';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-white p-6 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl bg-gradient-to-r from-pink-400 to-yellow-400 text-white p-4 rounded-xl shadow-xl text-center">
  LOST AND FOUND
</h1>


        <LostItemForm />
        <LostItemFeed />
      </div>
    </div>
  );
}

export default App;
