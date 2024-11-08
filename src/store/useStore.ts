import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface Message {
  id: string;
  userId: string;
  content: string;
  timestamp: number;
}

interface RoomState {
  currentUser: User | null;
  messages: Record<string, Message[]>;
  users: Record<string, User[]>;
  setCurrentUser: (user: User) => void;
  addMessage: (roomId: string, message: Message) => void;
  addUserToRoom: (roomId: string, user: User) => void;
  removeUserFromRoom: (roomId: string, userId: string) => void;
}

export const useStore = create<RoomState>((set) => ({
  currentUser: null,
  messages: {},
  users: {},
  setCurrentUser: (user) => set({ currentUser: user }),
  addMessage: (roomId, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [roomId]: [...(state.messages[roomId] || []), message],
      },
    })),
  addUserToRoom: (roomId, user) =>
    set((state) => ({
      users: {
        ...state.users,
        [roomId]: [...(state.users[roomId] || []), user],
      },
    })),
  removeUserFromRoom: (roomId, userId) =>
    set((state) => ({
      users: {
        ...state.users,
        [roomId]: (state.users[roomId] || []).filter((u) => u.id !== userId),
      },
    })),
}));