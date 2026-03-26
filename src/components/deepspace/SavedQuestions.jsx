import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Trash2, Copy, Check, FolderOpen } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const categoryColors = {
  love: 'text-neon-pink border-neon-pink/20 bg-neon-pink/5',
  life: 'text-neon-cyan border-neon-cyan/20 bg-neon-cyan/5',
  existential: 'text-primary border-primary/20 bg-primary/5',
  success: 'text-neon-blue border-neon-blue/20 bg-neon-blue/5',
  dark: 'text-neon-pink border-neon-pink/10 bg-neon-pink/3',
};

export default function SavedQuestions({ savedQuestions, onRemove }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = async (q, index) => {
    await navigator.clipboard.writeText(q.text);
    setCopiedId(index);
    toast.success('Copied!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="saved" className="relative py-20 sm:py-28 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-pink/2 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/20 mb-5">
            <Bookmark className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-inter uppercase tracking-[0.15em] text-muted-foreground">Your Collection</span>
          </div>
          <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Saved <span className="text-neon-pink">Questions</span>
          </h2>
          <p className="text-muted-foreground font-inter text-sm sm:text-base max-w-md mx-auto">
            The questions that stopped you in your tracks — kept here for when you need them most.
          </p>
          {savedQuestions.length > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-xs font-orbitron font-bold text-primary">{savedQuestions.length}</span>
              <span className="text-xs font-inter text-muted-foreground">saved</span>
            </div>
          )}
        </motion.div>

        {savedQuestions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-20"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="w-20 h-20 rounded-3xl glass border border-border/30 flex items-center justify-center mx-auto mb-6"
            >
              <FolderOpen className="w-9 h-9 text-muted-foreground/30" />
            </motion.div>
            <h3 className="font-orbitron text-base font-semibold text-muted-foreground mb-2">No saved questions yet</h3>
            <p className="text-muted-foreground/60 font-inter text-sm max-w-xs mx-auto">
              Generate questions and bookmark the ones that move you. They'll live here.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {savedQuestions.map((q, index) => {
                const catClass = categoryColors[q.category] || categoryColors.existential;
                return (
                  <motion.div
                    key={q.text}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: -10 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="group relative"
                  >
                    {/* Card glow on hover */}
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/10 via-transparent to-neon-pink/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                    <div className="relative glass rounded-2xl p-6 border border-border/20 hover:border-primary/20 transition-all duration-300 h-full flex flex-col">
                      {/* Category pill */}
                      <div className="flex items-center justify-between mb-4">
                        {q.category ? (
                          <span className={`text-[10px] font-orbitron font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border ${catClass}`}>
                            {q.category}
                          </span>
                        ) : <span />}
                        <span className="text-[10px] text-muted-foreground/50 font-inter">
                          {q.date ? new Date(q.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
                        </span>
                      </div>

                      {/* Question text */}
                      <div className="flex-1 mb-5">
                        <div className="text-3xl text-primary/20 font-serif leading-none mb-1 select-none">"</div>
                        <p className="font-poppins text-sm sm:text-base text-foreground leading-relaxed">
                          {q.text}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-end gap-1 pt-4 border-t border-border/15">
                        <button
                          onClick={() => handleCopy(q, index)}
                          className="p-2 rounded-lg hover:bg-primary/10 transition-colors group/btn"
                          title="Copy"
                        >
                          {copiedId === index
                            ? <Check className="w-4 h-4 text-green-400" />
                            : <Copy className="w-4 h-4 text-muted-foreground group-hover/btn:text-foreground transition-colors" />}
                        </button>
                        <button
                          onClick={() => { onRemove(index); toast('Removed from saved'); }}
                          className="p-2 rounded-lg hover:bg-destructive/10 transition-colors group/btn"
                          title="Remove"
                        >
                          <Trash2 className="w-4 h-4 text-muted-foreground group-hover/btn:text-destructive transition-colors" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
