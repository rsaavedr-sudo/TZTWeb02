
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

/**
 * Tipo de release según versionado semántico (MAYOR.MENOR.PARCHE):
 *   - major → cambio grande o incompatible
 *   - minor → funcionalidad nueva, compatible hacia atrás
 *   - patch → corrección de bug, sin features nuevas
 */
export type ReleaseKind = 'major' | 'minor' | 'patch';

/**
 * Un Release es una versión que efectivamente LLEGÓ A PRODUCCIÓN.
 *
 * Se distingue del Changelog a propósito, porque responden preguntas
 * distintas:
 *   - Changelog  → "¿qué se trabajó?" (registro de actividad, muy detallado)
 *   - Releases   → "¿qué está corriendo en producción y desde qué versión?"
 *
 * Mezclarlos hace que ninguna de las dos se pueda responder bien: el equipo
 * no sabe si algo que ve en el changelog ya está disponible para el cliente
 * o sigue en QA. Acá sólo entran versiones desplegadas, con su tag de git.
 *
 * Fuente de verdad del contenido: `rapidpro8/docs/RELEASE-NOTES.md`.
 */
export interface Release {
  /** Tag de git, ej. 'v1.0.1' */
  version: string;
  /** Fecha del despliegue a producción, YYYY-MM-DD */
  date: string;
  kind: ReleaseKind;
  product: ProductID;
  /** Título corto, sólo para releases con hito (ej. la primera versión) */
  headline?: string;
  /** Agrupaciones de cambios: features nuevas, correcciones, operación… */
  sections: {
    label: string;
    items: string[];
  }[];
}

/**
 * A Playbook is a stable technical reference document living in the repo's
 * `docs/` folder. The Product Hub only holds the index (title, description,
 * category, link to GitHub) — the content stays in the .md file so the repo
 * remains the single source of truth. Categorised to help find the right one
 * fast:
 *   - onboarding  → guides to start a new channel, client, feature (e.g., WAC
 *                    onboarding checklist)
 *   - ops         → runbooks (deploys, backups, restarts, incident response)
 *   - architecture→ design decisions + diagrams for a subsystem
 *   - post-mortem → incident write-ups with lessons learned
 *   - reference   → cheatsheets and glossaries consulted frequently
 */
export interface PlaybookEntry {
  id: string;
  title: string;
  category: 'onboarding' | 'ops' | 'architecture' | 'post-mortem' | 'reference';
  product: ProductID | 'global';
  description: string;
  lastUpdated: string;                 // YYYY-MM-DD
  status: 'draft' | 'stable' | 'deprecated';
  filename: string;                    // ej "43-CANAL-WAC-CHECKLIST-COMPLETO.md"
  githubUrl: string;                   // link directo al blob
  keyTakeaways?: string[];             // 3-5 bullets clave para preview sin abrir
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

  // ---- 0. Julio 2026 — Bloque IA + salida a producción ---------------------
  //
  // Tanda que dejó los agentes de IA listos para operación real y puso la
  // primera versión en producción (flow360ai.com.br, v1.0.0 el 22-jul).
  //
  // El hilo conductor del bloque de IA: que el agente responda sólo con
  // hechos verificados, que sepamos cuánto cuesta, y que la recuperación no
  // falle en silencio. Varias de estas features nacieron de un hallazgo
  // incómodo — una prueba que se daba por buena era el modelo adivinando,
  // no recuperando — que sólo se destapó al agregar instrumentación.

