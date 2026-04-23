import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactoPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-serif text-stone-800 text-center mb-12">Contacto</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="font-medium text-stone-800">Dirección</h3>
            <p className="text-stone-500 text-sm mt-1">Calle Artesanal 123, Ciudad</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-3">
              <Phone className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="font-medium text-stone-800">Teléfono</h3>
            <p className="text-stone-500 text-sm mt-1">+1 234 567 890</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="font-medium text-stone-800">Email</h3>
            <p className="text-stone-500 text-sm mt-1">hola@ashez.art</p>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link to="/ashez/contacto" className="inline-block bg-primary-600 text-white px-6 py-3 hover:bg-primary-700 transition-colors">
            Contáctanos
          </Link>
        </div>
      </div>
    </section>
  );
}