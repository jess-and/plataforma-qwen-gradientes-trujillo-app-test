import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Proposals from './components/Proposals';
import AnnualEvaluation from './components/AnnualEvaluation';
import FinalReport from './components/FinalReport';
import CitizenReportForm from './components/CitizenReport';
import { Building2, Heart } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.3,
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedYear, setSelectedYear] = useState(2027);
  const [dimensionFilter, setDimensionFilter] = useState('');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard selectedYear={selectedYear} setCurrentPage={setCurrentPage} setDimensionFilter={setDimensionFilter} />;
      case 'proposals':
        return <Proposals selectedYear={selectedYear} dimensionFilter={dimensionFilter} setDimensionFilter={setDimensionFilter} />;
      case 'evaluation':
        return <AnnualEvaluation selectedYear={selectedYear} />;
      case 'final':
        return <FinalReport />;
      case 'citizen':
        return <CitizenReportForm />;
      default:
        return <Dashboard selectedYear={selectedYear} setCurrentPage={setCurrentPage} setDimensionFilter={setDimensionFilter} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + selectedYear}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-[#0f172a] to-[#020617] text-white mt-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-amber-500 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-10 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <Building2 className="w-5 h-5 text-[#0f172a]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Trujillo Renace</h4>
                  <p className="text-[10px] text-blue-300 uppercase tracking-wider">Plan de Gobierno 2027-2030</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Plataforma de Rendición de Cuentas y Seguimiento del Plan de Gobierno Municipal 
                de la Provincia de Trujillo. Comprometidos con la transparencia y la participación ciudadana.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-4 text-amber-400">Enlaces Rápidos</h4>
              <ul className="space-y-2.5">
                {[
                  { id: 'dashboard', label: 'Dashboard Principal' },
                  { id: 'proposals', label: 'Ejes y Propuestas' },
                  { id: 'evaluation', label: 'Evaluación Anual' },
                  { id: 'citizen', label: 'Reporte Ciudadano' },
                ].map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => setCurrentPage(link.id)}
                      className="text-xs text-gray-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-amber-400 transition-colors" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-4 text-amber-400">Información</h4>
              <ul className="space-y-2.5 text-xs text-gray-400">
                <li>Municipalidad Provincial de Trujillo</li>
                <li>Jr. Pizarro 346, Trujillo</li>
                <li>La Libertad, Perú</li>
                <li className="pt-2">
                  <span className="text-gray-500">Transparencia Municipal</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500">
              © 2027-2030 Municipalidad Provincial de Trujillo. Todos los derechos reservados.
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1.5">
              Hecho con <Heart className="w-3 h-3 text-red-400 fill-red-400" /> para la ciudadanía de Trujillo
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
