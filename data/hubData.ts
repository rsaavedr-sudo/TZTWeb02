
export type Status = 'planned' | 'in-progress' | 'done';
export type Priority = 'low' | 'medium' | 'high';
export type ProductID = 'flow360' | 'INDIKA';
export type UserRole = 'admin' | 'user';

export interface User {
  username: string;
  role: UserRole;
}

export const USERS = [
  { username: "rodrigo", password: import.meta.env.VITE_PASS_RODRIGO || '1234', role: "admin" as UserRole },
  { username: "danilo", password: import.meta.env.VITE_PASS_DANILO || '5678', role: "user" as UserRole }
];

export interface Feature {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  product: ProductID;
  /**
   * Roadmap section the feature belongs to. Used by RoadmapView to group
   * cards within each status column. Mirrors the section names in the
   * official Flow360 platform roadmap (see README of this repo).
   */
  category: string;
  /**
   * Delivery timestamp in `YYYY-MM-DD HH:MM` format (24h, project-local
   * timezone). Only meaningful for `status === 'done'` items. Surfaced on
   * the Roadmap kanban "done" column and on the product detail catalog so
   * the team can see the timeline at a glance — including hour-level
   * resolution, which matters when several features ship the same day.
   */
  completedDate?: string;
}

export interface SharedModule {
  id: string;
  name: string;
  description: string;
  products: ProductID[];
  status: Status;
}

export interface ChangelogEntry {
  date: string;
  items: {
    product: ProductID | 'global';
    text: string;
  }[];
}

// =============================================================================
//  Features
// =============================================================================
//
// Source of truth for the Roadmap and the Overview's "Current Focus".
//
// `flow360` — populated against the official platform roadmap, every section
// contributes one or more concrete features.  Statuses reflect actual delivery:
//
//   - done         → in production today (either stock RapidPro, custom code in
//                    rapidpro-src, or a sibling fork patch)
//   - in-progress  → partially shipped, more work in flight
//   - planned      → in the roadmap, not started
//
// `INDIKA` — intentionally empty.  The product gets its own work stream and
// will populate this once the kickoff happens.
// =============================================================================

