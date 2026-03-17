import { useState } from 'react';
import { cn } from '@/lib/utils';

const breeds = [
  {
    name: 'Бордер-колли', rank: 1, trait: 'Гений среди собак', icon: '🥇',
    desc: 'Усваивает новую команду за 5 повторений, выполняет с первого раза в 95% случаев',
    details: 'Считается абсолютным чемпионом по интеллекту среди всех пород. Изначально выведена в Шотландии для пастьбы овец — порода способна управлять стадом исключительно взглядом. Требует ежедневной умственной и физической нагрузки, иначе начинает «изобретать» занятия сама — не всегда на радость хозяину.',
    tags: ['Пастушья', 'Активная', 'Для опытных'],
    trainability: 99,
  },
  {
    name: 'Пудель', rank: 2, trait: 'Умный и легко обучаемый', icon: '✨',
    desc: 'Исключительная память и желание угождать хозяину делают его идеальным учеником',
    details: 'Несмотря на декоративный образ, пудель — рабочая порода, исторически использовавшаяся для охоты на водоплавающую дичь. Гипоаллергенен, практически не линяет. Существует в трёх размерах: стандартный, миниатюрный и той. Все три одинаково умны и легко обучаемы.',
    tags: ['Гипоаллергенен', 'Городская', 'Для новичков'],
    trainability: 97,
  },
  {
    name: 'Немецкая овчарка', rank: 3, trait: 'Мастер дрессировки', icon: '🛡️',
    desc: 'Универсальная служебная порода — полиция, армия, поисково-спасательные операции',
    details: 'Самая распространённая служебная порода в мире. Используется в полиции, армии, таможне, поисково-спасательных службах и как собака-поводырь. Обладает высокой рабочей мотивацией и быстро устанавливает глубокую связь с хозяином. Требует ранней социализации.',
    tags: ['Служебная', 'Охранная', 'Для опытных'],
    trainability: 95,
  },
  {
    name: 'Золотистый ретривер', rank: 4, trait: 'Отличник по послушанию', icon: '🌟',
    desc: 'Мягкий характер и высокая мотивация к одобрению человека обеспечивают лёгкое обучение',
    details: 'Эталон семейной породы. Мягкий, терпеливый, никогда не агрессивный. Один из лучших вариантов для первой собаки в семье с детьми. Обожает воду, мячи и людей. Самая популярная порода-терапевт и собака-поводырь в США.',
    tags: ['Семейная', 'Для детей', 'Для новичков'],
    trainability: 93,
  },
  {
    name: 'Доберман', rank: 5, trait: 'Быстро схватывает команды', icon: '⚡',
    desc: 'Энергичный и сосредоточенный — один из лучших в сложных служебных задачах',
    details: 'Выведен в Германии в конце XIX века Карлом Доберманном для сопровождения при сборе налогов. Элегантен, атлетичен, невероятно предан хозяину. При правильном воспитании — нежный компаньон. Без — может стать неуправляемым. Требует чёткого руководства.',
    tags: ['Охранная', 'Атлетичная', 'Для опытных'],
    trainability: 90,
  },
  {
    name: 'Лабрадор', rank: 7, trait: 'Дружелюбный и послушный', icon: '💛',
    desc: 'Самая популярная порода-поводырь благодаря спокойному нраву и отличной обучаемости',
    details: 'Три года подряд занимал первое место по популярности в США и Великобритании. Абсолютно лишён агрессии, обожает всех людей без исключения — что делает его плохим сторожем, но великолепным компаньоном. Прекрасно подходит для семей с детьми, пожилых людей и новичков.',
    tags: ['Семейная', 'Для детей', 'Для новичков'],
    trainability: 88,
  },
  {
    name: 'Сибирский хаски', rank: 45, trait: 'Независимый и упрямый', icon: '🐺',
    desc: 'Умная порода, но с сильным охотничьим инстинктом — требует опытного дрессировщика',
    details: 'Одна из древнейших пород, выведенная народом чукча для ездовой службы в экстремальных условиях. Способен пробежать сотни километров. Умён, но категорически не склонен к слепому подчинению. Часто «дискутирует» с хозяином и принимает самостоятельные решения. Без нагрузки — разрушителен.',
    tags: ['Ездовая', 'Высокая нагрузка', 'Для опытных'],
    trainability: 45,
  },
  {
    name: 'Чау-чау', rank: 76, trait: 'Независимый характер', icon: '🦁',
    desc: 'Кошачья самостоятельность — выполняет команды только когда сам считает нужным',
    details: 'Одна из древнейших пород в мире — её изображения найдены на китайских артефактах возрастом более 2000 лет. Известна фиолетовым языком — редкая черта. Чрезвычайно независима, глубоко привязывается к одному человеку и сдержанна со всеми остальными. Напоминает кошку в теле медведя.',
    tags: ['Примитивная', 'Независимая', 'Для опытных'],
    trainability: 20,
  },
  {
    name: 'Мопс', rank: 57, trait: 'Живёт по своим правилам', icon: '😏',
    desc: 'Обучается охотнее при наличии вкусного угощения, иначе демонстрирует полное безразличие',
    details: 'Любимцы китайских императоров и европейской аристократии. Мопс — ходячий источник юмора с философским взглядом на жизнь. Обожает общение, ненавидит одиночество. Брахицефал — имеет проблемы с дыханием при физических нагрузках. Идеален для неторопливой городской жизни.',
    tags: ['Декоративная', 'Городская', 'Для пожилых'],
    trainability: 35,
  },
  {
    name: 'Афганская борзая', rank: 79, trait: 'Самая независимая в обучении', icon: '👑',
    desc: 'Древняя охотничья порода с развитым инстинктом независимости — настоящий вызов для дрессировщика',
    details: 'Одна из старейших пород в мире, родом из Афганистана и Персии. Использовалась для охоты на леопардов и волков в одиночку — отсюда абсолютная самостоятельность. Красота — поразительная, обучаемость — минимальная по стандартам команд. Однако обладает высоким адаптивным интеллектом.',
    tags: ['Охотничья', 'Декоративная', 'Для терпеливых'],
    trainability: 10,
  },
];

