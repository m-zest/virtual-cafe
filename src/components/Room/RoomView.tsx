import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Music, Users, Video, MessageCircle } from 'lucide-react';
import VideoCall from './VideoCall';
import Chat from './Chat';
import { useStore } from '../../store/useStore';

const roomThemes = {
  business: {
    music: ['Ambient Work Music', 'Soft Jazz', 'Classical Focus'],
    background: 'bg-gray-100',
  },
  friends: {
    music: ['Pop Hits', 'Party Mix', 'Chill Vibes'],
    background: 'bg-blue-50',
  },
  games: {
    music: ['Gaming Soundtracks', 'Electronic Mix', 'Epic Orchestra'],
    background: 'bg-purple-50',
  },
  german: {
    music: ['German Folk', 'Oktoberfest Hits', 'Modern German Pop'],
    background: 'bg-amber-50',
  },
  english: {
    music: ['British Pop', 'Tea Time Jazz', 'London Calling'],
    background: 'bg-rose-50',
  },
};

export default function RoomView() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { currentUser, users, addUserToRoom, removeUserFromRoom } = useStore();
  const theme = roomId as keyof typeof roomThemes;

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
      return;
    }

    if (roomId && currentUser) {
      addUserToRoom(roomId, currentUser);
      return () => {
        removeUserFromRoom(roomId, currentUser.id);
      };
    }
  }, [roomId, currentUser, navigate]);

  if (!roomId || !theme || !currentUser) return null;

  const roomUsers = users[roomId] || [];

  return (
    <div className={`min-h-screen ${roomThemes[theme].background} p-4 pt-20`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          {/* Video Call Section */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Video className="w-6 h-6 mr-2" />
              Video Chat
            </h2>
            <VideoCall channelName={roomId} userId={currentUser.id} />
          </div>

          {/* Music Player */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Music className="w-6 h-6 mr-2" />
              Room Music
            </h2>
            <select className="w-full p-2 border rounded-lg">
              {roomThemes[theme].music.map((track) => (
                <option key={track}>{track}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {/* Active Users */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Users className="w-6 h-6 mr-2" />
              Active Users ({roomUsers.length})
            </h2>
            <div className="space-y-2">
              {roomUsers.map((user) => (
                <div key={user.id} className="flex items-center space-x-2">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{user.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Section */}
          <div className="bg-white rounded-lg shadow-lg h-[500px]">
            <h2 className="text-xl font-bold p-4 border-b flex items-center">
              <MessageCircle className="w-6 h-6 mr-2" />
              Chat
            </h2>
            <Chat roomId={roomId} />
          </div>
        </div>
      </div>
    </div>
  );
}