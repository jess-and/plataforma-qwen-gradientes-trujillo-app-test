import { motion } from 'framer-motion';
import { FileDown, Radio, ShieldCheck, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { annualEvaluations, verifyingEntities, statusConfig, proposals } from '../data/mockData';

interface EvaluationProps {
  selectedYear: number;
}

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function AnnualEvaluation({ selectedYear }: EvaluationProps) {
  const evaluation = annualEvaluations.find(e => e.year === selectedYear) || annualEvaluations[0];
  
  const yearProposals = proposals.map(p => ({
    ...p,
    currentData: p.yearlyData[selectedYear] || { physicalProgress: 0, financialProgress: 0, budgetExecuted: 0, status: 'no_cumplido' as const },
  }));

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `S/ ${(value / 1000000).toFixed(1)}M`;
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 0 }).format(value);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <motion.div variants={item} className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100/80">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">Evaluación Anual de Cumplimiento</h2>
        <p className="text-sm text-gray-500">Informes de evaluación presentados al finalizar cada año fiscal</p>
      </motion.div>

      {/* Year Timeline */}
      <motion.div variants={item} className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100/80">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-6 left-0 right-0 h-1 bg-gray-100 rounded-full hidden md:block" />
          <motion.div
            className="absolute top-6 left-0 h-1 bg-gradient-to-r from-blue-500 to-amber-500 rounded-full hidden md:block"
            initial={{ width: '0%' }}
            animate={{ width: `${((selectedYear - 2027) / 3) * 100}%` }}
            transition={{ duration: 0.8 }}
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative">
            {annualEvaluations.map((ev, idx) => (
              <motion.button
                key={ev.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative rounded-2xl p-4 border-2 transition-all text-left ${
                  ev.year === selectedYear
                    ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg shadow-blue-100'
                    : ev.year < selectedYear
                    ? 'border-emerald-200 bg-emerald-50/50'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-gray-800">{ev.year}</span>
                  {ev.year <= selectedYear && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 + idx * 0.1 }}>
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    </motion.div>
                  )}
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{ev.globalProgress}%</div>
                <p className="text-xs text-gray-500 mt-1">avance global</p>
                {ev.year === selectedYear && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Budget Execution */}
          <motion.div variants={item} className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100/80">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
              Ejecución Presupuestal {evaluation.year}
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-500">Presupuesto Total</p>
                <p className="text-xl font-bold text-gray-800">{formatCurrency(evaluation.totalBudget)}</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-3">
                <p className="text-xs text-emerald-600">Ejecutado</p>
                <p className="text-xl font-bold text-emerald-700">{formatCurrency(evaluation.executedBudget)}</p>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(evaluation.executedBudget / evaluation.totalBudget) * 100}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-full rounded-full flex items-center justify-end pr-3"
              >
                <span className="text-xs text-white font-bold">{Math.round((evaluation.executedBudget / evaluation.totalBudget) * 100)}%</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Status Breakdown */}
          <motion.div variants={item} className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100/80">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gradient-to-b from-amber-500 to-orange-600 rounded-full" />
              Estado de Propuestas
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { count: evaluation.proposalsCompleted, label: 'Cumplidas', emoji: '🟢', bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700' },
                { count: evaluation.proposalsInProgress, label: 'En Proceso', emoji: '🔵', bg: 'bg-blue-50 border-blue-200', text: 'text-blue-700' },
                { count: evaluation.proposalsAtRisk, label: 'En Riesgo', emoji: '🟡', bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700' },
                { count: evaluation.proposalsNotStarted, label: 'No Iniciadas', emoji: '🔴', bg: 'bg-red-50 border-red-200', text: 'text-red-700' },
              ].map((s, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className={`${s.bg} border rounded-xl p-4 text-center`}
                >
                  <p className="text-3xl font-bold">{s.count}</p>
                  <p className={`text-xs font-medium mt-1 ${s.text}`}>{s.emoji} {s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div variants={item} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 md:p-6 border border-blue-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Hitos Destacados {evaluation.year}
            </h3>
            <div className="space-y-3">
              {evaluation.highlights.map((h, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">{idx + 1}</span>
                  </div>
                  <p className="text-sm text-gray-700">{h}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Proposals Table */}
          <motion.div variants={item} className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100/80">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Detalle por Propuesta</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-3 text-gray-500 font-medium text-xs">ID</th>
                    <th className="text-left py-3 px-3 text-gray-500 font-medium text-xs">Propuesta</th>
                    <th className="text-center py-3 px-3 text-gray-500 font-medium text-xs">Avance</th>
                    <th className="text-center py-3 px-3 text-gray-500 font-medium text-xs">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {yearProposals.map((p, idx) => (
                    <motion.tr
                      key={p.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.03 }}
                      className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors"
                    >
                      <td className="py-3 px-3 font-mono text-xs text-gray-400">{p.id}</td>
                      <td className="py-3 px-3 text-gray-700 font-medium">{p.title}</td>
                      <td className="py-3 px-3 text-center">
                        <span className="font-bold text-blue-600">{p.currentData.physicalProgress}%</span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${statusConfig[p.currentData.status].bg} ${statusConfig[p.currentData.status].color}`}>
                          {statusConfig[p.currentData.status].emoji}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Verifier */}
          <motion.div variants={item} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/80">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold text-gray-800">Verificación Independiente</h3>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 text-center mb-4">
              <p className="text-xs text-blue-600 font-semibold">Entidad Verificadora {evaluation.year}</p>
              <p className="text-sm font-bold text-blue-800 mt-2">{evaluation.verifier}</p>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="mt-3 inline-flex items-center gap-1.5 bg-blue-100 rounded-full px-3 py-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-xs text-blue-700 font-semibold">Sello de Validación</span>
              </motion.div>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-gray-500 font-semibold">Entidades Aliadas:</p>
              {verifyingEntities.slice(0, 5).map((entity, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.05 }}
                  className="flex items-center gap-2 text-xs text-gray-600"
                >
                  <Users className="w-3 h-3 text-gray-400" />
                  <span>{entity}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Live Session */}
          <motion.div variants={item} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/80">
            <div className="flex items-center gap-2 mb-4">
              <Radio className="w-5 h-5 text-red-500" />
              <h3 className="text-sm font-bold text-gray-800">Sesión de Rendición</h3>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-center mb-3 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/30 rounded-full blur-2xl" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3 relative"
              >
                <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping" />
                <Radio className="w-7 h-7 text-red-400 relative" />
              </motion.div>
              <p className="text-white text-sm font-semibold relative">Transmisión en Vivo</p>
              <p className="text-gray-400 text-xs mt-1 relative">Sesión Provincial de Rendición</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors shadow-lg shadow-red-500/30 relative"
              >
                Ver Transmisión
              </motion.button>
            </div>
            <p className="text-xs text-gray-500 text-center">Diciembre {evaluation.year}</p>
          </motion.div>

          {/* Download */}
          <motion.div variants={item} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/80">
            <h3 className="text-sm font-bold text-gray-800 mb-3">Descargar Informe</h3>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#1e3a8a] to-[#312e81] hover:from-[#1e40af] hover:to-[#3730a3] text-white py-3 rounded-xl transition-all font-semibold text-sm shadow-lg shadow-blue-900/20"
            >
              <FileDown className="w-4 h-4" />
              Informe {evaluation.year} (PDF)
            </motion.button>
            <p className="text-xs text-gray-400 text-center mt-2">Documento oficial de rendición</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
