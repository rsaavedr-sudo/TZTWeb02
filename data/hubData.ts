
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
