import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contacto() {
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    setFormData({ nombre: '', email: '', mensaje: '' });
    setTimeout(() => setEnviado(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FFF7EA] py-24">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-800">Contacto</h1>
          <p className="mt-4 text-stone-500">Escríbenos para cualquier consulta</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-serif text-stone-800">Dirección</h3>
                  <p className="text-stone-600">Calle Artesanal 123, Ciudad</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-serif text-stone-800">Teléfono</h3>
                  <p className="text-stone-600">+1 234 567 890</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-serif text-stone-800">Email</h3>
                  <p className="text-stone-600">hola@ashez.art</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-stone-600 mb-2 text-sm">Nombre</label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-stone-200 focus:border-primary-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-stone-600 mb-2 text-sm">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-stone-200 focus:border-primary-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-stone-600 mb-2 text-sm">Mensaje</label>
              <textarea
                value={formData.mensaje}
                onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-stone-200 focus:border-primary-500 outline-none h-32 resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 hover:bg-primary-700 transition-colors"
            >
              {enviado ? 'Enviado!' : <><Send className="w-5 h-5" /> Enviar Mensaje</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}