function BreedRating() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="breeds" className="bg-black px-8 py-24 md:px-16">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-400">Рейтинг</p>
          <h2 className="text-3xl font-bold text-white md:text-5xl">Кто умнее всех?</h2>
          <p className="mt-4 text-white/50">По шкале Стэнли Корена — нажми на карточку, чтобы узнать подробности</p>
        </div>

        <div className="flex flex-col gap-3">
          {breeds.map((breed) => {
            const isOpen = openId === breed.name;
            return (
              <div
                key={breed.name}
                className={cn(
                  'overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer',
                  isOpen ? 'border-amber-400/40 bg-amber-400/5' : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]'
                )}
                onClick={() => setOpenId(isOpen ? null : breed.name)}
              >
                {/* Заголовок карточки */}
                <div className="flex items-center gap-5 p-5 md:p-6">
                  <div className={cn('flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-bold transition-colors', isOpen ? 'bg-amber-400/20 text-amber-400' : 'bg-white/5 text-amber-400/70')}>
                    #{breed.rank}
                  </div>
                  <div className="flex flex-1 items-center gap-3 min-w-0">
                    <span className="text-2xl">{breed.icon}</span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-white">{breed.name}</h3>
                      <p className="text-sm text-amber-400/70">{breed.trait}</p>
                    </div>
                  </div>
                  {/* Полоска обучаемости */}
                  <div className="hidden md:flex flex-col items-end gap-1 shrink-0 w-36">
                    <span className="text-xs text-white/40">обучаемость</span>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className={cn('h-full rounded-full transition-all duration-700', breed.trainability >= 70 ? 'bg-green-400' : breed.trainability >= 40 ? 'bg-amber-400' : 'bg-red-400')}
                        style={{ width: `${breed.trainability}%` }}
                      />
                    </div>
                  </div>
                  <span className={cn('ml-2 shrink-0 text-white/30 transition-transform duration-300', isOpen && 'rotate-180')}>▼</span>
                </div>

                {/* Раскрывающееся содержимое */}
                {isOpen && (
                  <div className="border-t border-white/10 px-5 pb-6 pt-5 md:px-6">
                    <p className="mb-5 leading-relaxed text-white/70">{breed.details}</p>
                    <div className="flex flex-wrap gap-2">
                      {breed.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-400/80">{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-8 md:p-10">
          <div className="mb-6 flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <h3 className="text-xl font-bold text-amber-400">Выводы по рейтингу</h3>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="mb-2 font-semibold text-white">Порода — стартовая точка</p>
              <p className="text-sm leading-relaxed text-white/60">Генетика задаёт склонности и мотивацию, но не предрешает результат. Бордер-колли с плохим воспитанием может уступить правильно обученному мопсу.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="mb-2 font-semibold text-white">Метод важнее породы</p>
              <p className="text-sm leading-relaxed text-white/60">«Трудные» породы — хаски, чау-чау, афганская борзая — требуют не больше усилий, а другого подхода. Они реагируют на мотивацию, а не на принуждение.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="mb-2 font-semibold text-white">Разные виды интеллекта</p>
              <p className="text-sm leading-relaxed text-white/60">Низкий рейтинг послушания не значит «глупая». Хаски и борзые обладают высоким адаптивным интеллектом — они решают задачи самостоятельно, без команд.</p>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-white/40">Воспитание, последовательность и терпение — универсальные факторы для любой породы</p>
        </div>
      </div>
    </section>
  );
}

export default function ResearchSections() {
  return (
    <>
      {/* ===== ВВЕДЕНИЕ ===== */}
      <section id="intro" className="bg-zinc-900 px-8 py-24 md:px-16">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-400">Введение</p>
            <h2 className="text-3xl font-bold text-white md:text-5xl">О чём это исследование</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/50">Цели, задачи и актуальность</p>
          </div>

          <div className="mb-10 rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <p className="mb-5 text-lg leading-relaxed text-white/80">
              Вопрос о том, насколько порода собаки определяет её способность к обучению, занимает учёных и кинологов уже более ста лет. Первые систематические наблюдения были сделаны ещё в начале XX века, когда военные и полицейские ведомства начали целенаправленно отбирать собак для служебных нужд и обнаружили устойчивые породные различия в обучаемости.
            </p>
            <p className="mb-5 leading-relaxed text-white/70">
              Современная наука подходит к этому вопросу комплексно: обучаемость рассматривается не как единое свойство, а как совокупность нескольких взаимосвязанных факторов — генетической предрасположенности, типа темперамента, мотивации и истории одомашнивания конкретной породы. Понимание этих факторов позволяет не только предсказать, насколько легко будет дрессировать ту или иную собаку, но и выбрать наиболее подходящие методы работы с ней.
            </p>
            <p className="leading-relaxed text-white/70">
              Настоящее исследование систематизирует накопленные данные по данной теме, анализирует классические и современные работы в области зоопсихологии и кинологии, а также сопоставляет их с практическим опытом специалистов. В работе рассматривается не только рейтинг пород по обучаемости, но и биологические механизмы, лежащие в его основе.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
              <div className="mb-4 text-3xl">🎯</div>
              <h3 className="mb-2 text-lg font-semibold text-white">Цель работы</h3>
              <p className="text-sm leading-relaxed text-white/60">Изучить влияние породной принадлежности на обучаемость собак и выявить ключевые факторы, определяющие эффективность дрессировки.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
              <div className="mb-4 text-3xl">📚</div>
              <h3 className="mb-2 text-lg font-semibold text-white">Источники</h3>
              <p className="text-sm leading-relaxed text-white/60">Работы Стэнли Корена, исследования в области поведенческой генетики собак, данные кинологических организаций FCI и AKC, а также современные публикации по зоопсихологии.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
              <div className="mb-4 text-3xl">🔍</div>
              <h3 className="mb-2 text-lg font-semibold text-white">Актуальность</h3>
              <p className="text-sm leading-relaxed text-white/60">Правильный выбор породы и методов дрессировки снижает число случаев отказа от собак, уменьшает количество животных в приютах и улучшает качество жизни как питомцев, так и их хозяев.</p>
            </div>
          </div>
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

          <div className="mb-12 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-8 md:p-10">
            <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-start">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/10 text-4xl">
                👨‍🔬
              </div>
              <div>
                <p className="mb-1 text-sm font-medium uppercase tracking-widest text-amber-400">Ключевой исследователь</p>
                <h3 className="mb-1 text-2xl font-bold text-white">Стэнли Корен</h3>
                <p className="text-white/50">Stanley Coren, род. 1942 — канадско-американский нейропсихолог и исследователь поведения собак</p>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-400/70">Образование и карьера</p>
                <p className="text-sm leading-relaxed text-white/70">Профессор психологии Университета Британской Колумбии (Ванкувер, Канада). Степень бакалавра — Университет Пенсильвании, PhD — Стэнфордский университет. Специализировался на нейропсихологии и психофизике. Лауреат многочисленных научных наград, в том числе премии Дональда Хебба от Канадского психологического общества.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-400/70">Путь к изучению собак</p>
                <p className="text-sm leading-relaxed text-white/70">В молодости Корен изучал восприятие и когнитивные процессы у людей. К собакам обратился через призму нейропсихологии — его интересовало, как животные обрабатывают информацию, обучаются и взаимодействуют с людьми. Первые статьи на эту тему вышли в начале 1980-х и вызвали неожиданно широкий интерес как в научном, так и в массовом сообществе.</p>
              </div>
            </div>

            <div className="mb-6 rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-400/70">Главные труды</p>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {[
                  { year: '1994', title: '«Интеллект собак»', desc: 'Классификация 138 пород по обучаемости. Бестселлер, переведён на 26 языков. Основа всех современных рейтингов.' },
                  { year: '1998', title: '«Почему мы любим собак»', desc: 'Исследование психологической связи между человеком и собакой. Анализ эволюционных и культурных аспектов.' },
                  { year: '2004', title: '«Как говорят собаки»', desc: 'Детальный разбор языка тела, мимики и вокализации собак. Практическое руководство по пониманию питомца.' },
                ].map((book) => (
                  <div key={book.year} className="rounded-lg border border-amber-400/10 bg-amber-400/5 p-4">
                    <p className="mb-1 text-xs font-bold text-amber-400">{book.year}</p>
                    <p className="mb-1 font-semibold text-white">{book.title}</p>
                    <p className="text-xs leading-relaxed text-white/55">{book.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-400/70">Влияние и критика</p>
              <p className="mb-3 text-sm leading-relaxed text-white/70">Работы Корена стали отправной точкой для большинства современных исследований в области когнитивных способностей собак. Его рейтинг цитируется в сотнях научных статей и используется кинологическими организациями по всему миру. Корен также регулярно выступал в СМИ как эксперт и вёл научно-популярную колонку в Psychology Today более 15 лет.</p>
              <p className="text-sm leading-relaxed text-white/70">Вместе с тем ряд исследователей указывает на ограниченность его методологии: рейтинг основан на оценке рабочего интеллекта в контексте послушания, тогда как другие формы интеллекта — адаптивный, социальный, эмоциональный — остаются за рамками. Современные учёные, такие как Брайан Хейр и Адам Миклоши, развивают более многомерные модели собачьего интеллекта, опираясь в том числе на труды Корена.</p>
            </div>
          </div>

          <div className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h3 className="mb-5 text-2xl font-semibold text-white">Теоретические основы</h3>
            <p className="mb-4 leading-relaxed text-white/70">
              Концепция породной обучаемости опирается на фундаментальное положение зоопсихологии: поведение животного формируется двумя основными факторами — наследственностью и средой. Применительно к домашней собаке наследственность включает не только физические характеристики, но и устойчивые поведенческие паттерны, закреплённые тысячелетиями целенаправленной селекции.
            </p>
            <p className="mb-4 leading-relaxed text-white/70">
              Ключевую роль в этом направлении сыграли исследования психолога Стэнли Корена, опубликованные в 1994 году в книге «Интеллект собак». Корен систематизировал данные опроса более 200 судей по обиденс-соревнованиям и на основе 110 критериев оценил 138 пород. Его классификация до сих пор остаётся наиболее цитируемой в мире. Согласно ей, обучаемость определяется тремя компонентами: скоростью усвоения новой команды, процентом безошибочного выполнения и способностью обобщать изученные навыки в новых ситуациях.
            </p>
            <p className="mb-4 leading-relaxed text-white/70">
              Вместе с тем исследование Корена имеет и ограничения: оценка проводилась по критериям послушания в спортивном контексте, что ставит в заведомо выгодное положение пастушьи и служебные породы. Охотничьи породы, выведенные для независимой работы, или примитивные — с более древней историей — могут демонстрировать высокий интеллект в иных условиях, но плохо показывают себя в формате «команда — выполнение».
            </p>
            <p className="leading-relaxed text-white/70">
              Более поздние нейробиологические исследования (Udell et al., 2010; Hare & Woods, 2013) подтвердили, что разные породы действительно отличаются по способности считывать социальные сигналы человека — жесты, взгляд, голос. Этот навык, называемый «совместным вниманием», особенно развит у пород, которые исторически работали в тесном контакте с людьми, и значительно слабее выражен у самодостаточных охотничьих пород.
            </p>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">

            {/* Брайан Хейр */}
            <div className="rounded-2xl border border-blue-400/20 bg-blue-400/5 p-8">
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-blue-400/30 bg-blue-400/10 text-3xl">
                  🐾
                </div>
                <div>
                  <p className="mb-0.5 text-xs font-semibold uppercase tracking-wider text-blue-400">Когнитивная наука</p>
                  <h3 className="text-xl font-bold text-white">Брайан Хейр</h3>
                  <p className="text-sm text-white/45">Brian Hare, род. 1976 — американский учёный-эволюционист</p>
                </div>
              </div>
              <div className="mb-4 space-y-3">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-blue-400/70">Позиция и образование</p>
                  <p className="text-sm leading-relaxed text-white/65">Профессор эволюционной антропологии Университета Дьюка (США). Основатель и директор Центра когнитивных исследований собак (Duke Canine Cognition Center). PhD — Гарвардский университет, научный руководитель — Ричард Врэнгем.</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-blue-400/70">Главное открытие</p>
                  <p className="text-sm leading-relaxed text-white/65">В 2002 году Хейр показал, что собаки уникально хорошо понимают жесты и взгляды человека — лучше даже, чем шимпанзе. Это способность, которую он назвал «совместным вниманием», возникла в ходе одомашнивания: люди неосознанно отбирали собак, которые лучше считывают их намерения.</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-blue-400/70">Ключевые труды</p>
                  <p className="text-sm leading-relaxed text-white/65">«Гений собак» (The Genius of Dogs, 2013, совм. с Вуди Чейзом) — мировой бестселлер о когнитивных способностях собак. Более 100 рецензируемых статей в Nature, Science, Current Biology. Создатель онлайн-платформы Dognition для тестирования интеллекта домашних собак.</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-white/40">Хейр развивает идею о том, что разные породы отличаются не «уровнем ума», а специализацией когнитивных навыков — каждая порода «умна» по-своему.</p>
            </div>

            {/* Адам Миклоши */}
            <div className="rounded-2xl border border-purple-400/20 bg-purple-400/5 p-8">
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-purple-400/30 bg-purple-400/10 text-3xl">
                  🔬
                </div>
                <div>
                  <p className="mb-0.5 text-xs font-semibold uppercase tracking-wider text-purple-400">Этология и поведение</p>
                  <h3 className="text-xl font-bold text-white">Адам Миклоши</h3>
                  <p className="text-sm text-white/45">Ádám Miklósi, род. 1961 — венгерский этолог и биолог</p>
                </div>
              </div>
              <div className="mb-4 space-y-3">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-purple-400/70">Позиция и образование</p>
                  <p className="text-sm leading-relaxed text-white/65">Профессор этологии Будапештского университета (ELTE), руководитель Семейной группы исследования собак (Family Dog Research Group) — одной из крупнейших в мире лабораторий по изучению поведения собак. Автор более 200 научных публикаций.</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-purple-400/70">Вклад в науку</p>
                  <p className="text-sm leading-relaxed text-white/65">Миклоши изучал социальную коммуникацию между собаками и людьми, сравнивал поведение волков и домашних собак в одинаковых условиях. Его исследования доказали, что собаки эволюционно «настроены» на взаимодействие с человеком — это не результат обучения, а биологически закреплённая черта.</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-purple-400/70">Ключевые труды</p>
                  <p className="text-sm leading-relaxed text-white/65">«Собака: эволюция, поведение и когнитивные способности» (Dog Behaviour, Evolution, and Cognition, 2007/2015) — фундаментальный академический учебник по теме. Соавтор открытия того, что собаки реагируют на указательный жест человека — исследование в Science (1998).</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-white/40">Группа Миклоши первой показала, что волки, воспитанные людьми, всё равно хуже справляются с социальными задачами, чем домашние собаки — это означает, что разница не в воспитании, а в генетике.</p>
            </div>

          </div>

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
      <BreedRating />

      {/* ===== ГЛАВА 2 ===== */}
      <section id="character" className="bg-zinc-950 px-8 py-24 md:px-16">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-400">Глава 2</p>
            <h2 className="text-3xl font-bold text-white md:text-5xl">Роль характера в дрессировке</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/50">Индивидуальные качества собаки важны не меньше породы</p>
          </div>

          <div className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h3 className="mb-5 text-2xl font-semibold text-white">Почему характер имеет значение</h3>
            <p className="mb-4 leading-relaxed text-white/70">
              Даже внутри одной породы собаки могут существенно различаться по своей обучаемости. Два лабрадора из одного помёта могут вести себя принципиально по-разному: один будет старательно выполнять команды, другой — игнорировать их при малейшем отвлечении. Это объясняется индивидуальным темпераментом — совокупностью врождённых свойств нервной системы каждой конкретной особи.
            </p>
            <p className="leading-relaxed text-white/70">
              Исследование Притчард и соавторов (2020) продемонстрировало, что разброс по обучаемости внутри породы может быть сопоставим с межпородными различиями. Это означает, что при работе с конкретной собакой её индивидуальный характер должен учитываться не меньше, чем типичные породные черты.
            </p>
          </div>

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

          <div className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h3 className="mb-5 text-2xl font-semibold text-white">Почему метод важен не меньше породы</h3>
            <p className="mb-4 leading-relaxed text-white/70">
              Даже самая обучаемая порода может не раскрыть свой потенциал при неправильном подходе к дрессировке. И наоборот — «сложная» порода способна показать впечатляющие результаты, если дрессировщик подберёт метод, соответствующий её природе и темпераменту.
            </p>
            <p className="leading-relaxed text-white/70">
              Исследование Хиби и соавторов (2004), опубликованное в журнале Animal Welfare, показало: собаки, обученные исключительно методами наказания, демонстрировали более высокий уровень агрессии и тревожности, а также худшее послушание в долгосрочной перспективе по сравнению с собаками, обученными позитивными методами. Это подтверждает: выбор метода имеет принципиальное значение.
            </p>
          </div>

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
    </>
  );
}