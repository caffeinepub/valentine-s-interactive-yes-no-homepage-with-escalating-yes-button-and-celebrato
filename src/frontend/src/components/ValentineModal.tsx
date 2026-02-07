import { useEffect } from 'react';
import { X, Heart } from 'lucide-react';

interface ValentineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ValentineModal({ isOpen, onClose }: ValentineModalProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal content */}
      <div
        className="relative z-10 w-full max-w-2xl bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900 dark:to-pink-900 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 dark:bg-rose-800/80 hover:bg-white dark:hover:bg-rose-800 transition-colors shadow-lg"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-rose-600 dark:text-rose-200" />
        </button>

        {/* Content */}
        <div className="p-8 md:p-12">
          {/* Celebration hearts */}
          <div className="flex justify-center gap-2 mb-6 animate-in zoom-in duration-500 delay-100">
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-pulse" />
            <Heart className="w-10 h-10 text-red-500 fill-red-500 animate-pulse delay-75" />
            <Heart className="w-8 h-8 text-pink-500 fill-pink-500 animate-pulse delay-150" />
          </div>

          {/* Image */}
          <div className="mb-8 flex justify-center animate-in slide-in-from-top duration-500 delay-200">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-rose-800 max-w-md">
              <img
                src="/assets/generated/valentine-popup-illustration.dim_1024x1024.png"
                alt="Valentine celebration"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Message */}
          <div className="text-center space-y-4 animate-in slide-in-from-bottom duration-500 delay-300">
            <h2 className="text-3xl md:text-4xl font-bold text-rose-900 dark:text-rose-100">
              Yayyy!! You made Jishone the happiest man on earth.
            </h2>
            <p className="text-lg md:text-xl text-rose-700 dark:text-rose-200 leading-relaxed max-w-xl mx-auto">
              I don't need big promises. just you, by my side, as we grow and figure life out together
            </p>
          </div>

          {/* Decorative hearts */}
          <div className="mt-8 flex justify-center gap-3 animate-in fade-in duration-500 delay-500">
            <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
            <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
            <Heart className="w-4 h-4 text-red-400 fill-red-400" />
            <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
            <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
