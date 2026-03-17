import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const images = [
  'https://cdn.poehali.dev/projects/c7e82e52-3a4a-4bcc-9114-d9a28012259c/files/de9df55a-afa8-41ec-8dbe-a1fa5bc9e2c3.jpg',
  'https://cdn.poehali.dev/projects/c7e82e52-3a4a-4bcc-9114-d9a28012259c/files/0ea442ea-5114-45f2-a858-cbdadb258def.jpg',
  'https://cdn.poehali.dev/projects/c7e82e52-3a4a-4bcc-9114-d9a28012259c/files/1978a800-0bdf-4ebe-9990-f09465e418d1.jpg',
  'https://cdn.poehali.dev/projects/c7e82e52-3a4a-4bcc-9114-d9a28012259c/files/87ea1773-9133-4f1e-9c22-f49a8e522e7c.jpg',
];

const breeds = [
  { name: 'Бордер-колли', rank: 1, trait: 'Гений среди собак' },
  { name: 'Золотистый ретривер', rank: 4, trait: 'Отличник по послушанию' },
  { name: 'Немецкая овчарка', rank: 3, trait: 'Мастер дрессировки' },
  { name: 'Мопс', rank: 57, trait: 'Живёт по своим правилам' },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <div className="absolute inset-0">
          {images.map((src, index) => (
            <div
              key={src}
              className={cn(
                'absolute inset-0 transition-opacity duration-1000 ease-in-out',
                currentIndex === index ? 'opacity-100' : 'opacity-0'
              )}
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

        <div className="relative z-10 flex h-full items-center">
          <div className="container mx-auto px-8 md:px-16">
            <div
              className={cn(
                'flex max-w-2xl flex-col gap-8 transform transition-all duration-1000 ease-out',
                isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              )}
            >
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                <span className="text-sm font-medium text-white/80">🐾 Школьный исследовательский проект</span>
              </div>

              <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
                Порода собаки и её{' '}
                <span className="text-amber-400">обучаемость</span>
              </h1>

              <p className="text-lg font-light leading-relaxed text-white/70 md:text-xl">
                Влияет ли порода на то, насколько легко собаку можно дрессировать?
                Исследуем науку, рейтинги и факты о самых умных и своенравных породах.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#research"
                  className="rounded-full bg-amber-400 px-8 py-3 text-sm font-semibold text-black transition-all hover:bg-amber-300"
                >
                  Читать исследование
                </a>
                <a
                  href="#breeds"
                  className="rounded-full border border-white/30 px-8 py-3 text-sm font-semibold text-white transition-all hover:border-white/60 hover:bg-white/10"
                >
                  Рейтинг пород
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 z-20 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'h-1 transition-all duration-300',
                currentIndex === index ? 'w-12 bg-white' : 'w-8 bg-white/40 hover:bg-white/60'
              )}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="bg-zinc-950 px-8 py-24 md:px-16">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-400">Исследование</p>
            <h2 className="text-3xl font-bold text-white md:text-5xl">
              Что влияет на обучаемость?
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <div className="mb-4 text-4xl">🧬</div>
              <h3 className="mb-3 text-xl font-semibold text-white">Генетика</h3>
              <p className="leading-relaxed text-white/60">
                Породы выводились тысячелетиями для конкретных задач. Пастушьи собаки умеют следовать командам по природе — это у них в генах.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <div className="mb-4 text-4xl">🧠</div>
              <h3 className="mb-3 text-xl font-semibold text-white">Интеллект</h3>
              <p className="leading-relaxed text-white/60">
                Учёный Стэнли Корен выделил три типа интеллекта собак: инстинктивный, адаптивный и рабочий. Именно рабочий интеллект отвечает за обучаемость.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <div className="mb-4 text-4xl">🎯</div>
              <h3 className="mb-3 text-xl font-semibold text-white">Мотивация</h3>
              <p className="leading-relaxed text-white/60">
                Некоторые породы изначально независимы и работают самостоятельно — их труднее обучить не из-за глупости, а из-за высокой самостоятельности.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Breeds Rating */}
      <section id="breeds" className="bg-black px-8 py-24 md:px-16">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-400">Рейтинг</p>
            <h2 className="text-3xl font-bold text-white md:text-5xl">
              Кто умнее всех?
            </h2>
            <p className="mt-4 text-white/50">По шкале Стэнли Корена — 138 пород от самых обучаемых до самых упрямых</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {breeds.map((breed) => (
              <div key={breed.name} className="flex items-center gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-amber-400/30 hover:bg-white/8">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-amber-400/10 text-2xl font-bold text-amber-400">
                  #{breed.rank}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{breed.name}</h3>
                  <p className="text-sm text-white/50">{breed.trait}</p>
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

      {/* Footer */}
      <footer className="border-t border-white/10 bg-zinc-950 px-8 py-10 text-center">
        <p className="text-white/40 text-sm">
          Школьный исследовательский проект · 2026
        </p>
      </footer>
    </>
  );
}
