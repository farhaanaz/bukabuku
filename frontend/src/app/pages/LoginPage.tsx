import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useState, useContext } from 'react';
import { NavigationContext, AuthContext } from '../App';
import { SocialAuthModal } from '../components/SocialAuthModal';

export function LoginPage() {
  const { navigate } = useContext(NavigationContext);
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'facebook' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        // Mock successful login
        login({
          fullName: email.split('@')[0],
          email: email,
        });
        navigate('home');
      } else {
        setError('Email dan password harus diisi');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    setSocialLoading(provider);
    setError('');

    // Simulate OAuth flow with modal
    setTimeout(() => {
      const mockUserData = {
        google: {
          fullName: 'John Doe',
          email: 'john.doe@gmail.com',
          phone: '081234567890',
        },
        facebook: {
          fullName: 'Jane Smith',
          email: 'jane.smith@facebook.com',
          phone: '081298765432',
        },
      };

      login(mockUserData[provider]);
      setSocialLoading(null);

      // Small delay before navigation to show success
      setTimeout(() => {
        navigate('home');
      }, 500);
    }, 2000);
  };

  return (
    <>
      <SocialAuthModal
        isOpen={socialLoading !== null}
        provider={socialLoading || 'google'}
        onClose={() => setSocialLoading(null)}
      />
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold mb-2"
            >
              Selamat Datang Kembali
            </motion.h1>
            <p className="text-muted-foreground">
              Masuk ke akun bukabuku.com Anda
            </p>
          </div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Alamat Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Kata Sandi
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi"
                    className="w-full pl-10 pr-12 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-sm text-muted-foreground">Ingat saya</span>
                </label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Lupa kata sandi?
                </a>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 text-red-600 py-3 px-4 rounded-lg text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Masuk
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-muted-foreground">Atau lanjutkan dengan</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: socialLoading ? 1 : 1.02 }}
                whileTap={{ scale: socialLoading ? 1 : 0.98 }}
                onClick={() => handleSocialLogin('google')}
                disabled={socialLoading !== null}
                className="flex items-center justify-center gap-2 py-3 border border-border rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {socialLoading === 'google' ? (
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                )}
                <span className="text-sm font-medium">
                  {socialLoading === 'google' ? 'Menghubungkan...' : 'Google'}
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: socialLoading ? 1 : 1.02 }}
                whileTap={{ scale: socialLoading ? 1 : 0.98 }}
                onClick={() => handleSocialLogin('facebook')}
                disabled={socialLoading !== null}
                className="flex items-center justify-center gap-2 py-3 border border-border rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {socialLoading === 'facebook' ? (
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-[#1877F2] rounded-full animate-spin" />
                ) : (
                  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                )}
                <span className="text-sm font-medium">
                  {socialLoading === 'facebook' ? 'Menghubungkan...' : 'Facebook'}
                </span>
              </motion.button>
            </div>

            {/* Register Link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Belum punya akun?{' '}
              <button
                onClick={() => navigate('register')}
                className="text-primary font-medium hover:underline"
              >
                Daftar sekarang
              </button>
            </p>
          </motion.div>

          {/* Back to Home */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => navigate('home')}
            className="w-full text-center text-muted-foreground hover:text-foreground mt-6 transition-colors"
          >
            ← Kembali ke beranda
          </motion.button>
        </motion.div>
      </div>
    </div>
    </>
  );
}
