import React, { useState } from 'react';
import { Lock, AlertCircle, Loader2, User } from 'lucide-react';
import { USERS } from '../../data/hubData';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate a tiny delay for UX
    setTimeout(() => {
      const user = USERS.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
      
      if (user) {
        localStorage.setItem('tzero_internal_auth', JSON.stringify({
          username: user.username,
          role: user.role
        }));
        onLogin();
      } else {
        setError('Acesso negado. Credenciais incorretas.');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-900/20">
            <Lock className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">T-Zero Internal Access</h1>
          <p className="text-slate-400 mt-2 text-sm">Product Hub - Restricted Area</p>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" title="Username" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <User size={18} />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all placeholder:text-slate-700"
                  placeholder="Seu usuário..."
                  required
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" title="Password" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all placeholder:text-slate-700"
                  placeholder="Sua senha..."
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-3 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 text-sm animate-shake">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                'Unlock Access'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-600 text-[10px] mt-8 uppercase tracking-widest font-bold">
          Authorized personnel only • Terminal 2026.1
        </p>
      </div>
    </div>
  );
};

export default Login;
