import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Building2, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'proposals', label: 'Ejes y Propuestas', icon: '🎯' },
  { id: 'evaluation', label: 'Evaluación Anual', icon: '📋' },
  { id: 'final', label: 'Informe Final', icon: '🏆' },
  { id: 'citizen', label: 'Reporte Ciudadano', icon: '📢' },
];

export default function Header({ currentPage, setCurrentPage, selectedYear, setSelectedYear }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [yearDropdown, setYearDropdown] = useState(false);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#0f172a] text-white shadow-2xl sticky top-0 z-50 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setCurrentPage('dashboard')}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20"
            >
              <Building2 className="w-5 h-5 text-[#0f172a]" />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-base font-bold leading-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Trujillo Renace
              </h1>
              <p className="text-[10px] text-blue-300 font-medium tracking-wider uppercase">Plan de Gobierno 2027-2030</p>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item, idx) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(item.id)}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === item.id
                    ? 'text-amber-300'
                    : 'text-blue-100 hover:text-white'
                }`}
              >
                {currentPage === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/10 rounded-lg border border-white/10"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span className="text-xs">{item.icon}</span>
                  {item.label}
                </span>
              </motion.button>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Year selector */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setYearDropdown(!yearDropdown)}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl px-3 py-1.5 text-sm font-semibold transition-all"
              >
                <span className="text-amber-300">{selectedYear}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${yearDropdown ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {yearDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 bg-[#1e293b] border border-white/10 rounded-xl shadow-2xl overflow-hidden min-w-[100px]"
                  >
                    {[2027, 2028, 2029, 2030].map((year) => (
                      <button
                        key={year}
                        onClick={() => { setSelectedYear(year); setYearDropdown(false); }}
                        className={`w-full px-4 py-2.5 text-sm text-left transition-all ${
                          year === selectedYear
                            ? 'bg-amber-500/20 text-amber-300 font-bold'
                            : 'text-white/80 hover:bg-white/10'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-xl hover:bg-white/10 transition-colors"
            >
              <Search className="w-4.5 h-4.5" />
            </motion.button>

            {/* Mobile menu toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-white/10 transition-colors"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pb-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Buscar propuestas, zonas, indicadores..."
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 text-sm transition-all"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t border-white/5 bg-[#0f172a]/98 backdrop-blur-xl"
          >
            <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => { setCurrentPage(item.id); setMobileOpen(false); }}
                  className={`px-4 py-3 rounded-xl text-sm font-medium text-left transition-all flex items-center gap-3 ${
                    currentPage === item.id
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/20'
                      : 'text-blue-100 hover:bg-white/5'
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