export const features: Feature[] = [

  // ---- 1. Integración de Canales -------------------------------------------
  //
  // WhatsApp Cloud — el canal #1 del producto. Vamos por la integración
  // directa con Meta (Tech Provider track) con UX "un click conectar"
  // como ofrecen los grandes BSPs (Weni, 360dialog) pero construido en
  // casa. Stock RapidPro v26 ya trae el channel type WAC + Embedded
  // Signup; nosotros aportamos el FB App, las credenciales, el deploy
  // estable y el polish de cliente. Sub-fases tracked individualmente.
  {
    id: 'ch-wa-cloud',
    title: 'WhatsApp Cloud API — onboarding directo',
    description: 'Integración oficial con Meta Cloud API vía Embedded Signup. Cliente conecta su WhatsApp en 1 click sin crear su propia FB App. Setup de Meta y env vars completos; pendiente migrar a servidor con HTTPS y completar smoke E2E.',
    status: 'in-progress',
    priority: 'high',
    product: 'flow360',
    category: 'Integración de Canales',
  },
  {
    id: 'wac-meta-app',
    title: 'WAC — FB App "Flow360" creada en Meta',
    description: 'App registrada en developers.facebook.com con use-case "Conectar com clientes pelo WhatsApp" (Tech Provider track, sin requirements de Meta Verified). App ID 2466346687211651. App Secret generado.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Integración de Canales',
    completedDate: '2026-05-02 21:00',
  },
  {
    id: 'wac-config-id',
    title: 'WAC — Embedded Signup Configuration',
    description: 'Configuration ID 982515667588524 con permissions Tech Provider completos: business_management, whatsapp_business_management, whatsapp_business_messaging + per-asset manage/develop/manage_templates/manage_phone_assets/view_*. Token de expiração 60 días con auto-refresh.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Integración de Canales',
    completedDate: '2026-05-02 21:30',
  },
  {
    id: 'wac-env-wired',
    title: 'WAC — env vars wired & beta gating',
    description: 'FACEBOOK_APPLICATION_ID / FACEBOOK_APPLICATION_SECRET / FACEBOOK_LOGIN_WHATSAPP_CONFIG_ID inyectados al servicio rapidpro vía docker-compose.yml. Usuario admin agregado al auth_group "Beta" (en v26, is_beta es property que checkea group membership). UI /channels/types/whatsapp/connect/ renderiza el botón "Add Facebook Business".',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Integración de Canales',
    completedDate: '2026-05-02 22:00',
  },
  {
    id: 'wac-dev-server',
    title: 'WAC — migración a servidor de desarrollo externo (Fase 15.0)',
    description: 'VPS + dominio dedicado + Caddy/Let\'s Encrypt para soportar el OAuth flow de Meta con HTTPS válido. Localhost + ngrok-free es frágil para Embedded Signup (dominios cambian, rate limits, postMessage cross-origin). Bloqueante para el smoke E2E.',
    status: 'in-progress',
    priority: 'high',
    product: 'flow360',
    category: 'Integración de Canales',
  },
  {
    id: 'wac-smoke-e2e',
    title: 'WAC — smoke E2E completo',
    description: 'Conectar un número de prueba vía Embedded Signup, recibir mensaje entrante, enviar mensaje saliente. Validar que el handler stock de RapidPro persiste el WABA + phone_number_id correctamente y que el webhook de Meta llega al endpoint /c/wac/.',
    status: 'planned',
    priority: 'high',
    product: 'flow360',
    category: 'Integración de Canales',
  },
  {
    id: 'wac-app-review',
    title: 'WAC — Meta App Review (Live mode)',
    description: 'Pasar la FB App de Development a Live mode para que clientes externos puedan conectar sus propios WABAs. Requiere business verification + demo grabado del use-case. Bloquea la oferta comercial fuera del propio admin.',
    status: 'planned',
    priority: 'high',
    product: 'flow360',
    category: 'Integración de Canales',
  },
  {
    id: 'wac-onboarding-ux',
    title: 'WAC — UX post-conexión',
    description: 'Después de Embedded Signup, mostrar al cliente una card con número registrado, plantillas iniciales sembradas y siguiente paso (probar el primer flow), en lugar de devolverlo al catálogo stock de canales.',
    status: 'planned',
    priority: 'medium',
    product: 'flow360',
    category: 'Integración de Canales',
  },
  {
    id: 'ch-tg-base',
    title: 'Canal Telegram',
    description: 'Recepción y envío de mensajes vía bot de Telegram. Webhook, contactos, channels operativos.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Integración de Canales',
    completedDate: '2026-02-15 10:00',
  },
  {
    id: 'ch-tg-voice',
    title: 'Telegram — voice messages nativos',
    description: 'Outgoing como sendVoice (waveform + duración en el celular del contacto). Incoming voice persistido en S3 propio para sobrevivir al TTL de 60min de Telegram.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Integración de Canales',
    completedDate: '2026-05-02 14:40',
  },
  {
    id: 'ch-ig',
    title: 'Instagram Direct',
    description: 'Recepción y envío de DMs vía Meta API. Pendiente del setup de WA Cloud (comparten infra).',
    status: 'planned',
    priority: 'medium',
    product: 'flow360',
    category: 'Integración de Canales',
  },
  {
    id: 'ch-fb',
    title: 'Messenger',
    description: 'Mensajería de Facebook Messenger. Mismo stack que IG.',
    status: 'planned',
    priority: 'medium',
    product: 'flow360',
    category: 'Integración de Canales',
  },
  {
    id: 'ch-panel',
    title: 'Panel centralizado de integraciones',
    description: 'UI única donde el admin conecta canales con tokens/credenciales y ve estado de cada conexión activa.',
    status: 'planned',
    priority: 'medium',
    product: 'flow360',
    category: 'Integración de Canales',
  },

  // ---- 2. Gestión de Usuarios (Admin) --------------------------------------
  {
    id: 'usr-roles',
    title: 'Usuarios, roles y permisos',
    description: 'Crear, eliminar, asignar rol. Granularidad de permisos heredada de RapidPro y extendida con el rol AI.',
    status: 'done',
    priority: 'medium',
    product: 'flow360',
    category: 'Gestión de Usuarios',
    completedDate: '2026-02-15 11:00',
  },
  {
    id: 'usr-ai-role',
    title: 'Rol "AI" para auto-asignación',
    description: 'Usuario virtual con flag is_ai por org. Tickets abiertos por flow IA quedan asignados a este user; reasignar a humano interrumpe automáticamente el flow.',
    status: 'done',
    priority: 'medium',
    product: 'flow360',
    category: 'Gestión de Usuarios',
    completedDate: '2026-04-10 12:00',
  },
  {
    id: 'usr-cap',
    title: 'Capacidad operativa por agente',
    description: 'Configurar Nº de conversaciones simultáneas por agente. Base para el queue system.',
    status: 'planned',
    priority: 'high',
    product: 'flow360',
    category: 'Gestión de Usuarios',
  },

  // ---- 3. Gestión de Conversaciones ----------------------------------------
  {
    id: 'conv-inbox',
    title: 'Inbox organizado (Open / In progress / Closed)',
    description: 'Vistas separadas por estado del ticket, navegación entre topics.',
    status: 'done',
    priority: 'medium',
    product: 'flow360',
    category: 'Gestión de Conversaciones',
    completedDate: '2026-02-15 12:00',
  },
  {
    id: 'conv-tags',
    title: 'Tags de contacto + filtro en inbox',
    description: 'Tag editor con autocompletar y selector de color. Sidebar con tags populares y filtro view en /contact/tag/<uuid>/.',
    status: 'done',
    priority: 'medium',
    product: 'flow360',
    category: 'Gestión de Conversaciones',
    completedDate: '2026-04-15 18:00',
  },
  {
    id: 'conv-cat',
    title: 'Categorías de contacto + filtro',
    description: 'Categorías con un único valor por contacto (ej. Atendimiento). Sidebar collapsible y filtro view en /contact/category/<option-uuid>/.',
    status: 'done',
    priority: 'medium',
    product: 'flow360',
    category: 'Gestión de Conversaciones',
    completedDate: '2026-04-20 16:00',
  },
  {
    id: 'conv-sidepanel',
    title: 'Side panel del contacto en tickets',
    description: 'Tercera columna con editor completo del contacto + tags + categorías. Watch del data-contact-uuid del ticket activo y re-fetch automático.',
    status: 'done',
    priority: 'medium',
    product: 'flow360',
    category: 'Gestión de Conversaciones',
    completedDate: '2026-04-01 16:30',
  },
  {
    id: 'conv-ux',
    title: 'UX polish — avatares + fechas',
    description: 'Iniciales con color hash en cada fila del inbox. Formato HH:MM / weekday / dd-MM en lugar del "5m / 2h / 3d" stock.',
    status: 'done',
    priority: 'low',
    product: 'flow360',
    category: 'Gestión de Conversaciones',
    completedDate: '2026-04-25 14:00',
  },
  {
    id: 'conv-ts',
    title: 'Timestamp por mensaje',
    description: 'Cada burbuja del chat muestra HH:MM. Patch en el fork de temba-components.',
    status: 'done',
    priority: 'low',
    product: 'flow360',
    category: 'Gestión de Conversaciones',
    completedDate: '2026-05-01 10:00',
  },
  {
    id: 'conv-wallpaper',
    title: 'Wallpaper en el área de chat ("Doodles cálidos")',
    description: 'Patrón de fondo tipo WhatsApp Web (doodles hand-traced originales, no copia) detrás de las burbujas. Patch en temba-components-fork con CSS variables --temba-chat-wallpaper-bg / --temba-chat-wallpaper-image expuestas para el picker futuro. Sube significativamente la percepción de calidad del producto sin tocar rapidpro.',
    status: 'done',
    priority: 'medium',
    product: 'flow360',
    category: 'Gestión de Conversaciones',
    completedDate: '2026-05-02 23:30',
  },
  {
    id: 'conv-wallpaper-picker',
    title: 'Wallpaper picker per-usuario',
    description: 'Galería de 6-8 wallpapers en /settings/profile/. Persistir elección en User.settings_json e inyectar CSS variables desde el template. Bonus: default per-org configurable por el admin del workspace.',
    status: 'planned',
    priority: 'low',
    product: 'flow360',
    category: 'Gestión de Conversaciones',
  },
  {
    id: 'conv-search',
    title: 'Búsqueda avanzada de contactos',
    description: 'Filtros por tag y por categoría ya en producción; falta búsqueda combinada por custom fields y por texto de la conversación.',
    status: 'in-progress',
    priority: 'medium',
    product: 'flow360',
    category: 'Gestión de Conversaciones',
  },
  {
    id: 'conv-read',
    title: 'Estado leído / no leído',
    description: 'Manteniendo lógica de WhatsApp double-check. Modificación manual y vista filtrada por unread.',
    status: 'planned',
    priority: 'medium',
    product: 'flow360',
    category: 'Gestión de Conversaciones',
  },
  {
    id: 'conv-sound',
    title: 'Notificación sonora',
    description: 'Alerta de audio al ingresar mensajes nuevos, con opción de desactivar.',
    status: 'planned',
    priority: 'low',
    product: 'flow360',
    category: 'Gestión de Conversaciones',
  },

  // ---- 4. Sistema de Atención (Colas) --------------------------------------
  {
    id: 'queue-system',
    title: 'Queue system + auto-asignación',
    description: 'Distribución automática según disponibilidad, capacidad por agente y prioridad de contacto. Control de carga por agente.',
    status: 'planned',
    priority: 'high',
    product: 'flow360',
    category: 'Sistema de Atención',
  },

  // ---- 5. Reglas de WhatsApp -----------------------------------------------
  {
    id: 'wa-window',
    title: 'Contador 24h por contacto',
    description: 'Visualización en tiempo real del tiempo restante de la ventana gratuita de WA. Alertas previas al cierre.',
    status: 'planned',
    priority: 'high',
    product: 'flow360',
    category: 'Reglas WhatsApp 24h',
  },
  {
    id: 'wa-recontact',
    title: 'Recontactar fuera de ventana',
    description: 'Botón con políticas configurables: libre / restringido / con aprobación / con límite por agente.',
    status: 'planned',
    priority: 'medium',
    product: 'flow360',
    category: 'Reglas WhatsApp 24h',
  },

  // ---- 6. Productividad del Agente -----------------------------------------
  {
    id: 'prod-shortcuts',
    title: 'Respuestas rápidas (shortcuts)',
    description: 'Activación con / o \\. Lista personalizable de respuestas frecuentes.',
    status: 'done',
    priority: 'medium',
    product: 'flow360',
    category: 'Productividad del Agente',
    completedDate: '2026-02-15 13:00',
  },
  {
    id: 'prod-templates',
    title: 'Templates de personalidad',
    description: 'Perfiles predefinidos (Vendedor, SAC, Consejero) con tono configurable (amable / neutro / comercial). Aplicación automática al estilo de la respuesta.',
    status: 'planned',
    priority: 'medium',
    product: 'flow360',
    category: 'Productividad del Agente',
  },
  {
    id: 'prod-mic',
    title: 'Micrófono en el composer',
    description: 'Botón mic + recording overlay con timer + cancel/send. Cap de 2 minutos. Transcode server-side a OGG/Opus para garantizar voice nativo en el destino.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Productividad del Agente',
    completedDate: '2026-05-01 13:00',
  },
  {
    id: 'prod-audio-player',
    title: 'Audio player inline en el chat',
    description: 'Render nativo de HTML5 audio para attachments audio/* (incoming + outgoing). Detección por content type o por extensión de URL.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Productividad del Agente',
    completedDate: '2026-05-01 15:00',
  },

  // ---- 7. Inteligencia Artificial ------------------------------------------
  {
    id: 'ai-flow-agent',
    title: 'AI Agent en flow editor',
    description: 'Dropdown en el nodo Call AI que elige un agente IA pre-configurado y auto-rellena el prompt. Fork del floweditor.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Inteligencia Artificial',
    completedDate: '2026-03-01 14:30',
  },
  {
    id: 'ai-ticket-handoff',
    title: 'AI Agent en tickets + handoff',
    description: 'IA atiende primero, escala vía webhook a humano. Reasignación de la IA a un humano interrumpe el flow del contacto.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Inteligencia Artificial',
    completedDate: '2026-04-10 17:00',
  },
  {
    id: 'ai-copilot',
    title: 'Copiloto IA (sugerencias en tiempo real)',
    description: 'Lectura del contexto de conversación + sugerencia de respuesta. Activación configurable por usuario.',
    status: 'planned',
    priority: 'high',
    product: 'flow360',
    category: 'Inteligencia Artificial',
  },
  {
    id: 'ai-intent',
    title: 'IA de análisis de intencionalidad',
    description: 'Score de intención + nivel de interés + calidad de la atención. Insights operativos y prioridad automática.',
    status: 'planned',
    priority: 'medium',
    product: 'flow360',
    category: 'Inteligencia Artificial',
  },
  {
    id: 'ai-marketing',
    title: 'IA marketing & recurrencia',
    description: 'Decisión de abordaje y automatización de recurrencia basada en el score de intención. Campañas de seguimiento automáticas.',
    status: 'planned',
    priority: 'medium',
    product: 'flow360',
    category: 'Inteligencia Artificial',
  },

  // ---- 8. Marketing y Captación --------------------------------------------
  {
    id: 'mkt-ads',
    title: 'Captación desde Meta / Instagram Ads',
    description: 'Captura automática de leads desde campañas pagas + ingesta en Flow360 para segmentación, automatización y seguimiento.',
    status: 'planned',
    priority: 'medium',
    product: 'flow360',
    category: 'Marketing y Captación',
  },
  {
    id: 'mkt-crm',
    title: 'CRM Kanban (lead pipelines)',
    description: 'Pipelines + stages + cards con drag&drop entre estados. Card detail panel con title, description, priority, assignee + editor completo de contacto. Crear contactos desde el panel. API v2 completa.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Marketing y Captación',
    completedDate: '2026-03-15 18:00',
  },

  // ---- 9. Comunicación Interna ---------------------------------------------
  {
    id: 'internal-chat',
    title: 'Chat interno entre agentes',
    description: 'Comunicación por equipos durante la operación. Permisos configurables, soporte en tiempo real para escalation peer-to-peer.',
    status: 'planned',
    priority: 'medium',
    product: 'flow360',
    category: 'Comunicación Interna',
  },

  // ---- 10. Identidad Visual del Usuario ------------------------------------
  {
    id: 'avatar-upload',
    title: 'Foto de perfil + avatar IA',
    description: 'Upload en onboarding o generación automática con IA. Estilo visual uniforme aplicado en comunicación interna.',
    status: 'planned',
    priority: 'low',
    product: 'flow360',
    category: 'Identidad Visual',
  },

  // ---- 11. Auditoría y Analytics -------------------------------------------
  {
    id: 'audit-kpis',
    title: 'Auditoría de conversaciones + KPIs',
    description: 'Evaluación de calidad de atención + conversión potencial. KPIs operativos por agente, eficiencia y insights de negocio.',
    status: 'planned',
    priority: 'medium',
    product: 'flow360',
    category: 'Auditoría y Analytics',
  },

  // ---- Cockpit (Admin Dashboard) -------------------------------------------
  //
  // Pantalla inicial al ingresar a la plataforma para el rol admin — el
  // "Cockpit" del producto comercial. Materializa la propuesta de valor:
  // "comunicaciones masivas con objetivos concretos medidos en tiempo
  // real". El admin tiene que poder leer en <5s cómo va su operación.
  //
  // Build out-of-tree en `~/projects/rapidpro8/admin-dashboard/` (React
  // Vite IIFE bundle), montado en la vista Django `dashboard.dashboard_home`
  // que sustituye la home stock de RapidPro.
  //
  // Estado actual: 7 bloques entregados con data fake responsiva a los
  // filtros. 4 bloques quedan pendientes para cuando arranque la
  // conexión con data real (Auditoría, IA Intent, Marketing).
  {
    id: 'cc-shell',
    title: 'Shell + filtros globales',
    description: 'Bundle React montado en la vista admin de RapidPro. Header con welcome al usuario, barra de filtros (rango de fechas, IA / humano, equipo, tipo de contacto). Toda la data se re-deriva de los filtros vía mockData determinístico.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Cockpit (Admin Dashboard)',
    completedDate: '2026-05-02 16:00',
  },
  {
    id: 'cc-realtime',
    title: 'Tira de tiempo real',
    description: 'Fila al tope con 5 mini-cards: agentes conectados, agentes en pausa, chats activos, chats en cola, chats del día. Pill verde "EN VIVO" pulsando + auto-refresh cada 5s. La cola alerta visualmente cuando supera el umbral.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Cockpit (Admin Dashboard)',
    completedDate: '2026-05-02 18:30',
  },
  {
    id: 'cc-composition',
    title: 'Composition row (3 gráficos quick-read)',
    description: 'Pie humano vs IA, pie nuevos vs recurrentes, bar chart de resultado del contacto (sin interacción / interrumpidos / finalizados). Animación de entrada (pies sweep, barras crecen). Y-axis con escala "nice round".',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Cockpit (Admin Dashboard)',
    completedDate: '2026-05-02 19:00',
  },
  {
    id: 'cc-chat-mgmt',
    title: 'Gerenciamiento de chat',
    description: 'Track horizontal único con 3 regiones de anchos proporcionales: Total conversaciones · Chatbot atendió · Equipo respondió. Cada región con stripe de color, tinted bg, label + número absoluto + porcentaje.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Cockpit (Admin Dashboard)',
    completedDate: '2026-05-02 17:00',
  },
  {
    id: 'cc-attention',
    title: 'Gerenciamiento de resultado de atención',
    description: 'Card grande del total atendimentos a la izquierda + columna stackeada a la derecha con dos cards (Finalizado / No finalizado) cuyas alturas son proporcionales al porcentaje. El tamaño del cuadro = la magnitud, sin que el admin lea números.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Cockpit (Admin Dashboard)',
    completedDate: '2026-05-02 17:30',
  },
  {
    id: 'cc-human-vs-ai',
    title: 'Desempeño humano vs IA',
    description: '5 cards comparativas: tiempo de respuesta humano (la IA responde de inmediato — no se mide), tiempo de finalización humano vs IA, tasa de finalización humano vs IA. Color por lado: humano rojo, IA naranja.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Cockpit (Admin Dashboard)',
    completedDate: '2026-05-02 18:00',
  },
  {
    id: 'cc-kpis',
    title: 'KPIs principales (FRT / TTR / Total / Tasa)',
    description: 'Cards con number + delta colorizado vs período anterior + sparkline de los últimos 14 días. First Response Time, Time to Resolution, Total conversaciones, Tasa de resolución. Lectura de 5 segundos.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Cockpit (Admin Dashboard)',
    completedDate: '2026-05-02 16:30',
  },
  {
    id: 'cc-alertas',
    title: 'Alertas operativas + SLA',
    description: 'Indicadores de conversaciones sin respuesta, con respuesta tardía y alertas de SLA. Código de colores verde / amarillo / rojo para identificación inmediata de problemas.',
    status: 'planned',
    priority: 'medium',
    product: 'flow360',
    category: 'Cockpit (Admin Dashboard)',
  },
  {
    id: 'cc-equipos',
    title: 'Resultados por equipo (ranking)',
    description: 'Ranking de equipos por tiempo promedio de respuesta, tiempo de resolución y % eficiencia. Vista comparativa entre equipos para detectar best/worst performers.',
    status: 'planned',
    priority: 'medium',
    product: 'flow360',
    category: 'Cockpit (Admin Dashboard)',
  },
  {
    id: 'cc-negocio',
    title: 'Métricas de negocio (leads)',
    description: 'Leads generados / atendidos / convertidos. Conexión directa con el objetivo comercial: comunicación masiva con objetivos concretos medibles en tiempo real. Cierra el loop del CRM Kanban.',
    status: 'planned',
    priority: 'high',
    product: 'flow360',
    category: 'Cockpit (Admin Dashboard)',
  },
  {
    id: 'cc-calidad',
    title: 'Calidad e inteligencia',
    description: 'Score de atención, score de intención del cliente, nivel de satisfacción estimado. Output del módulo IA de intencionalidad surfaceado en el dashboard como métrica de calidad operativa.',
    status: 'planned',
    priority: 'medium',
    product: 'flow360',
    category: 'Cockpit (Admin Dashboard)',
  },

  // ---- 12. Webchat ---------------------------------------------------------
  {
    id: 'webchat',
    title: 'Módulo webchat',
    description: 'Widget embebible en sitios (similar a JivoChat). Integración directa con el sistema de atención.',
    status: 'planned',
    priority: 'low',
    product: 'flow360',
    category: 'Webchat',
  },

  // ---- 14. Área de Integraciones -------------------------------------------
  {
    id: 'integ-market',
    title: 'Integraciones de mercado',
    description: 'Conectores para sistemas existentes: Smartbis, Loja Integrada y otros vendors relevantes.',
    status: 'planned',
    priority: 'low',
    product: 'flow360',
    category: 'Integraciones de Mercado',
  },

  // ---- 15. Producto Comercial ----------------------------------------------
  {
    id: 'commercial',
    title: 'Producto comercial multiempresa',
    description: 'Estandarización de funcionalidades, multitenancy, preparación de pricing y materiales de venta.',
    status: 'planned',
    priority: 'low',
    product: 'flow360',
    category: 'Producto Comercial',
  },

  // ---- 16. Rediseño Visual -------------------------------------------------
  {
    id: 'redesign',
    title: 'Rediseño UX/UI completo',
    description: 'Identidad visual definitiva del producto. Mejora general de experiencia de usuario más allá del polish actual.',
    status: 'planned',
    priority: 'medium',
    product: 'flow360',
    category: 'Rediseño Visual',
  },

  // ---- 17. Sudo & Multi-tenancy --------------------------------------------
  //
  // Capa super-admin de Flow360 — el operador de la plataforma SaaS,
  // no de un workspace. Vive bajo /staff/ y permite gestionar orgs y
  // users cross-tenant. El service layer está pensado multi-cell-ready
  // (ver decisión arquitectónica en la doc 14): hoy es single-deploy
  // multi-tenant, mañana migrable a celdas tipo Slack/Linear.
  {
    id: 'sudo-service-layer',
    title: 'Service layer org_provisioning',
    description: 'temba/staff/services.py con provision_org / deactivate_org / provision_user / assign_user_to_org / unassign_user_from_org. Single audit point + cell-routing-ready (signaturas keyword-only para agregar cell= sin breaking change).',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Sudo & Multi-tenancy',
    completedDate: '2026-05-03 01:30',
  },
  {
    id: 'sudo-org-crud',
    title: 'CRUD de workspaces desde sudo',
    description: 'OrgCRUDL.Create con form name+owner+timezone, OrgCRUDL.Delete con impact preview (users/channels/contacts/flows). Botones en /staff/org/ list + Read view. Soft-delete vía Org.release() respeta retención de 7 días stock.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Sudo & Multi-tenancy',
    completedDate: '2026-05-03 02:00',
  },
  {
    id: 'sudo-user-mgmt',
    title: 'Gestión cross-tenant de usuarios',
    description: 'AssignUser idempotente (cubre add + change role) y UnassignUser. UserCRUDL.Create con assign opcional a workspace + role en la misma submission, así sudo onboarda un nuevo agente en un solo paso.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Sudo & Multi-tenancy',
    completedDate: '2026-05-03 02:30',
  },
  {
    id: 'sudo-audit-log',
    title: 'Audit log de acciones sudo',
    description: 'StaffAuditLog (append-only) en /staff/auditlog/. Cada operación del service layer emite una row con actor + action + target + metadata JSON. 5 acciones tracked. Filtros por acción, búsqueda por email del actor. Cierra el loop de compliance/traceability cuando lleguen clientes pagos.',
    status: 'done',
    priority: 'medium',
    product: 'flow360',
    category: 'Sudo & Multi-tenancy',
    completedDate: '2026-05-03 03:00',
  },
  {
    id: 'sudo-dashboard',
    title: 'Sudo dashboard cross-org',
    description: 'Landing en /staff/ con KPIs cross-tenant: orgs activos, nuevos último 30d, total usuarios, msgs/día agregado, alertas (orgs near limit, suspended, sin actividad). Versión sudo del Cockpit. Diferido hasta tener varios clientes pagos.',
    status: 'planned',
    priority: 'low',
    product: 'flow360',
    category: 'Sudo & Multi-tenancy',
  },
  {
    id: 'sudo-multi-cell',
    title: 'Migración a arquitectura multi-cell',
    description: 'Cuando llegue ~500-1000 orgs activos: separar en celdas (cada deploy maneja un subset de orgs). El service layer ya está preparado, solo hay que agregar cell routing. Patrón Slack/Linear/Notion.',
    status: 'planned',
    priority: 'low',
    product: 'flow360',
    category: 'Sudo & Multi-tenancy',
  },

  // ---- 18. UX cliente ------------------------------------------------------
  //
  // Reorganización del UX para que la plataforma se sienta producto
  // comercial (no una herramienta de developers). Empieza con cambios
  // mínimos high-impact y va escalando con feedback de clientes
  // piloto reales.
  {
    id: 'ux-menu-reorg',
    title: 'Menú lateral reorganizado',
    description: 'Cockpit al top (admin only), reorden a Tickets→CRM→Contacts→Messages→Flows→Triggers→Campaigns. Patch de ~50 líneas en derive_menu(). Permisos sin tocar — el rol Agent ya queda minimal por construcción.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'UX cliente',
    completedDate: '2026-05-03 03:45',
  },
  {
    id: 'ux-i18n',
    title: 'Traducción de items técnicos a lenguaje comercial',
    description: 'Pase dedicado de i18n: Triggers→Disparadores, Campaigns→Campañas, Flows→Flujos, etc. en pt-BR y es-AR. Mejor hacerlo separado del restructuring para no mezclar trabajo cosmético con funcional.',
    status: 'planned',
    priority: 'medium',
    product: 'flow360',
    category: 'UX cliente',
  },
  {
    id: 'ux-default-page',
    title: 'Página default por org/usuario',
    description: 'Algunos clientes pueden querer landing en Tickets en vez de Cockpit. Settings de org y/o per-user override. Persistir en User.settings_json o Org.config.',
    status: 'planned',
    priority: 'low',
    product: 'flow360',
    category: 'UX cliente',
  },
  {
    id: 'ux-mobile-collapse',
    title: 'Menú colapsable en mobile',
    description: 'Hoy el sidebar siempre se ve. En pantallas chicas debería colapsar a iconos automáticamente y expandir on-hover.',
    status: 'planned',
    priority: 'low',
    product: 'flow360',
    category: 'UX cliente',
  },

  // ---- 20. Configuración del cliente comercial -----------------------------
  //
  // El Administrator del cliente comercial (no-sudo) abre Flow360 todos los
  // días y necesita encontrar SU configuración sin la maraña técnica que
  // RapidPro stock expone (API tokens, resthooks, classifiers, etc.).
  // Fase 19 construye esa superficie con 3 decisiones: un solo icono
  // Settings (no agregar otro), cards en la página principal (no items
  // en sidebar interno), técnico solo para sudo (is_staff gate).
  {
    id: 'cfg-settings-cards',
    title: 'Settings page con cards Flow360',
    description: 'OrgCRUDL.Workspace formax con 5 cards nuevas (Channels, Teams, Operating hours, Agents, Quick replies) además de las stock (timezone, language, locale, email, DTI). Vista genérica SettingsCard parametrizada por kind, un solo template universal.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Configuración cliente',
    completedDate: '2026-05-03 22:30',
  },
  {
    id: 'cfg-sidebar-staff-only',
    title: 'Sidebar técnico is_staff-only',
    description: 'API Tokens, Resthooks, Incidents, AI, AI Agents, Workspaces, Users, Invitations, Teams, Export, Import, Classifiers, Archives gateados a is_staff. El Administrator del cliente solo ve el workspace name en el sidebar interno. Sudo sigue viendo todo.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Configuración cliente',
    completedDate: '2026-05-03 23:00',
  },
  {
    id: 'cfg-businesshours',
    title: 'Operating hours per-org',
    description: 'App temba.businesshours: model BusinessHours (1-1 con Org, 7 días con open + open_time + close_time, defaults Mon-Fri 8-18 / weekends closed). View custom con toggle por día, inputs bloqueables. is_open_at(when) listo para Mailroom hooks futuros.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Configuración cliente',
    completedDate: '2026-05-03 21:00',
  },
  {
    id: 'cfg-channels-whitelist',
    title: 'Whitelist de canales del catálogo',
    description: 'ChannelCRUDL.Claim filtrado a 5 channel types: WhatsApp, Telegram, Facebook, Instagram, External (API). Twilio, JioChat, 360Dialog, Chip y demás técnicos quedan ocultos. Sudo accede a todos via /channels/channel/claim_all/.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Configuración cliente',
    completedDate: '2026-05-03 21:30',
  },
  {
    id: 'cfg-multitenant-smoke',
    title: 'Multi-tenant smoke E2E',
    description: 'Validación E2E del UX desde la perspectiva del cliente real: sudo crea Cliente Demo workspace + admin@clientedemo.com con role Administrator, login en browser incógnito, confirmado los 10 items del sidebar lateral sin leak de sudo surface.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Configuración cliente',
    completedDate: '2026-05-03 23:30',
  },
  {
    id: 'cfg-tag-crudl',
    title: 'Tag CRUDL — UI de gestión',
    description: 'Construir CRUDL para temba.tags.Tag (hoy solo tiene model + API REST). List view tipo cards, create/update/delete modals. Re-prender la card "Tags" en la Workspace page.',
    status: 'planned',
    priority: 'medium',
    product: 'flow360',
    category: 'Configuración cliente',
  },
  {
    id: 'cfg-category-crudl',
    title: 'Categories CRUDL — UI de gestión',
    description: 'CRUDL para temba.categories. 3 modelos: ContactCategory, CategoryOption, ContactCategoryValue. UI más densa: lista de categorías con sus opciones inline, create category, add/remove option per category.',
    status: 'planned',
    priority: 'medium',
    product: 'flow360',
    category: 'Configuración cliente',
  },
  {
    id: 'cfg-agents-page',
    title: 'Agents page con privileges placeholder',
    description: 'Hoy el card "Agents" linkea a /orgs/user/ stock. Construir página Flow360 con lista de users + role + sección "Privileges (coming soon)". Granularidad fina por usuario se hace después cuando definamos el modelo.',
    status: 'planned',
    priority: 'medium',
    product: 'flow360',
    category: 'Configuración cliente',
  },

  // ---- INDIKA --------------------------------------------------------------
  // intentionally empty — the product gets its own work stream
];