  {
    id: 'ia-grounding',
    title: 'Anclaje (grounding) de agentes de IA',
    description: 'Los agentes responden únicamente con información verificada de la base de conocimiento. Si el dato no está, lo admiten y transfieren a una persona en vez de inventar. Regla activada por defecto y editable desde la UI, en pt/es/en. Ataca la causa nº1 de incidentes en atención con IA: precios, plazos y coberturas inventados que son un pasivo legal y de marca.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Inteligencia Artificial',
    completedDate: '2026-07-20 18:00',
  },
  {
    id: 'ia-handoff-config',
    title: 'Escalado a humano configurable',
    description: 'Los criterios de transferencia a un agente humano estaban hardcodeados en views.py y no aparecían en el preview del prompt — o sea, drift entre lo que el usuario veía y lo que realmente llegaba al modelo. Ahora viven en la configuración del agente, son editables desde la UI, e incluyen palabras clave que disparan el handoff automáticamente.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Inteligencia Artificial',
    completedDate: '2026-07-20 19:30',
  },
  {
    id: 'ia-guardrails',
    title: 'Guardrails de seguridad (anti prompt-injection)',
    description: 'El texto que envía el cliente se trata como dato, no como orden: el agente no ejecuta instrucciones embebidas en los mensajes, no revela su prompt de sistema, no repite datos personales innecesarios y no promete nada sin respaldo. Activado por defecto, editable, en los tres idiomas.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Inteligencia Artificial',
    completedDate: '2026-07-20 21:00',
  },
  {
    id: 'ia-rag-kb',
    title: 'Base de conocimiento con RAG (pgvector)',
    description: 'Módulo de conocimiento propio: se cargan fuentes (políticas, catálogo, FAQ), se parten en fragmentos con solape, se indexan con embeddings y un índice HNSW, y en cada conversación el agente recupera sólo lo relevante y responde citando la fuente. Antes el "conocimiento" era un TextField concatenado al prompt: no escalaba, no era auditable y se pagaba entero en cada turno. Embeddings multi-proveedor (OpenAI, Azure, Google — Anthropic y DeepSeek no ofrecen). Actualizable al instante sin reentrenar.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Inteligencia Artificial',
    completedDate: '2026-07-21 14:00',
  },
  {
    id: 'ia-rag-hibrido',
    title: 'Búsqueda híbrida en la recuperación (RRF)',
    description: 'La búsqueda sólo vectorial fallaba en un caso muy común: consulta corta con término exacto contra un fragmento largo y mixto — la similitud se diluye y el fragmento correcto queda fuera del umbral. Caso real que lo motivó: "Tem carência?" no recuperaba el texto que dice literalmente "Não há carência". Se sumó búsqueda léxica full-text de Postgres y se fusionan ambos rankings con RRF (combina por posición, no por puntaje: una distancia coseno y un ts_rank no son magnitudes comparables). Encuentra por significado y por término literal.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Inteligencia Artificial',
    completedDate: '2026-07-21 22:30',
  },
  {
    id: 'ia-costos',
    title: 'Medición de consumo y costo de IA',
    description: 'Cada turno de LLM registra tokens de entrada/salida, tokens servidos desde caché, costo en USD y latencia, separado por origen (conversación real, chat de prueba, copiloto, auto-respuesta). Sin esto no hay costo por conversación ni comparación entre modelos — y los datos que no se capturan en el momento no se recuperan después. Decisión de diseño: un modelo sin precio conocido registra costo nulo, no un estimado; un número inventado se propaga a los reportes y nadie vuelve a cuestionarlo.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Inteligencia Artificial',
    completedDate: '2026-07-21 18:00',
  },
  {
    id: 'ia-cache-prompt',
    title: 'Caché de prompt',
    description: 'El contexto recuperado se concatenaba dentro del system prompt, que cambiaba en cada turno — y como la caché de los proveedores funciona por prefijo idéntico, nunca acertaba. Se movió el contexto al mensaje del usuario para dejar el prompt estable, más cache_control explícito en Anthropic. Verificado en QA: el costo por turno bajó de US$0.0003 a US$0.0001 y la latencia de 3.7s a 1.7s cuando la caché acierta.',
    status: 'done',
    priority: 'medium',
    product: 'flow360',
    category: 'Inteligencia Artificial',
    completedDate: '2026-07-21 20:00',
  },
  {
    id: 'conv-dialogos',
    title: 'Diálogos guardados y recuperables',
    description: 'Las conversaciones se congelan como objeto de primera clase con su transcripción, métricas (tiempo de primera respuesta, conteo de mensajes por dirección) y análisis. Fue necesario porque el vínculo mensaje↔ticket queda siempre nulo en esta instalación, así que el historial no se podía reconstruir por FK: se arma por contacto y ventana temporal. Verificado sobre datos reales: un ticket que mostraba 0 mensajes por FK tenía 15 por ventana temporal.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Gestión de Conversaciones',
    completedDate: '2026-07-18 16:00',
  },
  {
    id: 'conv-import-wa',
    title: 'Importación de histórico de WhatsApp',
    description: 'Extracción del histórico desde el respaldo cifrado del dispositivo Android y carga en la plataforma, con resolución de identificadores opacos (LID) contra la tabla de mapeo y exclusión de mensajes de sistema. Validado sobre datos reales de un equipo comercial: 298 chats con teléfono resuelto, 247 contactos coincidentes con la base (83%), 305 diálogos importados y etiquetados para análisis.',
    status: 'done',
    priority: 'medium',
    product: 'flow360',
    category: 'Gestión de Conversaciones',
    completedDate: '2026-07-19 20:00',
  },
  {
    id: 'ch-templates-wa',
    title: 'Templates de WhatsApp en Configurações',
    description: 'Sección para ver el estado de las plantillas de mensaje (aprobadas, pendientes, rechazadas) y solicitarlas a Meta desde la plataforma, sin entrar al Business Manager.',
    status: 'done',
    priority: 'medium',
    product: 'flow360',
    category: 'Integración de Canales',
    completedDate: '2026-07-17 15:00',
  },
  {
    id: 'ch-archivados-ocultos',
    title: 'Canales archivados ocultos por defecto',
    description: 'Un canal "borrado" en RapidPro no se elimina —queda inactivo, porque los mensajes históricos lo referencian— y todos quedaban visibles mezclados con los activos. Con 8 archivados y 1 activo, el que importaba se perdía. Ahora se ocultan tras un chip "N archivado(s) — ver" que los trae cuando hace falta auditar. Incluye el caso de tener todos archivados, donde antes desaparecía el chip junto con la lista.',
    status: 'done',
    priority: 'low',
    product: 'flow360',
    category: 'Integración de Canales',
    completedDate: '2026-07-22 11:00',
  },
  {
    id: 'ops-produccion',
    title: 'Entorno de producción en flow360ai.com.br',
    description: 'Primera instancia de producción operativa: dominio propio con HTTPS, proxy reverso configurado, y base de datos independiente de QA (verificado — cada VM habla con su propio contenedor Postgres, no se pisan). Accesible desde internet, no sólo desde la red interna. Marca el paso de Flow360 de proyecto en desarrollo a producto en operación.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Sudo & Multi-tenancy',
    completedDate: '2026-07-22 00:45',
  },
  {
    id: 'ops-backups',
    title: 'Backups automáticos de base de datos',
    description: 'Respaldo diario programado por cron con retención de 7 días, más respaldo manual previo a cada despliegue. Incluye validación de integridad: aborta y avisa si el volcado sale sospechosamente chico, porque un backup vacío es peor que ninguno — da falsa sensación de estar cubierto. Activo en QA y producción. Pendiente aparte: DynamoDB (histórico crudo de mensajes) necesita su propia estrategia.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Sudo & Multi-tenancy',
    completedDate: '2026-07-22 00:35',
  },
  {
    id: 'ops-releases',
    title: 'Proceso de versiones y releases',
    description: 'Documentación del flujo desarrollo → QA → producción con versionado semántico, runbook de despliegue paso a paso, estrategia de rollback (código por tags + backup previo para la base) y disciplina de migraciones. Cambio clave: producción se mueve por tags (git checkout v1.0.1), no por rama — así se despliega exactamente lo validado y no "lo último que haya". Doc en rapidpro8/docs/RELEASES.md.',
    status: 'done',
    priority: 'medium',
    product: 'flow360',
    category: 'architecture',
    completedDate: '2026-07-22 10:00',
  },

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
    description: 'Integración oficial con Meta Cloud API vía Embedded Signup. Cliente conecta su WhatsApp en 1 click sin crear su propia FB App. Setup de Meta + env vars + smoke E2E completos. Cerrado con la aprobación de Meta App Review (29-jun-2026) que desbloqueó los 3 permisos críticos en producción.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Integración de Canales',
    completedDate: '2026-06-29 12:27',
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
    description: 'VPS + dominio dedicado + Caddy/Let\'s Encrypt para soportar el OAuth flow de Meta con HTTPS válido. Reemplazó al setup localhost+ngrok-free que era frágil para Embedded Signup (dominios cambiantes, rate limits, postMessage cross-origin). Desbloqueó el smoke E2E y todos los flows OAuth posteriores.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Integración de Canales',
    completedDate: '2026-05-28 23:00',
  },
  {
    id: 'wac-smoke-e2e',
    title: 'WAC — smoke E2E completo',
    description: 'Smoke test E2E del flow WhatsApp Cloud completo (Fase 15.2.4): crear WABA → agregar número → verificar SMS → Cloud API register call con PIN 2FA → claim canal en Flow360 (OAuth + select WABA) → template message saliente + reply round-trip. Validado el persist del WABA + phone_number_id y que el webhook Meta llega a /c/wac/. Replicado después en producción Facilitta Saude (Fase 15.2.b).',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Integración de Canales',
    completedDate: '2026-06-10 18:00',
  },
  {
    id: 'wac-app-review',
    title: 'WAC — Meta App Review (Live mode)',
    description: '🎉 APROBADO. Los 3 permisos críticos quedaron live el 29-jun-2026: whatsapp_business_messaging (envío/recepción), whatsapp_business_management (gestión números/templates/webhooks) y public_profile (login OAuth para que clientes vinculen su propio WABA). Pasamos de modo Development a Live, eliminando los límites severos. Onboarding self-service ahora es completamente viable — clientes externos pueden conectar sus propios WABAs sin pasar por nuestro admin. Flow360 pasa formalmente a ser WhatsApp Business Solution Provider en el mismo tier técnico que BotConversa, Twilio y RD Station.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Integración de Canales',
    completedDate: '2026-06-29 12:27',
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
    title: 'Copiloto — IA Aliada del Vendedor',
    description: 'Asistente IA personal por vendedor que aprende su estilo (tono, vocabulario, emojis, argumentos) y construye memoria persistente por cliente (historial completo, preferencias, objeciones, momento del funnel). Cuando el vendedor no está disponible (fuera de horario, otro chat, licencia), el Copiloto continúa la conversación con la voz del vendedor y el contexto exacto del cliente — 24/7. Diferencial estratégico vs Organization Agent (chatbot genérico por operación): el Copiloto es la sombra digital del vendedor mismo. Arquitectura base ✅ (modelo PersonalAIAgent + dashboard config + integración flow engine + audit log). En construcción 🚧: aprendizaje automático de estilo, memoria persistente por cliente, detección de emoción/intención. Ver playbook 44-COPILOTO-IA-ALIADA-DEL-VENDEDOR.md.',
    status: 'in-progress',
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
  {
    id: 'mkt-crm-fields',
    title: 'CRM Fields — campos extensibles por pipeline (Fase 25)',
    description: 'Cada pipeline define su propio schema de campos custom (CardField + CardFieldValue) editables desde Settings. 6 tipos: Text, Choice, Date, Phone, Email, Stage. Flag show_on_board renderiza chips en el preview de la card sobre el board, además del editor completo en el panel lateral. Empty-state en /crm/ deja al admin crear el primer pipeline sin chicken-and-egg.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Marketing y Captación',
    completedDate: '2026-05-04 22:00',
  },
  {
    id: 'mkt-crm-ticket-conversion',
    title: 'Convertir ticket → card de CRM (Fase 26)',
    description: 'Botón "Convertir → CRM" en el panel lateral de tickets crea una card en el pipeline asignado al team del agente con el contacto actual ya cargado. El ticket no se modifica — el card vive como entidad nueva, con sus propios fields editables inline en el panel. 409 con mensaje claro cuando el agente no tiene team o el team no tiene pipeline.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Marketing y Captación',
    completedDate: '2026-05-04 22:30',
  },
  {
    id: 'mkt-crm-team-pipeline',
    title: 'Acceso al CRM gated por team (Fase 29)',
    description: 'Cada Team tiene un FK opcional a Pipeline (Team.crm_pipeline). Los agentes ven SOLO el pipeline de su team — los admins/editors ven todos. Hard restriction: agente sin team o team sin pipeline → no ve el CRM, sin caída a "todos los pipelines". Cada team gestiona sus leads independientemente; el mismo contacto puede tener cards en múltiples pipelines (uno por team).',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Marketing y Captación',
    completedDate: '2026-05-04 23:30',
  },
  {
    id: 'agent-team-profile',
    title: 'Perfil operativo del team (Fase 32.0)',
    description: 'Campo Team.profile (general/sales/support, default=general) que define qué variante del dashboard del agente verán los miembros del equipo. Pre-configurado por el admin al crear/editar el team — los agentes lo heredan transparentemente, mismo patrón que Team.crm_pipeline. Migration 0090 con default a nivel DB así los teams existentes quedan en general sin backfill manual. Expuesto en /api/v2/users.json para que el frontend del dashboard lo consuma.',
    status: 'done',
    priority: 'medium',
    product: 'flow360',
    category: 'Inbox del agente',
    completedDate: '2026-05-05 16:00',
  },
  {
    id: 'agent-dashboard-home',
    title: 'Dashboard del agente "Mi desempeño" (Fase 32.A)',
    description: 'Pantalla inicial del agente al login que reemplaza el aterrizaje crudo en /ticket/. Muestra header con nombre + team, 3 KPIs en tiempo real (tickets atendidos hoy, tiempo de respuesta promedio formateado como "Xm Ys", tickets activos), 2 mini-charts de los últimos 7 días (bar de tickets/día con Chart.js, line de tiempo respuesta con tooltips formateados), botón prominente "Ir al Inbox" que baja la fricción de un click. Backend en temba.dashboard.agent_helpers usa Ticket.replied_on para "tiempo a primera respuesta" + Avg() en SQL para evitar N+1. URL /me/dashboard/. OrgRole.AGENT.start_view apunta acá automáticamente. UI uniforme entre los 3 profiles en 32.A; el JS lee team.profile del payload y se ramificará cuando lleguen 32.B/C.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Inbox del agente',
    completedDate: '2026-05-05 16:30',
  },
  {
    id: 'agent-dashboard-cockpit-style',
    title: 'Dashboard del agente — refresh visual al estilo Cockpit (Fase 32.A.e/f/g/h)',
    description: 'Rediseño visual completo para que el Dashboard del agente comparta lenguaje con el admin Cockpit: 5 KPI cards con tints de color (verde/azul/amber/violet/rojo) dentro de un frame blanco con título "EN VIVO Tu día de hoy" + timestamp, charts con accent dot en el heading, ranking del equipo como lista custom con "Yo" resaltado en azul, donut de resolución por categoría. Banner motivacional violeta entre header y KPIs con random pick por page-load de 12 quotes alternadas (6 Osho + 6 Steve Jobs). Sidebar item "Dashboard" gateado por rol — solo agentes lo ven; admin/editor solo ven Cockpit (que ya cubre la analítica workspace-wide).',
    status: 'done',
    priority: 'medium',
    product: 'flow360',
    category: 'Inbox del agente',
    completedDate: '2026-05-05 22:00',
  },
  {
    id: 'aiagent-brain-screen',
    title: 'AIAgent Brain — pantalla full-page con accordion + auto-prompt (Fase 33.A)',
    description: 'Reemplazo del form modal de configuración de AI Agent por una pantalla full-page tipo "Brain" con layout 70/30. Sidebar (30%, sticky): dropdowns de Lenguaje/Rol/Tono con opción "Otro→input" + Sub-rol dinámico que aparece según el rol (Ventas: consultiva/agresiva/pasiva; Soporte: rápido/detallado/educativo). Editor principal (70%): nombre del agente, caja grande de comportamiento general, 7 accordion blocks (Objetivo · Personalidad · Reglas · Estilo de respuesta · Qué NO hacer · Contexto del negocio · Ejemplos) con pill "Lleno/Vacío" reactiva, preview oscuro al final con prompt final por concatenación estructurada (## headers) + botón "Copiar". 4 fields nuevos en el modelo (sub_role, personality, response_style, examples) + AIAgent.build_prompt() que matchea exacto el formato del JS. Quedan placeholders de "Cargar template" (33.B) y "Probar IA" (33.C) en el sidebar.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Inteligencia Artificial',
    completedDate: '2026-05-05 21:00',
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
    id: 'visual-flow360-brand',
    title: 'Flow360 brand + sidebar blanco (Fase 30.1)',
    description: 'Primer pase de identidad visual de la plataforma: label "Flow360" con tipografía Space Grotesk pinned al top del sidebar izquierdo, sidebar repintado de azul → blanco con iconos oscuros (level-0 +30% más grandes, gris-900). Submenu items seleccionados con pill azul + texto blanco para contraste sobre el fondo claro. Variables CSS expuestas en el fork temba-components (--menu-icon-color, --menu-submenu-selected-bg) para que la repintura no dependa de inversiones globales del primary.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Identidad Visual',
    completedDate: '2026-05-05 01:00',
  },
  {
    id: 'visual-contact-silhouette',
    title: 'Avatar silhouette en lista de contactos (Fase 28)',
    description: 'Reemplazo de las iniciales con color hash del avatar de contacto en la lista de tickets por una silueta vector estilo Material Design (28px, circular, gris suave). Augmenter de DOM corre sobre temba-user + temba-date + scan directo de filas. UX más sobrio, alineado a la nueva identidad visual.',
    status: 'done',
    priority: 'medium',
    product: 'flow360',
    category: 'Identidad Visual',
    completedDate: '2026-05-04 23:00',
  },
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
    description: 'Pase dedicado de i18n completo en 3 idiomas (Fase 38.x): pt-BR + es-AR + en-US. Triggers→Disparadores, Campaigns→Campanhas, Flows→Fluxos, etc. en los catálogos .po de Django, + i18n de bundles React (admin-dashboard ✅ + crm-kanban ✅, tickets-side pendiente). Field Org.language sudo-configurado por workspace decide cuál locale servir. Bloque dedicado de traducción de Footer, Workspace config, Channels, Tickets, CRM headers, Nyaruka stock missing.',
    status: 'done',
    priority: 'medium',
    product: 'flow360',
    category: 'UX cliente',
    completedDate: '2026-06-05 18:00',
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
    description: 'Tag Manager completo (Fase 40.12): nueva página /tag/ con listado de tags del workspace ordenados por uso, panel de detalle con conteo + acción "Promover a Smart Group" (convierte la tag en un ContactGroup dinámico de RapidPro que sigue actualizándose automáticamente). Bridge entre la taxonomía liviana de tags y los grupos accionables que disparan campañas/broadcasts. Complementado con Tags sidebar vertical en /contact/ (Fase 40.11) estilo BotConversa para filtrado rápido.',
    status: 'done',
    priority: 'medium',
    product: 'flow360',
    category: 'Configuración cliente',
    completedDate: '2026-06-26 20:00',
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

  // ---- INBOX DEL AGENTE (Fase 20) -----------------------------------------
  {
    id: 'inbox-read-state',
    title: 'Estado leído / no-leído per-agente',
    description: 'Modelo TicketRead(ticket, user, last_read_at) con UniqueConstraint. is_unread compara contra el último mensaje INCOMING del contacto (NO contra last_activity_on — la respuesta del agente o del AI no debe flippear a unread). Bold del nombre cuando hay incoming nuevo, sin badge. Auto mark-as-read al seleccionar la fila vía POST /ticket/mark_read/<uuid>/. Per-user: dos agentes ven badges independientes.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Inbox del agente',
    completedDate: '2026-05-03 23:55',
  },
  {
    id: 'inbox-one-per-contact',
    title: 'Una fila por contacto (no por ticket)',
    description: '?one_per_contact=1 aplica DISTINCT ON (contact_id) ORDER BY contact_id, -last_activity_on en el folder view. Rodrigo con 4 tickets cerrados aparece como 1 sola fila (la más reciente). Cuando hay deep-link uuid, ese ticket reemplaza el "latest" del contacto en el resultado para que el frontend pueda seleccionarlo via valueKey.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Inbox del agente',
    completedDate: '2026-05-03 23:55',
  },
  {
    id: 'inbox-filters',
    title: 'Filtros componibles (search, categoría, no-leídas)',
    description: 'Search input arriba (debounced 300ms) — busca por contact.name y URN.path. Dropdown jerárquico de categorías (Atendimento › Interesado, Origen › Web, etc.) usando el modelo de Fase 9. Pill toggle "Unread" — solo no leídos por el agente actual. Los 3 filtros componen entre sí + con one_per_contact. El link next preserva los filtros al paginar (stock RapidPro los dropeaba).',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Inbox del agente',
    completedDate: '2026-05-03 23:55',
  },
  {
    id: 'inbox-filter-persistence',
    title: 'Persistencia del filtro entre sesiones',
    description: 'Hoy si el agente recarga, search/category/unread vuelven a vacío. Guardar el estado en localStorage o codificarlo en el query string para sobrevivir reload y permitir compartir vista filtrada por URL.',
    status: 'planned',
    priority: 'medium',
    product: 'flow360',
    category: 'Inbox del agente',
  },
  {
    id: 'inbox-filter-counter',
    title: 'Indicador visual del filtro activo',
    description: 'Cuando hay filtros aplicados (search/category/unread), mostrar un counter "(3 of 25)" o badge para que el agente sepa que está en vista filtrada. Hoy es invisible y puede confundir.',
    status: 'planned',
    priority: 'low',
    product: 'flow360',
    category: 'Inbox del agente',
  },
  {
    id: 'inbox-atendimento-pill',
    title: 'Pill de Atendimento en cada fila del inbox',
    description: 'El valor de Atendimento del contacto (Interesado/En seguimiento/Compra cerrada/Sin respuesta/No interesado, o cualquier custom) aparece como un pill de color suave debajo del último mensaje. Usa el color asignado en CategoryOption (Fase 9). Single-value-per-contact, así que exactamente 1 pill por fila o ninguno. Lo agrega el folder JSON via bulk-fetch + un parche al TicketList.ts del fork. SUPERSEDED por Fase 27.3 — quitamos el chip del row para que el foco visual quede en el stage del CRM; la categoría sigue editable desde el panel lateral.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Inbox del agente',
    completedDate: '2026-05-04 01:30',
  },
  {
    id: 'inbox-crm-stage-pill',
    title: 'Pill del stage de CRM en cada fila del inbox (Fase 27)',
    description: 'El stage del card más reciente del contacto en cualquier pipeline aparece como pill con fondo sólido (stage_color) + texto blanco debajo del último mensaje. El agente identifica de un vistazo el momento del lead sin abrir el panel. Backend usa PostgreSQL DISTINCT ON para devolver el card más reciente por contacto en una sola query bulk. Reemplaza visualmente al pill de Atendimento (que pasa a ser editable solo desde el panel lateral).',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Inbox del agente',
    completedDate: '2026-05-04 22:45',
  },
  {
    id: 'inbox-sidebar-comercial',
    title: 'Sidebar comercial de tickets (Fase 31)',
    description: 'Reorganización del sidebar para que coincida con el flujo mental del agente comercial: Inbox (todos los abiertos) → Mis tickets → En cola → Finalizados → Sin asignar (admin only). Dos folders nuevos: QueueFolder usa ~Exists() de Msg outgoing humano para encontrar tickets que esperan primer contacto + los que la IA está atendiendo; ClosedFolder da acceso explícito al histórico que stock solo daba mezclado con abiertos. Default folder pasa de Mine a All para que /ticket/ aterrice en Inbox.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Inbox del agente',
    completedDate: '2026-05-05 14:00',
  },
  {
    id: 'crm-direct-access-agent',
    title: 'Agentes saltan directo a su pipeline (Fase 31.4)',
    description: 'Click en "CRM" del sidebar redirige al agente directo al kanban de su pipeline (Fase 29 garantiza uno por team). El listado tabular intermedio era un click muerto. Admin/Editor conservan el listado para gestionar múltiples pipelines. Si el agente no tiene team o el team no tiene pipeline, cae al listado vacío con el mensaje implícito.',
    status: 'done',
    priority: 'medium',
    product: 'flow360',
    category: 'Marketing y Captación',
    completedDate: '2026-05-05 14:00',
  },

  // ---- COMPOSER (Fase 22) -------------------------------------------------
  {
    id: 'composer-send-button',
    title: 'Botón de envío circular en el composer',
    description: 'Botón redondo azul a la derecha del textarea del ticket reply. Llama triggerSend() — coexiste con Enter (las dos formas funcionan). Disabled (faded) cuando el composer está vacío. UI esperada por agentes de WhatsApp/Slack que el composer stock no tenía.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Composer',
    completedDate: '2026-05-04 00:30',
  },
  {
    id: 'composer-emoji-picker',
    title: 'Emoji picker pro en el composer',
    description: 'Botón emoji al lado del send. Click abre picker flotante con search multilingüe, 10 categorías con tabs, section headers, skin-tone variants, y persistencia de Recientes. Built sobre emoji-picker-element (web component nativo, ~14KB). Llegamos acá tras descartar custom grids, emoji-mart bundleado (sintaxis Parcel-only que rollup ignora), y emoji-mart desde CDN (bloqueado por el CSP de RapidPro).',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Composer',
    completedDate: '2026-05-04 00:30',
  },
  {
    id: 'composer-attach-templates-format',
    title: 'Attach + templates + formato (negrita/italic)',
    description: 'La referencia del competidor también tiene 📎 attach (ya existe en stock, falta solo verificar visibilidad), 📋 templates/quick-replies (existe el modelo Shortcut de Fase 19, falta el botón que abra menú), y ✏️ formato bold/italic (WhatsApp soporta *bold* _italic_).',
    status: 'planned',
    priority: 'medium',
    product: 'flow360',
    category: 'Composer',
  },

  // ---- Módulos & Extensiones -----------------------------------------------
  // Arquitectura de módulos activables per-workspace + los módulos concretos que
  // extienden la plataforma más allá del core (Marketing, Voz IP, etc.). Cada
  // módulo puede habilitarse/deshabilitarse por sudo desde /settings/modules/,
  // el sidebar del workspace se adapta dinámicamente, y las permissions se
  // gatean per módulo. Modelo base: OrgModule (Fase 40.1).
  {
    id: 'system-modules',
    title: 'Sistema de Módulos activables per-workspace',
    description: 'Arquitectura modular que permite habilitar/deshabilitar funcionalidades por cliente sin tocar código (Fase 40.1). Modelo OrgModule + toggle sudo desde /settings/modules/ + sidebar dinámico que renderiza solo las secciones activas + permissions gateadas por módulo (Fase 40.2). Base para monetización por tier de plan — clientes básicos ven core WhatsApp/CRM, clientes premium suman Marketing, Voz IP, Rambo, etc. Cada módulo tiene su propia app Django (temba.marketing, temba.voice, etc.) con sub-sidebar propio cuando aplica.',
    status: 'done',
    priority: 'high',
    product: 'flow360',
    category: 'Módulos & Extensiones',
    completedDate: '2026-06-20 18:00',
  },
  {
    id: 'module-marketing',
    title: 'Módulo Marketing — pipeline de leads + integraciones + funnel',
    description: 'Módulo completo de captación y gestión comercial (Fase 40.x). Consolida: dashboard con stat cards + chart 30d, tabla diaria con split por canal (Facebook/Instagram/Outro/Email), funnel Leads → Cadastros → Vendas con conversion rates, página Jornada de Leads, página Vendas con ranking de vendedores, página Perdidos con auto-dispatch de recovery, integración con Facilitta Master (import de ventas nightly), matcher BC vs Meta, importer manual de CSV, upload de sales. Módulo activable per-workspace desde sudo. Categoría base para futura evolución hacia RD Station-like.',
    status: 'in-progress',
    priority: 'high',
    product: 'flow360',
    category: 'Módulos & Extensiones',
  },
  {
    id: 'module-voice-pbx',
    title: 'Módulo Comunicación de Voz — PBX IP integrado',
    description: 'PBX IP nativo integrado al modelo unificado de comunicación de Flow360. Permite manejar llamadas entrantes/salientes (SIP trunks + softphone WebRTC en el navegador del agente), grabación de llamadas, IVR configurable per-org, transferencias entre agentes, hold/mute/conference, integración con CRM (click-to-call desde el contact + histórico de llamadas en el timeline), routing por skills/teams. Coexiste con canales de mensajería — un mismo contacto puede tener conversación WhatsApp + llamada telefónica en la misma vista. Activable per-workspace, con billing separado por minutos.',
    status: 'in-progress',
    priority: 'high',
    product: 'flow360',
    category: 'Módulos & Extensiones',
  },
  {
    id: 'module-rambo',
    title: 'Módulo Rambo — Discador automatizado de voz',
    description: 'Motor de discado automático masivo para campañas outbound de voz. Modos: preview (agente ve el lead antes del call), progressive (call automático al confirmar agente listo), predictive (algoritmo anticipa disponibilidad y disca antes), power dialer (agente al 100% ocupado). Integrado con el módulo Voz PBX para el transport y con el CRM para audiencia (segmentos por tags, pipelines, stages). AMD (answering machine detection) para skip auto de casillas de voz. Report post-campaña con métricas: conversion rate, avg talk time, abandonment rate. Nombre code: Rambo. Puede correr con voz humana o handoff a agente IA (Copiloto extended) para campañas de baja complejidad.',
    status: 'planned',
    priority: 'high',
    product: 'flow360',
    category: 'Módulos & Extensiones',
  },

  // ---- Comunicación de Voz --------------------------------------------------
  // Todas las capacidades de voz — nativas Meta (WABA Calling) + integraciones
  // con el PBX propio + capacidades multimodales que combinan voz + IA.
  {
    id: 'waba-calling',
    title: 'WABA Calling — llamadas de voz vía WhatsApp Business API',
    description: 'Llamadas inbound + outbound de voz nativas dentro del chat WhatsApp, sin que el usuario abandone la app. Ofrecidas por Meta desde Cloud API con webhook de eventos (calls field). Permite: recibir llamadas del cliente en el inbox de Flow360, iniciar llamadas outbound con consent explícito, recording opcional, transferencia entre agentes, click-to-call desde contact page. Puede operar de forma standalone (solo WhatsApp) o INTEGRADA con el Módulo PBX IP — en modo integrado, una llamada WABA entrante rutea al IVR del PBX y puede desviarse a un agente softphone o a un número externo. Fase 41 (análisis técnico) completa; falta approval de Meta para el pilot (Fase 41.b — email a Facilitta pidiendo trigger del flow).',
    status: 'planned',
    priority: 'high',
    product: 'flow360',
    category: 'Comunicación de Voz',
  },

  // ---- Multi-canal: SMS + RCS ---------------------------------------------
  // Canales de mensajería complementarios a WhatsApp. SMS todavía es lingua
  // franca global (100% de smartphones lo soportan, sin app). RCS es el
  // sucesor moderno (rich media, botones, read receipts, sin costo) — adoption
  // creciente sobre todo en US y algunos LATAM. Ambos siguen el mismo patrón:
  // canal en el inbox del agente si el admin lo autoriza + broadcasts masivos
  // desde Marketing + nodo Send en el flow editor para automations.
  {
    id: 'channel-sms',
    title: 'SMS — canal para agente + broadcasts + automation',
    description: 'Envío/recepción de SMS integrado al workspace. Tres modos de uso: (1) el AGENTE puede mandar SMS al cliente desde el inbox si el admin lo habilitó en su permission matrix (útil cuando WhatsApp no responde o el contacto no tiene WA); (2) el ADMIN puede lanzar broadcasts masivos a audiencias segmentadas por tags/pipelines/estado (integrado al módulo Marketing); (3) disponible como nodo "Send SMS" en el flow editor para incluir SMS dentro de automatizaciones (ej: recordatorio de cita 24h antes). Provider-agnostic: soporta Twilio, Vonage, Bandwidth, Zenvia y gateway locales por país. Delivery status webhook + cost tracking per workspace + hard cap configurable.',
    status: 'planned',
    priority: 'high',
    product: 'flow360',
    category: 'Integración de Canales',
  },
  {
    id: 'channel-rcs',
    title: 'RCS — canal moderno con fallback SMS',
    description: 'Rich Communication Services (protocolo Google que evoluciona SMS) con mismo patrón que SMS: agente puede mandar RCS desde inbox (si permission autorizado), admin lanza campañas masivas, nodo disponible en flow editor para automations. Ventajas vs SMS: soporta cards, botones interactivos, imágenes, ubicación, read receipts, typing indicators, sin costo del cliente, verificación de brand con logo/color en el header. Fallback automático a SMS cuando el destinatario no tiene RCS activo (~40-70% en LATAM al 2026). Requiere phone number habilitado para RCS via Google Jibe u operador local + verified brand con Google. Costo por mensaje ligeramente menor que WhatsApp Business.',
    status: 'planned',
    priority: 'medium',
    product: 'flow360',
    category: 'Integración de Canales',
  },

  // ---- Template Manager + gate de permissions -----------------------------
  // Dos features que se complementan: el Template Manager permite crear/mantener
  // los templates que se necesitan para mandar mensajes fuera de la CSW 24h, y
  // la matriz de permissions decide qué agentes efectivamente pueden usarlos.
  {
    id: 'template-manager',
    title: 'Template Manager — editor visual con sync bidireccional a Meta',
    description: 'Editor visual de WhatsApp Message Templates dentro de Flow360, con sync bidireccional al WhatsApp Manager de Meta. Permite crear/editar/duplicar templates de las 3 categorías (UTILITY, MARKETING, AUTHENTICATION) con validación en tiempo real de las guidelines Meta (header limits, body max 1024 chars, buttons max, placeholders {{1}} required, preview_url rules). Submit a Meta review desde la UI + escucha de webhook message_template_status_update para reflejar cambios de estado en tiempo real (APPROVED / PENDING / REJECTED / PAUSED / DISABLED). Preview del template renderizado como burbuja WhatsApp antes de mandar. Quality rating + performance metrics por template. Central para operadores del módulo Marketing y para agentes autorizados a mandar templates fuera de la CSW 24h.',
    status: 'planned',
    priority: 'high',
    product: 'flow360',
    category: 'Reglas WhatsApp 24h',
  },
  {
    id: 'admin-agent-permissions',
    title: 'Matriz de permissions granular por agente',
    description: 'Sección en /settings/agents/permissions/ donde el admin habilita capabilities individuales per-agente (o per-team con override individual). Capabilities gateables: enviar templates fuera de la ventana CSW 24h, mandar SMS, mandar RCS, lanzar broadcasts masivos, disparar flows manualmente sobre un contacto, exportar audiencias/contacts, ver métricas de otros agentes, editar tags globales del workspace, aprobar templates. Todo default OFF para agentes nuevos — el admin habilita explícitamente según responsabilidad. Cada decisión queda auditada en Integration Events (Fase 44). Reemplaza el modelo binario histórico "agente vs admin" por un control fino, alineado con equipos comerciales grandes donde no todos pueden mandar SMS a todos.',
    status: 'planned',
    priority: 'high',
    product: 'flow360',
    category: 'Gestión de Usuarios',
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
    date: '2026-07-22',
    items: [
      { product: 'flow360', text: '🚀 Flow360 EN PRODUCCIÓN — v1.0.0 desplegada en flow360ai.com.br, accesible desde internet con HTTPS. El camino no fue directo: la VM clonada tenía la red de Docker rota (DNS interno sin resolver entre contenedores, síntoma típico de clonar una máquina), el postgres seguía en la imagen vieja sin pgvector, elasticsearch se comía 3 de los 8 GB de RAM empujando el sistema a swap (arranques de Django de 2 a 5 minutos), y el .env todavía se identificaba como QA. Se resolvió todo: recreación de la red, imagen pgvector, heap de ES acotado a 1 GB, y config de producción propia. Bases de datos verificadas como independientes — cada VM habla con su propio contenedor Postgres.' },
      { product: 'flow360', text: '🧠 Bloque IA completo (Fases 79-84) — los agentes quedaron listos para operación real. (1) ANCLAJE: responden sólo con información verificada de la base de conocimiento; si no la tienen, lo admiten y transfieren. (2) RAG sobre pgvector: fuentes indexadas en fragmentos, recuperación por turno, respuesta citando la fuente. (3) BÚSQUEDA HÍBRIDA: se sumó full-text léxico fusionado con el vectorial vía RRF, porque la búsqueda semántica sola no encontraba términos exactos — "Tem carência?" no recuperaba el texto que dice literalmente "Não há carência". (4) SEGURIDAD: el texto del cliente es dato, no orden. (5) INSTRUMENTACIÓN: tokens, costo y latencia por turno. (6) CACHÉ de prompt: costo por turno de US$0.0003 a US$0.0001, latencia de 3.7s a 1.7s.' },
      { product: 'flow360', text: '⚠️ Hallazgo incómodo que motivó la instrumentación: una prueba del agente que se había dado por buena ("¿tiene carencia?" → "no hay carencia", respuesta correcta) resultó ser el MODELO ADIVINANDO, no recuperando de la base. Sólo se destapó cuando se agregó la línea de diagnóstico que muestra cuántos fragmentos se usaron: decía "sin contexto de la base". El modelo acertó por casualidad. Es el modo de fallo que hace peligrosos a estos sistemas — una respuesta correcta por azar es indistinguible de una fundamentada. Derivó en dos correcciones: contexto vacío explícito (cuando no se recupera nada, se inyecta igual un bloque que dice "NADA tiene relación, no deduzcas") y la búsqueda híbrida.' },
      { product: 'flow360', text: '💾 Backups automáticos en QA y producción — script con volcado comprimido, rotación a 7 días y validación de integridad (aborta si el dump sale sospechosamente chico, porque un backup vacío da falsa sensación de cobertura). Cron diario a las 3 AM en ambos entornos, más respaldo manual previo a cada despliegue. Era el punto más crítico pendiente: sin esto, cualquier error en producción era irreversible.' },
      { product: 'flow360', text: '📋 Proceso de releases documentado (docs/RELEASES.md) — flujo desarrollo → QA → producción con versionado semántico, runbook de despliegue, estrategia de rollback y disciplina de migraciones. Cambio de método importante: producción se mueve por TAGS (git checkout v1.0.1), no por rama, para desplegar exactamente lo validado y no "lo último que haya en la rama". Primera aplicación real el mismo día: v1.0.1 con la corrección de canales archivados, siguiendo el runbook completo (backup → tag → checkout → verificación).' },
      { product: 'flow360', text: '🔧 Deuda de migraciones destapada y parcialmente saldada: temba.knowledge reportaba cambios pendientes en cada arranque por dos causas — nombres de índice escritos a mano que no coincidían con el hash que calcula Django, y falta de AppConfig (heredaba AutoField cuando las tablas son BigAutoField). Ambas corregidas. Queda anotado el mismo tipo de desajuste en marketing, integration_events y conversations, que va como release propio porque altera columnas de tablas con datos.' },
      { product: 'global', text: '🗂️ Nueva sección Releases en el Product Hub — registro de qué versión llegó a producción, cuándo y qué trae, con filtros por tipo (mayor/funcionalidad/corrección) y producto. Deliberadamente separada del Changelog: éste registra actividad ("¿qué se trabajó?"), aquélla responde "¿qué está corriendo en producción y desde qué versión?". Cuando ambas cosas viven en el mismo lugar, el equipo no puede distinguir lo disponible para el cliente de lo que sigue en QA. La fuente de verdad del contenido vive en el repo (docs/RELEASE-NOTES.md) y el Hub la refleja.' },
    ],
  },
  {
    date: '2026-07-01',
    items: [
      { product: 'global', text: '📚 Nueva sección Playbooks en el Product Hub — arquitectura de conocimiento cross-team para docs técnicos que viven en el repo rapidpro8/docs/ y se indexan en el Hub. Nuevo item Playbooks en el sidebar (icon BookOpen) con vista de grid + filtros por categoría (Onboarding / Ops / Arquitectura / Post-mortem / Referencia) + filtros por producto. Cada card tiene expand de puntos clave, badge de status (draft/stable/deprecated), fecha de última actualización y botón directo al .md renderizado en GitHub. El Hub queda como índice, el content vive en el repo — single source of truth garantizada. Footer con convención para agregar nuevos docs: NN-CATEGORIA-TITULO.md + header estándar + entry en hubData.ts → playbooks[]. Regla de oro documentada: "si te encontraste haciendo o explicando algo por segunda vez, tocaba doc".' },
      { product: 'flow360', text: 'Playbook 43 — WhatsApp Cloud API Checklist Completo de Onboarding: reference end-to-end (7 partes + 3 anexos) para vincular un canal WAC de cliente nuevo. Cubre setup Meta del cliente (BM verificado, WABA, phone number registration, display name approval, partnership con Flow360), setup Meta App de Flow360 (permissions App Review, callback URL, webhook fields, System User), vinculación en Flow360 (env vars audit, UI OAuth path, manual claim fallback), 13 tipos de mensajería (texto, media con specs completas, location, contacts, interactive buttons/list/CTA, templates con las 3 categorías, reactions, catalog, WhatsApp Flows, WABA Calling), compliance completo (CSW 24h, opt-in, quality rating green/yellow/red, messaging tiers 250→∞, throughput, business + commerce policy, data deletion, payment), ops & troubleshooting con tabla de 15 error codes Meta + fixes conocidos, y smoke test E2E de 8 pasos para validar cada canal nuevo antes del handoff al cliente.' },
      { product: 'flow360', text: '🎯 Playbook 44 — Copiloto IA Aliada del Vendedor: descripción completa del diferencial estratégico de Flow360. Además del Organization Agent (chatbot por operación con criterio empresa) que ya tienen todos los competidores, Flow360 tiene el Copiloto — asistente IA personal por vendedor que aprende su estilo (tono, vocabulario, emojis, argumentos, frases marca registrada, horario típico) y construye memoria persistente por cada cliente (historial completo, preferencias declaradas, objeciones planteadas, momento del funnel, contexto personal). Cuando el vendedor no está disponible (fuera de horario, otro chat, licencia), el Copiloto continúa la conversación con SU voz y el contexto exacto del cliente — 24/7. Moat competitivo real: BotConversa, Twilio, RD Station no tienen personalización por vendedor + persistencia por cliente. Roadmap Fases A-D con horizonte Q3-2026 a Q2-2027: consolidación → aprendizaje adaptativo → coordinación inteligente → voz clonada del vendedor. Incluye 4 casos de uso concretos, guardrails hardcoded, FAQ para vendedores + admins, y consolida terminología histórica (Copiloto de Fase 37.7 + Personal AI Agent de Fase 15.11 + AI Agent Brain de Fase 33.A).' },
      { product: 'flow360', text: '🗺️ Roadmap expandido con 9 features nuevas en 3 categorías estratégicas: (1) "Módulos & Extensiones" — arquitectura de módulos activables per-workspace (OrgModule + toggle sudo, base para monetización por tier) + Módulo Marketing consolidado + Módulo Comunicación de Voz PBX IP integrado + Módulo Rambo (discador automatizado de voz con modos preview/progressive/predictive/power dialer, AMD detection, integración con CRM y Copiloto); (2) "Comunicación de Voz" — WABA Calling (llamadas de voz nativas vía WhatsApp Cloud API, standalone o integradas con el Módulo PBX); (3) Multi-canal SMS + RCS — mismo patrón que WhatsApp (agente permission-gated + broadcasts admin + nodo en flow editor), provider-agnostic (Twilio/Vonage/Bandwidth/Zenvia), delivery status + cost tracking + hard cap; (4) Governance — Template Manager con sync bidireccional a Meta + Matriz de permissions granular per-agente para gatear qué puede mandar (templates fuera CSW, SMS, RCS, broadcasts) con default OFF y audit log de cada cambio.' },
    ],
  },
  {
    date: '2026-06-30',
    items: [
      { product: 'flow360', text: '🎉 Primer canal WhatsApp Cloud API cross-BM vinculado en producción — número Facilittasaude 03 (+55 21 97488-3387) del propio Business Manager del cliente conectado como canal nativo del workspace Facilitta Saude en Flow360. Hasta hoy solo funcionaban canales cuyo WABA vivía en el BM T-zero (nosotros como operator directo); ahora quedó demostrado end-to-end que un cliente puede traer su propio WABA (con su propio phone number ID, business ID, permisos compartidos como partner técnico) y el proceso de vinculación funciona correctamente. Este es el patrón real de onboarding empresarial — cada cliente maneja su propia WABA, Flow360 la consume como partner. Test E2E validado: 23+ mensajes inbound recibidos, outbound 200 OK de Meta con message ID retornado, auto-ticket asignado al agente (Fase 15.6), CSW countdown activo (Fase 15.4).' },
      { product: 'flow360', text: 'Deuda técnica silenciosa arreglada en courier (Fase 15.0.9 quedó incompleta hace meses sin que nadie se diera cuenta): al debuggear el smoke test E2E se descubrió que courier nunca tuvo las 4 env vars necesarias para autenticar Meta Cloud API — COURIER_FACEBOOK_APPLICATION_SECRET valida signatures inbound del webhook (sin esto: "invalid request signature"), COURIER_WHATSAPP_ADMIN_SYSTEM_USER_TOKEN + _ID autentican outbound API calls a graph.facebook.com/messages (sin esto: 401 OAuthException), COURIER_FACEBOOK_APPLICATION_ID como referencia app. Los canales WAC existentes "funcionaban" porque courier tenía state acumulado en el container original desde el primer deploy hace meses, pero cualquier restart/force-recreate hubiera roto todo. También se agregó user:"0:0" al servicio courier para evitar permission denied al mkdir /var/spool/courier post-recreate (nonroot no puede escribir en /var/spool root:root). Fix pusheado a Azure DevOps — ahora operaciones rutinarias (restart, upgrade, force-recreate) no rompen los canales WAC.' },
      { product: 'flow360', text: 'Onboarding de canales WAC nuevos reducido de "sesión de horas manual" a "10 minutos via UI": tras cerrar la deuda técnica de courier, agregar un canal WAC nuevo (misma Meta App, WABA nueva) es ahora un flow OAuth normal en la UI de Flow360 — clic "+ Conectar canal" → WhatsApp Cloud API → seleccionar WABA del dropdown → done. Todos los backend pieces (activate() del handler, subscribe app a WABA, validación signature, auth outbound) funcionan sin intervención manual gracias a que el token global ahora llega correctamente al container. El script manual wac_manual_claim.py queda como backup para casos edge (WABA en BM sin partnership, debugging step-by-step).' },
    ],
  },
  {
    date: '2026-06-29',
    items: [
      { product: 'flow360', text: '🎉 Meta App Review APROBADA — los 3 permisos críticos para producción WhatsApp Cloud API quedaron aprobados: whatsapp_business_messaging (envío/recepción de mensajes), whatsapp_business_management (gestión de números/templates/webhooks desde la app) y public_profile (login OAuth para que clientes vinculen sus propios WABA). Desbloquea onboarding self-service de clientes nuevos sin pasar por modo Desenvolvimento, y elimina los límites severos que teníamos hasta ahora. Flow360 pasa formalmente de "wrapper experimental" a WhatsApp Business Solution Provider real, en el mismo nivel técnico que BotConversa, Twilio y RD Station.' },
      { product: 'flow360', text: 'Consolidación masiva de contacts duplicados (Fase 48.f): comando merge_duplicate_contacts identificó y mergeó 1.365 pares duplicados (2.731 contacts afectados, 1.366 desactivados). Causa raíz: APIs distintas guardaban el mismo celular con formatos distintos — BotConversa entrega 8-dig (+554891124031), Meta entrega 9-dig (+5548991124031). Heurística de ganador: prefer formato moderno + tiebreak por data más rica (name no vacío, más fields, más history). El perdedor se desactiva con name="[merged into #N]" y todas sus URNs/msgs/runs/tickets/cards/fields se mueven al ganador en una sola transacción. DB pasó de 12.233 a 10.871 contacts activos sin pérdida de información.' },
      { product: 'flow360', text: 'Import BotConversa Audience como Tags nativos (Fase 50.b): comando import_bc_audience_tags lee el export Audience del BC, matchea cada lead por phone8 (últimos 8 dígitos) contra contacts activos de Flow360, y aplica las etiquetas BC como Tags nativos. Run inicial: 2.325 contacts enriquecidos con 27 tags únicos (Cliente verde, Sem_Pagamento naranja, Checkout azul, Etapa_2 gris, PassouAqui violeta, WhatsAppsInválidos rojo, Perdido). La sidebar de /contact/ permite ahora filtrar por estado de funnel BC sin abandonar Flow360 — segmentación accionable para campañas de remarketing.' },
      { product: 'flow360', text: 'Análisis cross-sistema BC vs Meta (Fase 50): cruce de 10.703 leads BC vs 3.148 del CSV Meta detectó 200 leads en Meta que nunca llegaron a BC. Diagnóstico: el 100% pertenece al formulario "Form - Meta ads - In-copy - 2" canal Email — víctimas confirmadas de los lapsos intermitentes de Make.com. También se identificaron 1.408 contradicciones de nombres (BC tiene apodos/emojis "🌹 Tati 🌷" vs Meta tiene nombre completo "Tatiane Carvalho"); la heurística de name limpio de la Fase 48.d gana esos casos automáticamente.' },
    ],
  },
  {
    date: '2026-06-28',
    items: [
      { product: 'flow360', text: 'Import manual de Meta Leads CSV — pipeline completo de saneamiento (Fase 48.b–j): el comando import_meta_lead_center_csv se hizo production-grade tras 10 sub-fases encadenadas. Cambios clave: dedup por phone8 (últimos 8 dígitos, estilo matcher BC) para fusionar contacts entre formato BR 8-dig y 9-dig; URN dual tel:+ Y whatsapp:+ del mismo número (asume BR=tiene WA, 99% real); UPDATE pisa created_on con la fecha del CSV (Meta es fuente de verdad); heurística para limpiar nombres feos del BC backfill ("Tatiane_Garcia" → "Tatiane Garcia"); creación idempotente de Cards en kanban Vendas; integration con UI /marketing/upload-meta/ para subir CSV via browser con DRY-RUN + stats detalladas.' },
      { product: 'flow360', text: 'Fix timezone Pacific Time en CSV Meta (Fase 48.g + 48.h): bug confirmado matemáticamente — Meta Lead Center exporta horas en PDT/PST (timezone default de Facebook HQ California), no en hora local BR. Antes interpretábamos como BR local, dejando todos los created_on +4h adelantados (verano) o +5h (invierno). Fix: parser usa zoneinfo America/Los_Angeles con auto-DST. Backfill retroactivo del bug: command fix_meta_csv_timezone restó 4h a 3.049 contacts importados con la lógica vieja. Las fechas en /contact/ y kanban Vendas ahora coinciden exactamente con lo que muestra el panel de Meta.' },
      { product: 'flow360', text: 'Dedup phone8 también en webhooks Make + BotConversa (Fase 48.e): el endpoint find_existing_contact en webhooks/processing.py ahora tiene 2 paths — match exacto por URN + fallback por últimos 8 dígitos del phone. Antes, los webhooks creaban contacts nuevos cuando llegaba el mismo número en formato distinto (Make 9-dig vs BC 8-dig), generando los miles de duplicados que tuvimos que mergear. Con este fix, los duplicados dejan de generarse desde la raíz — toda integración entrante converge al mismo contact.' },
    ],
  },
  {
    date: '2026-06-27',
    items: [
      { product: 'flow360', text: 'Filtros de fecha en /contact/ (Fase 49): date range picker (Desde/Até) en el header de la lista de contactos, que aplica filtro server-side con created_on >= since AND created_on <= until usando el motor stock de RapidPro. Permite responder preguntas operativas como "cuántos leads llegaron el 27/06" o "muéstrame los del último fin de semana". Implementado sin tocar el queryset stock — override de get_queryset reescribe el search param antes de delegarlo al motor de búsqueda, manteniendo compatibilidad con otros filtros (tags, categorías, etc.).' },
      { product: 'flow360', text: 'Upload manual de CSV Meta Lead Center (Fase 48): nueva página /marketing/upload-meta/ para cuando Make.com está caído o para subir leads históricos. Workflow: download CSV desde Meta Business Suite → Lead Center → Download leads → upload en Flow360. Modo DRY-RUN para preview de stats sin escribir DB. Procesa 3.000+ leads en 1-2 min, idempotente (re-subir el mismo CSV no duplica), warnings de phones inválidos. Workaround esencial cuando el pipeline real-time tiene fallas — pasamos de "esperar a que vuelva Make" a "subir el CSV ahora y seguir operando".' },
    ],
  },
  {
    date: '2026-06-26',
    items: [
      { product: 'flow360', text: 'Tag Manager + promoción a Smart Group (Fase 40.12): nueva página /tag/ con listado completo de tags del workspace ordenados por uso. Click en un tag abre un panel con conteo y acción de "Promover a Smart Group" — convierte la tag en un ContactGroup dinámico de RapidPro que sigue actualizándose automáticamente cuando se aplica/quita la tag. Bridge entre la taxonomía liviana de tags (rápida de aplicar) y los grupos accionables (que disparan campañas, broadcasts, etc).' },
      { product: 'flow360', text: 'Tags sidebar vertical en /contact/ — estilo BotConversa (Fase 40.11): lista de etiquetas a la izquierda con conteo por tag, click filtra el listado central. Reemplaza la antigua barra horizontal arriba del listado, que escalaba mal con >10 tags. Item nuevo "Grupos" en sidebar principal para admin/editor accede al listado completo de ContactGroups sin pasar por Contacts. Ergonomía esperada por agentes que vienen del flujo BC.' },
      { product: 'flow360', text: 'Ficha base estándar de leads — 10 campos custom (Fase 40.10): seed de ContactFields predefinidos al crear un workspace nuevo (nome_completo, email, telefone, cpf, plano_interesse, valor_proposta, fecha_nacimiento, ciudad, profissao, observaciones). Cubre el 80% del use-case Brasil sin que el admin tenga que configurar fields a mano. El editor de fields acepta sumar más arriba de los default, pero los 10 base se imponen como mínimo común denominador.' },
      { product: 'flow360', text: 'Estadísticas Planos + Forma de Pagamento em /marketing/vendas/ (Fase 40.9): 2 nuevas cards de breakdown — distribución de ventas por tipo de plano contratado (Individual/Familiar/Master/etc.) y por forma de pagamento (Boleto/PIX/Cartão), con donut + tabla detallada. Permite al comercial responder "qué plano se vende más" y "cómo prefieren pagar los clientes" sin abrir el CRM contact por contact.' },
      { product: 'flow360', text: 'Sync Tags + Kanban BotConversa → Flow360 (Fase 40.8): análisis + plan de cómo replicar las etiquetas y board kanban del BotConversa dentro de Flow360 manteniendo bidirectionalidad. Decisión: pull diario via API + matcher por phone8 (no push real-time porque BC no soporta webhooks de tag changes). Documentación técnica completa para que el feature se implemente con tiempo.' },
      { product: 'flow360', text: 'BUG QA crítico — search en /contact/ tiraba 500 con 11.963 contacts: la query stock de RapidPro armaba un IN gigante con todos los UUIDs filtrados, sobrepasando el max_locks_per_transaction de postgres. Fix: paginar el query antes del COUNT y limitar el search a chunks de 5.000. Operación volvió a fluir sin necesidad de bajar contactos.' },
    ],
  },
  {
    date: '2026-06-24',
    items: [
      { product: 'flow360', text: 'Auto-dispatch de leads Perdidos — trigger configurable (Fase 40.7): comando celery beat que cada N minutos busca contacts con lead_intake_channel=make_webhook sin URN whatsapp y los marca como "Perdido" automáticamente, disparando opcionalmente un flujo BC de recuperación. Modo manual (👋) vs auto (🤖) marcado en cada Perdido para que el supervisor sepa si fue intervención humana o sistema. Cierra el ciclo del funnel sin requerir acción de un agente.' },
      { product: 'flow360', text: 'Página /marketing/perdidos/ implementada — cliente BC + endpoint disparar (Fase 40.5.e–s): lista de leads que llegaron por Make pero nunca iniciaron chat WA, con filtros por fecha y campañas. Click en un lead permite acionar un flujo BC de re-engagement manualmente. Backfill de la audiencia BC histórica + lead_intake_channel para evitar falsos perdidos en data legacy. Flag manual "ya contactado" persiste entre sessions. La definición precisa de Perdido se cerró tras debugging del caso Marcia (Fase 40.5.o) — URN whatsapp viene del BC webhook, no del Make.' },
      { product: 'flow360', text: 'Cliente Facilitta + sync_facilitta_sales nocturno (Fase 40.5.real + .b + .c): integración con la API oficial de Facilitta Master para traer las ventas confirmadas y mergearlas con el funnel de leads. Celery beat schedule corre cada noche, UI admin en /marketing/integrations/facilitta/ para ver historial de syncs + última corrida + errores. Reemplaza el upload manual de CSV de ventas — el pipeline ahora es end-to-end sin intervención humana.' },
      { product: 'flow360', text: 'Paquete de respuesta API a Facilitta Master (Fase 40.6.a): documento técnico completo con sample payloads, mapping de campos, JSON schema y email de bienvenida explicando cómo el equipo de Facilitta puede consumir nuestra API de leads para sincronizar con sus sistemas internos. Sienta las bases del partnership técnico bidireccional — antes Facilitta nos enviaba data, ahora ambos sentidos están documentados.' },
      { product: 'flow360', text: 'Análisis técnico WABA Calling — voz vía WhatsApp Cloud API (Fase 41): research completo de las capacidades de Meta para calls inbound/outbound dentro del chat WhatsApp. Conclusión: viable técnicamente vía Cloud API + webhooks de eventos de call, pero requiere aprobación específica de Meta (Fase 41.b — email a Facilitta pidiendo iniciar el flow). Si se aprueba, agregaría "click-to-call" desde el inbox del agente sin que el cliente abandone WhatsApp.' },
    ],
  },
  {
    date: '2026-06-22',
    items: [
      { product: 'flow360', text: 'Research matcher BotConversa + plan de replicación (Fase 40.5): reverse-engineering completo de cómo el matcher BC clasifica leads en Meta vs Outro, qué tags aplica, cómo dispara flows. Documentación: 3 docs en docs/ + endpoint nuevo /api/v2/webhooks/botconversa/ en Flow360 para que BC nos envíe eventos directamente (sin pasar por Make). Modelo BCWebhookEvent + página admin /marketing/webhook-logs/ para auditar todo lo que entra del matcher en tiempo real.' },
      { product: 'flow360', text: 'Modelo FacilittaSale + migración del import CSV (Fase 40.4): antes las ventas vivían como ContactFields del Contact (frágil — un lead con 2 ventas tenía data sobreescrita). Ahora cada venta es un row independiente en FacilittaSale con FK al Contact. El import CSV de ventas (Fase 40.4) migra a usar este modelo; las páginas /vendas/ y dashboard quedan con ContactFields por diseño (display agregado más rápido).' },
      { product: 'flow360', text: 'Página /marketing/vendas/ — Vendas Efetivas + Ranking de vendedores (Fase 40.3.u + 40.4.v): listado de todas las ventas con filtro por período (date range picker), ranking de los top 10 vendedores con su tasa de conversión, 4 métricas clave (cadastros vs vendas, % conversión, distribución sexo M/F, breakdown capital/interior por estado). Doughnut por origem (Facebook/Instagram/Outro) + promedio del período como línea horizontal sobre el bar chart.' },
      { product: 'flow360', text: 'API spec interna para equipo Facilitta Master (Fase 40.4 Capa 3): documento técnico completo en página interna /marketing/api-spec/ que describe los endpoints disponibles, payloads esperados, ejemplos curl, tokens de autenticación, rate limits. Page admin-only para no leakear superficie técnica a workspaces normales. Habilitamos al equipo de Facilitta a desarrollar contra nuestra API sin chat por slack para cada duda.' },
      { product: 'flow360', text: 'Upload manual de CSV Facilitta vendas en /marketing/upload-vendas/ (Fase 40.4): workflow paralelo al de leads — cuando la API de Facilitta tiene downtime o querés cargar ventas históricas, el CSV se sube manualmente y se procesa idempotente. Stats detalladas: cuántas ventas matchearon contacts existentes vs no, cuántas duplicadas se evitaron. Fix scroll lock en la página post-upload para que el modal de éxito no quede bloqueado.' },
    ],
  },
  {
    date: '2026-06-20',
    items: [
      { product: 'flow360', text: 'Página /marketing/jornada/ — Jornada de Leads (Fase 40.3.r): vista cronológica completa del recorrido de cada lead, desde que entra por Meta Ad hasta el cierre de venta o pérdida. Cada evento (intake, primer mensaje IA, escalation humana, venta, abandono) aparece como un step con timestamp, agente involucrado y outcome. Chips de Origem diferenciados por color (Facebook azul, Instagram rojo, Outro gris) para reconocimiento rápido. Es el "single pane of glass" del customer journey end-to-end.' },
      { product: 'flow360', text: 'Funnel global + columnas Cadastros/Vendas en tabla daily (Fase 40.3.q): la tabla diaria del dashboard Marketing pasa de mostrar solo leads a mostrar el funnel completo — Leads → Cadastros (signup en Facilitta) → Vendas (conversión confirmada). Funnel global summary arriba de la tabla con porcentajes de conversión por step. Permite responder "qué porcentaje del tráfico que entra termina pagando" en un solo número.' },
      { product: 'flow360', text: 'Import Facilitta sales CSV + funnel Cadastro/Pago (Fase 40.3.p): comando dedicado para procesar exports CSV del sistema Facilitta. Match por phone8 + email contra contacts existentes, marca el lead como "convertido" y registra valor + plano + forma de pago. Lo que antes era un script manual ad-hoc ahora es un management command idempotente con stats + warnings.' },
      { product: 'flow360', text: 'Enriquecimiento de Contact desde CSV Facilitta + mapping de sellers (Fase 40.3.s + .t): el import de ventas completa Contact.name (si estaba vacío) y agrega URN mailto cuando el CSV trae email. Mapping de usernames internos de sellers → display names amigables (john.silva → "João Silva") aplicado en todas las vistas que muestran el vendedor (Vendas, Ranking, Jornada).' },
      { product: 'flow360', text: 'Tabla diaria con split por canal en dashboard (Fase 40.3.o): la tabla de leads/día del Marketing dashboard ahora desagrega por canal (Facebook, Instagram, Outro, Email) con un color por columna. HOTFIX inmediato: la suma de columnas != Total porque algunos leads tenían múltiples canales — corregido haciendo DISTINCT por lead antes del SUM.' },
    ],
  },
  {
    date: '2026-06-18',
    items: [
      { product: 'flow360', text: 'Dashboard Marketing v1 — stat cards + chart 30d + lista últimos leads (Fase 40.3): primera versión funcional del módulo Marketing, con 5 stat cards (Leads hoy, Leads semana, Leads mes, Vendas mes, Conversión %), chart de 30 días con series múltiples (Meta Pago, Meta Orgánico, Outro) y lista de los últimos 50 leads con su origem + canal. Card "Origem real (Meta vs Outro)" con badges diferenciados según haya pasado por el matcher BC.' },
      { product: 'flow360', text: 'Sub-fases del dashboard Marketing (Fase 40.3.f–n): import de matcher subscribers para clasificar histórico, badge "Meta" para leads pre-matcher sin source, series temporales múltiples en el chart 30d (Outro verde, Meta legacy gris, etc), filtros de período en página Análise, exclusión de batch import outliers para que los charts no se vean distorsionados por un solo día de carga masiva, fix timezone consistente en todos los stat cards.' },
      { product: 'flow360', text: 'Arquitectura modular OrgModule + sudo toggle (Fase 40.1 + 40.2): nuevo modelo OrgModule que define qué módulos del producto están habilitados por workspace (Marketing, CRM, Tickets, etc). Sudo UI para que el equipo de implementación los active per cliente sin tocar settings. App nueva temba.marketing con layout de doble sidebar (sub-nav lateral que persiste entre las 9 páginas hijas: Análise, Jornada, Vendas, Perdidos, Webhook logs, API spec, Integrations, Upload Meta, Upload Vendas).' },
      { product: 'flow360', text: 'Sidebar staff mode + Dashboard Automatização (Fase 15.8 + 15.9): cuando un usuario tiene is_staff=True, aparece una sección extra en el sidebar con items RP avanzados (Flows, Triggers, Campanhas, Webhooks, Archives, etc.) que para el usuario normal están ocultos. Nuevo Dashboard Automatização agrupa los 4 conceptos clave (Grupos + Fluxos + Triggers + Campanhas) en una sola vista para que el admin vea cómo está armado el motor.' },
      { product: 'flow360', text: 'Bulk action "Adicionar ao grupo" en lista de contactos + Dashboard AI Configuration (Fase 15.10 + 15.11): selección múltiple en /contact/ con dropdown de acciones bulk, primer use case "agregar al grupo X" para campañas. Nuevo dashboard /ai-config/ que reúne en una sola vista el setup del Organization Agent + Personal AI Agent de cada agente, evitando saltos entre 5 pantallas para configurar IA.' },
    ],
  },
  {
    date: '2026-06-15',
    items: [
      { product: 'flow360', text: 'Importar 90 días de leads históricos de Meta a Facilitta (Fase 16.5): management command import_meta_leads_csv que procesa el export anual completo de Meta Lead Center. Helper compartido normalize_e164() en webhooks/processing.py garantiza que el formato de phone es el mismo entre el webhook live y el import batch — antes había drift sutil que causaba duplicados. HOTFIX clave (Fase 16.5.c): Contact.fields debe indexarse por UUID, no por key (lección dura — un día de debugging).' },
      { product: 'flow360', text: 'Filtros por fecha en /contact/ + CRM Kanban (Fase 16.6): primera iteración del date range picker que se consolidó después en la Fase 49. Indicador de fecha en cada card del kanban estilo Meta (hora si es hoy, día de semana si esta semana, DD-MM-YY si más viejo). Auto-paginate del fetchCards cuando el kanban tiene >500 cards (Fase 16.6.c) para evitar timeouts.' },
      { product: 'flow360', text: 'CRM ContactFields default extendidos + Webhook field_map (Fase 37.5.a + .b): seed de 3 nuevos ContactFields (source_platform, lead_source_type, para_quem) que se crean automáticamente en cada workspace. El field_map default del Webhook genérico (Fase 16.2) mapea con transformaciones para que un lead que entra por Make tenga estos 3 fields poblados sin config manual. Backfill de los 12 contacts existentes en producción.' },
      { product: 'flow360', text: 'Visual redesign Sprint A + B — Tipografía Inter + Sidebar collapse + iconos Lucide (Fase 39.2 + 39.3): cambio de tipografía global a Inter (más legible que Space Grotesk para texto denso). Sidebar collapse-on-hover-expand con animación, iconos custom de Lucide (stroke 1.5 default en temba-icon fork), brand mark "F" en cuadrado gradient en el top del sidebar. Sidebar full-height + push behavior para armonía con la topbar.' },
      { product: 'flow360', text: 'Endpoint internal /api/v2/internal/bc-trigger-flow/ (Fase 43): endpoint nuevo en Flow360 que actúa como bridge entre un webhook node de RapidPro y la API de BC para disparar un flow específico. Permite que los flows custom de Flow360 puedan trigger-ar flows de BC sin pasar por integraciones externas. Auth por token interno (no expuesto al cliente final).' },
      { product: 'flow360', text: 'Plan completo Integration Events unificados (Fase 44): doc + arquitectura + modelo IntegrationEvent + app nueva + UI base + backfill cobertura logging. Single pane of glass para auditar TODO lo que entra/sale de Flow360 — webhooks BC, webhooks Make, calls a Facilitta API, etc. Mover Integration Logs al sidebar global (sacar de Marketing) para que sea visible desde cualquier módulo.' },
    ],
  },
  {
    date: '2026-06-12',
    items: [
      { product: 'flow360', text: 'Make.com scenario completo: Facilitta Meta Leads → Flow360 (Fase 16.3 + 16.4): scenario en Make que escucha el webhook de Lead Ads de Meta para cada formulario de Facilitta, parsea el payload, mapea Full Name/Email/Phone a sub-fields del Bundle, y dispara POST al webhook genérico de Flow360. Replicado en producción para Facilitta Saude. Fixes 16.3.f/g/h: chips que no leían data del Bundle, refactor del body porque field_data raw rompía el JSON (forzaba a usar sub-fields named), sanity check de Contact creation en Flow360 (URNs + custom fields todos poblados).' },
      { product: 'flow360', text: 'Webhook genérico de Flow360 — recibe leads de cualquier fuente vía Make/Zapier (Fase 16.2): endpoint /webhooks/v1/leads/ que acepta un payload JSON genérico con campos básicos (full_name, email, phone, source_platform, etc.) y un field_map configurable para mapear campos custom del cliente a ContactFields de Flow360. Bridge agnóstico — no depende de Meta o BC específicamente. Reverse-engineering completo de los scopes/webhooks de BotConversa (Fase 16.1) documentado para futuro.' },
      { product: 'flow360', text: 'Sub-nav lateral en Configurações + Conexões + sidebar refactor (Fase 47 + 46): doble sidebar estilo Marketing para Configurações (sub-items lateral: Workspace, Users, Channels, AI, Triggers, etc.) que persisten al navegar entre las 9 páginas hijas. Nueva sección global "Conexões" en sidebar con 4 items: Integrações, API, Webhooks, API visual. Decisión revertida (47.2.d): IA y Automatização vuelven al sidebar principal — eran items demasiado prominentes para esconderlos en sub-nav. Página Integrações renderiza el catálogo de proveedores conectables.' },
      { product: 'flow360', text: 'Detalles del CRM kanban — drawer mejorado (Fase 45): suite de 3 mejoras al drawer del card. (1) Edit inline de fields directo en la Ficha do Lead sin abrir modal aparte (Fase 45.1). (2) Dropdown "Executar fluxo" agrupado por sistema (RP fluxos local + BC fluxos remoto vía API) — la conexión a BC queda en 45.2.b cuando confirmemos el endpoint (Fase 45.2). (3) Botón "Ir al chat" en header del drawer para saltar al inbox del contact con un click (Fase 45.3).' },
    ],
  },
  {
    date: '2026-06-10',
    items: [
      { product: 'flow360', text: 'Smoke E2E WhatsApp Cloud Channel — vincular Numero Test Flow360 al WABA T-zero (Fase 15.2): primera conexión productiva de un número WhatsApp Cloud a un workspace Flow360, end-to-end. Pasos: crear WABA → agregar número → verificar SMS → Cloud API register call con PIN 2FA → claim canal WAC en Flow360 (nueva org, OAuth + select WABA) → smoke test E2E template message + reply round-trip. Quitar beta_only del WhatsApp channel type — Flow360 es WhatsApp-first, no tiene sentido esconderlo detrás de un beta flag.' },
      { product: 'flow360', text: 'CSW countdown en Supervisión y vista del agente (Fase 15.4 + 15.7a): nuevo widget que muestra cuánto tiempo queda antes de cerrar la conversation service window de 24h de WhatsApp. En la tabla de supervisión de mensajes aparece como columna con color (rojo si quedan <3h). En la vista del agente aparece como chip en el header del ticket + banner cuando entra en zona crítica. Pre-emptive — el agente sabe cuándo tiene que enviar un template para mantener la window abierta.' },
      { product: 'flow360', text: 'Split column Mensaje en Recebido/Respuesta + auto-crear ticket en msg WAC inbound (Fase 15.5 + 15.6): en la supervisión de mensajes, antes la columna "Mensaje" mezclaba el último incoming y el último outgoing sin distinción. Ahora 2 columnas separadas (Recebido / Respuesta) para que el supervisor vea el flujo de la conversación en una sola fila. Auto-creación de ticket cuando llega un msg inbound WAC sin ticket abierto (celery task) — antes había que entrar manualmente al inbox.' },
      { product: 'flow360', text: 'Vincular WAC oficial a Facilitta Saude con SIM nuevo (Fase 15.2.b): segunda iteración del flow de vinculación, esta vez con un SIM físico nuevo para el cliente Facilitta. Test/staging environment confirmado funcional. Fix dropdown del avatar movido al sidebar footer (Fase 15.7c) — el logout antes era invisible cuando el menú se renderizaba muy abajo en la pantalla.' },
    ],
  },
  {
    date: '2026-06-08',
    items: [
      { product: 'flow360', text: 'Topbar global (Fase 36.2): nuevo header común a todas las pantallas con logo, workspace switcher dropdown, search bar global, notifications bell con backend real, avatar dropdown menu. Reemplaza el header stock de RapidPro que era inconsistente entre vistas. Smart redirect post-login: admins van al Cockpit, editors al primer pipeline, agentes al Inbox — bajan el time-to-first-action de 3 clicks a 0.' },
      { product: 'flow360', text: 'Idioma de la plataforma por org — sudo-configurado (Fase 38): nuevo field Org.language (es/pt-br/en-us, default pt-br) que controla qué locale Django sirve. Sudo decide al onboarding del workspace cuál idioma. Fase 38.2 inició la traducción completa de todas las pantallas — audit + glosario + setup catalogs como Bloque 0. Cockpit + Agent Home + Topbar (más visibles) ya tienen 3 idiomas. Bundles React (admin-dashboard ✅, crm-kanban en progreso) consumen el idioma via data-lang en el mount node.' },
      { product: 'flow360', text: 'Modal "+ Novo Agente" UX fixes (Fase 15.13.1 + HOTFIX 15.13.0): el modal tenía 2 bugs UX bloqueantes — autocomplete del email no funcionaba en algunos browsers, errores de validación no se mostraban al usuario (quedaban silenciosos). Fix de ambos + HOTFIX inmediato de la traducción "Password inicial" → "Senha incorreta" (fuzzy match wrong en el catalog .po). Workaround paralelo en sesión 19-jun: 1 user creado vía shell para no bloquear a la cliente Priscila mientras se debugeaba el modal.' },
      { product: 'flow360', text: 'Sidebar visual identity — Flow brand mark + iconos custom Lucide (Fase 39 setup): investigación de referencias visuales (Front, Linear, Notion), audit técnico del sidebar actual con mockup Front-style, decisión de paleta Front-style + tipografía Inter. Fase 39 abre la racha de visual redesign que se materializó después en Sprints A+B.' },
    ],
  },
  {
    date: '2026-06-05',
    items: [
      { product: 'flow360', text: 'Prep Meta App Review — limpieza data + traducciones críticas + footer/legales (Fase 38.3): batería de tareas previas a someter el app a Meta para producción. Limpieza de contactos test + channels test que ensuciaban la DB demo (38.3.1). Traducción de Inbox/Tickets/Channels/New Channel para que el reviewer no vea texto mezclado entre 2 idiomas (38.3.2). Fix traducciones erróneas Nyaruka stock (38.3.3 — algunas keys del .po stock estaban traducidas mal). Debug del compile fallido del .po del Copilot Brain (38.3.4 — caracter raro en una string custom).' },
      { product: 'flow360', text: 'Footer simplificado + página de créditos open source (Fase 38.3.6): footer reescrito con 3 columnas claras (Producto / Empresa / Legales) en vez del bloque denso anterior. Nueva página /credits/ con la lista completa de software open source que usamos (RapidPro, Mailroom, Courier, etc.) y sus licencias — requerimiento estándar para Meta review. Fix posterior (38.3.6 fix): traducción "mensajería" → "mensageria" en pt-br (estaba en es).' },
      { product: 'flow360', text: 'Privacy Policy + Data Deletion endpoint público (Fase 38.3.7 + 38.5): Privacy Policy reescrita con sección dedicada a LLM providers (OpenAI/Anthropic/Google) + créditos open source. Endpoint público /data-deletion/ que cualquier usuario de FB puede invocar para pedir borrado de sus datos (requerimiento Meta para apps con login FB). Implementación: form simple → marca el contact con request_data_deletion=True + celery task purga después de 30 días con audit trail.' },
      { product: 'flow360', text: 'Wrappear strings custom Flow360 con {% trans %} (Fase 38.4): batalla de tag wrapping en todos los templates Django custom de Flow360 — antes muchas strings hardcoded escapaban al sistema de traducción. Bloques A (Footer pt-br + Workspace config), B (Channel monitor + Canales), C (trigger types + CRM headers + Nyaruka stock missing). Compilar .mo + commit + push + deploy QA cerró el ciclo. i18n bundle React crm-kanban (Fase 38.2.6.2) replica el patrón del admin-dashboard.' },
      { product: 'flow360', text: 'Sub-fases i18n React admin-dashboard (Fase 38.2.6.a–e): crear src/i18n.ts con dict + t() helper (.a), main.tsx lee data-lang y setea lang antes del render (.b), reemplazar strings hardcoded en componentes (.c), frame.html pasa data-lang al mount node (.d), yarn build:copy + smoke en 3 idiomas (.e). Patrón replicable a los otros bundles (crm-kanban siguió, tickets-side pending).' },
    ],
  },
  {
    date: '2026-05-05',
    items: [
      { product: 'flow360', text: 'AIAgent Brain — pantalla full-page con accordion + auto-prompt (Fase 33.A): reemplazo completo del form modal de configuración de IA por una pantalla 70/30. Sidebar fijo (Lenguaje/Rol/Tono/Sub-rol dinámico con "Otro→input"), editor principal con 7 accordion blocks (Objetivo · Personalidad · Reglas · Estilo · NO hacer · Contexto · Ejemplos), preview oscuro live del prompt final por concatenación estructurada (## headers) + botón Copiar. AIAgent.build_prompt() server-side matchea exacto el formato del JS, garantizando que lo que el usuario ve es lo que llega al LLM.' },
      { product: 'flow360', text: 'Dashboard del agente — refresh visual al estilo Cockpit (Fase 32.A.e/f/g/h): 5 KPI cards con tints de color dentro de frame blanco con título "EN VIVO" + timestamp, charts con accent dot, ranking del equipo como lista custom con "Yo" resaltado, donut de resolución por categoría. Banner motivacional violeta entre header y KPIs con random pick de 12 quotes Osho/Jobs alternadas. Sidebar item "Dashboard" gateado por rol — solo agentes lo ven, admin/editor ven solo Cockpit (la analítica workspace-wide ya cubre la necesidad).' },
      { product: 'global', text: 'Stack ops — volume mounts persistentes para los forks (floweditor + temba-components) en docker-compose. Sin esto los rebuilds del container revertían los bundles al stock y se perdían features como el dropdown de AI Agents en el nodo Call LLM (Fase 7) o el light sidebar de Fase 30.1 (iconos invisibles sobre fondo blanco). La fuente de verdad del build vive en cada fork; el container los lee read-only.' },
      { product: 'flow360', text: 'Dashboard del agente "Mi desempeño" (Fase 32.A): pantalla inicial al login que reemplaza el aterrizaje crudo en /ticket/. Header con nombre + team, 3 KPIs en tiempo real (tickets atendidos hoy, tiempo de respuesta promedio formateado, tickets activos), 2 mini-charts de los últimos 7 días con Chart.js (bar de tickets/día + line de tiempo respuesta con tooltips). Botón prominente "Ir al Inbox" para arrancar el día de un click. Backend en temba.dashboard.agent_helpers usa Ticket.replied_on + Avg() en SQL evitando N+1. URL /me/dashboard/. OrgRole.AGENT.start_view apunta acá automáticamente.' },
      { product: 'flow360', text: 'Perfil operativo por team (Fase 32.0): campo Team.profile (general/sales/support, default=general) que define qué variante del dashboard verán los miembros del equipo. Pre-configurado por el admin al crear/editar el team — los agentes lo heredan, mismo patrón que crm_pipeline (Fase 29). Más profiles se agregan sin breaking change. UI uniforme en Fase 32.A pero el campo viaja en el payload listo para que 32.B/C ramifiquen KPIs por rol comercial.' },
      { product: 'flow360', text: 'Sidebar comercial de tickets (Fase 31): reorganización completa del orden y nomenclatura para que coincida con el flujo mental del agente. Inbox (todos los abiertos) → Mis tickets → En cola → Finalizados → Sin asignar (admin only). Dos folders nuevos: QueueFolder atrapa los tickets sin respuesta humana todavía (incluye los que la IA está atendiendo + los que esperan primer contacto, vía ~Exists() de Msg outgoing con created_by != NULL y is_ai=False); ClosedFolder da acceso explícito al histórico que stock solo daba mezclado. Default folder /ticket/ pasa de Mine a All. Agentes saltan directo al kanban de su pipeline al clickear CRM (Fase 29 garantiza uno por team), eliminando el listado intermedio.' },
      { product: 'flow360', text: 'CRM Fields — schema extensible por pipeline (Fase 25): cada pipeline define sus propios campos custom (CardField + CardFieldValue) en 6 tipos (Text, Choice, Date, Phone, Email, Stage). Editor desde Settings con validación de opciones por tipo, panel lateral del card con inputs type-aware, y flag show_on_board que pinta chips compactos sobre el preview de la card en el board. Empty-state de /crm/ deja al admin crear el primer pipeline inline.' },
      { product: 'flow360', text: 'Convertir ticket → card de CRM (Fase 26): botón "Convertir → CRM" en el panel lateral del ticket crea una card en el pipeline asignado al team del agente con el contacto ya cargado. El ticket no se modifica — la card vive como entidad independiente con sus fields editables inline. Endpoint POST /api/v2/tickets/{uuid}/convert.json devuelve 409 con mensaje claro cuando el agente no tiene team o el team no tiene pipeline.' },
      { product: 'flow360', text: 'Pill del stage de CRM en el inbox (Fase 27): debajo del último mensaje aparece un pill con stage_color sólido + texto blanco con el stage del card más reciente del contacto en cualquier pipeline. Backend usa PostgreSQL DISTINCT ON para resolver "card más reciente por contacto" en una sola query bulk. Reemplaza visualmente al pill de Atendimento (que pasa a ser editable solo desde el panel lateral). Foco visual del row queda en el momento del lead.' },
      { product: 'flow360', text: 'Avatar silhouette en lista de tickets (Fase 28): las iniciales con color hash se reemplazan por una silueta vector estilo Material Design (28px, gris suave, circular). Augmenter del DOM corre tanto sobre temba-user + temba-date como sobre el scan directo de filas, así no se ve afectado por cambios futuros de markup del fork.' },
      { product: 'flow360', text: 'Acceso al CRM gated por team (Fase 29): cada Team tiene un FK opcional a Pipeline (Team.crm_pipeline). Los agentes ven SOLO el pipeline de su team — los admins/editors ven todos. Hard restriction (sin caída a "todos los pipelines"): agente sin team o team sin pipeline → no ve el CRM. Convención: cada team gestiona sus leads en su propio pipeline; el mismo contacto puede tener cards en múltiples pipelines (uno por team).' },
      { product: 'flow360', text: 'Identidad visual mínima — Flow360 brand + sidebar blanco (Fase 30.1): label "Flow360" con tipografía Space Grotesk pinned al top del sidebar, sidebar repintado de azul → blanco con iconos oscuros (level-0 +30% más grandes), submenu items seleccionados con pill azul + texto blanco para contraste sobre fondo claro. Variables CSS expuestas en el fork temba-components (--menu-icon-color, --menu-submenu-selected-bg) para que la repintura no dependa de inversiones globales del primary.' },
      { product: 'flow360', text: 'Bug fixes admin: link "Agentes" del menú Settings funcionando (regex de URL [a-z]+ no aceptaba underscore — widened a [a-z_]+); CRM aparece para nuevos workspaces creados desde sudo (provision_org ahora setea FEATURE_USERS + FEATURE_TEAMS por default); Telegram bot pericoltda_bot recuperó incoming messages tras corregir callback_domain (apuntaba al production app.rapidpro.io en lugar del ngrok dev).' },
    ],
  },
  {
    date: '2026-05-04',
    items: [
      { product: 'flow360', text: 'Pill de Atendimento en cada fila del inbox (Fase 23): el valor de Atendimento (Interesado/En seguimiento/Compra cerrada/Sin respuesta/No interesado) aparece como un pill de color suave debajo del último mensaje. El agente identifica de un vistazo qué tipo de conversación es. Single-value-per-contact garantiza 1 pill por fila o ninguno. Backend bulk-fetch + parche al TicketList.ts del fork. Tests cubren ambos casos (con valor / sin valor). [SUPERSEDED por Fase 27.3 — el pill se removió del row para dejar el foco en el stage del CRM; la categoría sigue editable desde el panel lateral.]' },
      { product: 'flow360', text: 'Composer del ticket reply mejorado (Fase 22): botón circular de send a la derecha del textarea (coexiste con Enter, disabled cuando vacío) y emoji picker pro con search multilingüe, 10 categorías, skin-tones y recientes — built sobre emoji-picker-element (web component native, ~14KB). UI esperada por agentes que vienen de WhatsApp Web o Slack.' },
      { product: 'flow360', text: 'Decisión de librería de emoji: aterrizamos en emoji-picker-element tras descartar 4 alternativas — custom de 64 emojis (muy pobre), custom de 350 emojis (sin search ni categorías), emoji-mart npm (su sintaxis Parcel-only de import de CSS rota con rollup), emoji-mart desde CDN (bloqueado por el CSP de RapidPro). Lección registrada en PATCHES.md del fork temba-components.' },
    ],
  },
  {
    date: '2026-05-03',
    items: [
      { product: 'flow360', text: 'Inbox del agente (Fase 20): rediseño completo del listado de tickets para que sea por CONTACTO en vez de por ticket. Una fila por persona (Rodrigo con 4 tickets cerrados ahora aparece como 1 fila con el más reciente, no 4). Bold del nombre cuando hay un mensaje incoming sin leer; auto mark-as-read al seleccionar la fila vía POST /ticket/mark_read/<uuid>/. is_unread compara contra el último mensaje INCOMING del contacto, no contra last_activity_on — la respuesta del agente o del AI ya no flippea el badge a unread (bug que tenía la primera iteración).' },
      { product: 'flow360', text: 'Filtros componibles arriba del inbox: search bar (debounced 300ms, busca por nombre/teléfono), dropdown jerárquico de categorías (usa el modelo de Fase 9: Atendimento › Interesado/Finalizada/etc., + categorías custom del cliente), pill toggle "Unread". Los 3 filtros componen entre sí y se preservan al paginar (stock RapidPro los dropeaba en el link next).' },
      { product: 'flow360', text: 'Modelo TicketRead(ticket, user, last_read_at) con UniqueConstraint per-user. Two agents looking at the same inbox see independent unread badges. Migration 0088_ticketread + 13 tests cubriendo aislamiento, idempotencia, regression del bug "outgoing flippea a unread", deep-link substitution.' },
      { product: 'flow360', text: 'Bug fix encontrado por debugging UX: el auto-refresh del fork temba-components (cada ~15s) construía URLs malformadas con doble ? cuando el endpoint base ya tenía query string. Síntoma: hard-reload mostraba el inbox bien deduped, después de 15s "volvían los duplicados". Patch del fork detecta ? existente y usa & como separador.' },
    ],
  },
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

// =============================================================================
//  Playbooks
// =============================================================================
//
// Technical reference docs living in the rapidpro8 repo under `docs/`. The Hub
// holds only the index — clicking through opens the .md on GitHub (which
// renders it natively). Each entry describes what the doc covers so people
// know if it's worth opening, without duplicating content into this file.
//
// When adding a new doc:
//   1. Create the .md in rapidpro8/docs/ following the NN-CATEGORIA-TITULO
//      naming convention (see 43-CANAL-WAC-CHECKLIST-COMPLETO.md for template).
//   2. Add a PlaybookEntry here with matching filename + githubUrl.
//   3. Pick the right category — filters in PlaybooksView group by it.
// =============================================================================

export const playbooks: PlaybookEntry[] = [
  {
    id: 'copiloto-ia-vendedor',
    title: 'Copiloto — IA Aliada del Vendedor',
    category: 'architecture',
    product: 'flow360',
    description: 'Descripción completa del diferencial estratégico de Flow360: además del Organization Agent (chatbot por operación con criterio empresa), cada vendedor tiene su Copiloto — asistente IA personal que aprende su estilo y construye memoria persistente por cliente. Continúa la venta 24/7 cuando el vendedor no puede. Incluye executive summary, comparativa vs competencia (BotConversa, Twilio, RD Station), checklist funcional completo, casos de uso concretos, roadmap por Fases A-D, guardrails de privacy, y FAQ para vendedores + admins.',
    lastUpdated: '2026-07-01',
    status: 'stable',
    filename: '44-COPILOTO-IA-ALIADA-DEL-VENDEDOR.md',
    githubUrl: 'https://dev.azure.com/tztbr/flow360/_git/flow360?path=/docs/44-COPILOTO-IA-ALIADA-DEL-VENDEDOR.md',
    keyTakeaways: [
      'Organization Agent (uno por operación, criterio empresa) + Copiloto (uno por vendedor, estilo personal) conviven — no compiten',
      'Copiloto aprende del vendedor: tono, vocabulario, emojis, argumentos, frases marca registrada, horario típico',
      'Copiloto tiene memoria persistente por cliente: historial completo, preferencias, objeciones, momento del funnel, contexto personal',
      'Interviene fuera de horario / con lag / en licencia. Cede al humano ante emoción fuerte, pedido explícito, o intención de compra alta',
      'Moat competitivo real: ni BotConversa ni Twilio ni RD Station tienen personalización por vendedor + persistencia por cliente',
      'Roadmap Fase A-D: consolidación → aprendizaje adaptativo → coordinación inteligente → multimodalidad (voz clonada)',
    ],
  },
  {
    id: 'wac-onboarding-checklist',
    title: 'WhatsApp Cloud API — Checklist Completo de Onboarding',
    category: 'onboarding',
    product: 'flow360',
    description: 'Referencia end-to-end para vincular un canal WhatsApp Cloud API de un cliente nuevo: setup Meta (WABA, phone, display name, App Review, partnership), setup técnico Flow360 (env vars, courier), features de mensajería (13 tipos), compliance (CSW, opt-in, quality rating, tiers) y smoke test E2E de validación. Post-mortem incluido de la Fase 15.2.c que sacó a la luz la deuda técnica en courier.',
    lastUpdated: '2026-07-01',
    status: 'stable',
    filename: '43-CANAL-WAC-CHECKLIST-COMPLETO.md',
    githubUrl: 'https://dev.azure.com/tztbr/flow360/_git/flow360?path=/docs/43-CANAL-WAC-CHECKLIST-COMPLETO.md',
    keyTakeaways: [
      'Onboarding real: ~1h de trabajo activo + 24-48h wait para Meta business verification + display name approval',
      'El cliente trae su propia WABA en su propio Business Manager, Flow360 la consume como partner técnico',
      '13 tipos de mensajes soportados: texto, media (image/video/audio/voice/doc/sticker), location, interactive (buttons/list/CTA), templates, reactions, catalog, WhatsApp Flows',
      'CSW 24h: fuera de esa ventana solo templates aprobados de Meta pueden enviarse',
      'Tabla de 15 error codes de Meta + fixes conocidos + smoke test E2E de 8 pasos para validar cada canal nuevo antes de handoff',
    ],
  },
];

/**
 * Releases desplegados a producción, del más reciente al más antiguo.
 *
 * Al agregar una entrada nueva: va ARRIBA del array, y el contenido tiene que
 * coincidir con `rapidpro8/docs/RELEASE-NOTES.md`, que es la fuente de verdad
 * (vive junto al código y se versiona con él).
 */
export const releases: Release[] = [
  {
    version: 'v1.0.1',
    date: '2026-07-22',
    kind: 'patch',
    product: 'flow360',
    sections: [
      {
        label: 'Correcciones',
        items: [
          'Los canales archivados ya no aparecen mezclados con los activos en la pantalla de Canais. Al "borrar" un canal, RapidPro no lo elimina —lo deja inactivo, porque los mensajes históricos lo referencian— y todos quedaban visibles. Con 8 archivados y 1 activo, el que importaba se perdía. Ahora se ocultan por defecto tras un chip "N archivado(s) — ver" para consultarlos cuando haga falta auditar.',
          'Cubierto el caso de tener todos los canales archivados: antes desaparecía el chip junto con la lista y no quedaba forma de volver a verlos.',
        ],
      },
    ],
  },
  {
    version: 'v1.0.0',
    date: '2026-07-22',
    kind: 'major',
    product: 'flow360',
    headline: 'Primera versión en producción — MVP en flow360ai.com.br',
    sections: [
      {
        label: 'Atención con IA',
        items: [
          'Agentes con anclaje (grounding): responden únicamente con información verificada de la base de conocimiento. Si el dato no está, lo admiten y transfieren a una persona en vez de inventar. Elimina la causa nº1 de incidentes en atención con IA: precios, plazos y coberturas inventados.',
          'Base de conocimiento con RAG sobre pgvector: se cargan fuentes (políticas, catálogo, FAQ), se indexan, y en cada conversación el agente recupera sólo los fragmentos relevantes y responde citando la fuente. Actualizable al instante, sin reentrenar.',
          'Búsqueda híbrida (semántica + léxica) fusionada con RRF: encuentra tanto por significado ("¿es caro?") como por término exacto ("Familiar Master", "carência").',
          'Escalado a humano configurable, con criterios y palabras clave editables desde la UI.',
          'Guardrails de seguridad: el texto del cliente se trata como dato, no como orden (anti prompt-injection); el agente no revela su prompt ni repite datos personales.',
          'Medición de consumo: cada respuesta registra tokens, costo en USD y latencia, separado por origen. Habilita responder cuánto cuesta atender y comparar modelos con datos reales.',
          'Caché de prompt activada: en QA el costo por turno bajó de US$0.0003 a US$0.0001 y la latencia de 3.7s a 1.7s.',
        ],
      },
      {
        label: 'Plataforma',
        items: [
          'CRM, inbox de atención, ruteo de conversaciones, pipeline, etiquetas.',
          'Canales: WhatsApp Cloud, Telegram, Instagram, Facebook, e-mail y webchat.',
          'Diálogos guardados y recuperables por contacto, con transcripción congelada y métricas.',
        ],
      },
      {
        label: 'Operación',
        items: [
          'Dominio propio con HTTPS en flow360ai.com.br.',
          'Base de datos independiente de QA — los entornos no se pisan.',
          'Backups automáticos diarios con retención de 7 días, más respaldo manual previo a cada despliegue.',
        ],
      },
    ],
  },
];
