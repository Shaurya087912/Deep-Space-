import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles, ChevronLeft, Check, AlertCircle, Zap, Brain, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

// ── Floating orb background ──────────────────────────────────────────────────
function AuthParticles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    let id;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      sx: (Math.random() - 0.5) * 0.25,
      sy: (Math.random() - 0.5) * 0.25,
      op: Math.random() * 0.5 + 0.1,
      po: Math.random() * Math.PI * 2,
      ps: Math.random() * 0.015 + 0.005,
      col: [[168,130,255],[96,200,255],[255,100,200],[100,255,230]][Math.floor(Math.random()*4)],
    }));
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t++;
      particles.forEach(p => {
        p.x += p.sx; p.y += p.sy;
        if (p.x < 0 || p.x > canvas.width) p.sx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.sy *= -1;
        const op = p.op * (0.5 + 0.5 * Math.sin(t * p.ps + p.po));
        const [r, g, b] = p.col;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${op})`; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${op * 0.12})`; ctx.fill();
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(id);
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// ── Animated SVG illustration ────────────────────────────────────────────────
function SpaceIllustration() {
  return (
    <div className="relative w-full flex items-center justify-center py-8">
      <svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-64 h-64 sm:w-80 sm:h-80">
        {/* Outer ring */}
        <motion.circle cx="160" cy="160" r="140" stroke="url(#ring1)" strokeWidth="1" strokeDasharray="8 12"
          animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '160px 160px' }} />
        {/* Middle ring */}
        <motion.circle cx="160" cy="160" r="100" stroke="url(#ring2)" strokeWidth="1" strokeDasharray="4 8"
          animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '160px 160px' }} />
        {/* Inner ring */}
        <motion.circle cx="160" cy="160" r="60" stroke="url(#ring3)" strokeWidth="1.5" strokeDasharray="2 6"
          animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '160px 160px' }} />
        {/* Core glow */}
        <circle cx="160" cy="160" r="40" fill="url(#coreGlow)" />
        <motion.circle cx="160" cy="160" r="35" fill="url(#coreInner)"
          animate={{ r: [32, 36, 32] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
        {/* Brain icon center */}
        <text x="160" y="170" textAnchor="middle" fontSize="32" fill="rgba(168,130,255,0.9)">🧠</text>
        {/* Orbiting dots */}
        {[0, 90, 180, 270].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <motion.circle key={i} r={i % 2 === 0 ? 5 : 3.5}
              fill={['#a882ff','#60c8ff','#ff64c8','#64ffe6'][i]}
              animate={{ rotate: 360 }} transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '160px 160px' }}
              cx={160 + 100 * Math.cos(rad)} cy={160 + 100 * Math.sin(rad)}
            />
          );
        })}
        {/* Star sparkles */}
        {[[50,60],[270,80],[240,250],[70,240],[160,20]].map(([x,y],i) => (
          <motion.text key={i} x={x} y={y} textAnchor="middle" fontSize={i===0||i===3?"14":"10"} fill="rgba(168,130,255,0.6)"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2 + i * 0.7, repeat: Infinity, delay: i * 0.4 }}
            style={{ transformOrigin: `${x}px ${y}px` }}>✦</motion.text>
        ))}
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a882ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#a882ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="coreInner" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.1" />
          </radialGradient>
          <linearGradient id="ring1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a882ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#60c8ff" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="ring2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60c8ff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ff64c8" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="ring3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff64c8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#a882ff" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
      {/* Floating labels */}
      {[
        { text: '200+ Questions', x: 'left-0', y: 'top-12', delay: 0 },
        { text: '5 Categories', x: 'right-0', y: 'top-16', delay: 0.3 },
        { text: 'Deep Thinking', x: 'left-2', y: 'bottom-12', delay: 0.6 },
        { text: 'AI Powered', x: 'right-2', y: 'bottom-8', delay: 0.9 },
      ].map((tag, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + tag.delay, duration: 0.6 }}
          className={`absolute ${tag.x} ${tag.y} px-3 py-1.5 rounded-full glass border border-primary/20 whitespace-nowrap`}
        >
          <span className="text-[10px] font-orbitron font-bold text-primary/80 tracking-wider">{tag.text}</span>
        </motion.div>
      ))}
    </div>
  );
}

