import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="bg-[#FFF7EA] relative pb-20 md:pb-0 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-4 md:px-8 w-full">
        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-12 md:items-center md:py-20 pb-20">
          <div className="text-center md:text-left pt-20 md:pt-0 mt-20 md:mt-0 order-1 md:order-1">
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-serif text-stone-800 leading-tight">
              Arte Textil
              <span className="block text-primary-600">Hecho a Mano</span>
            </h1>
            <p className="mt-2 text-stone-600 text-base md:text-xl max-w-lg mx-auto md:mx-0">
              Bordados, tejidos y piezas textiles únicas creadas con dedicación y amor por el arte artesanal.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 justify-center md:justify-start">
              <Link
                to="/catalogo"
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 hover:bg-primary-700 transition-colors"
              >
                Ver Catálogo <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/talleres"
                className="inline-flex items-center gap-2 border border-stone-800 text-stone-800 px-6 py-3 hover:bg-stone-800 hover:text-white transition-colors"
              >
                Talleres
              </Link>
            </div>
          </div>

          <div
            className="order-2 md:order-2 mt-10 md:mt-0"
            style={{
              transform: `translateY(${scrollY * 0.4}px)`,
              opacity: Math.max(0, 1 - scrollY / 700)
            }}
          >
            <img
              src="/assets/portafolio1.jpg"
              alt="Arte Textil"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}