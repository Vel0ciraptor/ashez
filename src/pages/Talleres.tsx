import { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, CheckCircle } from 'lucide-react';
import { getTalleres } from '../lib/data';
import type { Taller } from '../lib/data';

export default function Talleres() {
  const [talleres, setTalleres] = useState<Taller[]>([]);
  const [loading, setLoading] = useState(true);
  const [reservado, setReservado] = useState<string | null>(null);

  useEffect(() => {
    setTalleres(getTalleres());
    setLoading(false);
  }, []);

  const handleReservar = (id: string) => {
    setReservado(id);
    setTimeout(() => setReservado(null), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF7EA] py-24 flex items-center justify-center">
        <p className="text-stone-500">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF7EA] py-24">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-800">Talleres</h1>
          <p className="mt-4 text-stone-500">Aprende arte textil con nosotros</p>
        </div>

        {talleres.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">No hay talleres disponibles</div>
        ) : (
          <div className="space-y-6">
            {talleres.map((taller) => (
              <div key={taller.id} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-serif text-xl text-stone-800">{taller.titulo}</h3>
                    <p className="text-stone-600 mt-2">{taller.descripcion}</p>
                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-stone-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(taller.fecha).toLocaleDateString('es-ES', { 
                          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{taller.ubicacion}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{taller.disponibles}/{taller.cupos} disponibles</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-2">
                    {reservado === taller.id ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Reservado!</span>
                      </div>
                    ) : taller.disponibles === 0 ? (
                      <button disabled className="px-6 py-2 bg-stone-300 text-stone-500 cursor-not-allowed">
                        Agotado
                      </button>
                    ) : (
                      <button
                        onClick={() => handleReservar(taller.id)}
                        className="px-6 py-2 bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                      >
                        Reservar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}