import React, { useState } from 'react';
import type { UserDetails } from '../types/types';

interface Props {
  onBack: () => void;
  onSignUp: (details: UserDetails) => void;
}

const SignUp: React.FC<Props> = ({ onBack, onSignUp }) => {
  const [details, setDetails] = useState<UserDetails>({ name: '', email: '', role: 'Developer' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (details.name && details.email && details.role) {
      onSignUp(details);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Full Name"
          value={details.name}
          onChange={e => setDetails({...details, name: e.target.value})}
          required
        />
        <input
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          type="email"
          placeholder="Email Address"
          value={details.email}
          onChange={e => setDetails({...details, email: e.target.value})}
          required
        />
        <select
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={details.role}
          onChange={e => setDetails({...details, role: e.target.value as 'Developer' | 'HR' | 'Admin'})}
          required
        >
          <option value="Developer">Developer</option>
          <option value="HR">HR</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors">
          Sign Up
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

export default SignUp;