import React, { useState } from 'react';
import { signInWithPopup, OAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/config';

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const handleMicrosoftLogin = async () => {
    const provider = new OAuthProvider('microsoft.com');

    provider.setCustomParameters({
      prompt: 'select_account' // 👈 This forces the email form
    });
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User Info:', user);
    } catch (err) {
      console.error('Error during login:', err);
      setError('Failed to login with Microsoft. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('Successfully logged out.');
    } catch (err) {
      console.error('Error during logout:', err);
      setError('Failed to logout. Please try again.');
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Login</h1>
      <button onClick={handleMicrosoftLogin} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
        Login with Microsoft
      </button>
      <button onClick={handleLogout} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
        Logout
      </button>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default Login;