import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, BookmarkCheck, Copy, Check, RefreshCw, Share2, Twitter, MessageCircle, Quote } from 'lucide-react';
import { toast } from 'sonner';

const categoryMeta = {
  love: { label: 'Love', color: 'from-neon-pink/20 to-primary/10', badge: 'bg-neon-pink/10 text-neon-pink border-neon-pink/20' },
  life: { label: 'Life', color: 'from-neon-cyan/20 to-accent/10', badge: 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20' },
  existential: { label: 'Existential', color: 'from-primary/20 to-neon-purple/10', badge: 'bg-primary/10 text-primary border-primary/20' },
  success: { label: 'Success', color: 'from-neon-blue/20 to-accent/10', badge: 'bg-neon-blue/10 text-neon-blue border-neon-blue/20' },
  dark: { label: 'Dark Thoughts', color: 'from-neon-pink/10 to-primary/5', badge: 'bg-neon-pink/5 text-neon-pink border-neon-pink/10' },
};

export default function QuestionCard({ question, isLoading, onGenerate, onSave, isSaved, category }) {
  const [copied, setCopied] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const shareRef = useRef(null);

  // Typing animation
  useEffect(() => {
    if (!question || isLoading) { setDisplayedText(''); return; }
    setIsTyping(true);
    setDisplayedText('');
    let i = 0;
    const speed = question.length > 80 ? 22 : 30;
    const interval = setInterval(() => {
      if (i < question.length) {
        setDisplayedText(question.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [question, isLoading]);

  // Close share on outside click
  useEffect(() => {
    const handler = (e) => { if (shareRef.current && !shareRef.current.contains(e.target)) setShowShare(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(question);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
    setShowShare(false);
  };

  const handleShareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${question}"\n\n— via DeepSpace Questions ✨`)}`, '_blank');
    setShowShare(false);
  };

  const handleShareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`"${question}"\n\n— via DeepSpace Questions ✨`)}`, '_blank');
    setShowShare(false);
  };

  const meta = categoryMeta[category] || categoryMeta.existential;

  return (
    <section id="generate" className="relative py-20 sm:py-28 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/20 mb-5">
            <Quote className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-inter uppercase tracking-[0.15em] text-muted-foreground">Question Generator</span>
          </div>
          <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
            Let AI <span className="text-primary">Challenge</span> Your Reality
          </h2>
          <p className="text-muted-foreground font-inter text-sm sm:text-base max-w-md mx-auto">
            Each question is a doorway. Which one will you walk through?
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative group"
        >
          {/* Multi-layer glow */}
          <div className={`absolute -inset-1.5 bg-gradient-to-br ${meta.color} rounded-3xl blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700`} />
          <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-md opacity-30" />

          <div className="relative glass-strong rounded-3xl overflow-hidden border border-white/5">
            {/* Top accent line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

            <div className="p-8 sm:p-12 min-h-[300px] sm:min-h-[340px] flex flex-col items-center justify-center">
              {/* Category badge */}
              <AnimatePresence>
                {category && !isLoading && (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="mb-8"
                  >
                    <span className={`px-4 py-1.5 rounded-full text-xs font-inter font-medium uppercase tracking-[0.15em] border ${meta.badge}`}>
                      {meta.label}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Loading */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-5"
                >
                  <div className="relative w-14 h-14">
                    <div className="absolute inset-0 rounded-full border border-primary/10" />
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
                    <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-accent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    </div>
                  </div>
                  <p className="text-muted-foreground font-inter text-sm tracking-wide animate-pulse">
                    Traversing the depths of thought...
                  </p>
                </motion.div>
              )}

              {/* Question */}
              {!isLoading && question && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={question}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="text-center"
                  >
                    {/* Quote mark */}
                    <div className="text-6xl font-serif text-primary/20 leading-none mb-2 select-none">"</div>
                    <p className={`font-poppins text-xl sm:text-2xl md:text-[1.65rem] font-medium leading-relaxed text-foreground ${isTyping ? 'typing-cursor' : ''}`}>
                      {displayedText}
                    </p>
                    <div className="text-6xl font-serif text-primary/20 leading-none mt-2 select-none text-right">"</div>
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Empty */}
              {!isLoading && !question && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                  <div className="w-16 h-16 rounded-2xl glass border border-primary/20 flex items-center justify-center mx-auto mb-5">
                    <Quote className="w-7 h-7 text-primary/50" />
                  </div>
                  <p className="text-muted-foreground font-inter text-sm sm:text-base">
                    Your question awaits. Hit <span className="text-primary">Generate</span> to begin.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Bottom accent line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGenerate}
            disabled={isLoading}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-poppins font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Generating...' : 'Generate Again'}
          </motion.button>

          <AnimatePresence>
            {question && !isLoading && (
              <>
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onSave}
                  className={`inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl glass border font-poppins font-semibold text-sm transition-all duration-300 ${
                    isSaved ? 'border-primary/50 text-primary shadow-md shadow-primary/10' : 'border-border/40 hover:border-primary/30 text-foreground'
                  }`}
                >
                  {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  {isSaved ? 'Saved' : 'Save'}
                </motion.button>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative"
                  ref={shareRef}
                >
                  <motion.button
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowShare(!showShare)}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl glass border border-accent/20 hover:border-accent/40 text-foreground font-poppins font-semibold text-sm transition-all"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </motion.button>

                  <AnimatePresence>
                    {showShare && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 flex items-center gap-1.5 p-2 rounded-2xl glass-strong border border-border/30 shadow-xl shadow-black/20 whitespace-nowrap"
                      >
                        <button onClick={handleCopy} title="Copy text"
                          className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-primary/10 transition-colors text-sm font-inter text-muted-foreground hover:text-foreground">
                          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                          <span>Copy</span>
                        </button>
                        <div className="w-px h-6 bg-border/50" />
                        <button onClick={handleShareTwitter} title="Share on Twitter"
                          className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-primary/10 transition-colors text-sm font-inter text-muted-foreground hover:text-foreground">
                          <Twitter className="w-4 h-4" />
                          <span>Twitter</span>
                        </button>
                        <div className="w-px h-6 bg-border/50" />
                        <button onClick={handleShareWhatsApp} title="Share on WhatsApp"
                          className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-primary/10 transition-colors text-sm font-inter text-muted-foreground hover:text-foreground">
                          <MessageCircle className="w-4 h-4" />
                          <span>WhatsApp</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
