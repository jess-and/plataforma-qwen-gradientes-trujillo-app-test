import { motion } from 'framer-motion';
import { proposals, statusConfig, dimensions } from '../data/mockData';

interface DashboardProps {
  selectedYear: number;
  setCurrentPage: (page: string) => void;
  setDimensionFilter: (dim: string) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      {value}{suffix}
    </motion.span>
  );
}

export default function Dashboard({ selectedYear, setCurrentPage, setDimensionFilter }: DashboardProps) {
  const yearData = proposals.map(p => ({
    ...p,
    currentData: p.yearlyData[selectedYear] || { physicalProgress: 0, financialProgress: 0, budgetExecuted: 0, status: 'no_cumplido' as const },
  }));

  const globalProgress = Math.round(yearData.reduce((acc, p) => acc + p.currentData.physicalProgress, 0) / yearData.length);
  const totalBudget = proposals.reduce((acc, p) => acc + p.budget, 0);
  const executedBudget = yearData.reduce((acc, p) => acc + p.currentData.budgetExecuted, 0);
  const completed = yearData.filter(p => p.currentData.status === 'cumplido').length;
  const inProgress = yearData.filter(p => p.currentData.status === 'sustancial').length;
  const atRisk = yearData.filter(p => p.currentData.status === 'parcial').length;
  const notDone = yearData.filter(p => p.currentData.status === 'no_cumplido').length;

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `S/ ${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `S/ ${(value / 1000).toFixed(0)}K`;
    return `S/ ${value}`;
  };

  const metrics = [
    { label: 'Cumplimiento Global', value: globalProgress, suffix: '%', icon: '📈', color: 'from-blue-500 to-indigo-600', bgColor: 'bg-blue-50' },
    { label: 'Presupuesto Ejecutado', value: Math.round((executedBudget / totalBudget) * 100), suffix: '%', icon: '💰', color: 'from-amber-500 to-orange-600', bgColor: 'bg-amber-50', sub: `${formatCurrency(executedBudget)}` },
    { label: 'Propuestas Cumplidas', value: completed, suffix: `/12`, icon: '✅', color: 'from-emerald-500 to-green-600', bgColor: 'bg-emerald-50' },
    { label: 'En Ejecución', value: inProgress + atRisk, suffix: '', icon: '⚡', color: 'from-purple-500 to-violet-600', bgColor: 'bg-purple-50' },
  ];

  const statusItems = [
    { key: 'cumplido', count: completed, label: 'Cumplido', color: 'bg-emerald-500' },
    { key: 'sustancial', count: inProgress, label: 'En Proceso', color: 'bg-blue-500' },
    { key: 'parcial', count: atRisk, label: 'En Riesgo', color: 'bg-amber-500' },
    { key: 'no_cumplido', count: notDone, label: 'No Cumplido', color: 'bg-red-500' },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Hero Banner */}
      <motion.div variants={item} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#312e81] p-8 md:p-10 text-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-4"
          >
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-blue-100">Año Fiscal {selectedYear}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white via-blue-100 to-amber-200 bg-clip-text text-transparent"
          >
            Rendición de Cuentas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-blue-200/80 text-sm md:text-base max-w-xl leading-relaxed"
          >
            Monitoreo ciudadano en tiempo real del cumplimiento del Plan de Gobierno Municipal 
            de la Provincia de Trujillo. Transparencia total, fiscalización activa.
          </motion.p>
        </div>
      </motion.div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {metrics.map((metric, idx) => (
          <motion.div
            key={idx}
            variants={item}
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100/80 hover:shadow-xl hover:shadow-gray-200/50 transition-shadow group"
          >
            <div className="flex items-start justify-between mb-3">
              <motion.div
                whileHover={{ rotate: 10 }}
                className={`w-10 h-10 md:w-12 md:h-12 ${metric.bgColor} rounded-xl flex items-center justify-center text-lg md:text-xl`}
              >
                {metric.icon}
              </motion.div>
              <div className={`text-xl md:text-2xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                <AnimatedCounter value={metric.value} suffix={metric.suffix} />
              </div>
            </div>
            <p className="text-xs md:text-sm text-gray-500 font-medium">{metric.label}</p>
            {'sub' in metric && metric.sub && (
              <p className="text-[10px] text-gray-400 mt-0.5">{metric.sub}</p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Status + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6">
        {/* Status Distribution */}
        <motion.div variants={item} className="lg:col-span-3 bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100/80">
          <h3 className="text-base md:text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
            Semáforo de Cumplimiento
          </h3>
          <div className="space-y-4">
            {statusItems.map((s, idx) => {
              const percentage = Math.round((s.count / 12) * 100);
              return (
                <motion.div
                  key={s.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 ${s.color} rounded-full shadow-sm`} />
                      <span className="text-sm text-gray-700 font-medium">{s.label}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-800">{s.count} <span className="text-gray-400 font-normal">({percentage}%)</span></span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 + idx * 0.1, ease: 'easeOut' }}
                      className={`h-full rounded-full ${s.color} shadow-sm`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Circular Progress */}
        <motion.div variants={item} className="lg:col-span-2 bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100/80">
          <h3 className="text-base md:text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-gradient-to-b from-amber-500 to-orange-600 rounded-full" />
            Avance Global
          </h3>
          <div className="flex items-center justify-center py-2">
            <div className="relative w-44 h-44 md:w-48 md:h-48">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                <motion.circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - globalProgress / 100) }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: 'spring' }}
                  className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  {globalProgress}%
                </motion.span>
                <span className="text-xs text-gray-400 mt-1">al {selectedYear}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-2">
            {Object.entries(dimensions).map(([key, dim]) => {
              const dimProposals = yearData.filter(p => p.dimension === key);
              const avg = Math.round(dimProposals.reduce((acc, p) => acc + p.currentData.physicalProgress, 0) / dimProposals.length);
              return (
                <div key={key} className="text-center">
                  <span className="text-xl block">{dim.icon}</span>
                  <p className="text-sm font-bold text-gray-700 mt-1">{avg}%</p>
                  <p className="text-[10px] text-gray-400">{dim.label.split(' ')[0]}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Dimension Cards */}
      <motion.div variants={item} className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100/80">
        <h3 className="text-base md:text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full" />
          Dimensiones del Plan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(dimensions).map(([key, dim], idx) => {
            const dimProposals = yearData.filter(p => p.dimension === key);
            const avg = Math.round(dimProposals.reduce((acc, p) => acc + p.currentData.physicalProgress, 0) / dimProposals.length);
            const budget = dimProposals.reduce((acc, p) => acc + p.budget, 0);
            return (
              <motion.button
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { setDimensionFilter(key); setCurrentPage('proposals'); }}
                className={`relative overflow-hidden bg-gradient-to-br ${dim.color} rounded-2xl p-5 text-white text-left shadow-lg hover:shadow-xl transition-shadow`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <span className="text-3xl mb-3 block">{dim.icon}</span>
                <h4 className="font-bold text-sm md:text-base mb-1">{dim.label}</h4>
                <p className="text-white/70 text-xs mb-4">{dimProposals.length} propuestas • {formatCurrency(budget)}</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-white/20 rounded-full h-2.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${avg}%` }}
                      transition={{ duration: 1, delay: 0.6 + idx * 0.1 }}
                      className="bg-white h-full rounded-full"
                    />
                  </div>
                  <span className="text-lg font-bold">{avg}%</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
