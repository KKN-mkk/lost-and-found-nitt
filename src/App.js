// App.js
import React from 'react';
import LostItemForm from './components/LostItemForm';
import LostItemFeed from './components/LostItemFeed';

export default function App() {
  return (
    <div className="min-h-screen bg-[#014038] text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <span className="text-orange-400 text-3xl">🔍</span>
          <span>FindNITT</span>
        </div>
        <ul className="flex gap-6 text-white text-sm">
          <li className="hover:text-orange-400 cursor-pointer">Home</li>
          <li className="hover:text-orange-400 cursor-pointer">Contact</li>
          <li className="hover:text-orange-400 cursor-pointer">Help Centre</li>
          <li className="hover:text-orange-400 cursor-pointer">Pickup Guidelines</li>
        </ul>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search lost items"
            className="rounded-lg px-3 py-1 text-black text-sm border border-orange-300 focus:outline-none"
          />
          <button className="bg-orange-500 text-white px-4 py-1 rounded-md text-sm hover:bg-orange-600">Login</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-20 px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Lost Something On Campus? <br /> Let's Help You Find It
        </h1>
        <p className="mt-4 text-gray-300 text-sm md:text-base">
          Tired of Searching?</p>
        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <a href="#form">
            <button className="bg-white text-black px-5 py-2 rounded-md hover:bg-gray-200">Report an Item</button>
          </a>
          <a href="#feed">
            <button className="bg-orange-500 text-white px-5 py-2 rounded-md hover:bg-orange-600">Browse Lost Items</button>
          </a>
        </div>
      </header>

      {/* Lost Item Section */}
      <main className="bg-white text-black px-4 py-12" id="form">
        <div className="max-w-4xl mx-auto">
          <LostItemForm />
          <div id="feed">
            <LostItemFeed />
          </div>
        </div>
      </main>
    </div>
  );
}
