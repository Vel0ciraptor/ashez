import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import PortafolioCarrusel from './components/PortafolioCarrusel';
import ComoComprar from './components/ComoComprar';
import TalleresPreview from './components/TalleresPreview';
import ContactoPreview from './components/ContactoPreview';
import KitBordado from './components/KitBordado';
import Catalogo from './pages/Catalogo';
import Talleres from './pages/Talleres';
import Contacto from './pages/Contacto';
import Admin from './pages/Admin';

function Landing() {
  return (
    <>
      <Hero />
      <PortafolioCarrusel />
      <ComoComprar />
      <TalleresPreview />
      <KitBordado />
      <ContactoPreview />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/ashez" element={<Landing />} />
            <Route path="/ashez/catalogo" element={<Catalogo />} />
            <Route path="/ashez/talleres" element={<Talleres />} />
            <Route path="/ashez/contacto" element={<Contacto />} />
            <Route path="/ashez/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}