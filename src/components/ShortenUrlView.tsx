
import React, { useState } from 'react';

interface Props { 
    onCreate: (url: string, code?: string) => Promise<void>; 
}

export const ShortenUrlView: React.FC<Props> = ({ onCreate }) => {
  const [url, setUrl] = useState('');
  const [code, setCode] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await onCreate(url, code);
      setUrl(''); 
      setCode('');
    } catch (err: any) { alert(err.message); }
  };

  return (
    <form onSubmit={submit} className="flex flex-col md:flex-row gap-4">
      <input 
        className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
        type="url"
        placeholder="https://example.com" 
        value={url} 
        onChange={e => setUrl(e.target.value)} 
        required 
      />
      <input 
        className="w-full md:w-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
        placeholder="Custom Code" 
        value={code} 
        onChange={e => setCode(e.target.value)} 
      />
      <button 
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-Black font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-sm"
      >
        Shorten
      </button>
    </form>
  );
};