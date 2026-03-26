import { motion } from 'framer-motion';
import { ChevronDown, Zap, Sparkles, Brain } from 'lucide-react';

export default function HeroSection({ onGenerate }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-20">
      {/* Layered gradient orbs */}
      <div className="absolute top-1/4 left-1/5 w-72 sm:w-[500px] h-72 sm:h-[500px] bg-primary/8 rounded-full blur-3xl" style={{ animation: 'pulse 8s ease-in-out infinite' }} />
      <div className="absolute bottom-1/3 right-1/5 w-64 sm:w-[400px] h-64 sm:h-[400px] bg-accent/8 rounded-full blur-3xl" style={{ animation: 'pulse 10s ease-in-out infinite 3s' }} />
      <div className="absolute top-2/3 left-1/3 w-48 sm:w-72 h-48 sm:h-72 bg-neon-pink/5 rounded-full blur-3xl" style={{ animation: 'pulse 12s ease-in-out infinite 6s' }} />
      <div className="absolute top-1/3 right-1/3 w-56 sm:w-80 h-56 sm:h-80 bg-neon-cyan/5 rounded-full blur-3xl" style={{ animation: 'pulse 9s ease-in-out infinite 1.5s' }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-primary/20 mb-10 shadow-lg shadow-primary/5"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs sm:text-sm font-inter text-muted-foreground tracking-[0.15em] uppercase">
            AI-Powered Introspection Engine
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" style={{ animationDelay: '0.5s' }} />
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          <h1 className="font-orbitron text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] mb-6 tracking-tight">
            <span className="text-foreground">What Keeps You</span>
            <br />
            <span className="relative">
              <span className="bg-gradient-to-r from-primary via-neon-pink to-accent bg-clip-text text-transparent">
                Awake at Night?
              </span>
              {/* Underline glow */}
              <span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground font-poppins max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Dive into thoughts you never dared to ask.{' '}
          <span className="text-foreground/80 font-medium">
            200+ questions designed to crack open your reality
          </span>{' '}
          and explore the infinite depth within.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          {/* Primary CTA */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGenerate}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl overflow-hidden font-poppins font-semibold text-base sm:text-lg text-white w-full sm:w-auto justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-neon-pink/80 to-accent" />
            <div className="absolute inset-0 bg-gradient-to-r from-accent via-neon-pink/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 shadow-[0_0_30px_rgba(168,130,255,0.4)] group-hover:shadow-[0_0_50px_rgba(168,130,255,0.6)] transition-shadow duration-300" />
            <Zap className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Generate a Question</span>
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl glass border border-primary/20 hover:border-primary/40 font-poppins font-semibold text-base sm:text-lg text-foreground transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <Brain className="w-5 h-5 text-primary" />
            <span>Choose a Category</span>
          </motion.button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-12"
        >
          {[
            { value: '200+', label: 'Deep Questions', color: 'text-primary' },
            { value: '5', label: 'Categories', color: 'text-accent' },
            { value: '∞', label: 'Possibilities', color: 'text-neon-pink' },
            { value: '24/7', label: 'Introspection', color: 'text-neon-cyan' },
          ].map((stat) => (
            <div key={stat.label} className="text-center group cursor-default">
              <div className={`font-orbitron text-2xl sm:text-3xl font-black ${stat.color} group-hover:scale-110 transition-transform duration-300 inline-block`}>
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1 font-inter">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-inter uppercase tracking-[0.2em] text-muted-foreground/40">Scroll to explore</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown className="w-5 h-5 text-muted-foreground/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
