import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, AlertTriangle, Copy, CheckCircle2, ClipboardList, Sparkles } from 'lucide-react';
import { zones, reportTypes, type CitizenReport } from '../data/mockData';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function CitizenReportForm() {
  const [formData, setFormData] = useState({ type: '', description: '', zone: '', address: '', name: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [reports, setReports] = useState<CitizenReport[]>([
    { id: '1', trackingCode: 'RC-2027-00142', type: 'Luminaria apagada', description: 'Luminaria apagada en la esquina de Av. América con Jr. Bolívar, afecta la seguridad peatonal nocturna.', zone: 'Trujillo Centro', date: '2027-06-15', status: 'en_proceso' },
    { id: '2', trackingCode: 'RC-2027-00098', type: 'Pista en mal estado', description: 'Socavón grande en la pista de Av. América Norte, km 4, frente al centro comercial.', zone: 'El Porvenir', date: '2027-05-22', status: 'resuelto' },
    { id: '3', trackingCode: 'RC-2027-00167', type: 'Semáforo malogrado', description: 'Semáforo del cruce Av. España con Jr. San Martín no funciona desde hace 2 semanas.', zone: 'Trujillo Centro', date: '2027-07-03', status: 'recibido' },
  ]);

  const generateTrackingCode = () => {
    const num = Math.floor(Math.random() * 90000) + 10000;
    return `RC-2030-${num.toString().padStart(5, '0')}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = generateTrackingCode();
    setTrackingCode(code);
    const newReport: CitizenReport = {
      id: Date.now().toString(),
      trackingCode: code,
      type: formData.type,
      description: formData.description,
      zone: formData.zone,
      date: new Date().toISOString().split('T')[0],
      status: 'recibido',
    };
    setReports([newReport, ...reports]);
    setSubmitted(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'recibido': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200">🟡 Recibido</span>;
      case 'en_proceso': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">🔵 En Proceso</span>;
      case 'resuelto': return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">🟢 Resuelto</span>;
      default: return null;
    }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <motion.div variants={item} className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100/80">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">Reporte Ciudadano y Fiscalización</h2>
        <p className="text-sm text-gray-500">Tu voz importa. Registra alertas y contribuye a la mejora de tu ciudad.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <motion.div variants={item} className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100/80">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }}>
                <div className="flex items-center gap-2 mb-5">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <h3 className="font-bold text-gray-800">Nuevo Reporte</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tipo de Reporte *</label>
                    <select
                      required
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all bg-white"
                    >
                      <option value="">Seleccionar tipo...</option>
                      {reportTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Zona / Distrito *</label>
                    <select
                      required
                      value={formData.zone}
                      onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all bg-white"
                    >
                      <option value="">Seleccionar zona...</option>
                      {zones.map(z => <option key={z} value={z}>{z}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Dirección Referencial</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Ej: Av. América con Jr. Bolívar"
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Descripción Detallada *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe el problema con el mayor detalle posible..."
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 resize-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nombre (opcional)</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Tu nombre"
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email (opcional)</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="tu@email.com"
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all"
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#1e3a8a] to-[#312e81] hover:from-[#1e40af] hover:to-[#3730a3] text-white py-3 rounded-xl transition-all font-bold shadow-lg shadow-blue-900/20"
                  >
                    <Send className="w-4 h-4" />
                    Enviar Reporte
                  </motion.button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: 20 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                  className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-100"
                >
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">¡Reporte Enviado!</h3>
                <p className="text-sm text-gray-500 mb-5">Tu código de seguimiento es:</p>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5 inline-block mb-5"
                >
                  <p className="text-3xl font-mono font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{trackingCode}</p>
                </motion.div>

                <div className="flex items-center justify-center gap-2 mb-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => copyToClipboard(trackingCode)}
                    className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-semibold bg-blue-50 px-4 py-2 rounded-xl transition-colors"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? '¡Copiado!' : 'Copiar código'}
                  </motion.button>
                </div>

                <p className="text-xs text-gray-500 mb-6 max-w-sm mx-auto">
                  Guarda este código para hacer seguimiento del estado de tu reporte.
                  Te notificaremos cuando haya actualizaciones.
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ type: '', description: '', zone: '', address: '', name: '', email: '' });
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 font-bold"
                >
                  Enviar otro reporte →
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Reports List */}
        <motion.div variants={item} className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100/80">
          <div className="flex items-center gap-2 mb-5">
            <ClipboardList className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-gray-800">Reportes Recientes</h3>
            <span className="ml-auto bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">{reports.length}</span>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            <AnimatePresence>
              {reports.map((report, idx) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                  className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 hover:border-blue-200/50 transition-all group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-mono text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded">{report.trackingCode}</span>
                    {getStatusBadge(report.status)}
                  </div>
                  <p className="text-sm font-semibold text-gray-800 mb-1 group-hover:text-blue-700 transition-colors">{report.type}</p>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">{report.description}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {report.zone}
                    </span>
                    <span>{report.date}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-3 gap-3">
        {[
          { label: 'Reportes Totales', value: reports.length, icon: '📋', color: 'from-blue-500 to-indigo-500' },
          { label: 'Resueltos', value: reports.filter(r => r.status === 'resuelto').length, icon: '✅', color: 'from-emerald-500 to-green-500' },
          { label: 'En Proceso', value: reports.filter(r => r.status === 'en_proceso').length, icon: '⚡', color: 'from-amber-500 to-orange-500' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -2 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100/80 text-center"
          >
            <span className="text-2xl block mb-1">{stat.icon}</span>
            <p className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
