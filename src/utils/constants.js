import {
  PackageCheck, Zap, Plug, Cloud,
  ClipboardList, BarChart3, DollarSign, Clock,
  MessageSquare, FileText, Settings, Users,
  ShieldCheck, Smartphone, RefreshCw, Headphones
} from 'lucide-react';

export const CONTACT = {
  name: "Jorge Rodríguez",
  business: "JR Digital Solutions",
  phone: "+506 6196-9427",
  email: "jrodri1493@gmail.com",
  linkedin: "https://www.linkedin.com/in/jorge-rodr%C3%ADguez-9b9684211",
  github: "https://github.com/JRODRI22",
  whatsappLink: "https://wa.me/50661969427?text=Hola%20Jorge,%20me%20interesa%20un%20sistema%20personalizado%20para%20mi%20negocio",
  whatsappLinkDemo: "https://wa.me/50661969427?text=Hola%20Jorge,%20quiero%20solicitar%20una%20demo%20de%20sus%20sistemas",
  location: "San Carlos, Alajuela — Costa Rica"
};

export const ABOUT_STATS = [
  { value: '5+', label: 'Años de\nexperiencia' },
  { value: '25+', label: 'Proyectos\nentregados' },
  { value: '15+', label: 'Clientes\nsatisfechos' },
  { value: '100%', label: 'Proyectos\ncompletados' },
];

export const SKILLS_ROW1 = [
  'React', '.NET Core', 'SQL Server', 'TypeScript', 'JavaScript',
  'Entity Framework', 'Vite', 'TailwindCSS',
];

export const SKILLS_ROW2 = [
  'Node.js', 'Git', 'Docker', 'REST APIs', 'JWT Auth',
  'C#', 'Azure', 'PostgreSQL',
];

export const NAV_LINKS = [
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
];

export const PROBLEMS = [
  {
    icon: ClipboardList,
    title: "Pedidos perdidos",
    description: "Tus clientes piden por WhatsApp y perdés el control. Pedidos olvidados, entregas atrasadas y clientes que no vuelven."
  },
  {
    icon: BarChart3,
    title: "Excel ya no escala",
    description: "Tu negocio creció, pero seguís usando hojas de cálculo que se rompen, se duplican y nadie entiende."
  },
  {
    icon: DollarSign,
    title: "No sabés cuánto ganás",
    description: "Sin reportes claros, tomás decisiones a ciegas. El dinero entra y sale sin control real."
  },
  {
    icon: Clock,
    title: "Horas perdidas",
    description: "Tareas manuales que podrían hacerse en segundos te roban horas cada semana. Tu tiempo vale más."
  }
];

export const SOLUTIONS = [
  "Control total de inventario en tiempo real",
  "Automatización de pedidos y facturación",
  "Reportes claros de ganancias al instante",
  "Acceso remoto desde cualquier dispositivo",
  "Notificaciones automáticas a tus clientes",
  "Cero papel, cero Excel, cero caos"
];

export const SERVICES = [
  {
    icon: PackageCheck,
    title: "Sistemas de Gestión",
    description: "Control total de tu operación en un solo lugar. Desde inventario hasta facturación.",
    features: [
      "Inventario en tiempo real",
      "Punto de venta (POS)",
      "Gestión de clientes (CRM)",
      "Facturación electrónica"
    ],
    color: "from-indigo-500/20 to-purple-500/20"
  },
  {
    icon: Zap,
    title: "Automatización",
    description: "Eliminá tareas repetitivas y dejá que el software trabaje por vos.",
    features: [
      "Notificaciones WhatsApp automáticas",
      "Recordatorios de pagos",
      "Reportes programados",
      "Alertas de stock bajo"
    ],
    color: "from-yellow-500/20 to-orange-500/20"
  },
  {
    icon: Plug,
    title: "Integraciones",
    description: "Conectá tu sistema con las herramientas que ya usás en tu negocio.",
    features: [
      "Impresoras térmicas",
      "WhatsApp Business API",
      "Hacienda CR (factura electrónica)",
      "Pasarelas de pago"
    ],
    color: "from-cyan-500/20 to-blue-500/20"
  },
  {
    icon: Cloud,
    title: "Acceso en la Nube",
    description: "Trabajá desde donde estés. Tu negocio siempre accesible, siempre seguro.",
    features: [
      "Acceso 24/7 desde cualquier lugar",
      "Multi-usuario con roles",
      "Respaldos automáticos",
      "Solo necesitás un navegador"
    ],
    color: "from-emerald-500/20 to-teal-500/20"
  }
];