// =============================================================================
//  Shared Modules
// =============================================================================
//
// Real cross-cutting infrastructure pieces that exist today.  Each one is
// a sibling git repo under ~/projects/, layered onto a stock release of the
// upstream tool with focused patches tracked in a PATCHES.md file.
// =============================================================================

export const sharedModules: SharedModule[] = [
  {
    id: 'fork-floweditor',
    name: 'floweditor-fork',
    description: 'Fork del flow editor de RapidPro (v1.45.1) con un único patch en LLMForm.tsx que agrega un dropdown de AI Agent dentro del nodo Call AI y auto-rellena el prompt elegido.',
    products: ['flow360'],
    status: 'done',
  },
  {
    id: 'fork-temba',
    name: 'temba-components-fork',
    description: 'Fork de @nyaruka/temba-components (v0.135.9). Patches de chat (timestamp por mensaje, audio player inline) y composer (botón micrófono + recording overlay). Build → docker compose cp into rapidpro container.',
    products: ['flow360'],
    status: 'in-progress',
  },
  {
    id: 'fork-courier',
    name: 'courier-fork',
    description: 'Fork de nyaruka/courier (v26.1.1). Patches en handlers/telegram: sendVoice para OGG/Opus y mirroreo eager de incoming media a S3 propio para sobrevivir al TTL del proveedor. Build vía Dockerfile.rapidpro.',
    products: ['flow360'],
    status: 'in-progress',
  },
];

