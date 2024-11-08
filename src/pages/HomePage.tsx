import React from 'react';
import RoomCard from '../components/RoomCard';

const rooms = [
  {
    title: 'Business Hub',
    description: 'Professional networking space for entrepreneurs and remote workers.',
    icon: 'business',
    activeUsers: 24,
  },
  {
    title: 'Friends Corner',
    description: 'Casual hangout spot for meeting new people and catching up with friends.',
    icon: 'friends',
    activeUsers: 42,
  },
  {
    title: 'Gaming Lounge',
    description: 'Play games, share strategies, and connect with fellow gamers.',
    icon: 'games',
    activeUsers: 38,
  },
  {
    title: 'German Biergarten',
    description: 'Experience authentic German culture and practice your Deutsch.',
    icon: 'german',
    activeUsers: 15,
  },
  {
    title: 'English Tea Room',
    description: 'Perfect spot for English conversation and cultural exchange.',
    icon: 'english',
    activeUsers: 29,
  },
] as const;

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Your Virtual Café
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join themed rooms, meet new people, and experience the future of social interaction.
            Video chat, share ideas, and create meaningful connections.
          </p>
          <img
            src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
            alt="Cozy café atmosphere"
            className="rounded-2xl shadow-2xl max-w-4xl mx-auto"
          />
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Explore Our Themed Rooms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <RoomCard key={room.title} {...room} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-indigo-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Everything You Need to Connect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Video Chat</h3>
              <p className="text-gray-600">
                Crystal clear video calls with room participants
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Text Chat</h3>
              <p className="text-gray-600">
                Real-time messaging with emoji support
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Screen Sharing</h3>
              <p className="text-gray-600">
                Share your screen for presentations or collaboration
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Virtual Café. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}