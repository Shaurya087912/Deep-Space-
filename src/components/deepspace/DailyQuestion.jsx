import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sunrise, Copy, Check, Share2, Twitter } from 'lucide-react';
import { toast } from 'sonner';
import { dailyQuestionPool } from '../../lib/questionBank';

export default function DailyQuestion() {
  const [copied, setCopied] = useState(false);

  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const question = dailyQuestionPool[dayOfYear % dailyQuestionPool.length];
  const dateString = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const handleCopy = async () => {
    await navigator.clipboard.writeText(question);
    setCopied(true);
    toast.success('Daily question copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Today's deep question:\n"${question}"\n\n— DeepSpace Questions ✨`)}`, '_blank');
  };

  return (
    <section id="daily" className="relative py-20 sm:py-28 px-4">
      {/* Section bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-accent/20 mb-5">
            <Sunrise className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-inter uppercase tracking-[0.15em] text-muted-foreground">Daily Reflection</span>
          </div>
          <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Today's <span className="text-accent">Question</span>
          </h2>
          <p className="text-muted-foreground font-inter text-sm sm:text-base max-w-md mx-auto">
            One question, every day. Let it live with you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative group"
        >
          {/* Glow layers */}
          <div className="absolute -inset-2 bg-gradient-to-r from-accent/15 via-primary/10 to-neon-cyan/15 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-700" />

          <div className="relative glass-strong rounded-3xl overflow-hidden border border-accent/15">
            {/* Top strip */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/70 to-transparent" />

            <div className="p-8 sm:p-14">
              {/* Date header */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <Sunrise className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <div className="text-xs font-orbitron font-bold tracking-[0.2em] text-accent uppercase mb-1">
                    Question of the Day
                  </div>
                  <div className="text-sm text-muted-foreground font-inter">{dateString}</div>
                </div>
                {/* Refresh indicator */}
                <div className="sm:ml-auto flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-border/30">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs font-inter text-muted-foreground">Resets at midnight</span>
                </div>
              </div>

              {/* Question */}
              <div className="relative">
                <div className="text-7xl font-serif text-accent/15 leading-none mb-1 select-none absolute -top-4 -left-2">"</div>
                <p className="font-poppins text-xl sm:text-2xl md:text-3xl font-medium text-foreground leading-relaxed pl-4 pr-4">
                  {question}
                </p>
                <div className="text-7xl font-serif text-accent/15 leading-none mt-1 select-none text-right">"</div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 mt-10 pt-8 border-t border-border/20">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-accent/20 hover:border-accent/50 text-sm font-inter font-medium text-muted-foreground hover:text-foreground transition-all duration-300"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={handleShareTwitter}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-border/30 hover:border-primary/30 text-sm font-inter font-medium text-muted-foreground hover:text-foreground transition-all duration-300"
                >
                  <Twitter className="w-4 h-4" />
                  Share on Twitter
                </button>
                <div className="ml-auto hidden sm:block">
                  <span className="text-xs font-inter text-muted-foreground/50 italic">
                    Sit with it. Don't rush the answer.
                  </span>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