// =============================================================================
//  Changelog
// =============================================================================
//
// Concise milestone-level history.  Each entry collapses one or more delivery
// phases into a release; the per-phase technical detail lives in the docs/
// folder of the rapidpro8 repo.
// =============================================================================

export const changelog: ChangelogEntry[] = [
  {
    date: '2026-05-03',
    items: [
      { product: 'flow360', text: 'Settings del cliente comercial (Fase 19): la página Workspace pasa a llamarse Settings y muestra 5 cards Flow360 (Channels, Teams, Operating hours, Agents, Quick replies) además de las cards stock. El segundo sidebar de Settings se reduce a solo el nombre del workspace para Administradores; los items técnicos de RapidPro (API Tokens, Resthooks, Incidents, AI, AI Agents, Workspaces, Users, Invitations, Teams, Export, Import, Classifiers, Archives) quedan gated detrás de is_staff. Una sola vista parametrizada SettingsCard renderiza las 5 cards.' },
      { product: 'flow360', text: 'Channel catalog whitelist: el comercial Administrator ve 5 canales (WhatsApp Cloud, Telegram, Facebook, Instagram, External/API) en /channels/channel/claim/. Sudo conserva el catálogo completo en /channels/channel/claim_all/.' },
      { product: 'flow360', text: 'App nueva temba.businesshours: modelo one-to-one con Org (7 días × open/open_time/close_time, defaults Lun–Vie 08:00–18:00), método is_open_at(when) timezone-aware listo para hooks futuros de Mailroom (auto-replies fuera de horario), CRUDL Update con UI custom (toggle por día + grey-out cuando está cerrado), 6 tests.' },
      { product: 'flow360', text: 'Smoke multi-tenant cerrado: workspace Cliente Demo + admin@clientedemo.com creados desde /staff/, login en incognito confirma sidebar de 10 items en orden Cockpit→Tickets→CRM→Contacts→Messages→Flows→Triggers→Campaigns→Notifications→Settings, sin leak de superficie técnica. Baseline UX que arranca cada piloto comercial.' },
      { product: 'flow360', text: 'Bug fix Cockpit: menu_path "/settings/dashboard" (heredado de cuando Dashboard era sub-item de Settings) hacía que el SPA shell mantuviera el sidebar de Settings abierto sobre el Cockpit. Corregido a "/cockpit" tras la promoción a top-level menu de la Fase 18.' },
    ],
  },
  {
    date: '2026-05-03',
    items: [
      { product: 'flow360', text: 'Sudo level (Fase 17): /staff/ ahora es un panel super-admin completo. CRUD de workspaces (create + soft-delete con impact preview), gestión cross-tenant de usuarios (assign/change role/unassign idempotente, create con onboarding a workspace en un paso), y audit log append-only con 5 tipos de acción. Service layer cell-routing-ready para escalar a multi-deploy cuando llegue al volumen de Slack/Linear.' },
      { product: 'flow360', text: 'Menú lateral reorganizado (Fase 18): Cockpit al top (admin only) y reorden a Tickets→CRM→Contacts→Messages→Flows→Triggers→Campaigns. Patch de 50 líneas en derive_menu() del OrgCRUDL.Menu, sin cambios de permisos — el rol Agent ya queda minimal por construcción (solo ve Tickets+CRM gracias a los perms stock+Fase 1).' },
      { product: 'flow360', text: 'Test suite del staff app pasa 18/19 (único rojo: test_service preexistente con LocalStack S3 NoSuchBucket, no relacionado con los nuevos commits). Migration staff.0001_initial.py crea la tabla staffauditlog + 3 índices compuestos.' },
    ],
  },
  {
    date: '2026-05-02',
    items: [
      { product: 'flow360', text: 'Chat wallpaper "Doodles cálidos" — patch en temba-components-fork (Chat.ts) que pinta un patrón de doodles hand-traced detrás de las burbujas del chat de tickets. Original art, no copia de WhatsApp. SVG inline (data URL) en el bundle, sin fetch en runtime. CSS variables --temba-chat-wallpaper-bg / --temba-chat-wallpaper-image expuestas para el picker futuro.' },
    ],
  },
  {
    date: '2026-05-02',
    items: [
      { product: 'flow360', text: '🎉 WhatsApp Cloud — onboarding directo desbloqueado. FB App "Flow360" creada en Meta (App ID 2466346687211651) con use-case "Conectar com clientes pelo WhatsApp" (Tech Provider track, sin requirements de Meta Verified). Embedded Signup Configuration 982515667588524 con permisos completos (business_management, whatsapp_business_management, whatsapp_business_messaging + per-asset Tech Provider). Saca una barrera de entrada importante al mercado: el cliente conecta su WA en 1 click sin pelearse con un BSP.' },
      { product: 'flow360', text: 'Stock RapidPro v26 WAC channel type wired up — env vars en docker-compose, beta gating completado (en v26 is_beta es property que checkea auth_group "Beta", no columna). UI /channels/types/whatsapp/connect/ ya muestra el botón "Add Facebook Business".' },
      { product: 'flow360', text: 'Decisión: Fase 15.0 — migrar a servidor de desarrollo externo (VPS + dominio + Caddy/Let\'s Encrypt) antes del smoke E2E. localhost+ngrok-free es frágil para el OAuth de Meta (dominios cambiantes, postMessage cross-origin, rate limits). Bloqueante para terminar el flujo de Embedded Signup.' },
    ],
  },
  {
    date: '2026-05-02',
    items: [
      { product: 'flow360', text: 'Cockpit (Admin Dashboard) v0 entregado: 7 bloques con data fake responsiva — shell + filtros, tira de tiempo real con auto-refresh, 3 gráficos de composición animados (pie humano/IA, pie nuevos/recurrentes, bar de resultado), gerenciamiento de chat (3 regiones proporcionales), gerenciamiento de resultado de atención (total + finalizado/no finalizado), comparativo humano vs IA, KPIs principales con sparklines.' },
      { product: 'flow360', text: 'Bundle React Vite IIFE en `~/projects/rapidpro8/admin-dashboard/`, montado en la vista Django `dashboard.dashboard_home` (reemplaza la home stock). Mock data determinístico responsivo a los 4 filtros globales — listo para conectarse a endpoints reales sin tocar UI.' },
    ],
  },
  {
    date: '2026-05-02',
    items: [
      { product: 'flow360', text: 'Telegram — voice messages outgoing como burbuja nativa (sendVoice + waveform en el celular del contacto).' },
      { product: 'flow360', text: 'Telegram — incoming media (voice, fotos, docs) mirroreado a S3 propio. Voice messages siguen reproduciendo después de los ~60min de TTL del proveedor.' },
      { product: 'global', text: 'Courier fork inaugurado (rapidpro-custom @ v26.1.1) con PATCHES.md como registry de cambios.' },
      { product: 'flow360', text: 'Roadmap extendido: nueva sección "Centro de Control Operativo" con 8 features para el dashboard administrativo (KPIs, IA vs Humano, alertas SLA, métricas de negocio). Apunta a la propuesta comercial de comunicaciones masivas con objetivos medibles en tiempo real.' },
    ],
  },
  {
    date: '2026-05-01',
    items: [
      { product: 'flow360', text: 'Voice messages: micrófono en el composer + recording overlay (timer / cancel / send), transcode ffmpeg server-side a OGG/Opus, audio player inline para incoming + outgoing.' },
      { product: 'global', text: 'temba-components fork inaugurado (rapidpro-custom @ v0.135.9). Primer patch: timestamp HH:MM debajo de cada burbuja del chat.' },
      { product: 'flow360', text: 'Tickets UX polish: avatares con iniciales + color hash, formato de fecha HH:MM/weekday/dd-MM en el inbox (DOM augmenter pattern).' },
      { product: 'flow360', text: 'Categorías de contacto: app temba.categories con seed Atendimiento, sidebar collapsible y filtro view en /contact/category/<uuid>/.' },
      { product: 'flow360', text: 'Tags de contacto: app temba.tags + ContactTag, TagEditor en TicketSidePanel y CardPanel, sidebar y filtro view en /contact/tag/<uuid>/.' },
      { product: 'flow360', text: 'AI Agent en tickets: rol AI por org + flow action Escalate to Human + interrupt automático en handoff IA→humano.' },
      { product: 'flow360', text: 'TicketSidePanel: tercera columna en /tickets/ con editor de contacto + tags + categorías sincronizado al ticket activo.' },
      { product: 'flow360', text: 'CRM Kanban: app temba.crm + API v2 + bundle React (drag&drop, panel de card, create/edit contacto desde el panel).' },
      { product: 'global', text: 'AI Agent dropdown en el Call AI flow node — fork de floweditor v1.45.1 con tweak en LLMForm.tsx.' },
    ],
  },
];
