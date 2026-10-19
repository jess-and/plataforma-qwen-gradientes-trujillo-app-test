import { motion } from 'framer-motion';
import { FileDown, Award, TrendingUp, Download, Trophy, Star } from 'lucide-react';
import { proposals, statusConfig, dimensions, type Status } from '../data/mockData';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function FinalReport() {
  // Use 2030 data for the final report
  const yearData = proposals.map(p => ({
    ...p,
    currentData: p.yearlyData[2030],
  }));

  const totalProposals = yearData.length;
  const globalProgress = Math.round(yearData.reduce((acc, p) => acc + p.currentData.physicalProgress, 0) / totalProposals);
  const totalBudget = proposals.reduce((acc, p) => acc + p.budget, 0);
  const totalExecuted = yearData.reduce((acc, p) => acc + p.currentData.budgetExecuted, 0);

  const statusCounts = {
    cumplido: yearData.filter(p => p.currentData.status === 'cumplido').length,
    sustancial: yearData.filter(p => p.currentData.status === 'sustancial').length,
    parcial: yearData.filter(p => p.currentData.status === 'parcial').length,
    no_cumplido: yearData.filter(p => p.currentData.status === 'no_cumplido').length,
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `S/ ${(value / 1000000).toFixed(1)}M`;
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 0 }).format(value);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Hero */}
      <motion.div variants={item} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#4c1d95] p-8 md:p-10 text-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        </div>
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 rounded-full px-4 py-1.5 mb-4"
          >
            <Trophy className="w-4 h-4 text-amber-300" />
            <span className="text-xs font-bold text-amber-200 uppercase tracking-wider">Informe Final Consolidado</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent"
          >
            Período 2027-2030
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-blue-200/80 text-sm md:text-base max-w-xl leading-relaxed"
          >
            Vista consolidada del cumplimiento integral de todos los compromisos asumidos ante la ciudadanía. 
            4 años de gestión transparente al servicio de Trujillo.
          </motion.p>
        </div>
      </motion.div>

      {/* Global Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          { icon: <TrendingUp className="w-6 h-6 text-blue-600" />, value: `${globalProgress}%`, label: 'Cumplimiento Global', bg: 'bg-blue-50' },
          { icon: <Award className="w-6 h-6 text-emerald-600" />, value: `${statusCounts.cumplido}/12`, label: 'Propuestas Cumplidas', bg: 'bg-emerald-50' },
          { icon: <Star className="w-6 h-6 text-amber-600" />, value: formatCurrency(totalExecuted), label: 'Total Ejecutado', bg: 'bg-amber-50' },
          { icon: <Trophy className="w-6 h-6 text-purple-600" />, value: `${Math.round((totalExecuted / totalBudget) * 100)}%`, label: 'Ejecución Presup.', bg: 'bg-purple-50' },
        ].map((m, idx) => (
          <motion.div
            key={idx}
            variants={item}
            whileHover={{ y: -4, scale: 1.03 }}
            className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100/80 text-center hover:shadow-lg transition-all"
          >
            <motion.div
              whileHover={{ rotate: 10 }}
              className={`w-12 h-12 ${m.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}
            >
              {m.icon}
            </motion.div>
            <p className="text-xl md:text-2xl font-bold text-gray-800">{m.value}</p>
            <p className="text-xs text-gray-500 mt-1">{m.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Semaforización */}
      <motion.div variants={item} className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100/80">
        <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
          Semaforización Integral del Mandato
        </h3>
        
        {/* Visual Bar */}
        <div className="w-full h-10 rounded-2xl overflow-hidden flex mb-5 shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(statusCounts.cumplido / totalProposals) * 100}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className="bg-gradient-to-r from-emerald-400 to-emerald-500 flex items-center justify-center"
          >
            <span className="text-sm text-white font-bold">{statusCounts.cumplido}</span>
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(statusCounts.sustancial / totalProposals) * 100}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            className="bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center"
          >
            <span className="text-sm text-white font-bold">{statusCounts.sustancial}</span>
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(statusCounts.parcial / totalProposals) * 100}%` }}
            transition={{ duration: 1, delay: 0.4 }}
            className="bg-gradient-to-r from-amber-400 to-amber-500 flex items-center justify-center"
          >
            <span className="text-sm text-white font-bold">{statusCounts.parcial}</span>
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(statusCounts.no_cumplido / totalProposals) * 100}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="bg-gradient-to-r from-red-400 to-red-500 flex items-center justify-center"
          >
            <span className="text-sm text-white font-bold">{statusCounts.no_cumplido}</span>
          </motion.div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 justify-center">
          {Object.entries(statusConfig).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${config.gradient}`} />
              <span className="text-sm text-gray-600 font-medium">{config.emoji} {config.label}: <strong>{statusCounts[key as Status]}</strong></span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Dimension Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(dimensions).map(([key, dim], idx) => {
          const dimProposals = yearData.filter(p => p.dimension === key);
          const avg = Math.round(dimProposals.reduce((acc, p) => acc + p.currentData.physicalProgress, 0) / dimProposals.length);
          const budget = dimProposals.reduce((acc, p) => acc + p.budget, 0);
          const executed = dimProposals.reduce((acc, p) => acc + p.currentData.budgetExecuted, 0);
          return (
            <motion.div
              key={key}
              variants={item}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/80 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{dim.icon}</span>
                <h4 className="font-bold text-gray-800 text-sm">{dim.label}</h4>
              </div>
              <div className="text-center mb-4">
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + idx * 0.1, type: 'spring' }}
                  className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  {avg}%
                </motion.p>
                <p className="text-xs text-gray-500">avance promedio</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Presupuesto</span>
                  <span className="font-semibold">{formatCurrency(budget)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Ejecutado</span>
                  <span className="font-semibold text-emerald-600">{formatCurrency(executed)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Propuestas</span>
                  <span className="font-semibold">{dimProposals.length}</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 mt-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${avg}%` }}
                  transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                  className={`h-full rounded-full bg-gradient-to-r ${dim.color}`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* All Proposals Summary */}
      <motion.div variants={item} className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100/80">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Resumen de Todas las Propuestas</h3>
        <div className="space-y-2">
          {yearData.map((p, idx) => {
            const status = statusConfig[p.currentData.status];
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.04 }}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <span className="text-lg">{status.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate group-hover:text-blue-700 transition-colors">{p.title}</p>
                  <p className="text-xs text-gray-500">{p.id} • {dimensions[p.dimension].label}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-blue-600">{p.currentData.physicalProgress}%</p>
                  <p className="text-[10px] text-gray-400">avance</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Download Section */}
      <motion.div variants={item} className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center"
            >
              <Download className="w-7 h-7 text-amber-600" />
            </motion.div>
            <div>
              <h4 className="font-bold text-gray-800 text-lg">Informe Final de Cumplimiento</h4>
              <p className="text-sm text-gray-500">Documento oficial consolidado del período 2027-2030</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-gradient-to-r from-[#1e3a8a] to-[#312e81] hover:from-[#1e40af] hover:to-[#3730a3] text-white px-6 py-3.5 rounded-xl transition-all font-bold shadow-lg shadow-blue-900/20"
          >
            <FileDown className="w-5 h-5" />
            Descargar PDF
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
