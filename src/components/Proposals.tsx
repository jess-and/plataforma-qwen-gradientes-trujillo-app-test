import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, MapPin, TrendingUp, DollarSign, X, Calendar, Building, CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { proposals, statusConfig, dimensions, zones, type Proposal, type Status } from '../data/mockData';

interface ProposalsProps {
  selectedYear: number;
  dimensionFilter: string;
  setDimensionFilter: (dim: string) => void;
}

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Proposals({ selectedYear, dimensionFilter, setDimensionFilter }: ProposalsProps) {
  const [activeTab, setActiveTab] = useState(dimensionFilter || 'social');
  const [selectedProposal, setSelectedProposal] = useState<(Proposal & { currentData: { physicalProgress: number; financialProgress: number; budgetExecuted: number; status: Status } }) | null>(null);
  const [zoneFilter, setZoneFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const enrichedProposals = proposals.map(p => ({
    ...p,
    currentData: p.yearlyData[selectedYear] || { physicalProgress: 0, financialProgress: 0, budgetExecuted: 0, status: 'no_cumplido' as Status },
  }));

  const filteredProposals = enrichedProposals.filter(p => {
    const dimMatch = p.dimension === activeTab;
    const zoneMatch = zoneFilter === 'all' || p.zone.includes(zoneFilter);
    const statusMatch = statusFilter === 'all' || p.currentData.status === statusFilter;
    return dimMatch && zoneMatch && statusMatch;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 0 }).format(value);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100/80">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">Ejes Estratégicos y Propuestas</h2>
        <p className="text-sm text-gray-500 mb-5">Monitoreo detallado del plan de gobierno • Año {selectedYear}</p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-5">
          {Object.entries(dimensions).map(([key, dim]) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab(key)}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all overflow-hidden ${
                activeTab === key ? 'text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {activeTab === key && (
                <motion.div
                  layoutId="activeDimensionTab"
                  className={`absolute inset-0 bg-gradient-to-r ${dim.color}`}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <span>{dim.icon}</span>
                <span className="hidden sm:inline">{dim.label}</span>
                <span className="sm:hidden">{dim.label.split(' ')[0]}</span>
              </span>
            </motion.button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <select
            value={zoneFilter}
            onChange={(e) => setZoneFilter(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 bg-white transition-all"
          >
            <option value="all">🌍 Todas las zonas</option>
            {zones.map(z => <option key={z} value={z}>{z}</option>)}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 bg-white transition-all"
          >
            <option value="all">Todos los estados</option>
            <option value="cumplido">🟢 Cumplido</option>
            <option value="sustancial">🔵 En Proceso</option>
            <option value="parcial">🟡 En Riesgo</option>
            <option value="no_cumplido">🔴 No Cumplido</option>
          </select>
        </div>
      </motion.div>

      {/* Proposal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredProposals.map((proposal) => {
            const status = statusConfig[proposal.currentData.status];
            return (
              <motion.div
                key={proposal.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/80 hover:shadow-lg hover:border-blue-200/50 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">{proposal.id}</span>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border ${status.bg} ${status.color}`}
                  >
                    {status.emoji} {status.label}
                  </motion.span>
                </div>

                <h3 className="font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors">{proposal.title}</h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{proposal.description}</p>

                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span className="truncate">{proposal.zone}</span>
                </div>

                {/* Progress bars */}
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gray-600 flex items-center gap-1 font-medium">
                        <TrendingUp className="w-3 h-3 text-blue-500" /> Avance Físico
                      </span>
                      <span className="font-bold text-blue-600">{proposal.currentData.physicalProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${proposal.currentData.physicalProgress}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gray-600 flex items-center gap-1 font-medium">
                        <DollarSign className="w-3 h-3 text-amber-500" /> Avance Financiero
                      </span>
                      <span className="font-bold text-amber-600">{proposal.currentData.financialProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${proposal.currentData.financialProgress}%` }}
                        transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                        className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    <span className="font-semibold text-gray-700">{formatCurrency(proposal.budget)}</span>
                  </span>
                  <motion.button
                    whileHover={{ x: 3 }}
                    onClick={() => setSelectedProposal(proposal)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold text-xs transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Ficha Técnica
                    <ArrowRight className="w-3 h-3" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredProposals.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
          <p className="text-gray-400 text-lg">🔍</p>
          <p className="text-gray-500 mt-2">No se encontraron propuestas con los filtros seleccionados.</p>
        </motion.div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedProposal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProposal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 p-5 flex items-center justify-between rounded-t-3xl z-10">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{selectedProposal.title}</h3>
                  <p className="text-sm text-gray-500">{selectedProposal.id} • {dimensions[selectedProposal.dimension].label}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedProposal(null)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </motion.button>
              </div>

              <div className="p-5 space-y-5">
                {/* Status */}
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                  <span className={`inline-flex px-3 py-1.5 rounded-full text-sm font-medium border ${statusConfig[selectedProposal.currentData.status].bg} ${statusConfig[selectedProposal.currentData.status].color}`}>
                    {statusConfig[selectedProposal.currentData.status].emoji} {statusConfig[selectedProposal.currentData.status].label}
                  </span>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">{selectedProposal.description}</p>
                </motion.div>

                {/* KPIs */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-blue-50 border border-blue-100 rounded-xl p-3">
                    <p className="text-xs text-blue-600 font-semibold">📊 Indicador Clave</p>
                    <p className="text-sm font-bold text-gray-800 mt-1">{selectedProposal.kpi}</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                    <p className="text-xs text-amber-600 font-semibold">🎯 Meta 2030</p>
                    <p className="text-sm font-bold text-gray-800 mt-1">{selectedProposal.goal2030}</p>
                  </motion.div>
                </div>

                {/* Progress */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                    <p className="text-xs text-blue-600 font-medium">Avance Físico</p>
                    <p className="text-3xl font-bold text-blue-700 mt-1">{selectedProposal.currentData.physicalProgress}%</p>
                    <div className="w-full bg-blue-100 rounded-full h-2 mt-2">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${selectedProposal.currentData.physicalProgress}%` }} transition={{ duration: 1 }} className="bg-blue-600 h-2 rounded-full" />
                    </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 }} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
                    <p className="text-xs text-amber-600 font-medium">Avance Financiero</p>
                    <p className="text-3xl font-bold text-amber-700 mt-1">{selectedProposal.currentData.financialProgress}%</p>
                    <div className="w-full bg-amber-100 rounded-full h-2 mt-2">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${selectedProposal.currentData.financialProgress}%` }} transition={{ duration: 1 }} className="bg-amber-500 h-2 rounded-full" />
                    </div>
                  </motion.div>
                </div>

                {/* Evolution chart */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-xs text-gray-500 font-semibold mb-3">📈 Evolución Anual</p>
                  <div className="flex items-end gap-2 h-20">
                    {[2027, 2028, 2029, 2030].map((year) => {
                      const data = selectedProposal.yearlyData[year];
                      if (!data) return null;
                      return (
                        <div key={year} className="flex-1 flex flex-col items-center gap-1">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${data.physicalProgress}%` }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className={`w-full rounded-t-md ${year <= selectedYear ? 'bg-gradient-to-t from-blue-500 to-blue-400' : 'bg-gray-200'}`}
                            style={{ minHeight: '4px' }}
                          />
                          <span className={`text-[10px] font-medium ${year === selectedYear ? 'text-blue-600' : 'text-gray-400'}`}>{year}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Budget */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h4 className="text-sm font-bold text-gray-700 mb-2">💰 Presupuesto</h4>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Asignado:</span>
                    <span className="font-bold">{formatCurrency(selectedProposal.budget)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-500">Ejecutado:</span>
                    <span className="font-bold text-emerald-600">{formatCurrency(selectedProposal.currentData.budgetExecuted)}</span>
                  </div>
                </div>

                {/* Milestones */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" /> Cronograma de Hitos
                  </h4>
                  <div className="space-y-3">
                    {selectedProposal.milestones.map((milestone, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + idx * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-0.5">
                          {milestone.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-300" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs text-blue-600 font-semibold">{milestone.date}</p>
                          <p className={`text-sm ${milestone.completed ? 'text-gray-700' : 'text-gray-400'}`}>{milestone.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Entity & Evidence */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <p className="text-xs text-gray-500 flex items-center gap-1"><Building className="w-3 h-3" /> Responsable</p>
                    <p className="text-sm font-semibold text-gray-800 mt-1">{selectedProposal.responsible}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <p className="text-xs text-gray-500">📍 Zona</p>
                    <p className="text-sm font-semibold text-gray-800 mt-1">{selectedProposal.zone}</p>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <p className="text-xs text-emerald-700 font-semibold">✅ Evidencia de Verificación</p>
                  <p className="text-sm text-emerald-800 mt-1">{selectedProposal.evidence}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
