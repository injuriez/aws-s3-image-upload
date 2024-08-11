import { useState } from 'react';
import { GetServerSideProps } from 'next';

interface AuthProps {
  isAuthenticated: boolean;
}

export const getServerSideProps: GetServerSideProps<AuthProps> = async (context) => {
    if (context.req.headers.cookie) {
    console.log('Cookies found:', context.req.headers.cookie);

    } else {
    console.log('No cookies found');
    console.log("Kill me");
    }
  // Check for authentication (e.g., check cookies or session)
  const isAuthenticated = false; // Replace with real auth check

  return {
    props: {
      isAuthenticated,
    },
  };
};

function AuthPage({ isAuthenticated }: AuthProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    console.log(data.message);
  };

  const handleLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    console.log(data.message);
  };

  return (
    <div>
      <h1>{isAuthenticated ? 'Welcome back!' : 'Please log in or sign up'}</h1>
      {!isAuthenticated && (
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignup}>Sign Up</button>
          <button onClick={handleLogin}>Log In</button>
        </div>
      )}
    </div>
  );
}

export default AuthPage;
