import { useEffect, useRef } from 'react';
import { X, Heart, Upload } from 'lucide-react';
import { useClientImagePreview } from '../hooks/useClientImagePreview';
import { getAssetUrl } from '../utils/assetUrl';

interface ValentineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ValentineModal({ isOpen, onClose }: ValentineModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { 
    displaySrc, 
    error: imageError, 
    isLoading,
    shouldShowImage,
    handleFileSelect,
    handleImageLoadSuccess,
    handleImageLoadError
  } = useClientImagePreview(getAssetUrl('assets/image-2.jpg'));

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

  const handleImagePickerClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileSelect(file);
    // Reset input value to allow selecting the same file again
    if (e.target) {
      e.target.value = '';
    }
  };

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

          {/* Image with picker */}
          <div className="mb-8 flex justify-center animate-in slide-in-from-top duration-500 delay-200">
            <div className="relative group max-w-md">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-rose-800">
                {shouldShowImage ? (
                  <img
                    src={displaySrc}
                    alt="Valentine celebration"
                    className="w-full h-auto"
                    onLoad={handleImageLoadSuccess}
                    onError={handleImageLoadError}
                  />
                ) : (
                  <div className="w-full h-64 bg-rose-100 dark:bg-rose-800 flex items-center justify-center">
                    <div className="text-center p-6">
                      <Heart className="w-12 h-12 text-rose-400 mx-auto mb-2" />
                      <p className="text-sm text-rose-600 dark:text-rose-300">
                        Image placeholder
                      </p>
                    </div>
                  </div>
                )}
                {/* Image picker overlay button */}
                <button
                  onClick={handleImagePickerClick}
                  disabled={isLoading}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer disabled:cursor-not-allowed"
                  aria-label="Choose a different photo"
                >
                  <div className="flex flex-col items-center gap-2 text-white">
                    <Upload className="w-8 h-8" />
                    <span className="text-sm font-semibold">
                      {isLoading ? 'Loading...' : 'Choose Photo'}
                    </span>
                  </div>
                </button>
              </div>
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                aria-label="Select image file"
              />
            </div>
          </div>

          {/* Image error message */}
          {imageError && (
            <div
              className="mb-6 px-4 py-3 rounded-lg bg-rose-100 dark:bg-rose-900/50 border border-rose-300 dark:border-rose-700 animate-in fade-in slide-in-from-top-2 duration-300"
              role="alert"
              aria-live="polite"
            >
              <p className="text-sm text-rose-700 dark:text-rose-300 font-medium">
                {imageError}
              </p>
            </div>
          )}

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
