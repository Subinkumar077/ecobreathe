import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ImageSlider } from '../../components/auth/ImageSlider';
import { useAuth } from '../../context/AuthContext';

const sliderImages = [
  "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/afde836c-8fe0-4c5b-aa0b-fe420a91d1e2_3840w.png",
  "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5f870fa0-1fa4-4845-bf04-6732d79259fa_1600w.webp",
  "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/750647bd-8e6a-40c8-a21a-8398b7c09a75_3840w.png"
];

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const from = location.state?.from?.pathname || '/dashboard/new-delhi';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      login(data.token, data.user);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-[#FBFAF7] font-['Inter']">
      {/* Left Side - Image Slider */}
      <div className="hidden lg:block lg:w-1/2 relative h-screen p-4">
        <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl relative">
          <ImageSlider images={sliderImages} interval={6000} />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-10" />
          
          <Link to="/" className="absolute top-8 left-8 z-20 flex items-center gap-2">
            <span className="grid grid-cols-3 gap-[2.5px]">
              <span className="w-1 h-1 rounded-full bg-[#42A85D]"></span>
              <span className="w-1 h-1 rounded-full bg-white/70"></span>
              <span className="w-1 h-1 rounded-full bg-white/30"></span>
              <span className="w-1 h-1 rounded-full bg-white/70"></span>
              <span className="w-1 h-1 rounded-full bg-white/30"></span>
              <span className="w-1 h-1 rounded-full bg-white/70"></span>
              <span className="w-1 h-1 rounded-full bg-white/30"></span>
              <span className="w-1 h-1 rounded-full bg-white/70"></span>
              <span className="w-1 h-1 rounded-full bg-[#42A85D]"></span>
            </span>
            <span className="font-['Geist'] font-semibold text-lg tracking-tight text-white">
              Eco Breathe
            </span>
          </Link>
          
          <div className="absolute bottom-16 left-8 z-20 text-white max-w-md">
            <h2 className="font-['Geist'] text-4xl font-light mb-4">
              Intelligence with <em className="font-['Instrument_Serif'] italic font-normal">impact.</em>
            </h2>
            <p className="text-white/70 text-sm">
              Join thousands of others tracking real-time air quality worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link to="/" className="flex lg:hidden items-center gap-2 mb-12">
            <span className="grid grid-cols-3 gap-[2.5px]">
              <span className="w-1 h-1 rounded-full bg-[#42A85D]"></span>
              <span className="w-1 h-1 rounded-full bg-black/70"></span>
              <span className="w-1 h-1 rounded-full bg-black/30"></span>
              <span className="w-1 h-1 rounded-full bg-black/70"></span>
              <span className="w-1 h-1 rounded-full bg-black/30"></span>
              <span className="w-1 h-1 rounded-full bg-black/70"></span>
              <span className="w-1 h-1 rounded-full bg-black/30"></span>
              <span className="w-1 h-1 rounded-full bg-black/70"></span>
              <span className="w-1 h-1 rounded-full bg-[#42A85D]"></span>
            </span>
            <span className="font-['Geist'] font-semibold text-lg tracking-tight text-[#12281A]">
              Eco Breathe
            </span>
          </Link>

          <div className="mb-10 fade-in">
            <h1 className="font-['Geist'] text-3xl font-semibold tracking-tight text-[#12281A] mb-2">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h1>
            <p className="text-[#12281A]/60 text-sm">
              {isLogin 
                ? 'Enter your credentials to access your dashboard' 
                : 'Enter your email to get started for free'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 fade-in" style={{ animationDelay: '0.1s' }}>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                {error}
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#12281A]">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 rounded-lg border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-[#1E4D33]/20 focus:border-[#1E4D33] transition-all"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#12281A]">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-[#1E4D33]/20 focus:border-[#1E4D33] transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1E4D33] hover:bg-[#2A6647] active:scale-[0.98] text-white font-medium py-2.5 rounded-lg transition-all shadow-lg shadow-[#1E4D33]/20 disabled:opacity-70 flex justify-center items-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          <div className="mt-8 text-center fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="text-sm text-[#12281A]/60">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }} 
                className="text-[#1E4D33] font-semibold hover:underline outline-none"
              >
                {isLogin ? 'Sign up free' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
