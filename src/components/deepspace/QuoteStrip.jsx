import { motion } from 'framer-motion';

const quotes = [
  { text: "The unexamined life is not worth living.", author: "Socrates" },
  { text: "He who has a why to live can bear almost any how.", author: "Nietzsche" },
  { text: "We are all just walking each other home.", author: "Ram Dass" },
  { text: "The wound is the place where the light enters you.", author: "Rumi" },
  { text: "Man is condemned to be free.", author: "Sartre" },
  { text: "In the middle of difficulty lies opportunity.", author: "Einstein" },
  { text: "One must imagine Sisyphus happy.", author: "Camus" },
  { text: "To live is the rarest thing in the world.", author: "Oscar Wilde" },
];

export default function QuoteStrip() {
  return (
    <section className="py-16 sm:py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-xs font-inter uppercase tracking-[0.2em] text-muted-foreground/60">
            Voices That Echo Through Time
          </span>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {quotes.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass rounded-2xl p-5 border border-border/20 hover:border-primary/20 transition-all duration-300 cursor-default group"
            >
              <div className="text-3xl text-primary/20 font-serif leading-none mb-2 select-none group-hover:text-primary/30 transition-colors">"</div>
              <p className="font-poppins text-sm text-foreground/90 leading-relaxed mb-3 italic">
                {q.text}
              </p>
              <p className="text-xs font-orbitron font-bold text-primary/60 uppercase tracking-wider">
                — {q.author}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
