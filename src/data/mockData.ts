export type Status = 'cumplido' | 'sustancial' | 'parcial' | 'no_cumplido';

export interface Milestone {
  date: string;
  description: string;
  completed: boolean;
  year: number;
}

export interface YearlyData {
  physicalProgress: number;
  financialProgress: number;
  budgetExecuted: number;
  status: Status;
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  dimension: 'social' | 'economica' | 'territorial';
  zone: string;
  budget: number;
  kpi: string;
  goal2030: string;
  responsible: string;
  milestones: Milestone[];
  evidence: string;
  yearlyData: Record<number, YearlyData>;
}

export interface CitizenReport {
  id: string;
  trackingCode: string;
  type: string;
  description: string;
  zone: string;
  date: string;
  status: 'recibido' | 'en_proceso' | 'resuelto';
}

export const statusConfig: Record<Status, { label: string; color: string; bg: string; emoji: string; gradient: string }> = {
  cumplido: { label: 'Cumplido', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200', emoji: '🟢', gradient: 'from-emerald-400 to-green-500' },
  sustancial: { label: 'En Proceso', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', emoji: '🔵', gradient: 'from-blue-400 to-indigo-500' },
  parcial: { label: 'En Riesgo', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', emoji: '🟡', gradient: 'from-amber-400 to-orange-500' },
  no_cumplido: { label: 'No Cumplido', color: 'text-red-700', bg: 'bg-red-50 border-red-200', emoji: '🔴', gradient: 'from-red-400 to-rose-500' },
};

export const dimensions = {
  social: { label: 'Seguridad Ciudadana', icon: '🛡️', color: 'from-blue-600 to-indigo-700', light: 'bg-blue-50' },
  economica: { label: 'Movilidad Urbana', icon: '🚌', color: 'from-amber-500 to-orange-600', light: 'bg-amber-50' },
  territorial: { label: 'Infraestructura Pública', icon: '🏗️', color: 'from-emerald-500 to-teal-600', light: 'bg-emerald-50' },
};

export const proposals: Proposal[] = [
  // === DIMENSIÓN SOCIAL ===
  {
    id: 'SC-001',
    title: 'Patrullaje Integrado Serenazgo-PNP',
    description: 'Sistema de patrullaje integrado con 200 efectivos adicionales, drones de vigilancia y centro de monitoreo con IA para detección temprana de incidentes.',
    dimension: 'social',
    zone: 'Trujillo Centro, El Porvenir, La Esperanza',
    budget: 18000000,
    kpi: 'Reducción de delitos en 40%',
    goal2030: '200 efectivos + 50 drones operativos 24/7',
    responsible: 'Gerencia de Seguridad Ciudadana',
    milestones: [
      { date: 'Mar 2027', description: 'Contratación de 100 efectivos Serenazgo', completed: true, year: 2027 },
      { date: 'Ago 2027', description: 'Sistema GPS y cámaras en unidades', completed: true, year: 2027 },
      { date: 'Mar 2028', description: 'Centro de monitoreo con IA operativo', completed: true, year: 2028 },
      { date: 'Sep 2028', description: 'Incorporación de 50 drones de vigilancia', completed: true, year: 2028 },
      { date: 'Jun 2029', description: 'Cobertura total zonas críticas', completed: true, year: 2029 },
      { date: 'Dic 2029', description: '100 efectivos adicionales contratados', completed: true, year: 2029 },
      { date: 'Jun 2030', description: 'Sistema completo integrado y evaluado', completed: true, year: 2030 },
    ],
    evidence: 'Convenio interinstitucional EPP-PNP N°045-2027',
    yearlyData: {
      2027: { physicalProgress: 45, financialProgress: 38, budgetExecuted: 3420000, status: 'parcial' },
      2028: { physicalProgress: 72, financialProgress: 65, budgetExecuted: 9360000, status: 'sustancial' },
      2029: { physicalProgress: 92, financialProgress: 88, budgetExecuted: 14400000, status: 'sustancial' },
      2030: { physicalProgress: 100, financialProgress: 97, budgetExecuted: 17460000, status: 'cumplido' },
    },
  },
  {
    id: 'SC-002',
    title: 'Unidad Anti-Extorsión y Botón de Pánico',
    description: 'Unidad especializada contra extorsión con línea 24/7, botones de pánico en mercados, app de alerta vecinal y protección a comerciantes.',
    dimension: 'social',
    zone: 'Mercado Central, La Hermelinda, El Porvenir',
    budget: 8500000,
    kpi: '500 comerciantes protegidos',
    goal2030: '100% mercados con sistema integral de seguridad',
    responsible: 'Subgerencia de Prevención del Delito',
    milestones: [
      { date: 'Feb 2027', description: 'Diseño del protocolo anti-extorsión', completed: true, year: 2027 },
      { date: 'Jul 2027', description: 'Botones en Mercado Central', completed: true, year: 2027 },
      { date: 'Mar 2028', description: 'Línea directa 24/7 operativa', completed: true, year: 2028 },
      { date: 'Ago 2028', description: 'App de alerta vecinal lanzada', completed: true, year: 2028 },
      { date: 'Abr 2029', description: 'Cobertura en todos los mercados', completed: true, year: 2029 },
      { date: 'Oct 2029', description: 'Programa de protección testigos', completed: true, year: 2029 },
      { date: 'May 2030', description: 'Evaluación de impacto y ajustes', completed: true, year: 2030 },
    ],
    evidence: 'Resolución de Alcaldía N°312-2027-MPT',
    yearlyData: {
      2027: { physicalProgress: 30, financialProgress: 25, budgetExecuted: 1062500, status: 'parcial' },
      2028: { physicalProgress: 58, financialProgress: 52, budgetExecuted: 3570000, status: 'parcial' },
      2029: { physicalProgress: 85, financialProgress: 80, budgetExecuted: 6375000, status: 'sustancial' },
      2030: { physicalProgress: 100, financialProgress: 96, budgetExecuted: 8160000, status: 'cumplido' },
    },
  },
  {
    id: 'SC-003',
    title: 'Iluminación Inteligente en Zonas Críticas',
    description: 'Instalación de 8,000 luminarias LED inteligentes con sensores de movimiento, cámaras integradas y telegestión en zonas del mapa del delito.',
    dimension: 'social',
    zone: 'La Esperanza, El Porvenir, Víctor Larco',
    budget: 12000000,
    kpi: '8,000 luminarias inteligentes',
    goal2030: 'Reducción del 65% en delitos nocturnos',
    responsible: 'Gerencia de Infraestructura y Servicios Públicos',
    milestones: [
      { date: 'Ene 2027', description: 'Mapeo de zonas críticas con IA', completed: true, year: 2027 },
      { date: 'Jun 2027', description: 'Fase 1: 2,000 luminarias instaladas', completed: true, year: 2027 },
      { date: 'Dic 2027', description: 'Fase 2: 2,000 luminarias instaladas', completed: true, year: 2027 },
      { date: 'Jun 2028', description: 'Fase 3: 2,000 luminarias + sensores', completed: true, year: 2028 },
      { date: 'Dic 2028', description: 'Fase 4: 2,000 luminarias + cámaras', completed: true, year: 2028 },
      { date: 'Jun 2029', description: 'Integración con centro de monitoreo', completed: true, year: 2029 },
      { date: 'Mar 2030', description: 'Sistema completo operativo y evaluado', completed: true, year: 2030 },
    ],
    evidence: 'Informe técnico N°089-2027-GISP-MPT',
    yearlyData: {
      2027: { physicalProgress: 55, financialProgress: 48, budgetExecuted: 3600000, status: 'sustancial' },
      2028: { physicalProgress: 85, financialProgress: 78, budgetExecuted: 8520000, status: 'sustancial' },
      2029: { physicalProgress: 95, financialProgress: 90, budgetExecuted: 10800000, status: 'cumplido' },
      2030: { physicalProgress: 100, financialProgress: 98, budgetExecuted: 11760000, status: 'cumplido' },
    },
  },
  {
    id: 'SC-004',
    title: 'Programa "Jóvenes con Futuro"',
    description: 'Capacitación técnica, deportiva y artística para 5,000 jóvenes en riesgo social con inserción laboral garantizada y becas en institutos superiores.',
    dimension: 'social',
    zone: 'Florencia de Mora, El Porvenir, La Esperanza',
    budget: 7200000,
    kpi: '5,000 jóvenes capacitados',
    goal2030: 'Tasa de reincidencia juvenil reducida en 60%',
    responsible: 'Gerencia de Desarrollo Social',
    milestones: [
      { date: 'Abr 2027', description: 'Convenios con 5 institutos superiores', completed: true, year: 2027 },
      { date: 'Oct 2027', description: 'Primer grupo de 800 jóvenes', completed: true, year: 2027 },
      { date: 'May 2028', description: 'Ampliación a 2,000 jóvenes', completed: true, year: 2028 },
      { date: 'Nov 2028', description: 'Programa de inserción laboral activo', completed: true, year: 2028 },
      { date: 'Jun 2029', description: '3,500 jóvenes en programa', completed: true, year: 2029 },
      { date: 'Feb 2030', description: '5,000 jóvenes alcanzados', completed: true, year: 2030 },
      { date: 'Sep 2030', description: 'Evaluación de impacto social', completed: true, year: 2030 },
    ],
    evidence: 'Convenio IESTP Trujillo - MPT N°023-2027',
    yearlyData: {
      2027: { physicalProgress: 28, financialProgress: 22, budgetExecuted: 792000, status: 'parcial' },
      2028: { physicalProgress: 52, financialProgress: 45, budgetExecuted: 2520000, status: 'parcial' },
      2029: { physicalProgress: 78, financialProgress: 72, budgetExecuted: 4968000, status: 'sustancial' },
      2030: { physicalProgress: 100, financialProgress: 95, budgetExecuted: 6840000, status: 'cumplido' },
    },
  },
  // === DIMENSIÓN ECONÓMICA ===
  {
    id: 'MU-001',
    title: 'Red Provincial de Ciclovías Conectadas',
    description: 'Corredor de ciclovías de 50 km con estaciones de bicicletas públicas, cicloparking seguros y conexión con el Corredor Troncal Norte-Sur.',
    dimension: 'economica',
    zone: 'El Porvenir - Trujillo Centro - Víctor Larco - Huanchaco',
    budget: 22000000,
    kpi: '50 km de ciclovías segregadas',
    goal2030: '200,000 viajes diarios en bicicleta',
    responsible: 'Gerencia de Desarrollo Urbano',
    milestones: [
      { date: 'Feb 2027', description: 'Estudio de tráfico y diseño vial', completed: true, year: 2027 },
      { date: 'Ago 2027', description: 'Tramo 1: El Porvenir-Centro (12 km)', completed: true, year: 2027 },
      { date: 'Abr 2028', description: 'Tramo 2: Centro-Víctor Larco (13 km)', completed: true, year: 2028 },
      { date: 'Oct 2028', description: 'Estaciones de bicicletas públicas (20)', completed: true, year: 2028 },
      { date: 'May 2029', description: 'Tramo 3: Larco-Huanchaco (12 km)', completed: true, year: 2029 },
      { date: 'Nov 2029', description: 'Tramo 4: Conexiones internas (13 km)', completed: true, year: 2029 },
      { date: 'Jul 2030', description: 'Sistema completo integrado', completed: true, year: 2030 },
    ],
    evidence: 'Expediente técnico ET-CICLOVÍAS-2027-001',
    yearlyData: {
      2027: { physicalProgress: 35, financialProgress: 30, budgetExecuted: 3300000, status: 'parcial' },
      2028: { physicalProgress: 62, financialProgress: 55, budgetExecuted: 9900000, status: 'sustancial' },
      2029: { physicalProgress: 88, financialProgress: 82, budgetExecuted: 17160000, status: 'sustancial' },
      2030: { physicalProgress: 100, financialProgress: 96, budgetExecuted: 21120000, status: 'cumplido' },
    },
  },
  {
    id: 'MU-002',
    title: 'Accesibilidad Universal del Centro Histórico',
    description: 'Renovación completa de veredas con podotáctil, rampas inclusivas, mobiliario urbano y señalización en 40 cuadras del centro histórico.',
    dimension: 'economica',
    zone: 'Trujillo Centro (Jr. Pizarro, Bolívar, Independencia, Orbegoso)',
    budget: 9500000,
    kpi: '40 cuadras renovadas',
    goal2030: '100% calles del centro con accesibilidad universal',
    responsible: 'Subgerencia de Transportes y Accesibilidad',
    milestones: [
      { date: 'Mar 2027', description: 'Diagnóstico de accesibilidad', completed: true, year: 2027 },
      { date: 'Sep 2027', description: 'Jr. Pizarro completo (8 cuadras)', completed: true, year: 2027 },
      { date: 'May 2028', description: 'Jr. Bolívar completo (8 cuadras)', completed: true, year: 2028 },
      { date: 'Nov 2028', description: 'Jr. Independencia (8 cuadras)', completed: true, year: 2028 },
      { date: 'Jun 2029', description: 'Jr. Orbegoso y conectores (8 cuadras)', completed: true, year: 2029 },
      { date: 'Mar 2030', description: 'Complementos y ajustes finales', completed: true, year: 2030 },
    ],
    evidence: 'Informe de supervisión N°015-2027-SDU-MPT',
    yearlyData: {
      2027: { physicalProgress: 32, financialProgress: 28, budgetExecuted: 1330000, status: 'parcial' },
      2028: { physicalProgress: 60, financialProgress: 55, budgetExecuted: 4275000, status: 'sustancial' },
      2029: { physicalProgress: 88, financialProgress: 82, budgetExecuted: 7410000, status: 'sustancial' },
      2030: { physicalProgress: 100, financialProgress: 97, budgetExecuted: 9215000, status: 'cumplido' },
    },
  },
  {
    id: 'MU-003',
    title: 'Plataforma "Trujillo Conecta"',
    description: 'App y plataforma digital de transporte público con información en tiempo real, pago integrado, rutas optimizadas y articulación con corredores.',
    dimension: 'economica',
    zone: 'Provincia de Trujillo (todos los distritos)',
    budget: 5000000,
    kpi: '500,000 usuarios activos',
    goal2030: 'Sistema Movi integrado con 3 corredores',
    responsible: 'Gerencia de Tecnologías de la Información',
    milestones: [
      { date: 'Ene 2027', description: 'Desarrollo MVP de la aplicación', completed: true, year: 2027 },
      { date: 'Jun 2027', description: 'Lanzamiento en tiendas + 50K descargas', completed: true, year: 2027 },
      { date: 'Mar 2028', description: 'Pago integrado con billeteras digitales', completed: true, year: 2028 },
      { date: 'Sep 2028', description: 'Articulación Corredor Troncal Norte-Sur', completed: true, year: 2028 },
      { date: 'Abr 2029', description: 'Sistema de rutas optimizadas con IA', completed: true, year: 2029 },
      { date: 'Nov 2029', description: 'Integración con ciclovías y peatonal', completed: true, year: 2029 },
      { date: 'Jun 2030', description: 'Plataforma Movi completa operativa', completed: true, year: 2030 },
    ],
    evidence: 'Acta de lanzamiento App Trujillo Conecta',
    yearlyData: {
      2027: { physicalProgress: 50, financialProgress: 42, budgetExecuted: 1050000, status: 'sustancial' },
      2028: { physicalProgress: 75, financialProgress: 68, budgetExecuted: 2700000, status: 'sustancial' },
      2029: { physicalProgress: 92, financialProgress: 88, budgetExecuted: 4200000, status: 'cumplido' },
      2030: { physicalProgress: 100, financialProgress: 98, budgetExecuted: 4900000, status: 'cumplido' },
    },
  },
  {
    id: 'MU-004',
    title: 'Zonas de Carga y Descarga Comercial',
    description: 'Delimitación inteligente de 25 zonas de carga/descarga con sensores IoT, horarios dinámicos y app para comerciantes.',
    dimension: 'economica',
    zone: 'Trujillo Centro, Huanchaco, El Porvenir',
    budget: 3200000,
    kpi: '25 zonas inteligentes',
    goal2030: 'Sistema completo de gestión de carga',
    responsible: 'Subgerencia de Comercialización',
    milestones: [
      { date: 'May 2027', description: 'Estudio de flujos comerciales', completed: true, year: 2027 },
      { date: 'Nov 2027', description: 'Piloto: 3 zonas en Centro', completed: true, year: 2027 },
      { date: 'Jun 2028', description: 'Expansión a 10 zonas', completed: true, year: 2028 },
      { date: 'Feb 2029', description: 'Sensores IoT instalados en 15 zonas', completed: true, year: 2029 },
      { date: 'Ago 2029', description: 'App para comerciantes activa', completed: true, year: 2029 },
      { date: 'Abr 2030', description: '25 zonas completas con horarios dinámicos', completed: true, year: 2030 },
    ],
    evidence: 'Ordenanza Municipal N°078-2028-MPT',
    yearlyData: {
      2027: { physicalProgress: 18, financialProgress: 15, budgetExecuted: 240000, status: 'no_cumplido' },
      2028: { physicalProgress: 42, financialProgress: 38, budgetExecuted: 1024000, status: 'parcial' },
      2029: { physicalProgress: 72, financialProgress: 68, budgetExecuted: 2048000, status: 'sustancial' },
      2030: { physicalProgress: 100, financialProgress: 95, budgetExecuted: 3040000, status: 'cumplido' },
    },
  },
  // === DIMENSIÓN TERRITORIAL ===
  {
    id: 'IP-001',
    title: 'Programa "Calles Dignas"',
    description: 'Mantenimiento integral y asfaltado de 120 km de vías principales con inventario georreferenciado, bicitaxi lanes y señalización moderna.',
    dimension: 'territorial',
    zone: 'La Esperanza, El Porvenir, Florencia de Mora, Huanchaco',
    budget: 35000000,
    kpi: '120 km de vías asfaltadas',
    goal2030: '100% vías principales en excelente estado',
    responsible: 'Gerencia de Infraestructura Vial',
    milestones: [
      { date: 'Ene 2027', description: 'Inventario georreferenciado vial completo', completed: true, year: 2027 },
      { date: 'Jul 2027', description: 'Fase 1: La Esperanza (25 km)', completed: true, year: 2027 },
      { date: 'Mar 2028', description: 'Fase 2: El Porvenir (30 km)', completed: true, year: 2028 },
      { date: 'Oct 2028', description: 'Fase 3: Florencia de Mora (20 km)', completed: true, year: 2028 },
      { date: 'May 2029', description: 'Fase 4: Huanchaco (25 km)', completed: true, year: 2029 },
      { date: 'Nov 2029', description: 'Fase 5: Vías conectoras (20 km)', completed: true, year: 2029 },
      { date: 'Jul 2030', description: 'Señalización y bicitaxi lanes completos', completed: true, year: 2030 },
    ],
    evidence: 'Informe de avance físico N°042-2027-GI-MPT',
    yearlyData: {
      2027: { physicalProgress: 38, financialProgress: 32, budgetExecuted: 5600000, status: 'parcial' },
      2028: { physicalProgress: 65, financialProgress: 58, budgetExecuted: 16800000, status: 'sustancial' },
      2029: { physicalProgress: 90, financialProgress: 85, budgetExecuted: 28000000, status: 'sustancial' },
      2030: { physicalProgress: 100, financialProgress: 97, budgetExecuted: 33950000, status: 'cumplido' },
    },
  },
  {
    id: 'IP-002',
    title: 'Programa "Trujillo Resiliente"',
    description: 'Sistema integral de drenaje pluvial con 60 km de canales, cochas de infiltración, bombeo mecánico y alertas tempranas ante El Niño.',
    dimension: 'territorial',
    zone: 'Huanchaco, Moche, Salaverry, La Esperanza',
    budget: 28000000,
    kpi: '60 km de drenaje pluvial',
    goal2030: '0 zonas vulnerables sin protección',
    responsible: 'Gerencia de Infraestructura y Defensa Civil',
    milestones: [
      { date: 'Feb 2027', description: 'Estudio hidrológico provincial', completed: true, year: 2027 },
      { date: 'Sep 2027', description: 'Drenaje Huanchaco (15 km)', completed: true, year: 2027 },
      { date: 'Abr 2028', description: 'Drenaje Moche-Salaverry (15 km)', completed: true, year: 2028 },
      { date: 'Nov 2028', description: 'Cochas de infiltración (5 unidades)', completed: true, year: 2028 },
      { date: 'Jun 2029', description: 'Drenaje La Esperanza (15 km)', completed: true, year: 2029 },
      { date: 'Feb 2030', description: 'Sistema de alertas tempranas IoT', completed: true, year: 2030 },
      { date: 'Sep 2030', description: 'Drenaje complementario (15 km)', completed: true, year: 2030 },
    ],
    evidence: 'Expediente técnico DRENAJE-FEN-2027',
    yearlyData: {
      2027: { physicalProgress: 30, financialProgress: 28, budgetExecuted: 3920000, status: 'parcial' },
      2028: { physicalProgress: 55, financialProgress: 50, budgetExecuted: 11200000, status: 'parcial' },
      2029: { physicalProgress: 80, financialProgress: 75, budgetExecuted: 19600000, status: 'sustancial' },
      2030: { physicalProgress: 100, financialProgress: 96, budgetExecuted: 26880000, status: 'cumplido' },
    },
  },
  {
    id: 'IP-003',
    title: 'Programa "Parques para Todos"',
    description: 'Recuperación de 40 parques con accesibilidad universal, juegos inclusivos, gimnasios al aire libre, WiFi gratuito y seguridad integrada.',
    dimension: 'territorial',
    zone: 'Trujillo Centro, Víctor Larco, Huanchaco, El Porvenir',
    budget: 15000000,
    kpi: '40 parques recuperados',
    goal2030: '100% parques con accesibilidad y conectividad',
    responsible: 'Gerencia de Servicios Públicos',
    milestones: [
      { date: 'Mar 2027', description: 'Diagnóstico de 40 parques', completed: true, year: 2027 },
      { date: 'Sep 2027', description: '10 parques fase 1 (Centro + Larco)', completed: true, year: 2027 },
      { date: 'May 2028', description: '10 parques fase 2 (Huanchaco)', completed: true, year: 2028 },
      { date: 'Nov 2028', description: 'WiFi gratuito en 20 parques', completed: true, year: 2028 },
      { date: 'Jun 2029', description: '10 parques fase 3 (El Porvenir)', completed: true, year: 2029 },
      { date: 'Feb 2030', description: '10 parques fase 4 + gimnasios', completed: true, year: 2030 },
      { date: 'Sep 2030', description: 'Seguridad integrada en todos', completed: true, year: 2030 },
    ],
    evidence: 'Acta de recepción N°078-2027-GSP-MPT',
    yearlyData: {
      2027: { physicalProgress: 35, financialProgress: 30, budgetExecuted: 2250000, status: 'parcial' },
      2028: { physicalProgress: 62, financialProgress: 55, budgetExecuted: 6750000, status: 'sustancial' },
      2029: { physicalProgress: 85, financialProgress: 78, budgetExecuted: 11250000, status: 'sustancial' },
      2030: { physicalProgress: 100, financialProgress: 97, budgetExecuted: 14550000, status: 'cumplido' },
    },
  },
  {
    id: 'IP-004',
    title: 'Modernización del Alumbrado Público Provincial',
    description: 'Reemplazo de 25,000 puntos de luz a LED inteligente con telegestión, monitoreo remoto y eficiencia energética del 70%.',
    dimension: 'territorial',
    zone: 'Toda la provincia de Trujillo',
    budget: 18000000,
    kpi: '25,000 puntos de luz LED',
    goal2030: 'Ahorro energético del 70% en alumbrado',
    responsible: 'Gerencia de Servicios Públicos',
    milestones: [
      { date: 'Ene 2027', description: 'Censo de puntos de luz provincial', completed: true, year: 2027 },
      { date: 'Jun 2027', description: 'Fase 1: Trujillo Centro (6,000 puntos)', completed: true, year: 2027 },
      { date: 'Dic 2027', description: 'Fase 2: El Porvenir (5,000 puntos)', completed: true, year: 2027 },
      { date: 'Jun 2028', description: 'Fase 3: La Esperanza (5,000 puntos)', completed: true, year: 2028 },
      { date: 'Dic 2028', description: 'Fase 4: Huanchaco + Larco (4,000 puntos)', completed: true, year: 2028 },
      { date: 'Jun 2029', description: 'Fase 5: Distritos restantes (3,000 puntos)', completed: true, year: 2029 },
      { date: 'Mar 2030', description: 'Sistema de telegestión completo', completed: true, year: 2030 },
    ],
    evidence: 'Certificado de conformidad N°156-2027-GSP-MPT',
    yearlyData: {
      2027: { physicalProgress: 52, financialProgress: 45, budgetExecuted: 4050000, status: 'sustancial' },
      2028: { physicalProgress: 80, financialProgress: 72, budgetExecuted: 10800000, status: 'sustancial' },
      2029: { physicalProgress: 95, financialProgress: 90, budgetExecuted: 15300000, status: 'cumplido' },
      2030: { physicalProgress: 100, financialProgress: 98, budgetExecuted: 17640000, status: 'cumplido' },
    },
  },
];

export const annualEvaluations = [
  {
    year: 2027,
    status: 'completado' as const,
    globalProgress: 36,
    totalBudget: 181400000,
    executedBudget: 31509500,
    proposalsCompleted: 0,
    proposalsInProgress: 6,
    proposalsAtRisk: 4,
    proposalsNotStarted: 0,
    verifier: 'Universidad César Vallejo (UCV)',
    highlights: ['Inicio de 12 proyectos estratégicos', 'Convenios interinstitucionales firmados', 'Primeras obras entregadas a la población'],
  },
  {
    year: 2028,
    status: 'completado' as const,
    globalProgress: 62,
    totalBudget: 181400000,
    executedBudget: 88799000,
    proposalsCompleted: 0,
    proposalsInProgress: 8,
    proposalsAtRisk: 2,
    proposalsNotStarted: 0,
    verifier: 'Universidad Nacional de Trujillo (UNT)',
    highlights: ['App Trujillo Conecta supera 200K descargas', 'Primeros 40 km de ciclovías entregados', 'Centro de monitoreo con IA inaugurado'],
  },
  {
    year: 2029,
    status: 'completado' as const,
    globalProgress: 87,
    totalBudget: 181400000,
    executedBudget: 147268000,
    proposalsCompleted: 3,
    proposalsInProgress: 7,
    proposalsAtRisk: 0,
    proposalsNotStarted: 0,
    verifier: 'Colegio de Ingenieros del Perú - CD La Libertad',
    highlights: ['85% de metas físicas alcanzadas', 'Reducción del 35% en índices delictivos', '40 parques recuperados para la ciudadanía'],
  },
  {
    year: 2030,
    status: 'completado' as const,
    globalProgress: 100,
    totalBudget: 181400000,
    executedBudget: 174515000,
    proposalsCompleted: 12,
    proposalsInProgress: 0,
    proposalsAtRisk: 0,
    proposalsNotStarted: 0,
    verifier: 'Cámara de Comercio de La Libertad + Sociedad Civil',
    highlights: ['100% de propuestas cumplidas', 'Trujillo reconocida como ciudad resiliente', 'Modelo de gestión replicado en 5 ciudades'],
  },
];

export const verifyingEntities = [
  'Universidad César Vallejo (UCV)',
  'Universidad Nacional de Trujillo (UNT)',
  'Universidad Privada del Norte (UPN)',
  'Colegio de Ingenieros del Perú - CD La Libertad',
  'Colegio de Arquitectos del Perú - CD La Libertad',
  'Cámara de Comercio y Producción de La Libertad',
  'Confederación Nacional de Comerciantes',
  'Sociedad Civil Organizada de Trujillo',
  'Asociación de Vecinos de Trujillo',
];

export const zones = [
  'Trujillo Centro',
  'El Porvenir',
  'La Esperanza',
  'Huanchaco',
  'Moche',
  'Salaverry',
  'Víctor Larco',
  'Florencia de Mora',
];

export const reportTypes = [
  'Pista en mal estado',
  'Luminaria apagada o dañada',
  'Semáforo malogrado',
  'Vereda destruida',
  'Drenaje colapsado',
  'Parque deteriorado',
  'Señalización vial dañada',
  'Falta de seguridad',
  'Otro',
];
