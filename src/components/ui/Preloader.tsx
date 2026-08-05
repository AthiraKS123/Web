import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        // Accelerating progress curve
        const step = prev > 70 ? 8 : prev > 40 ? 5 : 3;
        return Math.min(prev + step, 100);
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] bg-charcoal-950 flex flex-col items-center justify-center select-none"
        >
          {/* Subtle fiery glow behind logo */}
          <div className="absolute w-72 h-72 rounded-full bg-ember-500/10 blur-[100px] pointer-events-none" />

          {/* Center Logo Lockup */}
          <div className="flex flex-col items-center gap-4 z-10">
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ember-500 via-ember-600 to-crimson-600 flex items-center justify-center shadow-glow-ember"
            >
              <Flame className="w-9 h-9 text-white animate-pulse" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center"
            >
              <h1 className="font-display font-black text-3xl sm:text-4xl tracking-tight text-gradient-flame">
                EMBER CRAFT
              </h1>
              <p className="text-xs uppercase tracking-[0.3em] text-stone-400 font-semibold mt-1">
                Gourmet 3D Dining Lab
              </p>
            </motion.div>
          </div>

          {/* Progress Bar & Counter */}
          <div className="w-56 mt-10 z-10">
            <div className="h-1 w-full bg-charcoal-800 rounded-full overflow-hidden border border-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-ember-500 via-gold-500 to-crimson-500 rounded-full shadow-[0_0_12px_#ff5500]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
            <div className="flex justify-between items-center mt-2 text-[11px] font-mono text-stone-400">
              <span className="tracking-wider text-ember-400">IGNITING HEAT</span>
              <span>{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
