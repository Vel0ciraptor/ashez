import { Link } from 'react-router-dom';
import { Scissors, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/ashez" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center">
                <Scissors className="w-5 h-5 text-white rotate-90" />
              </div>
              <span className="text-xl font-serif text-white">Ashez</span>
            </Link>
            <p className="text-stone-400 max-w-md text-sm leading-relaxed">
              Arte textil hecho a mano. Bordados, tejidos y piezas únicas creadas con dedicación y amor por el arte artesanal.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-white mb-4 text-sm tracking-widest uppercase">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/ashez/catalogo" className="text-stone-400 hover:text-primary-400 text-sm transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link to="/ashez/talleres" className="text-stone-400 hover:text-primary-400 text-sm transition-colors">
                  Talleres
                </Link>
              </li>
              <li>
                <Link to="/ashez/contacto" className="text-stone-400 hover:text-primary-400 text-sm transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-white mb-4 text-sm tracking-widest uppercase">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-stone-400 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Calle Artesanal 123, Ciudad</span>
              </li>
              <li className="flex items-center gap-2 text-stone-400 text-sm">
                <Mail className="w-4 h-4" />
                <span>hola@ashez.art</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-8 pt-8 text-center text-stone-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Ashez. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}