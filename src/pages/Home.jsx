import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import ParticleBackground from '../components/deepspace/ParticleBackground';
import Navbar from '../components/deepspace/Navbar';
import HeroSection from '../components/deepspace/HeroSection';
import QuestionCard from '../components/deepspace/QuestionCard';
import CategorySection from '../components/deepspace/CategorySection';
import QuoteStrip from '../components/deepspace/QuoteStrip';
import DailyQuestion from '../components/deepspace/DailyQuestion';
import SavedQuestions from '../components/deepspace/SavedQuestions';
import Footer from '../components/deepspace/Footer';
import { getRandomQuestion } from '../lib/questionBank';

const STORAGE_KEY = 'deepspace-saved-questions';
const THEME_KEY = 'deepspace-theme';

export default function Home() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY);
    return saved ? saved === 'dark' : true;
  });
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [savedQuestions, setSavedQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  // Apply dark/light theme
  useEffect(() => {
    document.documentElement.classList.toggle('light', !isDark);
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  }, [isDark]);

  // Persist saved questions
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedQuestions));
  }, [savedQuestions]);

  const generateQuestion = useCallback((cat) => {
    setIsLoading(true);
    const delay = 900 + Math.random() * 600;
    setTimeout(() => {
      const result = getRandomQuestion(cat !== undefined ? cat : activeCategory);
      setQuestion(result.text);
      setCategory(result.category);
      setIsLoading(false);
    }, delay);
  }, [activeCategory]);

  const handleSelectCategory = (catId) => {
    const newCat = catId === activeCategory ? null : catId;
    setActiveCategory(newCat);
    generateQuestion(newCat);
    setTimeout(() => {
      document.getElementById('generate')?.scrollIntoView({ behavior: 'smooth' });
    }, 120);
  };

  const handleSave = () => {
    if (!question) return;
    const alreadySaved = savedQuestions.some(q => q.text === question);
    if (alreadySaved) {
      setSavedQuestions(prev => prev.filter(q => q.text !== question));
      toast('Removed from saved');
    } else {
      setSavedQuestions(prev => [
        { text: question, category, date: new Date().toISOString() },
        ...prev,
      ]);
      toast.success('Question saved to your collection!');
    }
  };

  const handleRemoveSaved = (index) => {
    setSavedQuestions(prev => prev.filter((_, i) => i !== index));
  };

  const handleHeroGenerate = () => {
    generateQuestion(activeCategory);
    setTimeout(() => {
      document.getElementById('generate')?.scrollIntoView({ behavior: 'smooth' });
    }, 120);
  };

  const isSaved = savedQuestions.some(q => q.text === question);

  return (
    <div className={`relative min-h-screen animated-gradient overflow-x-hidden transition-colors duration-700 ${isDark ? '' : 'light'}`}>
      <ParticleBackground />
      <Navbar isDark={isDark} onToggle={() => setIsDark(p => !p)} />

      <main className="relative z-10">
        <HeroSection onGenerate={handleHeroGenerate} />

        <QuestionCard
          question={question}
          isLoading={isLoading}
          onGenerate={() => generateQuestion()}
          onSave={handleSave}
          isSaved={isSaved}
          category={category}
        />

        <CategorySection
          onSelectCategory={handleSelectCategory}
          activeCategory={activeCategory}
        />

        <QuoteStrip />

        <DailyQuestion />

        <SavedQuestions
          savedQuestions={savedQuestions}
          onRemove={handleRemoveSaved}
        />
      </main>

      <Footer />
    </div>
  );
}
