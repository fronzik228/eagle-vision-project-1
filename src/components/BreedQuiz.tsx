import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Question {
  id: string;
  text: string;
  options: { label: string; value: string }[];
}

interface Result {
  id: string;
  title: string;
  breeds: string[];
  icon: string;
  desc: string;
  traits: string[];
  color: string;
  badge: string;
}

const questions: Question[] = [
  {
    id: 'home',
    text: '🏠 Где ты живёшь?',
    options: [
      { label: 'Квартира — небольшая', value: 'small_flat' },
      { label: 'Квартира — просторная', value: 'big_flat' },
      { label: 'Частный дом с двором', value: 'house' },
    ],
  },
  {
    id: 'activity',
    text: '🏃 Насколько ты активен?',
    options: [
      { label: 'Предпочитаю диван и уют', value: 'low' },
      { label: 'Гуляю 1–2 часа в день', value: 'medium' },
      { label: 'Спорт, походы, бег — это я', value: 'high' },
    ],
  },
  {
    id: 'experience',
    text: '🎓 Был ли у тебя опыт с собаками?',
    options: [
      { label: 'Нет, это будет мой первый питомец', value: 'none' },
      { label: 'Немного — росла собака в семье', value: 'some' },
      { label: 'Да, я уже дрессировал собак', value: 'expert' },
    ],
  },
  {
    id: 'family',
    text: '👨‍👩‍👧 Кто живёт с тобой?',
    options: [
      { label: 'Живу один / с партнёром', value: 'solo' },
      { label: 'Есть маленькие дети', value: 'kids' },
      { label: 'Пожилые родственники', value: 'elderly' },
    ],
  },
  {
    id: 'trait',
    text: '💛 Что тебе важнее всего в собаке?',
    options: [
      { label: 'Ласка и постоянное рядом', value: 'affection' },
      { label: 'Интеллект и обучаемость', value: 'smart' },
      { label: 'Независимость — пусть делает своё', value: 'independent' },
    ],
  },
];

const results: Result[] = [
  {
    id: 'golden',
    title: 'Золотистый ретривер или Лабрадор',
    breeds: ['Золотистый ретривер', 'Лабрадор-ретривер', 'Кавалер кинг чарльз спаниель'],
    icon: '🥇',
    desc: 'Ты идеальный кандидат для одной из самых любимых семейных пород. Эти собаки обожают людей, легко обучаются, терпеливы с детьми и подходят как новичкам, так и опытным хозяевам. Преданный и тёплый компаньон на долгие годы.',
    traits: ['Высокая обучаемость', 'Любит детей', 'Дружелюбен со всеми', 'Не агрессивен'],
    color: 'border-amber-400/30 bg-amber-400/5',
    badge: 'bg-amber-400/20 text-amber-400',
  },
  {
    id: 'border',
    title: 'Бордер-колли или Австралийская овчарка',
    breeds: ['Бордер-колли', 'Австралийская овчарка', 'Бельгийская малинуа'],
    icon: '🧠',
    desc: 'Тебе подходит самая умная порода в мире. Бордер-колли требует активного хозяина с опытом — ей нужны задачи, спорт и постоянная умственная нагрузка. Если ты готов к этому, получишь невероятного партнёра, способного на поразительные вещи.',
    traits: ['Рейтинг обучаемости №1', 'Нужна высокая нагрузка', 'Для опытных хозяев', 'Обожает задачи'],
    color: 'border-blue-400/30 bg-blue-400/5',
    badge: 'bg-blue-400/20 text-blue-400',
  },
  {
    id: 'poodle',
    title: 'Пудель или Шпиц',
    breeds: ['Карликовый пудель', 'Миниатюрный шпиц', 'Бишон-фризе'],
    icon: '✨',
    desc: 'Умная и компактная порода — идеально для городской жизни. Пудель занимает второе место в мировом рейтинге обучаемости, при этом хорошо живёт в квартире и не требует многочасовых нагрузок. Умён, весел, гипоаллергенен.',
    traits: ['Рейтинг обучаемости №2', 'Подходит для квартиры', 'Гипоаллергенен', 'Для новичков'],
    color: 'border-purple-400/30 bg-purple-400/5',
    badge: 'bg-purple-400/20 text-purple-400',
  },
  {
    id: 'bulldog',
    title: 'Французский бульдог или Мопс',
    breeds: ['Французский бульдог', 'Мопс', 'Пекинес'],
    icon: '😎',
    desc: 'Тебе не нужен марафонец — тебе нужен верный спокойный друг, который будет рядом. Эти породы минимально требовательны к нагрузке, хорошо переносят одиночество и отлично живут в небольших квартирах. Характер у каждого — отдельная история.',
    traits: ['Минимум нагрузки', 'Для квартиры', 'Спокойный характер', 'Любит хозяина'],
    color: 'border-green-400/30 bg-green-400/5',
    badge: 'bg-green-400/20 text-green-400',
  },
  {
    id: 'shepherd',
    title: 'Немецкая овчарка или Доберман',
    breeds: ['Немецкая овчарка', 'Доберман', 'Ротвейлер'],
    icon: '🛡️',
    desc: 'Ты готов к серьёзной породе. Немецкая овчарка — универсальный интеллектуальный партнёр с отличной обучаемостью, верностью и защитными инстинктами. Требует опыта и чёткого руководства, но отвечает безграничной преданностью.',
    traits: ['Высокая обучаемость', 'Охранные качества', 'Для опытных хозяев', 'Требует лидерства'],
    color: 'border-red-400/30 bg-red-400/5',
    badge: 'bg-red-400/20 text-red-400',
  },
  {
    id: 'husky',
    title: 'Сибирский хаски или Самоед',
    breeds: ['Сибирский хаски', 'Самоедская лайка', 'Аляскинский маламут'],
    icon: '🐺',
    desc: 'Тебе нужна собака для активной жизни на природе. Хаски — прирождённый марафонец с волчьей красотой и независимым характером. Он может пробежать десятки километров и требует такого же активного хозяина. Ленивым людям — не сюда.',
    traits: ['Огромная выносливость', 'Независимый характер', 'Для активных хозяев', 'Красавец'],
    color: 'border-cyan-400/30 bg-cyan-400/5',
    badge: 'bg-cyan-400/20 text-cyan-400',
  },
];

