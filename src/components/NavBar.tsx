import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#intro', label: 'Введение' },
  { href: '#research', label: 'Порода' },
  { href: '#breeds', label: 'Рейтинг' },
  { href: '#character', label: 'Характер' },
  { href: '#methods', label: 'Методы' },
  { href: '#choice', label: 'Выбор породы' },
  { href: '#quiz', label: 'Тест' },
  { href: '#conclusion', label: 'Вывод' },
  { href: '#sources', label: 'Источники' },
];

interface NavBarProps {
  scrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
}

export default function NavBar({ scrolled, menuOpen, setMenuOpen }: NavBarProps) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', scrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-transparent')}>
      <div className="container mx-auto flex items-center justify-between px-6 py-3 md:px-12">

        {/* Лого */}
        <a href="#" className="flex items-center gap-2 text-sm font-semibold text-white">
          <span>🐾</span>
          <span className="text-amber-400">Собаки и обучаемость</span>
        </a>

        {/* Desktop-навигация */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200',
                  isActive
                    ? 'bg-amber-400/15 text-amber-400'
                    : 'text-white/50 hover:bg-white/5 hover:text-white'
                )}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Hamburger */}
        <button
          className="flex flex-col gap-1.5 p-1 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Меню"
        >
          <span className={cn('block h-0.5 w-6 bg-white transition-all duration-300', menuOpen && 'translate-y-2 rotate-45')} />
          <span className={cn('block h-0.5 w-6 bg-white transition-all duration-300', menuOpen && 'opacity-0')} />
          <span className={cn('block h-0.5 w-6 bg-white transition-all duration-300', menuOpen && '-translate-y-2 -rotate-45')} />
        </button>
      </div>

      {/* Mobile-меню */}
      <div className={cn(
        'overflow-hidden transition-all duration-300 md:hidden',
        menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      )}>
        <div className="border-t border-white/10 bg-black/98 px-6 pb-6 pt-3">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 border-b border-white/5 py-3 text-sm transition-colors last:border-0',
                  isActive ? 'text-amber-400' : 'text-white/60 hover:text-white'
                )}
              >
                {isActive && <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />}
                {!isActive && <span className="h-1.5 w-1.5 rounded-full bg-transparent" />}
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