export const PROJECTS = [
  {
    title: "ERP SaaS MultiTenant CR",
    category: "ERP · Nube · Multi-empresa",
    description: "ERP completo en la nube para empresas costarricenses: facturación electrónica v4.4, inventarios, cuentas por cobrar/pagar, nómina CR, reportes PDF/Excel y dashboard gerencial. Arquitectura multi-tenant con aislamiento total de datos por empresa.",
    tech: [".NET Core 9", "React 18", "Azure", "Docker", "SQL Server"],
    result: "20+ módulos · múltiples empresas activas",
    gradient: "from-violet-500 to-purple-500"
  },
  {
    title: "ContaCR",
    category: "SaaS Contable · Costa Rica",
    description: "Plataforma SaaS para contadores CR: procesa Excel de compras y ventas, calcula IVA en 6 tarifas, emite facturas electrónicas v4.4, clasifica XMLs con IA desde correo IMAP y genera reportes D-104. Multi-tenant con planes de suscripción.",
    tech: [".NET Core", "React", "Hacienda API", "IMAP + IA", "SQL Server"],
    result: "90% del trabajo contable mensual automatizado",
    gradient: "from-sky-500 to-cyan-500"
  },
  {
    title: "Charlotte Fashion",
    category: "eCommerce + Gestión",
    description: "Tienda online completa con gestión de inventario, pedidos y facturación. De una tienda física sin presencia digital a un negocio con ventas 24/7.",
    tech: ["React", ".NET Core", "SQL Server", "Pasarela de Pago"],
    result: "+200% ventas online en 3 meses",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    title: "Contabilidad ADI",
    category: "Sistema Contable",
    description: "Sistema contable completo con libro diario, tesorería, activos fijos y reportes automáticos. Reemplazó completamente los procesos en Excel.",
    tech: ["ASP.NET Core", "SQL Server", "Excel Export", "Multi-usuario"],
    result: "80% menos tiempo en cierres contables",
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    title: "VendaDeUna",
    category: "SaaS · Fuerza de Ventas",
    description: "SaaS para vendedores en ruta: rutas asignadas, ventas contado/crédito, cobro de deudas y cierre de caja diario desde el celular. Multi-tenant — cada empresa opera de forma aislada. Ideal para distribuidoras y vendedores a domicilio.",
    tech: [".NET Core 8", "React 18", "SQL Server", "Multi-tenant", "Mobile-first"],
    result: "Digitaliza operaciones de distribución en campo",
    gradient: "from-amber-500 to-orange-500"
  },
  {
    title: "Chimbox",
    category: "Gestión de Pedidos",
    description: "Sistema integral de pedidos con notificaciones automáticas por WhatsApp. Cada pedido se rastrea desde la solicitud hasta la entrega.",
    tech: ["React", "Node.js", "WhatsApp API", "Dashboard"],
    result: "0 pedidos perdidos desde implementación",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    title: "Plataforma Reservas + IA",
    category: "SaaS · Citas · WhatsApp Bot",
    description: "SaaS multi-tenant para negocios de servicios: agenda con IA conversacional por WhatsApp 24/7, fila virtual en tiempo real y automatización sin código con n8n. Peluquerías, clínicas, talleres y más.",
    tech: ["NestJS", "PostgreSQL", "OpenAI", "Twilio", "n8n", "Socket.io"],
    result: "Reservas automáticas 24/7 sin intervención humana",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    title: "Sistema de Inventario",
    category: "Control de Stock",
    description: "Control de stock en tiempo real con alertas de productos bajos, múltiples bodegas y reportes de movimientos. Ideal para retail.",
    tech: ["React", ".NET Core", "SQL Server", "Reportes PDF"],
    result: "Reducción de pérdidas en un 60%",
    gradient: "from-rose-500 to-pink-500"
  }
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Conversación Inicial",
    description: "Entendemos tu negocio, tus problemas y tus necesidades específicas. Sin compromiso.",
    icon: MessageSquare
  },
  {
    number: "02",
    title: "Propuesta Clara",
    description: "Te presentamos una solución con alcance definido, precio transparente y timeline realista.",
    icon: FileText
  },
  {
    number: "03",
    title: "Diseño y Aprobación",
    description: "Diseñamos las pantallas y flujos antes de codificar. Vos aprobás cada detalle.",
    icon: Settings
  },
  {
    number: "04",
    title: "Desarrollo Iterativo",
    description: "Construimos en entregas parciales. Ves el progreso real cada semana.",
    icon: RefreshCw
  },
  {
    number: "05",
    title: "Entrega y Soporte",
    description: "Capacitación completa y soporte técnico incluido. Tu inversión está protegida.",
    icon: Headphones
  }
];

export const TESTIMONIALS = [
  {
    quote: "Desde que implementamos el sistema de Charlotte Fashion, los pedidos ya no se pierden y las ventas crecieron un 40%. Todo organizado en un solo lugar.",
    name: "Charlotte Fashion",
    role: "E-commerce & Gestión de Pedidos",
    initials: "CF"
  },
  {
    quote: "El sistema contable de ADI eliminó horas de trabajo en Excel. Ahora los asientos, reportes y balances están automatizados y en tiempo real.",
    name: "Contabilidad ADI",
    role: "Sistema Contable Empresarial",
    initials: "ADI"
  },
  {
    quote: "Con Chimbox organizamos toda la logística de delivery. Las rutas, los pedidos y los clientes — todo optimizado desde una sola plataforma.",
    name: "Chimbox",
    role: "Logística & Delivery",
    initials: "CH"
  },
  {
    quote: "El control de inventario en tiempo real nos redujo las pérdidas un 60%. Alertas automáticas, múltiples bodegas y reportes al instante.",
    name: "Sistema de Inventario",
    role: "Control de Stock Multi-bodega",
    initials: "SI"
  }
];

export const STATS = [
  { value: "50+", label: "Proyectos entregados" },
  { value: "98%", label: "Clientes satisfechos" },
  { value: "3+", label: "Años de experiencia" },
  { value: "24/7", label: "Soporte técnico" }
];
