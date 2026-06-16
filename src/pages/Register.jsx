import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const Register = () => {
        const navigate=useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onClickHandler = (e) => {
    e.preventDefault();
    const nobj = { username, email, password }
    console.log(nobj);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1707343848552-893e05dba6ac?q=80&w=1920&auto=format&fit=crop')` }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-md">

        <h1 className="text-white text-3xl font-bold tracking-tight text-center mb-8">PrepTitan</h1>

        <div className="bg-zinc-900/70 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-8 shadow-2xl">

          <h2 className="text-white text-2xl font-bold text-center mb-1">Create account</h2>
          <p className="text-zinc-500 text-sm text-center mb-8">Join PrepTitan and start grinding</p>

          {/* Username */}
          <div className="mb-4">
            <label className="text-zinc-400 text-xs font-medium mb-1.5 block tracking-wide uppercase">Username</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              name="username"
              placeholder="codetitan"
              className="w-full bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-zinc-400 text-xs font-medium mb-1.5 block tracking-wide uppercase">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition"
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="text-zinc-400 text-xs font-medium mb-1.5 block tracking-wide uppercase">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                placeholder="••••••••"
                className="w-full bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition text-xs"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="mb-6" />

          <button
            onClick={(e) => onClickHandler(e)}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold py-3 rounded-lg hover:from-indigo-500 hover:to-blue-500 transition text-sm shadow-lg shadow-indigo-500/20"
          >
            Create Account
          </button>

          <p className="text-zinc-600 text-xs text-center mt-6">
            Already have an account?{' '}
            <button onClick={()=>navigate('/login')} className="text-indigo-400 cursor-pointer hover:text-indigo-300 transition font-medium">Sign in</button>
          </p>
        </div>

        <p className="text-zinc-500 text-xs text-center mt-6">© 2026 PrepTitan. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Register