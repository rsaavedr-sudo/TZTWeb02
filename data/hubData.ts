
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
   * ISO date (YYYY-MM-DD) when the feature was delivered. Only meaningful
   * for `status === 'done'` items. Surfaced on the Roadmap kanban "done"
   * column and on the product detail catalog so the team can see the
   * timeline at a glance.
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
  {
    id: 'ch-wa-cloud',
    title: 'WhatsApp Cloud API',
    description: 'Integración oficial con Meta Cloud API. Habilita ventana 24h, voice flag, document mirror y todo el set nativo de WA.',
    status: 'planned',
    priority: 'high',
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
    completedDate: '2026-02-15',
  },
  {
    id: 'ch-tg-voice',
    title: 'Telegram — voice messages nativos',
    description: 'Outgoing como sendVoice (waveform + duración en el celular del contacto). Incoming voice persistido en S3 propio para sobrevivir al TTL de 60min de Telegram.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Integración de Canales',
    completedDate: '2026-05-02',
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
    completedDate: '2026-02-15',
  },
  {
    id: 'usr-ai-role',
    title: 'Rol "AI" para auto-asignación',
    description: 'Usuario virtual con flag is_ai por org. Tickets abiertos por flow IA quedan asignados a este user; reasignar a humano interrumpe automáticamente el flow.',
    status: 'done',
    priority: 'medium',
    product: 'flow360',
    category: 'Gestión de Usuarios',
    completedDate: '2026-04-10',
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
    completedDate: '2026-02-15',
  },
  {
    id: 'conv-tags',
    title: 'Tags de contacto + filtro en inbox',
    description: 'Tag editor con autocompletar y selector de color. Sidebar con tags populares y filtro view en /contact/tag/<uuid>/.',
    status: 'done',
    priority: 'medium',
    product: 'flow360',
    category: 'Gestión de Conversaciones',
    completedDate: '2026-04-15',
  },
  {
    id: 'conv-cat',
    title: 'Categorías de contacto + filtro',
    description: 'Categorías con un único valor por contacto (ej. Atendimiento). Sidebar collapsible y filtro view en /contact/category/<option-uuid>/.',
    status: 'done',
    priority: 'medium',
    product: 'flow360',
    category: 'Gestión de Conversaciones',
    completedDate: '2026-04-20',
  },
  {
    id: 'conv-sidepanel',
    title: 'Side panel del contacto en tickets',
    description: 'Tercera columna con editor completo del contacto + tags + categorías. Watch del data-contact-uuid del ticket activo y re-fetch automático.',
    status: 'done',
    priority: 'medium',
    product: 'flow360',
    category: 'Gestión de Conversaciones',
    completedDate: '2026-04-01',
  },
  {
    id: 'conv-ux',
    title: 'UX polish — avatares + fechas',
    description: 'Iniciales con color hash en cada fila del inbox. Formato HH:MM / weekday / dd-MM en lugar del "5m / 2h / 3d" stock.',
    status: 'done',
    priority: 'low',
    product: 'flow360',
    category: 'Gestión de Conversaciones',
    completedDate: '2026-04-25',
  },
  {
    id: 'conv-ts',
    title: 'Timestamp por mensaje',
    description: 'Cada burbuja del chat muestra HH:MM. Patch en el fork de temba-components.',
    status: 'done',
    priority: 'low',
    product: 'flow360',
    category: 'Gestión de Conversaciones',
    completedDate: '2026-05-01',
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
    completedDate: '2026-02-15',
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
    completedDate: '2026-05-01',
  },
  {
    id: 'prod-audio-player',
    title: 'Audio player inline en el chat',
    description: 'Render nativo de HTML5 audio para attachments audio/* (incoming + outgoing). Detección por content type o por extensión de URL.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Productividad del Agente',
    completedDate: '2026-05-01',
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
    completedDate: '2026-03-01',
  },
  {
    id: 'ai-ticket-handoff',
    title: 'AI Agent en tickets + handoff',
    description: 'IA atiende primero, escala vía webhook a humano. Reasignación de la IA a un humano interrumpe el flow del contacto.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Inteligencia Artificial',
    completedDate: '2026-04-10',
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
    completedDate: '2026-03-15',
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
      { product: 'flow360', text: 'Telegram — voice messages outgoing como burbuja nativa (sendVoice + waveform en el celular del contacto).' },
      { product: 'flow360', text: 'Telegram — incoming media (voice, fotos, docs) mirroreado a S3 propio. Voice messages siguen reproduciendo después de los ~60min de TTL del proveedor.' },
      { product: 'global', text: 'Courier fork inaugurado (rapidpro-custom @ v26.1.1) con PATCHES.md como registry de cambios.' },
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
