import { useState, useEffect } from 'react';
import { Search, MessageCircle } from 'lucide-react';
import { getProductos } from '../lib/data';
import type { Producto } from '../lib/data';

const WHATSAPP_NUMBER = '+59176398780';

function sendToWhatsApp(producto: Producto) {
  const mensaje = `Hola! Quiero comprar: ${producto.nombre}%0APrecio: $${producto.precio}%0ADescripción: ${producto.descripcion}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${mensaje}`, '_blank');
}

function ProductoCard({ producto, onComprar }: { producto: Producto; onComprar: () => void }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-square bg-stone-100 overflow-hidden">
        <img 
          src={producto.imagen} 
          alt={producto.nombre}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling?.classList.remove('hidden');
          }}
        />
        <div className="w-full h-full hidden flex items-center justify-center">
          <span className="text-6xl">🧵</span>
        </div>
      </div>
      <div className="p-4">
        <span className="text-xs text-primary-600 uppercase tracking-wide">
          {producto.categoria.replace('_', ' ')}
        </span>
        <h3 className="font-serif text-lg text-stone-800 mt-1">{producto.nombre}</h3>
        <p className="text-sm text-stone-500 mt-1 line-clamp-2">{producto.descripcion}</p>
        <p className="text-xl font-semibold text-primary-600 mt-3">
          ${producto.precio.toLocaleString('es-MX')}
        </p>
        {producto.tipo === 'material' && (
          <button
            onClick={onComprar}
            className="w-full mt-3 flex items-center justify-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Comprar
          </button>
        )}
      </div>
    </div>
  );
}

export default function Catalogo() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    setProductos(getProductos());
  }, []);

  const materiales = productos.filter(p => p.tipo === 'material' && p.nombre.toLowerCase().includes(busqueda.toLowerCase()));
  const productosArtesanales = productos.filter(p => p.tipo === 'producto' && p.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#FFF7EA] py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-800">Catálogo</h1>
          <p className="mt-4 text-stone-500">Arte textil y materiales</p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Buscar..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 focus:border-primary-500 outline-none"
            />
          </div>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-stone-200"></div>
            <h2 className="text-2xl font-serif text-stone-800 px-4">Materiales</h2>
            <div className="flex-1 h-px bg-stone-200"></div>
          </div>
          {materiales.length === 0 ? (
            <p className="text-center py-8 text-stone-500">No se encontraron materiales</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {materiales.map((producto) => (
                <ProductoCard
                  key={producto.id}
                  producto={producto}
                  onComprar={() => sendToWhatsApp(producto)}
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-stone-200"></div>
            <h2 className="text-2xl font-serif text-stone-800 px-4">Productos</h2>
            <div className="flex-1 h-px bg-stone-200"></div>
          </div>
          {productosArtesanales.length === 0 ? (
            <p className="text-center py-8 text-stone-500">No se encontraron productos</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {productosArtesanales.map((producto) => (
                <ProductoCard
                  key={producto.id}
                  producto={producto}
                  onComprar={() => sendToWhatsApp(producto)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}