export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  categoria: string;
  tipo: 'producto' | 'material';
}

export interface Taller {
  id: string;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  fecha: string;
  cupos: number;
  disponibles: number;
}

export interface PortafolioImagen {
  id: string;
  imagen: string;
  descripcion: string;
}

const STORAGE_KEYS = {
  productos: 'ashez_productos',
  talleres: 'ashez_talleres',
  portafolio: 'ashez_portafolio',
};

const defaultProductos: Producto[] = [
  { id: "1", nombre: "Bordado Floral de Gardenia", descripcion: "Bordado a mano sobre tela de lino con hilos de seda.", precio: 4500, imagen: "/assets/portafolio1.jpg", categoria: "bordado", tipo: "producto" },
  { id: "2", nombre: "Tapiz Tejido Artesanal", descripcion: "Tapiz de pared tejido a mano con lana natural.", precio: 8200, imagen: "/assets/portafolio2.jpg", categoria: "tejido", tipo: "producto" },
  { id: "3", nombre: "Manta de Alpaca Tejida", descripcion: "Manta suave de alpaca 100% tejida a mano.", precio: 6200, imagen: "/assets/portafolio3.jpg", categoria: "tejido", tipo: "producto" },
  { id: "4", nombre: "Set de Hilos de Bordado", descripcion: "Set de hilos de seda. 50 colores.", precio: 850, imagen: "/assets/IMG_1307.jpg", categoria: "materiales_bordado", tipo: "material" },
  { id: "5", nombre: "Agujas de Bordado Premium", descripcion: "Pack de 25 agujas.", precio: 250, imagen: "/assets/IMG_2521.jpg", categoria: "materiales_bordado", tipo: "material" },
];

const defaultTalleres: Taller[] = [
  { id: "1", titulo: "Taller de Bordado Básico", descripcion: "Aprende los fundamentos del bordado a mano.", ubicacion: "Estudio Ashez, Calle Artesanal 123", fecha: "2026-04-20T10:00:00", cupos: 8, disponibles: 5 },
  { id: "2", titulo: "Taller de Tejido con Telar", descripcion: "Introducción al tejido en telar.", ubicacion: "Estudio Ashez, Calle Artesanal 123", fecha: "2026-04-27T14:00:00", cupos: 6, disponibles: 4 },
  { id: "3", titulo: "Taller de Bordado Botánico", descripcion: "Taller especializado en bordado botánico.", ubicacion: "Estudio Ashez, Calle Artesanal 123", fecha: "2026-05-04T10:00:00", cupos: 8, disponibles: 6 },
];

const defaultPortafolio: PortafolioImagen[] = [
  { id: "1", imagen: "/assets/IMG_0575.jpg", descripcion: "Bordado floral delicado" },
  { id: "2", imagen: "/assets/IMG_0578.jpg", descripcion: "Detalle de puntada" },
  { id: "3", imagen: "/assets/IMG_0580.jpg", descripcion: "Trabajo en progreso" },
  { id: "4", imagen: "/assets/IMG_0583.jpg", descripcion: "Bordado completo" },
  { id: "5", imagen: "/assets/IMG_0584.jpg", descripcion: "Arte textil" },
  { id: "6", imagen: "/assets/IMG_0588.jpg", descripcion: "Bordado vintage" },
  { id: "7", imagen: "/assets/IMG_1307.jpg", descripcion: "Set de hilos" },
  { id: "8", imagen: "/assets/IMG_2521.jpg", descripcion: "Agujas de bordado" },
  { id: "9", imagen: "/assets/D2F651AD-65FF-421E-95B7-B342FFC29F9A.jpg", descripcion: "Obra 1" },
  { id: "10", imagen: "/assets/d791cd66464cbf9d8559ce1bc52e7879.jpg", descripcion: "Obra 2" },
  { id: "11", imagen: "/assets/E5F49CCA-5672-4833-B155-2C3DFF10D95E.jpg", descripcion: "Obra 3" },
  { id: "12", imagen: "/assets/EEB65E07-4787-4070-8904-6B882929844B.jpg", descripcion: "Obra 4" },
];

function loadData<T>(key: string, defaults: T[]): T[] {
  try {
    const stored = localStorage.getItem(key);
    if (!stored || stored === 'undefined') {
      localStorage.setItem(key, JSON.stringify(defaults));
      return defaults;
    }
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaults;
  } catch {
    localStorage.setItem(key, JSON.stringify(defaults));
    return defaults;
  }
}

function saveData<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getProductos(): Producto[] {
  return loadData<Producto>(STORAGE_KEYS.productos, defaultProductos);
}

export function createProducto(producto: Omit<Producto, 'id'>): Producto {
  const productos = getProductos();
  const newProducto: Producto = { ...producto, id: Date.now().toString() };
  productos.push(newProducto);
  saveData(STORAGE_KEYS.productos, productos);
  return newProducto;
}

export function updateProducto(id: string, updates: Partial<Producto>): Producto | undefined {
  const productos = getProductos();
  const index = productos.findIndex(p => p.id === id);
  if (index === -1) return undefined;
  productos[index] = { ...productos[index], ...updates };
  saveData(STORAGE_KEYS.productos, productos);
  return productos[index];
}

export function deleteProducto(id: string): boolean {
  const productos = getProductos();
  const filtered = productos.filter(p => p.id !== id);
  if (filtered.length === productos.length) return false;
  saveData(STORAGE_KEYS.productos, filtered);
  return true;
}

export function getTalleres(): Taller[] {
  return loadData<Taller>(STORAGE_KEYS.talleres, defaultTalleres);
}

export function createTaller(taller: Omit<Taller, 'id'>): Taller {
  const talleres = getTalleres();
  const newTaller: Taller = { ...taller, id: Date.now().toString() };
  talleres.push(newTaller);
  saveData(STORAGE_KEYS.talleres, talleres);
  return newTaller;
}

export function updateTaller(id: string, updates: Partial<Taller>): Taller | undefined {
  const talleres = getTalleres();
  const index = talleres.findIndex(t => t.id === id);
  if (index === -1) return undefined;
  talleres[index] = { ...talleres[index], ...updates };
  saveData(STORAGE_KEYS.talleres, talleres);
  return talleres[index];
}

export function deleteTaller(id: string): boolean {
  const talleres = getTalleres();
  const filtered = talleres.filter(t => t.id !== id);
  if (filtered.length === talleres.length) return false;
  saveData(STORAGE_KEYS.talleres, filtered);
  return true;
}

export function getPortafolio(): PortafolioImagen[] {
  return loadData<PortafolioImagen>(STORAGE_KEYS.portafolio, defaultPortafolio);
}

export function addPortafolioImagen(imagen: Omit<PortafolioImagen, 'id'>): PortafolioImagen {
  const imagenes = getPortafolio();
  const newImagen: PortafolioImagen = { ...imagen, id: Date.now().toString() };
  imagenes.push(newImagen);
  saveData(STORAGE_KEYS.portafolio, imagenes);
  return newImagen;
}

export function deletePortafolioImagen(id: string): boolean {
  const imagenes = getPortafolio();
  const filtered = imagenes.filter(i => i.id !== id);
  if (filtered.length === imagenes.length) return false;
  saveData(STORAGE_KEYS.portafolio, filtered);
  return true;
}