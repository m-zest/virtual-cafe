import React, { useState } from 'react';
import { Users, Coffee, Gamepad, Beer, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import AuthModal from './AuthModal';

interface RoomCardProps {
  title: string;
  description: string;
  icon: 'business' | 'friends' | 'games' | 'german' | 'english';
  activeUsers: number;
}

const icons = {
  business: Briefcase,
  friends: Users,
  games: Gamepad,
  german: Beer,
  english: Coffee,
};

export default function RoomCard({ title, description, icon, activeUsers }: RoomCardProps) {
  const navigate = useNavigate();
  const { currentUser } = useStore();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const Icon = icons[icon];
  
  const handleJoinRoom = () => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    navigate(`/room/${icon}`);
  };
  
  return (
    <>
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Icon className="w-8 h-8 text-indigo-600 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              {activeUsers} online
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <p className="text-gray-600">{description}</p>
          <button 
            onClick={handleJoinRoom}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
          >
            Join Room
          </button>
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}