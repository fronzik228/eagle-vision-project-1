import { cn } from '@/lib/utils';

const images = [
  'https://cdn.poehali.dev/projects/c7e82e52-3a4a-4bcc-9114-d9a28012259c/files/de9df55a-afa8-41ec-8dbe-a1fa5bc9e2c3.jpg',
  'https://cdn.poehali.dev/projects/c7e82e52-3a4a-4bcc-9114-d9a28012259c/files/0ea442ea-5114-45f2-a858-cbdadb258def.jpg',
  'https://cdn.poehali.dev/projects/c7e82e52-3a4a-4bcc-9114-d9a28012259c/files/1978a800-0bdf-4ebe-9990-f09465e418d1.jpg',
  'https://cdn.poehali.dev/projects/c7e82e52-3a4a-4bcc-9114-d9a28012259c/files/87ea1773-9133-4f1e-9c22-f49a8e522e7c.jpg',
];

interface HeroSliderProps {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  isLoaded: boolean;
}

export default function HeroSlider({ currentIndex, setCurrentIndex, isLoaded }: HeroSliderProps) {
  return (
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
              <span className="text-sm font-medium text-white/80">🐾 Школьный исследовательский проект
     Выполнил Гаценко Руслан </span>
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
  );
}