import { Package, Clock, MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '+59176398780';

function sendToWhatsApp() {
  const mensaje = `Hola! Quiero comprar el Kit de Bordado%0APrecio: $450`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${mensaje}`, '_blank');
}

export default function KitBordado() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-800">Kit de Bordado</h2>
          <p className="mt-2 text-stone-500">Todo lo que necesitas para empezar</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-[#FFF7EA] rounded-xl p-6">
            <h3 className="font-serif text-xl text-stone-800 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary-600" />
              Incluye
            </h3>
            <ul className="space-y-3 text-stone-600">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 mt-2 rounded-full bg-primary-500 flex-shrink-0"></span>
                <span>Tela de lino premium (30x30cm)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 mt-2 rounded-full bg-primary-500 flex-shrink-0"></span>
                <span>Hilos de seda (20 colores)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 mt-2 rounded-full bg-primary-500 flex-shrink-0"></span>
                <span>Agujas de bordado (5 piezas)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 mt-2 rounded-full bg-primary-500 flex-shrink-0"></span>
                <span>Patrón imprimible</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 mt-2 rounded-full bg-primary-500 flex-shrink-0"></span>
                <span>Instrucciones en español</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#FFF7EA] rounded-xl overflow-hidden">
            <div className="aspect-square bg-stone-100">
              <img 
                src="/assets/IMG_1307.jpg" 
                alt="Kit de Bordado" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>

          <div className="bg-[#FFF7EA] rounded-xl p-6 flex flex-col">
            <h3 className="font-serif text-xl text-stone-800 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary-600" />
              Tiempo Estimado
            </h3>
            <div className="text-5xl font-serif text-primary-600 mb-2">4-6</div>
            <p className="text-stone-600 mb-8">horas de bordado</p>
            <div className="mt-auto">
              <p className="text-3xl font-semibold text-stone-800 mb-4">$450</p>
              <button
                onClick={sendToWhatsApp}
                className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 hover:bg-primary-700 transition-colors rounded-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Comprar Kit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}