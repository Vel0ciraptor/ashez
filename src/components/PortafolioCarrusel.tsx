import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getPortafolio } from '../lib/data';
import type { PortafolioImagen } from '../lib/data';

export default function PortafolioCarrusel() {
  const [imagenes, setImagenes] = useState<PortafolioImagen[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    setImagenes(getPortafolio());
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + imagenes.length) % imagenes.length);
  }, [imagenes.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % imagenes.length);
  }, [imagenes.length]);

  useEffect(() => {
    if (!isAutoPlaying || imagenes.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % imagenes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, imagenes.length]);

  if (imagenes.length === 0) {
    return (
      <section className="py-20 bg-cream-50">
        <h2 className="text-3xl font-serif text-stone-800 text-center mb-12">Portafolio</h2>
        <p className="text-center text-stone-500">No hay imágenes en el portafolio</p>
      </section>
    );
  }

  const getTransformStyle = (idx: number, current: number) => {
    const total = imagenes.length;
    const diff = (idx - current + total) % total;
    
    if (diff === 0) {
      return { transform: 'translateX(0) scale(1.25)', zIndex: 30, opacity: 1 };
    } else if (diff === 1 || diff === -total + 1) {
      return { transform: 'translateX(85%) scale(0.9)', zIndex: 20, opacity: 0.6 };
    } else if (diff === -1 || diff === total - 1) {
      return { transform: 'translateX(-85%) scale(0.9)', zIndex: 20, opacity: 0.6 };
    } else if (diff === 2 || diff === -total + 2) {
      return { transform: 'translateX(160%) scale(0.75)', zIndex: 10, opacity: 0.3 };
    } else if (diff === -2 || diff === total - 2) {
      return { transform: 'translateX(-160%) scale(0.75)', zIndex: 10, opacity: 0.3 };
    } else {
      return { transform: 'translateX(200%) scale(0.6)', zIndex: 5, opacity: 0 };
    }
  };

  return (
    <section 
      className="py-8 md:py-20 bg-cream-50 relative"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <h2 className="text-2xl md:text-4xl font-serif text-stone-800 text-center mb-6 md:mb-12">Portafolio</h2>
      
      <div className="relative h-[50vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary-500/70 backdrop-blur-3xl" />

        <button 
          onClick={goToPrev}
          className="absolute left-2 md:left-12 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-xl transition-colors"
        >
          <ChevronLeft className="w-6 md:w-8 h-6 md:h-8 text-stone-800" />
        </button>

        <div className="relative flex items-center justify-center w-full h-full px-14 md:px-20">
          {imagenes.map((img, idx) => {
            const style = getTransformStyle(idx, currentIndex);
            return (
              <div
                key={img.id}
                onClick={() => setCurrentIndex(idx)}
                className="absolute transition-all duration-700 ease-in-out cursor-pointer"
                style={style}
              >
                <div className={`rounded-xl md:rounded-2xl overflow-hidden bg-stone-200 shadow-2xl ${
                  idx === currentIndex 
                    ? 'w-56 h-72 md:w-96 md:h-[28rem]' 
                    : 'w-28 h-36 md:w-56 md:h-72'
                }`}>
                  <img 
                    src={img.imagen} 
                    alt={img.descripcion}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<div className="w-full h-full flex items-center justify-center bg-stone-200"><span className="text-3xl md:text-4xl">🧵</span></div>';
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <button 
          onClick={goToNext}
          className="absolute right-2 md:right-12 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-xl transition-colors"
        >
          <ChevronRight className="w-6 md:w-8 h-6 md:h-8 text-stone-800" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex gap-3 z-40">
          {imagenes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-10 bg-primary-500' : 'w-3 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}