import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Flame, Info, AlertCircle } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'flame' | 'info' | 'error';
  title: string;
  message?: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed bottom-6 right-6 z-[120] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="pointer-events-auto p-4 rounded-2xl bg-charcoal-900/95 backdrop-blur-xl border border-white/10 shadow-2xl flex items-start gap-3"
            onClick={() => onRemove(toast.id)}
          >
            <div className="mt-0.5">
              {toast.type === 'flame' && <Flame className="w-5 h-5 text-ember-400" />}
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-crimson-500" />}
            </div>
            <div className="flex-1">
              <h5 className="font-display font-bold text-xs text-white leading-snug">
                {toast.title}
              </h5>
              {toast.message && (
                <p className="text-[11px] text-stone-400 mt-0.5">{toast.message}</p>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
