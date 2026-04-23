import { ShoppingBag, MessageCircle, CreditCard, Heart } from 'lucide-react';

export default function ComoComprar() {
  const pasos = [
    {
      icon: ShoppingBag,
      titulo: "Explora el Catálogo",
      descripcion: "Navega por nuestras categorías de productos hechos a mano y materiales.",
    },
    {
      icon: MessageCircle,
      titulo: "Contáctanos",
      descripcion: "Escríbenos para confirmar disponibilidad y acordar detalles.",
    },
    {
      icon: CreditCard,
      titulo: "Acuerda el Pago",
      descripcion: "Realiza el pago mediante transferencia o mercado pago.",
    },
    {
      icon: Heart,
      titulo: "Recibe tu Pieza",
      descripcion: "Recibe tu pieza artesanal en tu domicilio o retírala en taller.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-serif text-stone-800 text-center mb-4">Cómo Comprar</h2>
        <p className="text-stone-500 text-center mb-12 max-w-md mx-auto">
          Proceso simple para adquirir tus piezas artesanales
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pasos.map((paso, idx) => (
            <div key={idx} className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                <paso.icon className="w-8 h-8 text-primary-600" />
              </div>
              <span className="text-xs text-primary-600 tracking-widest uppercase">Paso {idx + 1}</span>
              <h3 className="font-serif text-lg text-stone-800 mt-2">{paso.titulo}</h3>
              <p className="text-sm text-stone-500 mt-2">{paso.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}