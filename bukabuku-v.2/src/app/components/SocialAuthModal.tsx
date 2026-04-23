import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface SocialAuthModalProps {
  isOpen: boolean;
  provider: 'google' | 'facebook';
  onClose: () => void;
}

export function SocialAuthModal({ isOpen, provider, onClose }: SocialAuthModalProps) {
  const providerData = {
    google: {
      name: 'Google',
      color: '#4285F4',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24">
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
      ),
    },
    facebook: {
      name: 'Facebook',
      color: '#1877F2',
      icon: (
        <svg className="w-8 h-8" fill="#1877F2" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
  };

  const data = providerData[provider];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-border bg-muted/30 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                {data.icon}
                <div>
                  <h3 className="text-xl font-bold">Masuk dengan {data.name}</h3>
                  <p className="text-sm text-muted-foreground">Menghubungkan ke bukabuku.com</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                </div>
                <p className="text-lg font-medium mb-2">Menghubungkan akun Anda...</p>
                <p className="text-sm text-muted-foreground">
                  Mohon tunggu sebentar
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
                <p className="mb-2 font-medium text-foreground">bukabuku.com akan menerima:</p>
                <ul className="space-y-1 ml-4 list-disc">
                  <li>Nama lengkap Anda</li>
                  <li>Alamat email</li>
                  <li>Foto profil</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
