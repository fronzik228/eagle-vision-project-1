import { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import HeroSlider from '@/components/HeroSlider';
import ResearchSections from '@/components/ResearchSections';
import LifestyleSections from '@/components/LifestyleSections';
import BreedQuiz from '@/components/BreedQuiz';

const IMAGES_COUNT = 4;

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES_COUNT);
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
      <NavBar scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <HeroSlider currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} isLoaded={isLoaded} />
      <ResearchSections />
      <LifestyleSections />
      <BreedQuiz />
    </>
  );
}