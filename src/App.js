import React from 'react';
import LostItemForm from './components/LostItemForm';
import LostItemFeed from './components/LostItemFeed';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-blue-100 p-6 text-gray-800 font-inter">
      <div className="max-w-4xl mx-auto">
        {/* NIT Trichy Logo */}
        <img
          src="https://upload.wikimedia.org/wikipedia/en/3/35/National_Institute_of_Technology%2C_Tiruchirappalli_Logo.png"
          alt="NIT Trichy Logo"
          className="h-24 mx-auto mb-4"
        />

        {/* Title */}
        <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-6">
          Lost & Found Hub – NIT Trichy
        </h1>

        {/* Hero Campus Image */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/65/NIT_Trichy_Aerial_View.jpg"
          alt="NITT Campus"
          className="rounded-xl w-full shadow-xl mb-8"
        />

        {/* Lost Item Form */}
        <LostItemForm />

        {/* Lost Item Feed */}
        <LostItemFeed />
      </div>
    </div>
  );
}

export default App;
