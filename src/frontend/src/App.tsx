import { useState } from 'react';
import ValentineModal from './components/ValentineModal';
import { Heart } from 'lucide-react';

function App() {
  const [noClickCount, setNoClickCount] = useState(0);
  const [showError, setShowError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleNoClick = () => {
    setNoClickCount((prev) => prev + 1);
    setShowError(true);
    setTimeout(() => setShowError(false), 2000);
  };

  const handleYesClick = () => {
    setShowModal(true);
  };

  // Calculate Yes button scale based on no clicks
  const yesButtonScale = 1 + noClickCount * 0.3;
  const noButtonOpacity = Math.max(0, 1 - noClickCount * 0.15);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 dark:from-rose-950 dark:via-pink-950 dark:to-red-950">
      {/* Decorative hearts background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10">
        <Heart className="absolute top-10 left-10 w-12 h-12 text-rose-400 animate-pulse" />
        <Heart className="absolute top-20 right-20 w-8 h-8 text-pink-400 animate-pulse delay-100" />
        <Heart className="absolute bottom-20 left-20 w-10 h-10 text-red-400 animate-pulse delay-200" />
        <Heart className="absolute bottom-32 right-32 w-6 h-6 text-rose-400 animate-pulse delay-300" />
        <Heart className="absolute top-1/2 left-1/4 w-8 h-8 text-pink-400 animate-pulse delay-150" />
        <Heart className="absolute top-1/3 right-1/3 w-10 h-10 text-red-400 animate-pulse delay-250" />
      </div>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl text-center relative z-10">
          {/* Question card */}
          <div className="bg-white/80 dark:bg-rose-900/30 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-rose-200 dark:border-rose-800">
            {/* Heart icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-rose-400 to-red-500 rounded-full p-6 shadow-lg">
                <Heart className="w-16 h-16 text-white fill-white" />
              </div>
            </div>

            {/* Question text */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-rose-900 dark:text-rose-100 leading-tight">
              annammooo will you be my valentine
            </h1>

            {/* Error message */}
            {showError && (
              <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                <p className="text-lg md:text-xl text-rose-600 dark:text-rose-400 font-semibold">
                  Oops—try again! 💔
                </p>
              </div>
            )}

            {/* Buttons container */}
            <div className="relative flex items-center justify-center gap-4 min-h-[120px]">
              {/* Yes button - grows with each no click */}
              <button
                onClick={handleYesClick}
                className="relative z-20 bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  transform: `scale(${yesButtonScale})`,
                  padding: `${0.75 + noClickCount * 0.1}rem ${1.5 + noClickCount * 0.2}rem`,
                  fontSize: `${1 + noClickCount * 0.1}rem`,
                }}
              >
                Yes! 💕
              </button>

              {/* No button - fades and gets covered */}
              <button
                onClick={handleNoClick}
                className="relative bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  opacity: noButtonOpacity,
                  pointerEvents: noButtonOpacity < 0.1 ? 'none' : 'auto',
                  zIndex: 10,
                }}
              >
                No
              </button>
            </div>

            {/* Hint text after a few clicks */}
            {noClickCount >= 3 && (
              <p className="mt-6 text-sm text-rose-600 dark:text-rose-400 animate-in fade-in duration-500">
                The answer is getting clearer... 😊
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-rose-700 dark:text-rose-300">
        <p className="flex items-center justify-center gap-2">
          © 2026. Built with <Heart className="w-4 h-4 fill-rose-500 text-rose-500 inline animate-pulse" /> using{' '}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-rose-900 dark:hover:text-rose-100 transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>

      {/* Modal */}
      <ValentineModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

export default App;
