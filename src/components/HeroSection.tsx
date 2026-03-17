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