import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#research', label: 'Глава 1' },
  { href: '#breeds', label: 'Рейтинг пород' },
  { href: '#character', label: 'Глава 2' },
  { href: '#methods', label: 'Глава 3' },
  { href: '#choice', label: 'Глава 4' },
  { href: '#quiz', label: '🐾 Тест' },
  { href: '#conclusion', label: 'Вывод' },
  { href: '#sources', label: 'Источники' },
];

interface NavBarProps {
  scrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
}

export default function NavBar({ scrolled, menuOpen, setMenuOpen }: NavBarProps) {
  return (
    <nav className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-transparent')}>
      <div className="container mx-auto flex items-center justify-between px-8 py-4 md:px-16">
        <a href="#" className="text-sm font-semibold text-white">
          🐾 <span className="ml-1 text-amber-400">Собаки и обучаемость</span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">{link.label}</a>
          ))}
        </div>
        <button className="flex flex-col gap-1.5 md:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Меню">
          <span className={cn('block h-0.5 w-6 bg-white transition-all', menuOpen && 'translate-y-2 rotate-45')} />
          <span className={cn('block h-0.5 w-6 bg-white transition-all', menuOpen && 'opacity-0')} />
          <span className={cn('block h-0.5 w-6 bg-white transition-all', menuOpen && '-translate-y-2 -rotate-45')} />
        </button>
      </div>
      {menuOpen && (
        <div className="border-t border-white/10 bg-black/95 px-8 pb-6 pt-4 md:hidden">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="block py-3 text-sm text-white/70 hover:text-white">{link.label}</a>
          ))}
        </div>
      )}
    </nav>
  );
}