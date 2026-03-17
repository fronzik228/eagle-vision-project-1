import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const images = [
  'https://cdn.poehali.dev/projects/c7e82e52-3a4a-4bcc-9114-d9a28012259c/files/de9df55a-afa8-41ec-8dbe-a1fa5bc9e2c3.jpg',
  'https://cdn.poehali.dev/projects/c7e82e52-3a4a-4bcc-9114-d9a28012259c/files/0ea442ea-5114-45f2-a858-cbdadb258def.jpg',
  'https://cdn.poehali.dev/projects/c7e82e52-3a4a-4bcc-9114-d9a28012259c/files/1978a800-0bdf-4ebe-9990-f09465e418d1.jpg',
  'https://cdn.poehali.dev/projects/c7e82e52-3a4a-4bcc-9114-d9a28012259c/files/87ea1773-9133-4f1e-9c22-f49a8e522e7c.jpg',
];

const breeds = [
  { name: 'Бордер-колли', rank: 1, trait: 'Гений среди собак', desc: 'Усваивает новую команду за 5 повторений, выполняет с первого раза в 95% случаев' },
  { name: 'Пудель', rank: 2, trait: 'Умный и легко обучаемый', desc: 'Исключительная память и желание угождать хозяину делают его идеальным учеником' },
  { name: 'Немецкая овчарка', rank: 3, trait: 'Мастер дрессировки', desc: 'Универсальная служебная порода — полиция, армия, поисково-спасательные операции' },
  { name: 'Золотистый ретривер', rank: 4, trait: 'Отличник по послушанию', desc: 'Мягкий характер и высокая мотивация к одобрению человека обеспечивают лёгкое обучение' },
  { name: 'Доберман', rank: 5, trait: 'Быстро схватывает команды', desc: 'Энергичный и сосредоточенный — один из лучших в сложных служебных задачах' },
  { name: 'Лабрадор', rank: 7, trait: 'Дружелюбный и послушный', desc: 'Самая популярная порода-поводырь благодаря спокойному нраву и отличной обучаемости' },
  { name: 'Сибирский хаски', rank: 45, trait: 'Независимый и упрямый', desc: 'Умная порода, но с сильным охотничьим инстинктом — требует опытного дрессировщика' },
  { name: 'Чау-чау', rank: 76, trait: 'Независимый характер', desc: 'Кошачья самостоятельность — выполняет команды только когда сам считает нужным' },
  { name: 'Мопс', rank: 57, trait: 'Живёт по своим правилам', desc: 'Обучается охотнее при наличии вкусного угощения, иначе демонстрирует полное безразличие' },
  { name: 'Афганская борзая', rank: 79, trait: 'Самая "неудобная" в обучении', desc: 'Древняя охотничья порода с развитым инстинктом независимости — настоящий вызов для дрессировщика' },
];

