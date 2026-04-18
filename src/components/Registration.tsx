import React, { useState } from 'react';
import type { UserDetails } from '../assets/types/types';

interface Props {
  onStart: (details: UserDetails) => void;
}

const Registration: React.FC<Props> = ({ onStart }) => {
  const [details, setDetails] = useState<UserDetails>({ name: '', email: '', token: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (details.name && details.email && details.token) {
      onStart(details);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Candidate Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Full Name"
          onChange={e => setDetails({...details, name: e.target.value})}
          required
        />
        <input 
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          type="email" 
          placeholder="Email Address"
          onChange={e => setDetails({...details, email: e.target.value})}
          required
        />
        <input 
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Token Number (e.g., TK-101)"
          onChange={e => setDetails({...details, token: e.target.value})}
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
          Authorize & Start Quiz
        </button>
      </form>
    </div>
  );
};

export default Registration;