function getResult(answers: Record<string, string>): Result {
  const scores: Record<string, number> = {
    golden: 0,
    border: 0,
    poodle: 0,
    bulldog: 0,
    shepherd: 0,
    husky: 0,
  };

  if (answers.home === 'small_flat') { scores.bulldog += 3; scores.poodle += 2; }
  if (answers.home === 'big_flat') { scores.golden += 2; scores.poodle += 1; scores.bulldog += 1; }
  if (answers.home === 'house') { scores.border += 2; scores.shepherd += 2; scores.husky += 2; scores.golden += 1; }

  if (answers.activity === 'low') { scores.bulldog += 3; scores.poodle += 1; }
  if (answers.activity === 'medium') { scores.golden += 3; scores.poodle += 2; scores.shepherd += 1; }
  if (answers.activity === 'high') { scores.husky += 3; scores.border += 3; scores.shepherd += 1; }

  if (answers.experience === 'none') { scores.golden += 3; scores.poodle += 2; scores.bulldog += 2; }
  if (answers.experience === 'some') { scores.golden += 1; scores.shepherd += 2; scores.husky += 1; }
  if (answers.experience === 'expert') { scores.border += 3; scores.shepherd += 3; scores.husky += 2; }

  if (answers.family === 'kids') { scores.golden += 3; scores.bulldog += 1; }
  if (answers.family === 'elderly') { scores.bulldog += 3; scores.poodle += 2; }
  if (answers.family === 'solo') { scores.husky += 1; scores.border += 1; scores.shepherd += 1; }

  if (answers.trait === 'affection') { scores.golden += 3; scores.bulldog += 2; }
  if (answers.trait === 'smart') { scores.border += 3; scores.poodle += 3; scores.shepherd += 1; }
  if (answers.trait === 'independent') { scores.husky += 3; scores.bulldog += 1; }

  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  return results.find((r) => r.id === best) ?? results[0];
}

