import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface ChatProps {
  roomId: string;
}

export default function Chat({ roomId }: ChatProps) {
  const [message, setMessage] = useState('');
  const { currentUser, messages, addMessage } = useStore();
  const roomMessages = messages[roomId] || [];

  const handleSend = () => {
    if (!message.trim() || !currentUser) return;

    addMessage(roomId, {
      id: Date.now().toString(),
      userId: currentUser.id,
      content: message,
      timestamp: Date.now(),
    });
    setMessage('');
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {roomMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.userId === currentUser?.id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.userId === currentUser?.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p>{msg.content}</p>
              <span className="text-xs opacity-75">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}