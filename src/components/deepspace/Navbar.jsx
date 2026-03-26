import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Menu, X, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ isDark, onToggle }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const links = [
    { label: 'Generate', id: 'generate' },
    { label: 'Categories', id: 'categories' },
    { label: 'Daily', id: 'daily' },
    { label: 'Saved', id: 'saved' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong shadow-lg shadow-primary/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 group">
            <div className="relative">
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
              <div className="absolute inset-0 blur-lg bg-primary/30 group-hover:bg-primary/50 transition-all" />
            </div>
            <span className="font-orbitron text-sm sm:text-base font-bold tracking-wider text-foreground">
              DEEP<span className="text-primary">SPACE</span>
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="px-4 py-2 text-sm font-inter text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-primary/5"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link to="/auth">
              <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 hover:border-primary/50 hover:bg-primary/15 text-primary text-sm font-inter font-medium transition-all duration-300">
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </motion.span>
            </Link>
            <ThemeToggle isDark={isDark} onToggle={onToggle} />
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass-strong border-t border-border/30"
        >
          <div className="px-4 py-4 space-y-1">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="block w-full text-left px-4 py-3 text-sm font-inter text-muted-foreground hover:text-foreground hover:bg-primary/5 rounded-lg transition-all"
              >
                {link.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
