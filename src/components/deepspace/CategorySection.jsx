import { motion } from 'framer-motion';
import { Heart, Compass, Brain, Trophy, Skull } from 'lucide-react';
import { questionBank } from '../../lib/questionBank';

const categories = [
  {
    id: 'love',
    label: 'Love',
    icon: Heart,
    color: 'pink',
    description: 'Questions about connection, intimacy, and the ache of the human heart.',
    emoji: '💜',
  },
  {
    id: 'life',
    label: 'Life',
    icon: Compass,
    color: 'cyan',
    description: 'Explore the meaning and purpose behind everyday existence.',
    emoji: '🌌',
  },
  {
    id: 'existential',
    label: 'Existential',
    icon: Brain,
    color: 'purple',
    description: 'Challenge the very fabric of reality, consciousness, and being.',
    emoji: '🧠',
  },
  {
    id: 'success',
    label: 'Success',
    icon: Trophy,
    color: 'blue',
    description: 'Redefine what achievement, ambition, and fulfilment really mean.',
    emoji: '⚡',
  },
  {
    id: 'dark',
    label: 'Dark Thoughts',
    icon: Skull,
    color: 'pink',
    description: 'Confront the shadows that lurk in the depths of the human mind.',
    emoji: '🌑',
  },
];

const colorMap = {
  purple: {
    gradient: 'from-primary/15 to-transparent',
    border: 'border-primary/20',
    hoverBorder: 'hover:border-primary/50',
    activeBorder: 'border-primary/60',
    text: 'text-primary',
    bg: 'bg-primary/10',
    glow: 'shadow-primary/20',
    hoverGlow: 'hover:shadow-primary/30',
    dot: 'bg-primary',
  },
  blue: {
    gradient: 'from-neon-blue/15 to-transparent',
    border: 'border-neon-blue/20',
    hoverBorder: 'hover:border-neon-blue/50',
    activeBorder: 'border-neon-blue/60',
    text: 'text-neon-blue',
    bg: 'bg-neon-blue/10',
    glow: 'shadow-neon-blue/20',
    hoverGlow: 'hover:shadow-neon-blue/30',
    dot: 'bg-neon-blue',
  },
  pink: {
    gradient: 'from-neon-pink/15 to-transparent',
    border: 'border-neon-pink/20',
    hoverBorder: 'hover:border-neon-pink/50',
    activeBorder: 'border-neon-pink/60',
    text: 'text-neon-pink',
    bg: 'bg-neon-pink/10',
    glow: 'shadow-neon-pink/20',
    hoverGlow: 'hover:shadow-neon-pink/30',
    dot: 'bg-neon-pink',
  },
  cyan: {
    gradient: 'from-neon-cyan/15 to-transparent',
    border: 'border-neon-cyan/20',
    hoverBorder: 'hover:border-neon-cyan/50',
    activeBorder: 'border-neon-cyan/60',
    text: 'text-neon-cyan',
    bg: 'bg-neon-cyan/10',
    glow: 'shadow-neon-cyan/20',
    hoverGlow: 'hover:shadow-neon-cyan/30',
    dot: 'bg-neon-cyan',
  },
};

export default function CategorySection({ onSelectCategory, activeCategory }) {
  return (
    <section id="categories" className="relative py-20 sm:py-28 px-4">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/20 mb-5">
            <span className="text-xs font-inter uppercase tracking-[0.15em] text-muted-foreground">Explore Realms</span>
          </div>
          <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Choose Your <span className="text-primary">Category</span>
          </h2>
          <p className="text-muted-foreground font-inter text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Each category opens a different dimension of thought. Where do you want to go tonight?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {categories.map((cat, i) => {
            const c = colorMap[cat.color];
            const isActive = activeCategory === cat.id;
            const Icon = cat.icon;
            const count = questionBank[cat.id]?.length || 0;

            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ scale: 1.02, y: -6 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelectCategory(cat.id)}
                className={`relative group text-left p-6 sm:p-8 rounded-2xl glass border transition-all duration-400 shadow-lg ${c.border} ${c.hoverBorder} ${c.hoverGlow} ${
                  isActive ? `${c.activeBorder} ${c.glow} shadow-xl ring-1 ring-inset ${c.border}` : ''
                }`}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400`} />
                {isActive && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient} rounded-2xl opacity-60`} />
                )}

                <div className="relative z-10">
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-13 h-13 rounded-xl ${c.bg} flex items-center justify-center p-3`}>
                      <Icon className={`w-6 h-6 ${c.text}`} />
                    </div>
                    <span className={`text-xs font-orbitron font-bold ${c.text} opacity-60 mt-1`}>
                      {count} Q's
                    </span>
                  </div>

                  {/* Label */}
                  <h3 className="font-orbitron text-base sm:text-lg font-bold text-foreground mb-2 tracking-wide">
                    {cat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm font-inter leading-relaxed mb-5">
                    {cat.description}
                  </p>

                  {/* Bottom */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-inter ${c.text} font-medium tracking-wide`}>
                      {isActive ? '✦ Active' : 'Click to explore →'}
                    </span>
                    {isActive && <div className={`w-2 h-2 rounded-full ${c.dot} animate-pulse`} />}
                  </div>
                </div>
              </motion.button>
            );
          })}

          {/* "Any Category" card */}
          <motion.button
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: categories.length * 0.08 }}
            whileHover={{ scale: 1.02, y: -6 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelectCategory(null)}
            className={`relative group text-left p-6 sm:p-8 rounded-2xl glass border transition-all duration-400 shadow-lg border-white/10 hover:border-white/20 ${
              !activeCategory ? 'border-white/25 ring-1 ring-inset ring-white/10' : ''
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            <div className="relative z-10">
              <div className="w-13 h-13 rounded-xl bg-white/5 flex items-center justify-center p-3 mb-5">
                <span className="text-2xl">🎲</span>
              </div>
              <h3 className="font-orbitron text-base sm:text-lg font-bold text-foreground mb-2 tracking-wide">
                Surprise Me
              </h3>
              <p className="text-muted-foreground text-sm font-inter leading-relaxed mb-5">
                Let the universe decide. A random question from any category.
              </p>
              <span className={`text-xs font-inter text-muted-foreground font-medium tracking-wide`}>
                {!activeCategory ? '✦ Active' : 'Random exploration →'}
              </span>
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