export default function BreedQuiz() {
  const [step, setStep] = useState<'intro' | number | 'result'>('intro');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const currentQ = typeof step === 'number' ? questions[step] : null;
  const progress = typeof step === 'number' ? ((step) / questions.length) * 100 : step === 'result' ? 100 : 0;

  function handleAnswer(value: string) {
    setSelected(value);
    setTimeout(() => {
      const newAnswers = { ...answers, [currentQ!.id]: value };
      setAnswers(newAnswers);
      setSelected(null);
      const nextStep = (step as number) + 1;
      if (nextStep >= questions.length) {
        setResult(getResult(newAnswers));
        setStep('result');
      } else {
        setStep(nextStep);
      }
    }, 300);
  }

  function restart() {
    setStep('intro');
    setAnswers({});
    setSelected(null);
    setResult(null);
  }

  return (
    <section id="quiz" className="bg-zinc-950 px-8 py-24 md:px-16">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-400">Интерактивный тест</p>
          <h2 className="text-3xl font-bold text-white md:text-5xl">Какая порода тебе подходит?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/50">5 вопросов — и ты узнаешь, какая порода идеально совпадает с твоим образом жизни</p>
        </div>

        {/* Intro */}
        {step === 'intro' && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
            <div className="mb-6 text-6xl">🐾</div>
            <h3 className="mb-4 text-2xl font-semibold text-white">Готов узнать своего идеального питомца?</h3>
            <p className="mb-8 leading-relaxed text-white/60">
              Ответь на 5 коротких вопросов о своём образе жизни, жилье и предпочтениях — и получи персональную рекомендацию породы с объяснением, почему она подходит именно тебе.
            </p>
            <button
              onClick={() => setStep(0)}
              className="rounded-full bg-amber-400 px-10 py-4 text-sm font-semibold text-black transition-all hover:bg-amber-300"
            >
              Начать тест →
            </button>
          </div>
        )}

        {/* Question */}
        {typeof step === 'number' && currentQ && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            {/* Progress bar */}
            <div className="mb-8">
              <div className="mb-2 flex justify-between text-xs text-white/40">
                <span>Вопрос {step + 1} из {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-amber-400 transition-all duration-500"
                  style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <h3 className="mb-8 text-2xl font-semibold text-white">{currentQ.text}</h3>

            <div className="flex flex-col gap-3">
              {currentQ.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  className={cn(
                    'w-full rounded-xl border px-6 py-4 text-left text-sm font-medium transition-all duration-200',
                    selected === opt.value
                      ? 'border-amber-400 bg-amber-400/20 text-amber-400'
                      : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:bg-white/10 hover:text-white'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {step > 0 && (
              <button
                onClick={() => { setStep((step as number) - 1); setSelected(null); }}
                className="mt-6 text-sm text-white/30 hover:text-white/60 transition-colors"
              >
                ← Назад
              </button>
            )}
          </div>
        )}

        {/* Result */}
        {step === 'result' && result && (
          <div className={cn('rounded-2xl border p-8 md:p-10', result.color)}>
            <div className="mb-6 text-center">
              <div className="mb-3 text-6xl">{result.icon}</div>
              <p className="mb-1 text-sm font-medium uppercase tracking-widest text-white/40">Твой результат</p>
              <h3 className="text-2xl font-bold text-white md:text-3xl">{result.title}</h3>
            </div>

            <p className="mb-6 leading-relaxed text-white/70">{result.desc}</p>

            <div className="mb-6 flex flex-wrap gap-2">
              {result.traits.map((t) => (
                <span key={t} className={cn('rounded-full px-3 py-1 text-xs font-medium', result.badge)}>{t}</span>
              ))}
            </div>

            <div className="mb-8 rounded-xl border border-white/10 bg-black/20 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">Также посмотри на</p>
              <div className="flex flex-wrap gap-2">
                {result.breeds.map((b) => (
                  <span key={b} className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/70">{b}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={restart}
                className="flex-1 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/70 transition-all hover:border-white/40 hover:text-white"
              >
                ↺ Пройти заново
              </button>
              <a
                href="#choice"
                className="flex-1 rounded-full bg-amber-400 px-6 py-3 text-center text-sm font-semibold text-black transition-all hover:bg-amber-300"
              >
                Читать о выборе породы →
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
