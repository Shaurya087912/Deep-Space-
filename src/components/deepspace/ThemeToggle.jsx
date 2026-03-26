import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeToggle({ isDark, onToggle }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      className="relative p-3 rounded-full glass border border-primary/20 hover:border-primary/50 transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      <div className="absolute inset-0 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors" />
      {isDark ? (
        <Sun className="w-5 h-5 text-neon-cyan relative z-10" />
      ) : (
        <Moon className="w-5 h-5 text-primary relative z-10" />
      )}
    </motion.button>
  );
}
