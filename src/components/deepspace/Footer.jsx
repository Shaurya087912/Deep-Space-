import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

const links = [
  { label: 'Generate', id: 'generate' },
  { label: 'Categories', id: 'categories' },
  { label: 'Daily Question', id: 'daily' },
  { label: 'Saved', id: 'saved' },
];

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="relative py-14 px-4 border-t border-border/15 overflow-hidden">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      {/* Background orbs */}
      <div className="absolute bottom-0 left-1/4 w-64 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-32 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-10">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <Sparkles className="w-6 h-6 text-primary" />
              <div className="absolute inset-0 blur-md bg-primary/40" />
            </div>
            <div>
              <span className="font-orbitron text-base font-black tracking-wider text-foreground">
                DEEP<span className="text-primary">SPACE</span>
              </span>
              <p className="text-xs text-muted-foreground font-inter">Questions</p>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-1">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="px-4 py-2 text-sm font-inter text-muted-foreground hover:text-foreground hover:bg-primary/5 rounded-lg transition-all duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border/40 to-transparent mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-muted-foreground/60 font-inter">
            © {new Date().getFullYear()} DeepSpace Questions. All thoughts reserved.
          </p>
          <p className="text-xs text-muted-foreground/40 font-inter flex items-center gap-1.5">
            A digital sanctuary for deep thinkers
            <Heart className="w-3 h-3 text-neon-pink/50" />
          </p>
        </div>
      </div>
    </footer>
  );
}
