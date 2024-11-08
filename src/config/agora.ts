export const agoraConfig = {
  appId: import.meta.env.VITE_AGORA_APP_ID || '',
  token: null, // For development, we'll use null token (no authentication)
};

// Validate Agora configuration
if (!agoraConfig.appId) {
  console.error('Agora App ID is not configured. Please set VITE_AGORA_APP_ID in your environment variables.');
}