const navLinks = [
  { href: '#research', label: 'Глава 1' },
  { href: '#breeds', label: 'Рейтинг пород' },
  { href: '#character', label: 'Глава 2' },
  { href: '#methods', label: 'Глава 3' },
  { href: '#choice', label: 'Глава 4' },
  { href: '#conclusion', label: 'Вывод' },
  { href: '#sources', label: 'Источники' },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      {/* Navigation */}
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

      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <div className="absolute inset-0">
          {images.map((src, index) => (
            <div key={src} className={cn('absolute inset-0 transition-opacity duration-1000 ease-in-out', currentIndex === index ? 'opacity-100' : 'opacity-0')}>
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="relative z-10 flex h-full items-center">
          <div className="container mx-auto px-8 md:px-16">
            <div className={cn('flex max-w-2xl flex-col gap-8 transform transition-all duration-1000 ease-out', isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0')}>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                <span className="text-sm font-medium text-white/80">🐾 Школьный исследовательский проект</span>
              </div>
              <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
                Порода собаки и её <span className="text-amber-400">обучаемость</span>
              </h1>
              <p className="text-lg font-light leading-relaxed text-white/70 md:text-xl">
                Влияет ли порода на то, насколько легко собаку можно дрессировать? Исследуем науку, рейтинги и факты о самых умных и своенравных породах.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#research" className="rounded-full bg-amber-400 px-8 py-3 text-sm font-semibold text-black transition-all hover:bg-amber-300">Читать исследование</a>
                <a href="#breeds" className="rounded-full border border-white/30 px-8 py-3 text-sm font-semibold text-white transition-all hover:border-white/60 hover:bg-white/10">Рейтинг пород</a>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 z-20 flex gap-2">
          {images.map((_, index) => (
            <button key={index} onClick={() => setCurrentIndex(index)} className={cn('h-1 transition-all duration-300', currentIndex === index ? 'w-12 bg-white' : 'w-8 bg-white/40 hover:bg-white/60')} aria-label={`Перейти к слайду ${index + 1}`} />
          ))}
        </div>
      </section>

      {/* ===== ГЛАВА 1 ===== */}
      <section id="research" className="bg-zinc-950 px-8 py-24 md:px-16">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-400">Глава 1</p>
            <h2 className="text-3xl font-bold text-white md:text-5xl">Порода как фактор обучаемости</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/50">Обзор литературных данных</p>
          </div>

          {/* Введение */}
          <div className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h3 className="mb-5 text-2xl font-semibold text-white">Введение</h3>
            <p className="mb-4 leading-relaxed text-white/70">
              Вопрос о том, насколько порода собаки определяет её способность к обучению, занимает учёных и кинологов уже более ста лет. Первые систематические наблюдения были сделаны ещё в начале XX века, когда военные и полицейские ведомства начали целенаправленно отбирать собак для служебных нужд и обнаружили устойчивые породные различия в обучаемости.
            </p>
            <p className="leading-relaxed text-white/70">
              Современная наука подходит к этому вопросу комплексно: обучаемость рассматривается не как единое свойство, а как совокупность нескольких факторов — генетической предрасположенности, типа темперамента, мотивации и истории одомашнивания конкретной породы. Понимание этих факторов позволяет не только предсказать, насколько легко будет дрессировать ту или иную собаку, но и выбрать наиболее подходящие методы работы с ней.
            </p>
          </div>

          {/* Три карточки */}
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <div className="mb-4 text-4xl">🧬</div>
              <h3 className="mb-3 text-xl font-semibold text-white">Генетическая основа</h3>
              <p className="leading-relaxed text-white/60">
                Породы формировались тысячелетиями под конкретные задачи: охота, пастьба, охрана. Селекционный отбор закрепил не только внешние черты, но и особенности нервной системы, пороги возбудимости и восприимчивость к социальным сигналам человека. Именно поэтому пастушьи породы инстинктивно следят за жестами хозяина, а гончие — предпочитают действовать самостоятельно.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <div className="mb-4 text-4xl">🧠</div>
              <h3 className="mb-3 text-xl font-semibold text-white">Три типа интеллекта</h3>
              <p className="leading-relaxed text-white/60">
                По классификации Стэнли Корена («Интеллект собак», 1994), интеллект делится на инстинктивный (врождённые навыки породы), адаптивный (способность решать новые задачи самостоятельно) и рабочий (скорость усвоения команд от человека). Именно рабочий интеллект чаще всего имеют в виду, когда говорят об «умной» или «послушной» собаке.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <div className="mb-4 text-4xl">📊</div>
              <h3 className="mb-3 text-xl font-semibold text-white">Данные исследований</h3>
              <p className="leading-relaxed text-white/60">В масштабном исследовании Корен опросил более 200 человек и протестировал 138 пород. Выяснилось: лучшие собаки усваивают новую команду за 5 повторений и выполняют её с первого раза в 95% случаев. Породы из нижней части рейтинга требуют 80–100 повторений и подчиняются лишь в 25% случаев. Разрыв — более чем в 16 раз.</p>
            </div>
          </div>

          {/* История одомашнивания */}
          <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h3 className="mb-5 text-2xl font-semibold text-white">История одомашнивания и её роль</h3>
            <p className="mb-4 leading-relaxed text-white/70">
              Собака была одомашнена около 15 000–40 000 лет назад — раньше любого другого животного. За это время люди целенаправленно отбирали особей с нужными поведенческими качествами. Пастушьи породы (бордер-колли, немецкая овчарка, австралийский хилер) формировались для тесного сотрудничества с человеком: им нужно было понимать сложные команды, реагировать на жесты и принимать самостоятельные решения в рамках поставленной задачи.
            </p>
            <p className="mb-4 leading-relaxed text-white/70">
              Охотничьи и борзые породы, напротив, отбирались за способность работать независимо от хозяина — преследовать дичь, самостоятельно принимать решения в поле. Это сделало их менее восприимчивыми к командам, зато наделило высоким адаптивным интеллектом. Декоративные породы, выведенные исключительно для компании, демонстрируют смешанные результаты — в зависимости от того, какие породы были использованы при их создании.
            </p>
            <p className="leading-relaxed text-white/70">
              Важно понимать: низкое место в рейтинге рабочего интеллекта не означает, что собака «глупая». Афганская борзая или чау-чау могут решать сложные задачи самостоятельно — просто их эволюционная стратегия не предполагала слепого следования командам человека.
            </p>
          </div>

          {/* Группы пород */}
          <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h3 className="mb-6 text-2xl font-semibold text-white">Группы пород по обучаемости</h3>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Высший класс (топ-10)', color: 'border-green-500/40 bg-green-500/10', badge: 'bg-green-500/20 text-green-400', badgeText: 'Отлично', desc: 'Бордер-колли, пудель, немецкая овчарка, золотистый ретривер, доберман. Команда за 5 повторений, 95% выполнения.' },
                { label: 'Хорошая обучаемость (11–26)', color: 'border-blue-500/40 bg-blue-500/10', badge: 'bg-blue-500/20 text-blue-400', badgeText: 'Хорошо', desc: 'Лабрадор, ротвейлер, спаниель, колли. Команда за 5–15 повторений, 85% выполнения.' },
                { label: 'Средняя обучаемость (27–39)', color: 'border-amber-500/40 bg-amber-500/10', badge: 'bg-amber-500/20 text-amber-400', badgeText: 'Средне', desc: 'Хаски, далматин, боксёр. Нужно 15–25 повторений, около 70% выполнения.' },
                { label: 'Низкая обучаемость (40–80+)', color: 'border-red-500/40 bg-red-500/10', badge: 'bg-red-500/20 text-red-400', badgeText: 'Сложно', desc: 'Чау-чау, бассет-хаунд, афганская борзая. 80–100 повторений, менее 25% выполнения без особой мотивации.' },
              ].map((g) => (
                <div key={g.label} className={cn('flex flex-col gap-2 rounded-xl border p-5 md:flex-row md:items-center md:gap-6', g.color)}>
                  <span className={cn('w-fit rounded-full px-3 py-1 text-xs font-semibold', g.badge)}>{g.badgeText}</span>
                  <div>
                    <p className="font-medium text-white">{g.label}</p>
                    <p className="mt-0.5 text-sm text-white/60">{g.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ключевые выводы */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h3 className="mb-6 text-xl font-semibold text-white">Ключевые выводы по литературе</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                'Пастушьи и служебные породы стабильно занимают верхние строчки рейтинга обучаемости во всех независимых исследованиях',
                'Охотничьи и примитивные породы склонны к независимости — это эволюционное преимущество, а не недостаток',
                'Генетика определяет потенциал, но не гарантирует результат без правильных условий и методов дрессировки',
                'Внутри одной породы индивидуальные различия в обучаемости могут быть сопоставимы с межпородными',
                'Рейтинги обучаемости отражают именно рабочий интеллект — способность следовать командам человека',
                'Самые «трудные» в дрессировке породы нередко обладают высоким адаптивным интеллектом и самостоятельностью мышления',
              ].map((point, i) => (
                <div key={i} className="flex gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-xs font-bold text-amber-400">{i + 1}</span>
                  <p className="text-white/70">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== РЕЙТИНГ ПОРОД ===== */}
      <section id="breeds" className="bg-black px-8 py-24 md:px-16">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-400">Рейтинг</p>
            <h2 className="text-3xl font-bold text-white md:text-5xl">Кто умнее всех?</h2>
            <p className="mt-4 text-white/50">По шкале Стэнли Корена — 138 пород от самых обучаемых до самых упрямых</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {breeds.map((breed) => (
              <div key={breed.name} className="flex items-start gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-amber-400/30">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-amber-400/10 text-2xl font-bold text-amber-400">#{breed.rank}</div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{breed.name}</h3>
                  <p className="text-sm font-medium text-amber-400/80">{breed.trait}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/50">{breed.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-8 text-center">
            <p className="text-lg text-white/80">
              💡 <strong className="text-amber-400">Вывод:</strong> Порода действительно влияет на обучаемость, но не определяет её полностью. Воспитание, терпение и правильный подход важны для любой собаки.
            </p>
          </div>
        </div>
      </section>

      {/* ===== ГЛАВА 2 ===== */}
      <section id="character" className="bg-zinc-950 px-8 py-24 md:px-16">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-400">Глава 2</p>
            <h2 className="text-3xl font-bold text-white md:text-5xl">Роль характера в дрессировке</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/50">Индивидуальные качества собаки важны не меньше породы</p>
          </div>

          {/* Введение главы 2 */}
          <div className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h3 className="mb-5 text-2xl font-semibold text-white">Почему характер имеет значение</h3>
            <p className="mb-4 leading-relaxed text-white/70">
              Даже внутри одной породы собаки могут существенно различаться по своей обучаемости. Два лабрадора из одного помёта могут вести себя принципиально по-разному: один будет старательно выполнять команды, другой — игнорировать их при малейшем отвлечении. Это объясняется индивидуальным темпераментом — совокупностью врождённых свойств нервной системы каждой конкретной особи.
            </p>
            <p className="leading-relaxed text-white/70">
              Исследование Притчард и соавторов (2020) продемонстрировало, что разброс по обучаемости внутри породы может быть сопоставим с межпородными различиями. Это означает, что при работе с конкретной собакой её индивидуальный характер должен учитываться не меньше, чем типичные породные черты.
            </p>
          </div>

          {/* 4 карточки характера */}
          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                icon: '💪',
                title: 'Доминантность',
                text: 'Собаки с высоким доминантным статусом изначально проверяют авторитет хозяина. Для них необходима чёткая иерархия: хозяин должен уверенно занимать позицию лидера. Без этого даже самая «умная» порода будет игнорировать команды. Подобный тип характера часто встречается у ротвейлеров, акита-ину и некоторых линий немецкой овчарки.',
              },
              {
                icon: '😨',
                title: 'Тревожность',
                text: 'Тревожные и пугливые собаки находятся в состоянии хронического стресса, при котором обучение крайне затруднено. Нервная система в режиме тревоги переключается на выживание, а не на усвоение новой информации. Такие животные нуждаются в постепенной десенсибилизации, мягком подходе и исключительно позитивном подкреплении.',
              },
              {
                icon: '🔥',
                title: 'Энергичность',
                text: 'Высокоэнергичные собаки (хаски, джек-рассел терьер, бордер-колли) не способны сосредоточиться, пока не выплеснут накопленную энергию. Ветеринарные бихевиористы рекомендуют обязательную физическую нагрузку перед занятиями: 20–40 минут активной прогулки или игры кардинально улучшают концентрацию и восприимчивость к командам.',
              },
              {
                icon: '🤝',
                title: 'Ориентация на человека',
                text: 'Одно из ключевых свойств, определяющих лёгкость обучения. Собаки, глубоко привязанные к хозяину (лабрадор, золотистый ретривер, бордер-колли), воспринимают само одобрение человека как высшую награду. Это делает их исключительно мотивированными учениками даже без угощения.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-8">
                <div className="mb-4 text-4xl">{item.icon}</div>
                <h3 className="mb-3 text-xl font-semibold text-white">{item.title}</h3>
                <p className="leading-relaxed text-white/60">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Типология темперамента */}
          <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h3 className="mb-6 text-2xl font-semibold text-white">Типология темперамента по Вильям Кэмпбеллу</h3>
            <p className="mb-6 leading-relaxed text-white/70">
              Американский кинолог Вильям Кэмпбелл разработал тест темперамента, который до сих пор используется при отборе щенков для служебной работы. Он выделил пять основных типов, каждый из которых требует своего подхода к обучению:
            </p>
            <div className="flex flex-col gap-4">
              {[
                { type: 'Доминантно-агрессивный', color: 'text-red-400', desc: 'Требует очень опытного дрессировщика. Без правильной работы склонен к агрессии. При грамотном подходе — отличная рабочая собака.' },
                { type: 'Доминантный', color: 'text-orange-400', desc: 'Уверен в себе, настойчив. Хорошо поддаётся обучению при наличии чёткой иерархии и последовательных требований.' },
                { type: 'Уравновешенный', color: 'text-green-400', desc: 'Идеальный тип для обучения. Легко адаптируется, хорошо реагирует на позитивное подкрепление, дружелюбен.' },
                { type: 'Подчинённый', color: 'text-blue-400', desc: 'Очень привязан к хозяину, легко обучается, но болезненно реагирует на резкость и наказания. Требует мягкого подхода.' },
                { type: 'Подчинённо-боязливый', color: 'text-purple-400', desc: 'Наиболее сложный тип. Склонен к паническим реакциям, нуждается в длительной социализации и терапевтическом подходе.' },
              ].map((t) => (
                <div key={t.type} className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-5">
                  <span className={cn('mt-0.5 w-44 shrink-0 text-sm font-semibold', t.color)}>{t.type}</span>
                  <p className="text-sm leading-relaxed text-white/60">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Вывод главы 2 */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h3 className="mb-5 text-2xl font-semibold text-white">Роль социализации и раннего опыта</h3>
            <p className="mb-4 leading-relaxed text-white/70">
              Характер собаки формируется не только генетически — огромную роль играет период социализации (3–14 недель жизни). В это время щенок закладывает отношение к людям, животным и новым ситуациям. Недостаточная социализация в этот период может существенно снизить обучаемость даже у потенциально «отличника» по породному рейтингу.
            </p>
            <p className="leading-relaxed text-white/70">
              Кроме того, ранний негативный опыт (насилие, заброшенность, изоляция) оставляет устойчивые поведенческие паттерны, которые в дальнейшем мешают обучению. Именно поэтому спасённые собаки из приютов нередко требуют больше времени и терпения, чем щенки, выросшие в благоприятных условиях, — вне зависимости от породы.
            </p>
          </div>
        </div>
      </section>

      {/* ===== ГЛАВА 3 ===== */}
      <section id="methods" className="bg-black px-8 py-24 md:px-16">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-400">Глава 3</p>
            <h2 className="text-3xl font-bold text-white md:text-5xl">Методы дрессировки</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/50">Адаптация под индивидуальные потребности питомца</p>
          </div>

          {/* Введение главы 3 */}
          <div className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h3 className="mb-5 text-2xl font-semibold text-white">Почему метод важен не меньше породы</h3>
            <p className="mb-4 leading-relaxed text-white/70">
              Даже самая обучаемая порода может не раскрыть свой потенциал при неправильном подходе к дрессировке. И наоборот — «сложная» порода способна показать впечатляющие результаты, если дрессировщик подберёт метод, соответствующий её природе и темпераменту.
            </p>
            <p className="leading-relaxed text-white/70">
              Исследование Хиби и соавторов (2004), опубликованное в журнале Animal Welfare, показало: собаки, обученные исключительно методами наказания, демонстрировали более высокий уровень агрессии и тревожности, а также худшее послушание в долгосрочной перспективе по сравнению с собаками, обученными позитивными методами. Это подтверждает: выбор метода имеет принципиальное значение.
            </p>
          </div>

          {/* 4 метода */}
          <div className="mb-12 flex flex-col gap-6">
            {[
              {
                num: '01',
                title: 'Позитивное подкрепление',
                badge: 'Универсальный',
                badgeColor: 'bg-green-500/20 text-green-400',
                text: 'Суть метода — немедленное поощрение желаемого поведения (угощением, похвалой, игрой). Собака связывает действие с положительным результатом и стремится его повторить. Метод работает для большинства пород, особенно эффективен для мягких, ориентированных на человека пород — ретриверов, спаниелей, пуделей.',
                extra: 'Научная база: Б. Скиннер доказал, что положительное подкрепление формирует устойчивое поведение значительно эффективнее, чем наказание. Современная ветеринарная бихевиористика признаёт его методом первого выбора.',
              },
              {
                num: '02',
                title: 'Метод кликера',
                badge: 'Для активных и умных пород',
                badgeColor: 'bg-blue-500/20 text-blue-400',
                text: 'Кликер — небольшое устройство, издающее чёткий звук в момент правильного действия. Этот звук точно маркирует нужное поведение, устраняя задержку между действием и наградой. Особенно эффективен для высокоинтеллектуальных пород (бордер-колли, пудель, австралийская овчарка) — позволяет обучать сложным цепочкам команд и трюкам.',
                extra: 'Кликер активно применяется в дрессировке дельфинов, попугаев и даже кошек — это подтверждает его универсальность как инструмента коммуникации между человеком и животным.',
              },
              {
                num: '03',
                title: 'Игровая дрессировка',
                badge: 'Для энергичных пород',
                badgeColor: 'bg-amber-500/20 text-amber-400',
                text: 'Обучение встраивается непосредственно в игровой процесс. Команды подаются в контексте игры, а выполнение награждается продолжением игры или броском мяча. Идеально для пород с высокой энергией (хаски, малинуа, джек-рассел, бордер-колли), которым сложно сохранять концентрацию в статичном формате занятий.',
                extra: 'В современном кинологическом спорте (аджилити, фрисби, обидиенс) игровая дрессировка является основой подготовки — она обеспечивает и высокие результаты, и удовольствие для собаки.',
              },
              {
                num: '04',
                title: 'Принудительные методы',
                badge: 'Устаревший подход',
                badgeColor: 'bg-red-500/20 text-red-400',
                text: 'Применение физического давления, электрошоковых ошейников или болевой коррекции. Современная кинология и ветеринарная наука признают эти методы устаревшими и вредными. Они повышают уровень кортизола (гормона стресса), разрушают доверие между собакой и человеком, провоцируют агрессию и дают худшие долгосрочные результаты.',
                extra: 'Ряд европейских стран (Германия, Швейцария, Норвегия) законодательно запретил применение болевых инструментов дрессировки. Единственное исключение — жёстко регламентированная специализированная служебная подготовка.',
              },
            ].map((item) => (
              <div key={item.num} className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="text-3xl font-bold text-white/10 md:text-4xl">{item.num}</span>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <span className={cn('rounded-full px-3 py-0.5 text-xs font-medium', item.badgeColor)}>{item.badge}</span>
                </div>
                <p className="mb-4 leading-relaxed text-white/60">{item.text}</p>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm italic leading-relaxed text-white/40">📌 {item.extra}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Адаптация метода */}
          <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h3 className="mb-6 text-2xl font-semibold text-white">Принципы адаптации метода под питомца</h3>
            <p className="mb-6 leading-relaxed text-white/70">
              Грамотный дрессировщик никогда не применяет один и тот же метод ко всем собакам подряд. Адаптация включает несколько уровней: учёт породных особенностей, оценку индивидуального темперамента, анализ мотивации конкретной особи и корректировку в зависимости от прогресса.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                { q: 'Что мотивирует собаку больше всего?', a: 'Для одних — еда, для других — игра, для третьих — похвала. Определите главную валюту вашего питомца.' },
                { q: 'Как долго собака удерживает внимание?', a: 'Занятия должны быть короче порога концентрации: 5 мин. для щенков, 15–20 мин. для взрослых.' },
                { q: 'Как реагирует на ошибки?', a: 'Тревожные собаки сдаются при малейшей неудаче — снизьте планку и чаще хвалите за попытку.' },
                { q: 'Какова энергетика в момент занятия?', a: 'Перевозбуждённая собака не обучается. Усталая — тоже. Ищите «рабочее окно» спокойной активности.' },
              ].map((row) => (
                <div key={row.q} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <p className="mb-2 font-medium text-amber-400">❓ {row.q}</p>
                  <p className="text-sm leading-relaxed text-white/60">{row.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Таблица подбора */}
          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-8">
            <h3 className="mb-6 text-lg font-semibold text-white">📋 Рекомендации по выбору метода</h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {[
                { label: 'Мягкий, ласковый характер', method: 'Позитивное подкрепление' },
                { label: 'Высокий интеллект, активность', method: 'Кликер + сложные задачи' },
                { label: 'Избыток энергии, охотничий инстинкт', method: 'Игровая дрессировка' },
                { label: 'Доминантный характер', method: 'Структурированное обучение с чёткой иерархией' },
                { label: 'Тревожность, пугливость', method: 'Мягкое позитивное подкрепление + десенсибилизация' },
                { label: 'Независимость, самостоятельность', method: 'Игровая + высокоценная мотивация' },
              ].map((row) => (
                <div key={row.label} className="rounded-xl bg-white/5 p-4">
                  <p className="text-sm text-white/50">{row.label}</p>
                  <p className="mt-1 font-medium text-amber-400">→ {row.method}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== ГЛАВА 4: ВЫБОР ПОРОДЫ ===== */}
      <section id="choice" className="bg-zinc-950 px-8 py-24 md:px-16">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-400">Глава 4</p>
            <h2 className="text-3xl font-bold text-white md:text-5xl">Выбор породы под условия жизни</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/50">Практическое руководство: как найти питомца, который подойдёт именно вам</p>
          </div>

          {/* Введение */}
          <div className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h3 className="mb-5 text-2xl font-semibold text-white">Зачем учитывать условия жизни?</h3>
            <p className="mb-4 leading-relaxed text-white/70">
              Выбор породы — одно из самых важных решений будущего владельца. Неправильный выбор приводит к тому, что и человек, и собака страдают: питомец не получает необходимой нагрузки или пространства, хозяин не справляется с требованиями породы. По данным крупнейших приютов России и Европы, от 30 до 40% собак оказываются там именно из-за несовместимости с образом жизни хозяев.
            </p>
            <p className="mb-4 leading-relaxed text-white/70">
              Обучаемость — лишь один из критериев выбора. Не менее важны: уровень активности, потребность в пространстве, социальность, уход за шерстью, здоровье породы и тип привязанности к хозяину. Высокообучаемая порода с колоссальной потребностью в нагрузке (например, бордер-колли) может стать настоящим испытанием для городского жителя без опыта, тогда как менее «рейтинговый» мопс или французский бульдог окажется идеальным компаньоном.
            </p>
            <p className="leading-relaxed text-white/70">
              В этой главе мы рассмотрим ключевые сценарии жизни владельца и подберём породы, которые наилучшим образом соответствуют каждому из них — с учётом обучаемости и практических требований к содержанию.
            </p>
          </div>

          {/* Сценарии */}
          <div className="mb-12 flex flex-col gap-8">
            {[
              {
                icon: '🏙️',
                title: 'Городская квартира, активный хозяин',
                subtitle: 'Небольшое пространство, но много времени на прогулки',
                ideal: ['Лабрадор-ретривер', 'Французский бульдог', 'Миниатюрный шпиц', 'Той-пудель'],
                avoid: ['Бордер-колли', 'Хаски', 'Немецкая овчарка (крупная)', 'Далматин'],
                desc: 'Для квартиры подходят породы с умеренной энергией, которые могут выплеснуть её за время 2–3 прогулок в день. Лабрадор отлично адаптируется к городской жизни при ежедневной активности. Французский бульдог и той-пудель требуют минимум пространства и хорошо переносят одиночество.',
                warning: 'Избегайте пастушьих и ездовых пород — без постоянной интенсивной нагрузки они разрушают жильё, страдают поведенчески и становятся неуправляемыми.',
              },
              {
                icon: '🏡',
                title: 'Частный дом с участком',
                subtitle: 'Просторная территория, возможность держать крупную собаку',
                ideal: ['Немецкая овчарка', 'Золотистый ретривер', 'Бордер-колли', 'Хаски', 'Ротвейлер'],
                avoid: ['Той-породы (риск травм)', 'Чрезмерно ласковые породы (для охраны)'],
                desc: 'Дом с участком открывает возможности для содержания крупных и высокоэнергичных пород. Бордер-колли на природе — счастливое животное с огромным потенциалом. Немецкая овчарка выполняет охранную функцию и при этом остаётся отличным компаньоном для всей семьи.',
                warning: 'Даже при наличии двора собака нуждается в ежедневных целенаправленных прогулках с хозяином — простое «выпускание погулять» не заменяет социального взаимодействия.',
              },
              {
                icon: '👨‍👩‍👧‍👦',
                title: 'Семья с маленькими детьми',
                subtitle: 'Безопасность, терпимость и игривость — главные критерии',
                ideal: ['Золотистый ретривер', 'Лабрадор', 'Бигль', 'Кавалер кинг чарльз спаниель', 'Боксёр'],
                avoid: ['Чау-чау', 'Акита-ину', 'Доберман', 'Афганская борзая'],
                desc: 'С детьми нужна собака с высоким порогом раздражимости, природным терпением и любовью к игре. Золотистый ретривер считается эталоном семейной породы: он мягок с детьми, обучаем и не склонен к агрессии. Бигль — весёлый компаньон, который обожает компанию и редко проявляет доминирование.',
                warning: 'Независимо от породы: детей ВСЕГДА нужно учить правилам общения с собакой, а малышей — никогда не оставлять с собакой без присмотра взрослых.',
              },
              {
                icon: '🧓',
                title: 'Пожилой или малоподвижный владелец',
                subtitle: 'Минимальные физические требования, максимум тепла и преданности',
                ideal: ['Мальтезе', 'Ши-тцу', 'Мопс', 'Французский бульдог', 'Пекинес', 'Болонка'],
                avoid: ['Хаски', 'Бордер-колли', 'Далматин', 'Джек-рассел терьер'],
                desc: 'Для людей с ограниченной подвижностью идеально подойдут маленькие декоративные породы с невысокой потребностью в нагрузке. Мальтезе и ши-тцу — ласковые, некапризные, хорошо чувствуют себя в небольших квартирах. Мопс легко справляется с короткими прогулками и обожает сидеть рядом с хозяином.',
                warning: 'Учитывайте расходы на уход: некоторые декоративные породы (ши-тцу, мальтезе) требуют регулярной стрижки и ухода за шерстью.',
              },
              {
                icon: '🏃',
                title: 'Спортивный и активный хозяин',
                subtitle: 'Бег, велоспорт, походы — собака как партнёр по тренировкам',
                ideal: ['Бордер-колли', 'Веймаранер', 'Визла', 'Бельгийская малинуа', 'Сибирский хаски', 'Доберман'],
                avoid: ['Мопс', 'Бульдог', 'Пекинес', 'Ши-тцу'],
                desc: 'Спортивному хозяину нужна собака с высокой выносливостью, хорошим здоровьем суставов и желанием бежать рядом часами. Хаски прирождённый марафонец — может преодолевать десятки километров без усталости. Визла и веймаранер — элегантные охотничьи породы с огромной энергией и интеллектом.',
                warning: 'Брахицефальные породы (мопс, бульдог, пекинес) не могут активно бегать из-за анатомических особенностей дыхательных путей — физическая перегрузка опасна для их здоровья.',
              },
              {
                icon: '🧑‍💻',
                title: 'Занятой хозяин, много работает дома',
                subtitle: 'Собака рядом весь день, но хозяин занят — нужна самостоятельность',
                ideal: ['Чау-чау', 'Акита-ину', 'Басенджи', 'Шарпей', 'Кот (шутка)'],
                avoid: ['Бордер-колли', 'Пудель', 'Лабрадор (страдает от скуки)'],
                desc: 'Парадокс: «независимые» породы, которые сложнее в дрессировке, могут быть идеальны для занятого хозяина. Чау-чау и акита-ину спокойно проводят часы рядом с человеком, не требуя постоянного внимания. Басенджи — редкая порода, которая почти не лает и умеет занять себя самостоятельно.',
                warning: 'Ни одна собака не должна оставаться в одиночестве более 6–8 часов. Если рабочий день длиннее — рассмотрите услуги догситтера или дневного выгула.',
              },
            ].map((scenario) => (
              <div key={scenario.title} className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
                <div className="mb-6 flex flex-wrap items-start gap-4">
                  <span className="text-4xl">{scenario.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{scenario.title}</h3>
                    <p className="mt-1 text-sm text-white/50">{scenario.subtitle}</p>
                  </div>
                </div>
                <p className="mb-6 leading-relaxed text-white/70">{scenario.desc}</p>
                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-green-400">Подходит</p>
                    <div className="flex flex-wrap gap-2">
                      {scenario.ideal.map((b) => (
                        <span key={b} className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-300">{b}</span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-red-400">Лучше избегать</p>
                    <div className="flex flex-wrap gap-2">
                      {scenario.avoid.map((b) => (
                        <span key={b} className="rounded-full bg-red-500/20 px-3 py-1 text-xs text-red-300">{b}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
                  <p className="text-sm text-amber-300/80">⚠️ {scenario.warning}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Сводная таблица критериев */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h3 className="mb-6 text-2xl font-semibold text-white">Критерии выбора: что учесть перед покупкой</h3>
            <p className="mb-6 leading-relaxed text-white/70">
              Специалисты Международной кинологической федерации (FCI) рекомендуют оценить как минимум семь факторов перед выбором породы. Ни один из них не следует игнорировать — несоответствие хотя бы по одному критерию может существенно усложнить жизнь и человека, и животного.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: '🏠', title: 'Площадь жилья', desc: 'Крупным и активным породам нужно минимум 50–60 м². Декоративные породы комфортно живут в студии.' },
                { icon: '⏱️', title: 'Время на выгул', desc: 'Рабочие породы требуют 2–3 часа активности в день. Декоративным хватает 40–60 минут неспешных прогулок.' },
                { icon: '💰', title: 'Бюджет', desc: 'Крупные породы едят больше. Некоторые (далматин, бульдог) склонны к дорогостоящим болезням. Учитывайте расходы на ветеринара.' },
                { icon: '👶', title: 'Дети в семье', desc: 'Оцените терпимость породы к детям и порог раздражимости. Избегайте охранных пород с нестабильной психикой.' },
                { icon: '🐾', title: 'Другие животные', desc: 'Охотничьи и терьерные породы имеют высокий инстинкт преследования. Уточните, как порода относится к кошкам и другим собакам.' },
                { icon: '🎓', title: 'Опыт хозяина', desc: 'Новичку подойдут золотистый ретривер, лабрадор, пудель. Сложные породы (малинуа, акита) требуют опыта или кинолога.' },
                { icon: '🌡️', title: 'Климат', desc: 'Хаски плохо переносит жару, бульдог и мопс — физическую нагрузку в тёплое время. Учитывайте климат региона проживания.' },
              ].map((c) => (
                <div key={c.title} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-2xl">{c.icon}</span>
                    <p className="font-semibold text-white">{c.title}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-white/55">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== ЗАКЛЮЧЕНИЕ ===== */}
      <section id="conclusion" className="bg-black px-8 py-24 md:px-16">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-400">Заключение</p>
            <h2 className="text-3xl font-bold text-white md:text-5xl">Общий вывод по исследованию</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/50">Итоги четырёх глав и ответ на главный вопрос работы</p>
          </div>

          {/* Главный вывод */}
          <div className="mb-10 rounded-2xl border border-amber-400/30 bg-amber-400/5 p-8 md:p-12">
            <p className="text-xl font-medium leading-relaxed text-white md:text-2xl">
              «Порода собаки <span className="text-amber-400">действительно влияет</span> на обучаемость, однако не является единственным и не всегда решающим фактором. Генетика задаёт потенциал, но воспитание, характер, условия жизни и методы дрессировки определяют, будет ли этот потенциал реализован.»
            </p>
          </div>

          {/* Выводы по главам */}
          <div className="mb-10 flex flex-col gap-6">
            {[
              {
                chapter: 'Глава 1',
                title: 'Генетика и рейтинги обучаемости',
                color: 'border-blue-500/30 bg-blue-500/5',
                badge: 'bg-blue-500/20 text-blue-400',
                points: [
                  'Пастушьи и служебные породы (бордер-колли, пудель, немецкая овчарка) стабильно занимают верхние строчки рейтинга — это результат тысячелетий целенаправленной селекции.',
                  'Разрыв в скорости усвоения команд между лучшими и худшими по рейтингу породами — более чем в 16 раз.',
                  'Рейтинг Корена отражает рабочий интеллект (способность следовать командам), а не общую умственную развитость собаки.',
                  'Охотничьи и примитивные породы с низким рейтингом нередко обладают высоким адаптивным интеллектом и самостоятельностью мышления.',
                ],
              },
              {
                chapter: 'Глава 2',
                title: 'Роль характера и темперамента',
                color: 'border-purple-500/30 bg-purple-500/5',
                badge: 'bg-purple-500/20 text-purple-400',
                points: [
                  'Индивидуальный темперамент влияет на обучаемость не меньше, чем порода: разброс внутри одной породы может быть сопоставим с межпородными различиями.',
                  'Ключевые черты, повышающие обучаемость: ориентация на человека, уравновешенность, умеренная энергетика и отсутствие избыточной тревожности.',
                  'Ранняя социализация (3–14 недель) формирует базу отношений собаки с человеком и напрямую влияет на будущую обучаемость.',
                  'Собаки из приютов требуют особого подхода — не из-за породы, а из-за возможного негативного раннего опыта.',
                ],
              },
              {
                chapter: 'Глава 3',
                title: 'Методы дрессировки',
                color: 'border-green-500/30 bg-green-500/5',
                badge: 'bg-green-500/20 text-green-400',
                points: [
                  'Позитивное подкрепление является научно обоснованным методом первого выбора для большинства пород и темпераментов.',
                  'Принудительные методы дрессировки ухудшают долгосрочные результаты, повышают тревожность и провоцируют агрессию.',
                  'Грамотная адаптация метода под конкретную собаку позволяет добиться результатов даже с «трудными» породами.',
                  'Физическая нагрузка перед занятиями критически важна для высокоэнергичных пород — без неё обучение малоэффективно.',
                ],
              },
              {
                chapter: 'Глава 4',
                title: 'Выбор породы под условия жизни',
                color: 'border-amber-500/30 bg-amber-500/5',
                badge: 'bg-amber-500/20 text-amber-400',
                points: [
                  'Несоответствие породы условиям содержания — одна из главных причин отказа от собак (30–40% случаев по данным приютов).',
                  'Высокообучаемая порода с большой потребностью в нагрузке может оказаться сложнее в содержании, чем менее «рейтинговая», но подходящая по темпераменту.',
                  'При выборе породы необходимо учитывать как минимум семь факторов: жильё, время на выгул, бюджет, детей, других животных, опыт хозяина и климат.',
                  'Правильно подобранная порода — залог гармоничных отношений, при которых обучение становится не бременем, а удовольствием для обоих.',
                ],
              },
            ].map((ch) => (
              <div key={ch.chapter} className={cn('rounded-2xl border p-8', ch.color)}>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', ch.badge)}>{ch.chapter}</span>
                  <h3 className="text-lg font-semibold text-white">{ch.title}</h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {ch.points.map((p, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                      <p className="leading-relaxed text-white/70">{p}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Финальный абзац */}
          <div className="mb-10 rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h3 className="mb-5 text-2xl font-semibold text-white">Ответ на исследовательский вопрос</h3>
            <p className="mb-4 leading-relaxed text-white/70">
              Исследование подтвердило гипотезу: порода собаки оказывает статистически значимое влияние на обучаемость. Это влияние объясняется генетически закреплёнными особенностями нервной системы, историей формирования породы и типом интеллекта, который она развивала в процессе селекции.
            </p>
            <p className="mb-4 leading-relaxed text-white/70">
              Вместе с тем исследование показывает: обучаемость — не фиксированное свойство, а динамическая характеристика, которая складывается из взаимодействия породы, характера конкретной особи, качества ранней социализации, применяемых методов дрессировки и условий жизни. Ни один из этих факторов не является определяющим в отрыве от остальных.
            </p>
            <p className="leading-relaxed text-white/70">
              Практический вывод: перед выбором собаки стоит изучить не только рейтинг обучаемости породы, но и трезво оценить собственный образ жизни, опыт и возможности. Любую собаку можно научить базовым командам — вопрос лишь в том, сколько времени, терпения и правильных методов для этого потребуется.
            </p>
          </div>

          {/* Перспективы */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h3 className="mb-5 text-xl font-semibold text-white">Перспективы дальнейших исследований</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                'Влияние конкретных генов (WBSCR17, ASIC1) на социальное поведение и обучаемость собак',
                'Долгосрочное сравнение результатов позитивных и смешанных методов дрессировки у разных пород',
                'Роль микробиома кишечника в поведении и обучаемости — новое перспективное направление',
                'Влияние урбанизации на поведение и обучаемость потомства городских собак',
              ].map((item, i) => (
                <div key={i} className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-xs font-bold text-amber-400">{i + 1}</span>
                  <p className="text-sm leading-relaxed text-white/60">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== ИСТОЧНИКИ ===== */}
      <section id="sources" className="bg-zinc-950 px-8 py-24 md:px-16">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-400">Литература</p>
            <h2 className="text-3xl font-bold text-white md:text-5xl">Источники</h2>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { num: 1, author: 'Корен С.', title: 'Интеллект собак: поведение животных и высшая нервная деятельность', year: '1994', note: 'Основа классификации пород по обучаемости — рейтинг 138 пород' },
              { num: 2, author: 'Мech Л. Д., Бойтани Л.', title: 'Wolves: Behavior, Ecology, and Conservation', year: '2003', note: 'Эволюционные корни поведения домашних собак' },
              { num: 3, author: 'Американский кинологический клуб (AKC)', title: 'Dog Breed Intelligence Rankings', year: '2023', note: 'akc.org — официальный рейтинг пород' },
              { num: 4, author: 'Horowitz A.', title: 'Inside of a Dog: What Dogs See, Smell, and Know', year: '2009', note: 'Когнитивные способности и восприятие мира собак' },
              { num: 5, author: 'Pritchard J. et al.', title: 'Individual differences in dog trainability: the role of personality and breed', year: '2020', note: 'Сравнение роли породы и индивидуального характера в обучаемости' },
              { num: 6, author: 'Hiby E. F., Rooney N. J., Bradshaw J. W. S.', title: 'Dog training methods: their use, effectiveness and interaction with behaviour', year: '2004', note: 'Animal Welfare — сравнительный анализ методов дрессировки' },
              { num: 7, author: 'Кэмпбелл В.', title: 'Поведение и дрессировка собак', year: '1975', note: 'Классификация темперамента собак, тест Кэмпбелла для щенков' },
              { num: 8, author: 'Скиннер Б. Ф.', title: 'The Behavior of Organisms: An Experimental Analysis', year: '1938', note: 'Теория оперантного обусловливания — научная основа позитивного подкрепления' },
            ].map((src) => (
              <div key={src.num} className="flex gap-5 rounded-xl border border-white/10 bg-white/5 p-6">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-400/10 text-sm font-bold text-amber-400">{src.num}</span>
                <div>
                  <p className="font-medium text-white">{src.author} — <span className="italic text-white/80">{src.title}</span> ({src.year})</p>
                  <p className="mt-1 text-sm text-white/40">{src.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-zinc-950 px-8 py-10 text-center">
        <p className="text-white/40 text-sm">
          Школьный исследовательский проект · Гаценко Руслан · 2026
        </p>
      </footer>
    </>
  );
}