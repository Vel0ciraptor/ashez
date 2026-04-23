'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Package, Calendar, Image } from 'lucide-react';
import { getProductos, createProducto, updateProducto, deleteProducto, getTalleres, createTaller, updateTaller, deleteTaller, getPortafolio, addPortafolioImagen, deletePortafolioImagen } from '../lib/data';
import type { Producto, Taller, PortafolioImagen } from '../lib/data';

type Tab = 'productos' | 'talleres' | 'portafolio';

export default function Admin() {
  const [tab, setTab] = useState<Tab>('productos');
  const [productos, setProductos] = useState<Producto[]>([]);
  const [talleres, setTalleres] = useState<Taller[]>([]);
  const [portafolio, setPortafolio] = useState<PortafolioImagen[]>([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState<Producto | Taller | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevaImagen, setNuevaImagen] = useState('');

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = () => {
    setProductos(getProductos());
    setTalleres(getTalleres());
    setPortafolio(getPortafolio());
    setLoading(false);
  };

  const handleEliminarProducto = (id: string) => {
    if (!confirm('¿Eliminar producto?')) return;
    deleteProducto(id);
    cargarDatos();
  };

  const handleEliminarTaller = (id: string) => {
    if (!confirm('¿Eliminar taller?')) return;
    deleteTaller(id);
    cargarDatos();
  };

  const handleGuardarProducto = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      nombre: formData.get('nombre') as string,
      descripcion: formData.get('descripcion') as string,
      precio: Number(formData.get('precio')),
      imagen: formData.get('imagen') as string,
      categoria: formData.get('categoria') as string,
      tipo: formData.get('tipo') as 'producto' | 'material',
    };
    if (editando && 'id' in editando) {
      updateProducto(editando.id, data);
    } else {
      createProducto(data);
    }
    setMostrarFormulario(false);
    setEditando(null);
    cargarDatos();
  };

  const handleGuardarTaller = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      titulo: formData.get('titulo') as string,
      descripcion: formData.get('descripcion') as string,
      ubicacion: formData.get('ubicacion') as string,
      fecha: formData.get('fecha') as string,
      cupos: Number(formData.get('cupos')),
      disponibles: Number(formData.get('disponibles')),
    };
    if (editando && 'id' in editando) {
      updateTaller(editando.id, data);
    } else {
      createTaller(data);
    }
    setMostrarFormulario(false);
    setEditando(null);
    cargarDatos();
  };

  const handleEliminarImagen = (id: string) => {
    if (!confirm('¿Eliminar imagen?')) return;
    const success = deletePortafolioImagen(id);
    if (success) {
      cargarDatos();
    } else {
      alert('Error al eliminar imagen');
    }
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
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif text-stone-800">Panel de Admin</h1>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => { setTab('productos'); setMostrarFormulario(false); setEditando(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              tab === 'productos' ? 'bg-primary-600 text-white' : 'bg-white text-stone-600'
            }`}
          >
            <Package className="w-4 h-4" /> Productos
          </button>
          <button
            onClick={() => { setTab('talleres'); setMostrarFormulario(false); setEditando(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              tab === 'talleres' ? 'bg-primary-600 text-white' : 'bg-white text-stone-600'
            }`}
          >
            <Calendar className="w-4 h-4" /> Talleres
          </button>
          <button
            onClick={() => { setTab('portafolio'); setMostrarFormulario(false); setEditando(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              tab === 'portafolio' ? 'bg-primary-600 text-white' : 'bg-white text-stone-600'
            }`}
          >
            <Image className="w-4 h-4" /> Portafolio
          </button>
        </div>

        {mostrarFormulario && tab !== 'portafolio' && (
          <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-serif text-stone-800">
                {editando ? 'Editar' : 'Nuevo'} {tab === 'productos' ? 'Producto' : 'Taller'}
              </h2>
              <button onClick={() => { setMostrarFormulario(false); setEditando(null); }} className="p-2 hover:bg-stone-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            {tab === 'productos' ? (
              <form onSubmit={handleGuardarProducto} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-600 mb-2 text-sm">Nombre *</label>
                  <input name="nombre" defaultValue={editando && 'nombre' in editando ? editando.nombre : ''} required className="w-full px-4 py-2 border border-stone-200" />
                </div>
                <div>
                  <label className="block text-stone-600 mb-2 text-sm">Precio *</label>
                  <input name="precio" type="number" defaultValue={editando && 'precio' in editando ? editando.precio : ''} required className="w-full px-4 py-2 border border-stone-200" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-stone-600 mb-2 text-sm">Descripción</label>
                  <textarea name="descripcion" defaultValue={editando ? editando.descripcion : ''} className="w-full px-4 py-2 border border-stone-200 h-24" />
                </div>
                <div>
                  <label className="block text-stone-600 mb-2 text-sm">Tipo *</label>
                  <select name="tipo" defaultValue={editando && 'tipo' in editando ? editando.tipo : 'producto'} required className="w-full px-4 py-2 border border-stone-200">
                    <option value="producto">Producto</option>
                    <option value="material">Material</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-600 mb-2 text-sm">Categoría *</label>
                  <select name="categoria" defaultValue={editando && 'categoria' in editando ? editando.categoria : 'bordado'} required className="w-full px-4 py-2 border border-stone-200">
                    <option value="bordado">Bordado</option>
                    <option value="tejido">Tejido</option>
                    <option value="personalizado">Personalizado</option>
                    <option value="materiales_bordado">Materiales Bordado</option>
                    <option value="materiales_tejido">Materiales Tejido</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-600 mb-2 text-sm">Imagen URL</label>
                  <input name="imagen" defaultValue={editando && 'imagen' in editando ? editando.imagen : ''} placeholder="/assets/image.jpg" className="w-full px-4 py-2 border border-stone-200" />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="w-full bg-primary-600 text-white px-6 py-3 hover:bg-primary-700">Guardar</button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleGuardarTaller} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-stone-600 mb-2 text-sm">Título *</label>
                  <input name="titulo" defaultValue={editando && 'titulo' in editando ? editando.titulo : ''} required className="w-full px-4 py-2 border border-stone-200" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-stone-600 mb-2 text-sm">Descripción</label>
                  <textarea name="descripcion" defaultValue={editando ? editando.descripcion : ''} className="w-full px-4 py-2 border border-stone-200 h-24" />
                </div>
                <div>
                  <label className="block text-stone-600 mb-2 text-sm">Ubicación *</label>
                  <input name="ubicacion" defaultValue={editando && 'ubicacion' in editando ? editando.ubicacion : ''} required className="w-full px-4 py-2 border border-stone-200" />
                </div>
                <div>
                  <label className="block text-stone-600 mb-2 text-sm">Fecha *</label>
                  <input name="fecha" type="datetime-local" defaultValue={editando && 'fecha' in editando ? editando.fecha.slice(0, 16) : ''} required className="w-full px-4 py-2 border border-stone-200" />
                </div>
                <div>
                  <label className="block text-stone-600 mb-2 text-sm">Cupos *</label>
                  <input name="cupos" type="number" defaultValue={editando && 'cupos' in editando ? editando.cupos : ''} required className="w-full px-4 py-2 border border-stone-200" />
                </div>
                <div>
                  <label className="block text-stone-600 mb-2 text-sm">Disponibles *</label>
                  <input name="disponibles" type="number" defaultValue={editando && 'disponibles' in editando ? editando.disponibles : ''} required className="w-full px-4 py-2 border border-stone-200" />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="w-full bg-primary-600 text-white px-6 py-3 hover:bg-primary-700">Guardar</button>
                </div>
              </form>
            )}
          </div>
        )}

        {tab === 'portafolio' && (
          <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
            <h2 className="text-xl font-serif text-stone-800 mb-4">Agregar Imagen</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={nuevaImagen}
                onChange={(e) => setNuevaImagen(e.target.value)}
                placeholder="/assets/nombre.jpg"
                className="flex-1 px-4 py-2 border border-stone-200"
              />
              <input
                type="text"
                id="descripcionImagen"
                placeholder="Descripción de la imagen"
                className="flex-1 px-4 py-2 border border-stone-200"
              />
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    const desc = (document.getElementById('descripcionImagen') as HTMLInputElement)?.value || '';
                    if (nuevaImagen) {
                      addPortafolioImagen({ imagen: nuevaImagen, descripcion: desc });
                      setNuevaImagen('');
                      cargarDatos();
                    }
                  }} 
                  className="px-6 py-2 bg-primary-600 text-white hover:bg-primary-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {!mostrarFormulario && tab !== 'portafolio' && (
          <button
            onClick={() => setMostrarFormulario(true)}
            className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 hover:bg-primary-700 mb-8"
          >
            <Plus className="w-5 h-5" /> Nuevo {tab === 'productos' ? 'Producto' : 'Taller'}
          </button>
        )}

        {tab === 'productos' && (
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="text-left px-4 py-3 text-stone-600 text-sm w-20">Img</th>
                  <th className="text-left px-4 py-3 text-stone-600 text-sm">Nombre</th>
                  <th className="text-left px-4 py-3 text-stone-600 text-sm">Tipo</th>
                  <th className="text-left px-4 py-3 text-stone-600 text-sm">Precio</th>
                  <th className="text-right px-4 py-3 text-stone-600 text-sm">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((p) => (
                  <tr key={p.id} className="border-b border-stone-100 hover:bg-stone-50">
                    <td className="px-4 py-3">
                      <div className="w-12 h-12 bg-stone-100 rounded-lg overflow-hidden">
                        <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display = 'none'} />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-stone-800">{p.nombre}</p>
                      <p className="text-xs text-stone-500">{p.categoria}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-primary-600">{p.tipo}</td>
                    <td className="px-4 py-3 text-stone-800">${p.precio}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => { setEditando(p); setMostrarFormulario(true); }} className="p-2 hover:bg-stone-100 rounded-lg mr-2">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleEliminarProducto(p.id)} className="p-2 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'talleres' && (
          <div className="space-y-4">
            {talleres.map((t) => (
              <div key={t.id} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-stone-800">{t.titulo}</h3>
                    <p className="text-sm text-stone-500">{t.disponibles}/{t.cupos} disponibles</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditando(t); setMostrarFormulario(true); }} className="p-2 hover:bg-stone-100 rounded-lg">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleEliminarTaller(t.id)} className="p-2 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'portafolio' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {portafolio.map((img) => (
              <div key={img.id} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="aspect-square bg-stone-100 rounded-lg overflow-hidden">
                  <img 
                    src={img.imagen} 
                    alt={img.descripcion}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const div = document.createElement('div');
                      div.className = 'w-full h-full flex items-center justify-center';
                      div.innerHTML = '<span className=\'text-4xl\'>🧵</span>';
                      e.currentTarget.parentElement?.appendChild(div);
                    }}
                  />
                </div>
                <p className="text-sm text-stone-600 mt-2 truncate">{img.descripcion}</p>
                <button onClick={() => handleEliminarImagen(img.id)} className="w-full mt-2 p-2 text-red-500 hover:bg-red-50 text-sm">
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}