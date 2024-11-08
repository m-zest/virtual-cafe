import React, { useState, useEffect } from 'react';
import AgoraRTC, { 
  IAgoraRTCClient, 
  IAgoraRTCRemoteUser, 
  ICameraVideoTrack, 
  IMicrophoneAudioTrack 
} from 'agora-rtc-sdk-ng';
import { agoraConfig } from '../../config/agora';

interface VideoCallProps {
  channelName: string;
  userId: string;
}

const client: IAgoraRTCClient = AgoraRTC.createClient({ 
  mode: 'rtc', 
  codec: 'vp8' 
});

export default function VideoCall({ channelName, userId }: VideoCallProps) {
  const [localTracks, setLocalTracks] = useState<[IMicrophoneAudioTrack, ICameraVideoTrack] | null>(null);
  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!agoraConfig.appId) {
      setError('Agora App ID is not configured');
      return;
    }

    const init = async () => {
      try {
        if (joined) return; // Prevent multiple joins

        client.on('user-published', async (user, mediaType) => {
          await client.subscribe(user, mediaType);
          if (mediaType === 'video') {
            setRemoteUsers(prev => [...prev, user]);
          }
          if (mediaType === 'audio') {
            user.audioTrack?.play();
          }
        });

        client.on('user-unpublished', (user) => {
          setRemoteUsers(prev => prev.filter(u => u.uid !== user.uid));
        });

        const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
        setLocalTracks([audioTrack, videoTrack]);

        await client.join(agoraConfig.appId, channelName, agoraConfig.token, userId);
        await client.publish([audioTrack, videoTrack]);
        setJoined(true);
        setError(null);
      } catch (err) {
        console.error('Error initializing Agora:', err);
        setError('Failed to initialize video call');
        setJoined(false);
      }
    };

    init();

    return () => {
      if (localTracks) {
        localTracks[0].close();
        localTracks[1].close();
      }
      client.removeAllListeners();
      client.leave();
      setJoined(false);
      setLocalTracks(null);
      setRemoteUsers([]);
    };
  }, [channelName, userId]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {localTracks && (
        <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
          <div ref={node => node && localTracks[1].play(node)} className="w-full h-full" />
          <div className="absolute bottom-4 left-4 text-white bg-black/50 px-2 py-1 rounded">
            You
          </div>
        </div>
      )}
      {remoteUsers.map(user => (
        <div key={user.uid} className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
          <div 
            ref={node => node && user.videoTrack?.play(node)} 
            className="w-full h-full"
          />
          <div className="absolute bottom-4 left-4 text-white bg-black/50 px-2 py-1 rounded">
            User {user.uid}
          </div>
        </div>
      ))}
    </div>
  );
}