// ── Input component ──────────────────────────────────────────────────────────
function FloatingInput({ id, label, type = 'text', value, onChange, icon: Icon, error, autoComplete }) {
  const [focused, setFocused] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const isPass = type === 'password';
  const filled = value?.length > 0;

  return (
    <div className="relative">
      <div className={`relative rounded-xl border transition-all duration-300 ${
        error ? 'border-red-500/50 bg-red-500/5' :
        focused ? 'border-primary/60 bg-primary/5 shadow-sm shadow-primary/10' :
        filled ? 'border-primary/25 bg-card/40' :
        'border-border/30 bg-card/30'
      }`}>
        {/* Icon */}
        <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
          focused ? 'text-primary' : 'text-muted-foreground/50'
        }`}>
          <Icon className="w-4 h-4" />
        </div>
        {/* Floating label */}
        <label htmlFor={id}
          className={`absolute left-11 transition-all duration-200 pointer-events-none font-inter ${
            focused || filled
              ? 'top-2 text-[10px] tracking-wider uppercase text-primary/70'
              : 'top-1/2 -translate-y-1/2 text-sm text-muted-foreground/60'
          }`}
        >{label}</label>
        {/* Input */}
        <input
          id={id}
          type={isPass ? (showPass ? 'text' : 'password') : type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoComplete={autoComplete}
          className="w-full bg-transparent text-foreground text-sm font-inter pl-11 pr-12 pt-6 pb-2.5 rounded-xl outline-none placeholder-transparent"
        />
        {/* Password toggle */}
        {isPass && (
          <button type="button" onClick={() => setShowPass(!showPass)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors">
            {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400 font-inter pl-1">
          <AlertCircle className="w-3 h-3 flex-shrink-0" />{error}
        </motion.p>
      )}
    </div>
  );
}

// ── Password strength bar ────────────────────────────────────────────────────
function PasswordStrength({ password }) {
  if (!password) return null;
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['bg-red-500', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400'];

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[0,1,2,3].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${i < score ? colors[score-1] : 'bg-border/40'}`} />
        ))}
      </div>
      <p className={`text-[10px] font-inter ${['text-red-400','text-orange-400','text-yellow-400','text-green-400'][score-1] || 'text-muted-foreground'}`}>
        {score > 0 ? labels[score - 1] : 'Enter a password'}
      </p>
    </div>
  );
}

