import React, { useState } from 'react';

interface Props {
  onBack: () => void;
  onLogin: (email: string, password: string) => void;
}

const Login: React.FC<Props> = ({ onBack, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email, password);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
          Login
        </button>
      </form>
      <button
        onClick={onBack}
        className="w-full mt-4 bg-gray-600 text-white py-2 rounded-lg font-bold hover:bg-gray-700 transition-colors"
      >
        Back to Registration
      </button>
    </div>
  );
};

export default Login;