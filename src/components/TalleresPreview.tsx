import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users } from 'lucide-react';
import { getTalleres, type Taller } from '../lib/data';

export default function TalleresPreview() {
  const [talleres, setTalleres] = useState<Taller[]>([]);

  useEffect(() => {
    setTalleres(getTalleres());
  }, []);

  const talleresPreview = talleres.slice(0, 2);

  return (
    <section className="py-20 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-serif text-stone-800 text-center mb-12">Talleres</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {talleresPreview.map((taller) => (
            <div key={taller.id} className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-serif text-xl text-stone-800">{taller.titulo}</h3>
              <p className="text-stone-500 mt-2 text-sm">{taller.descripcion}</p>
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-stone-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(taller.fecha).toLocaleDateString('es-ES')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{taller.ubicacion}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{taller.disponibles}/{taller.cupos} lugares</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/talleres" className="inline-block border border-stone-800 text-stone-800 px-6 py-3 hover:bg-stone-800 hover:text-white transition-colors">
            Ver Todos los Talleres
          </Link>
        </div>
      </div>
    </section>
  );
}