// ── Main Auth Page ───────────────────────────────────────────────────────────
export default function Auth() {
  const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'forgot'
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const set = (field) => (e) => setForm(p => ({ ...p, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (mode === 'signup' && !form.name.trim()) e.name = 'Name is required';
    if (!form.email.includes('@')) e.email = 'Enter a valid email';
    if (mode !== 'forgot') {
      if (form.password.length < 8) e.password = 'At least 8 characters required';
      if (mode === 'signup' && form.password !== form.confirm) e.confirm = 'Passwords do not match';
      if (mode === 'signup' && !agreed) e.agreed = 'Please accept the terms';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1800);
  };

  const switchMode = (m) => {
    setMode(m);
    setErrors({});
    setSuccess(false);
    setForm({ name: '', email: '', password: '', confirm: '' });
  };

  const modeConfig = {
    login: { title: 'Welcome Back', sub: 'The universe missed your questions.', cta: 'Sign In', ctaSub: "Don't have an account?" },
    signup: { title: 'Join DeepSpace', sub: 'Begin your journey into deep thought.', cta: 'Create Account', ctaSub: 'Already have an account?' },
    forgot: { title: 'Reset Access', sub: "We'll send you a portal back in.", cta: 'Send Reset Link', ctaSub: 'Remembered your password?' },
  };
  const cfg = modeConfig[mode];

  return (
    <div className="relative min-h-screen animated-gradient flex overflow-hidden">
      {/* ── LEFT PANEL (decorative, desktop only) ── */}
      <div className="hidden lg:flex lg:w-[52%] xl:w-[55%] relative flex-col items-center justify-center p-12 overflow-hidden">
        <AuthParticles />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        {/* Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 text-center max-w-md">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-2.5 mb-10 group">
            <div className="relative">
              <Sparkles className="w-7 h-7 text-primary" />
              <div className="absolute inset-0 blur-lg bg-primary/40 group-hover:bg-primary/60 transition-all" />
            </div>
            <span className="font-orbitron text-xl font-black tracking-wider text-foreground">
              DEEP<span className="text-primary">SPACE</span>
            </span>
          </Link>

          <SpaceIllustration />

          <motion.h2
            key={mode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-orbitron text-2xl xl:text-3xl font-bold text-foreground mb-3 mt-2"
          >
            {mode === 'login' ? 'Think Deeper.' : mode === 'signup' ? 'Start Questioning.' : 'Come Back.'}
          </motion.h2>
          <motion.p
            key={mode + 'sub'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground font-inter text-sm leading-relaxed"
          >
            200+ AI-generated questions for introspection,<br />philosophy & late-night thinking.
          </motion.p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-7">
            {['Deep Questions','5 Categories','Save & Share','Daily Prompt'].map((f, i) => (
              <motion.span key={f} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.07 }}
                className="px-3 py-1 rounded-full glass border border-primary/15 text-xs font-inter text-muted-foreground">
                ✦ {f}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL (form) ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12 relative overflow-y-auto">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="relative">
              <Sparkles className="w-6 h-6 text-primary" />
              <div className="absolute inset-0 blur-md bg-primary/40" />
            </div>
            <span className="font-orbitron text-base font-black tracking-wider text-foreground">
              DEEP<span className="text-primary">SPACE</span>
            </span>
          </Link>
        </div>

        {/* Back to home */}
        <div className="absolute top-6 right-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-inter text-muted-foreground hover:text-foreground transition-colors group">
            <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back to site
          </Link>
        </div>

        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30"
                >
                  <Check className="w-9 h-9 text-white" />
                </motion.div>
                <h2 className="font-orbitron text-2xl font-bold text-foreground mb-2">
                  {mode === 'forgot' ? 'Check Your Inbox' : mode === 'signup' ? 'Welcome Aboard!' : 'Welcome Back!'}
                </h2>
                <p className="text-muted-foreground font-inter text-sm mb-8 max-w-xs mx-auto">
                  {mode === 'forgot' ? 'A reset link is on its way to your cosmos.' :
                   mode === 'signup' ? 'Your journey into deep thought begins now.' :
                   'The universe is ready for your questions.'}
                </p>
                <Link to="/"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-poppins font-semibold text-sm shadow-lg shadow-primary/20">
                  <Zap className="w-4 h-4" />
                  {mode === 'forgot' ? 'Back to Login' : 'Enter DeepSpace'}
                </Link>
              </motion.div>
            ) : (
              <motion.div key={mode}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                {/* Header */}
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-primary/20 mb-5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-inter uppercase tracking-[0.15em] text-muted-foreground">
                      {mode === 'login' ? 'Returning Explorer' : mode === 'signup' ? 'New Traveler' : 'Access Recovery'}
                    </span>
                  </div>
                  <h1 className="font-orbitron text-3xl sm:text-4xl font-black text-foreground mb-2">{cfg.title}</h1>
                  <p className="text-muted-foreground font-inter text-sm">{cfg.sub}</p>
                </div>

                {/* Social login buttons */}
                {mode !== 'forgot' && (
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {[
                      { icon: '🌐', label: 'Google' },
                      { icon: '⬛', label: 'GitHub' },
                    ].map((social) => (
                      <motion.button key={social.label} type="button"
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl glass border border-border/30 hover:border-primary/30 transition-all duration-300 font-inter text-sm text-muted-foreground hover:text-foreground"
                      >
                        <span className="text-base">{social.icon}</span>
                        Continue with {social.label}
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Divider */}
                {mode !== 'forgot' && (
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border/50 to-border/50" />
                    <span className="text-xs font-inter text-muted-foreground/60 px-2">or continue with email</span>
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent via-border/50 to-border/50" />
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === 'signup' && (
                    <FloatingInput id="name" label="Full Name" value={form.name} onChange={set('name')}
                      icon={User} error={errors.name} autoComplete="name" />
                  )}
                  <FloatingInput id="email" label="Email Address" type="email" value={form.email}
                    onChange={set('email')} icon={Mail} error={errors.email} autoComplete="email" />
                  {mode !== 'forgot' && (
                    <div>
                      <FloatingInput id="password" label="Password" type="password" value={form.password}
                        onChange={set('password')} icon={Lock} error={errors.password} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} />
                      {mode === 'signup' && <PasswordStrength password={form.password} />}
                    </div>
                  )}
                  {mode === 'signup' && (
                    <FloatingInput id="confirm" label="Confirm Password" type="password" value={form.confirm}
                      onChange={set('confirm')} icon={Lock} error={errors.confirm} autoComplete="new-password" />
                  )}

                  {/* Forgot password link */}
                  {mode === 'login' && (
                    <div className="flex justify-end -mt-1">
                      <button type="button" onClick={() => switchMode('forgot')}
                        className="text-xs font-inter text-primary/70 hover:text-primary transition-colors">
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {/* Terms */}
                  {mode === 'signup' && (
                    <div className="space-y-1">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border flex-shrink-0 transition-all duration-200 ${
                          agreed ? 'bg-primary border-primary' : 'border-border/50 group-hover:border-primary/40'
                        }`} onClick={() => setAgreed(!agreed)}>
                          {agreed && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                        <span className="text-xs font-inter text-muted-foreground leading-relaxed">
                          I agree to the{' '}
                          <span className="text-primary hover:underline cursor-pointer">Terms of Service</span>
                          {' '}and{' '}
                          <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span>
                        </span>
                      </label>
                      {errors.agreed && (
                        <p className="text-xs text-red-400 font-inter pl-7 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />{errors.agreed}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={loading}
                    className="relative w-full py-4 rounded-xl overflow-hidden font-poppins font-semibold text-base text-white transition-all duration-300 mt-2 disabled:opacity-70"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-neon-pink/60 to-accent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-accent via-neon-pink/60 to-primary opacity-0 hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 shadow-[0_0_30px_rgba(168,130,255,0.3)]" />
                    <span className="relative z-10 flex items-center justify-center gap-2.5">
                      {loading ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          {cfg.cta}
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </span>
                  </motion.button>
                </form>

                {/* Mode switch */}
                <p className="text-center text-sm font-inter text-muted-foreground mt-6">
                  {cfg.ctaSub}{' '}
                  <button onClick={() => switchMode(mode === 'login' ? 'signup' : mode === 'signup' ? 'login' : 'login')}
                    className="text-primary font-semibold hover:text-primary/80 transition-colors">
                    {mode === 'login' ? 'Create account' : 'Sign in'}
                  </button>
                </p>

                {/* Trust badges */}
                {mode === 'signup' && (
                  <div className="flex items-center justify-center gap-4 mt-6 pt-5 border-t border-border/15">
                    {[{ icon: '🔒', text: 'Secure & Private' }, { icon: '✦', text: 'No Spam' }, { icon: '🌌', text: 'Free Forever' }].map((b) => (
                      <div key={b.text} className="flex items-center gap-1.5">
                        <span className="text-xs">{b.icon}</span>
                        <span className="text-[10px] font-inter text-muted-foreground/60">{b.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
