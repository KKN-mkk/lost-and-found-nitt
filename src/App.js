
import React, { useState } from 'react';
import LostItemForm from './components/LostItemForm';
import FoundItemForm from './components/FoundItemForm';
import LostItemFeed from './components/LostItemFeed';
import FoundItemFeed from './components/FoundItemFeed';

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="min-h-screen bg-[#014038] text-white">
      <nav className="flex items-center justify-between px-8 py-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <span className="text-orange-400 text-3xl">🔍</span>
          <span>Findr</span>
        </div>
        <ul className="flex gap-6 text-white text-sm">
          <li className="hover:text-orange-400 cursor-pointer">Home</li>
          <li className="hover:text-orange-400 cursor-pointer">Contact</li>
          <li className="hover:text-orange-400 cursor-pointer">Help Centre</li>
          <li className="hover:text-orange-400 cursor-pointer">Pickup Guidelines</li>
        </ul>
      </nav>

      <header className="text-center py-20 px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Lost Something On Campus? <br /> Let's Help You Find It
        </h1>
        <p className="mt-4 text-gray-300 text-sm md:text-base">
          Report or browse lost and found items across campus in one place.
        </p>
      </header>

      <main className="bg-white text-black px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-green-800 mb-4">📍 Report Lost Item</h2>
            <LostItemForm />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-red-800 mb-4">📍 Report Found Item</h2>
            <FoundItemForm />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-800 mb-4">🔎 Lost Items</h2>
            <LostItemFeed />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-red-800 mb-4">🔎 Found Items</h2>
            <FoundItemFeed />
          </section>
        </div>
      </main>
    </div>
  );
}
