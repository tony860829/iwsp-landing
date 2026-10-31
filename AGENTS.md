# IWS+ Landing — Contexto del proyecto

Landing page pública de IWS+ (InfoWebSolutionsPlus) en **Angular 20** (standalone, SSR/prerender, zoneless, SCSS puro sin frameworks CSS). Reemplaza la landing que antes convivía en el proyecto `iwspApp` (Angular 15, app de gestión, NO tocar: la app de gestión vive en `admin.iwsp.com`).

## Dominio y despliegue
- Landing: `https://iwsplus.com/` (dominio raíz)
- App de gestión existente: `admin.iwsp.com` → proyecto hermano **`../iwspApp2`** (Angular 19, tiene su propio `AGENTS.md`). `../iwspApp` es la app vieja Angular 15, LEGACY, NO tocar.
- Backend API (compartido con la app de gestión): configurado en `src/environments/environment.ts` (`apiUrl: https://serveriwsp.online/api/` + `apiKey`). Proyecto hermano **`../iwspApi`** (.NET 6, tiene su propio `AGENTS.md`). Ojo: el `apiKey` es en realidad el `Company.Token` de la DB, no un apiKey global.

## Ecosistema
- `iwspApi` (backend, .NET 6) ⟵ consumido por esta landing y por `iwspApp2`.
- `iwspApp2` (admin, Angular 19) ⟵ donde llegan los leads que envía esta landing vía `POST Check`.

## Decisiones tomadas
- **5 páginas**: Home (`/`), Services (`/services`), Pricing (`/pricing`), Contact (`/contact`) y **Blog** (`/blog` + `/blog/:title`) — el blog se agregó de vuelta (la decisión inicial de "sin blog" se revirtió): lista los posts de la empresa IWS+ (vía `apiKey` de environment = su `Company.Token`) y el detalle muestra el post, sus comentarios y el formulario para comentar.
- Blog: `/blog` es **prerendered** (catch-all) pero `/blog/:title` es **`RenderMode.Server`** (declarado en `app.routes.server.ts` ANTES del catch-all — una ruta parametrizada no puede prerender sin `getPrerenderParams`, que congelaría los títulos en el build). El detalle matchea `Check/blog/{title}` con el título **exacto** (case-sensitive, `encodeURIComponent`; el back devuelve BadRequest `{message, type:2}` si no existe — la página lo muestra como estado de error, y el interceptor global también toastea).
- Datos del blog: `core/services/blog-api.ts` (`getPosts` → `GET Check/blog?token=`, `getPostByTitle`, `getComments` → `GET Check/comments?token=&postId=`, `sendComment` → `POST Check/blog?token=` con `{firstName, lastName, email, content, postsId}` — el back setea `createdDate` server-side y valida el post contra el token). **Imágenes de posts**: `${apiUrl}Upload/getPhoto/{picture}` (el `Uploads/` del back está fuera de wwwroot; ese endpoint es la única ruta pública). Nombres de categoría para los badges vía `GET api/Categories` (público). Models: `IPost` (con el casing real del payload: `companyID`, `categoryID`, `createdDate`, `cantView`), `IComment`, `CommentPayload`, `CheckResponse` en `api.models.ts`.
- Formulario de comentarios: firstName, lastName, email, content (**phone fuera**, decisión; es opcional en el DTO del back). Patrón del form de Contact (`.field` duplicado en `post.scss`, no en el design system). Errores los toastea el interceptor global (no duplicar); el éxito con `Toast.success` usando el `message` del API.
- Fechas con `Intl.DateTimeFormat` según `lang.activeLang()` (no hay DatePipe en el proyecto y `LOCALE_ID` nunca se cambia). Contenido Quill del post con `[innerHTML]` (sanitizer por defecto de Angular, mismo enfoque que la app vieja).
- `Seo.update` ahora también actualiza el `<link rel="canonical">` de `index.html` (hacía falta para `/blog/:title`); el título del detalle es dinámico (`{post.title} | IWS+`), aplicado tras cargar el post.
- Verificación de email de usuarios se hace en el panel (`admin.iwsp.com/verify/:token`, proyecto iwspApp2), NO aquí. Si una landing/ecommerce de un cliente pide verificación propia, se creará un componente en ese proyecto.
- Idioma del contenido: **inglés** (mockup de diseño en inglés, paleta navy `#191A36` + naranja `#FF5C1A`, tipografía Poppins).
- Services y Pricing consumen datos del backend en tiempo real (no contenido estático).
- En Pricing se muestran **todos** los paquetes sin filtrar por `isActive` (la app vieja filtraba en frontend causando "Aún no hay planes").
- En Services se **deduplican** por nombre (la API devuelve duplicados, ej. "Web Development" doble).
- Botón de compra de un plan → navega a `/contact` (no hay checkout en la landing).
- Contact envía leads vía `POST {apiUrl}Check?token={apiKey}` (mismo endpoint del proyecto viejo).
- El usuario NO quiere que se ejecute `ng build`/`ng serve` desde el agente salvo que lo pida (él lo prueba; hay binarios esbuild de Windows y el entorno shell es WSL).
- Solo verificación de tipos con: `npx tsc -p tsconfig.app.json --noEmit`.
- **Multiidioma con Transloco** (`@jsverse/transloco` v8): inglés por defecto, español opcional. Selector EN|ES en el header. Persiste en `localStorage` (`iws-lang`), fallback al idioma del navegador. Traducciones en `public/i18n/en.json` y `es.json` (namespaces: header, footer, home.*, services, pricing, contact, errors, seo). Loader HTTP: `core/services/transloco-loader.ts`; servicio de idioma: `core/services/lang.ts` (también actualiza `<html lang>` y registra locale `es`). SEO por página es reactivo al cambio de idioma (`selectTranslate` + `takeUntilDestroyed` en cada página). Datos del API (nombres/descr. de servicios y planes) NO se traducen. Mensajes de error que vienen del API se muestran tal cual (solo el genérico se traduce).
- Logo: `public/images/logo-orange.png` (recolor #FF5C1A del original negro `logo.png`, hecho con script Node) usado en header y footer sobre fondo navy.
- UX async global: interceptor de loading (spinner overlay full-screen) + interceptor de errores (toast) + servicio de toasts. El éxito de Contact también se muestra con toast.
- **⚠️ NG0600 en zoneless**: Transloco carga los JSONs de idioma vía HTTP *durante el render del template*. Por eso: (1) el loading interceptor omite requests a `/i18n/` y todo en servidor (SSR), y difiere escrituras a signals con `queueMicrotask`; (2) el servicio Toast también difiere escrituras con `queueMicrotask`. NUNCA escribir un signal directamente en un interceptor o en callbacks de observables disparados desde templates.
- Redes sociales reales en footer: Facebook (`facebook.com/profile.php?id=61552316190893`), Instagram (`@infowebsolutionsplus`), TikTok (genérico, falta el perfil real). LinkedIn/X eliminados.
- Header selector de idioma: cuidado, los `<button>` no heredan `font`/`color`; estilos propios en `header.scss` (NO meterlos dentro del bloque `@media`).

## Estructura
```
src/app/
  core/
    header|footer/            # layout (navbar navy + logo, footer navy; nav con Blog)
    spinner/  toast/          # componentes globales montados en app.html
    interceptors/
      loading.interceptor.ts  # envuelve requests con Loading (contador concurrente)
      error.interceptor.ts    # toast de error (mensaje API o genérico) y re-lanza
    models/api.models.ts      # IService, IPackage, ContactPayload, ContactResponse,
                              # IPost, IComment, ICategory, CommentPayload, CheckResponse
    services/
      services-api.ts         # GET {apiUrl}Services
      packages-api.ts         # GET {apiUrl}Packages
      contact-api.ts          # POST {apiUrl}Check?token=
      blog-api.ts             # GET Check/blog[/{title}]?token=, GET Check/comments,
                              # POST Check/blog (comentario), GET Categories
      seo.ts                  # meta tags por página (title, description, OG, Twitter,
                              # canonical) — reactivo al cambio de idioma
      loading.ts              # signal con contador de requests activas
      toast.ts                # toasts success/error con auto-dismiss 5s
  pages/
    home/                     # secciones: hero, stats, tailored, solutions, audience, process, team, cta
    services/  pricing/  contact/
    blog/                     # blog.html/blog.ts (lista con tarjetas) y
                              # post.html/post.ts (detalle + comentarios + form);
                              # /blog prerendered, /blog/:title RenderMode.Server
src/environments/             # environment.ts + environment.development.ts
public/images/                # hero.webp, design.webp, development.webp, marketing.webp (IA), logo.png, logo-orange.png
public/i18n/en.json, es.json # traducciones Transloco
public/sitemap.xml, public/robots.txt
```

## Estado actual (hecho)
- Sistema de diseño en `src/styles.scss` (variables CSS, `.container`, `.section`, `.section--dark/--light`, botones).
- Home completo con 8 secciones según el mockup provisto por el usuario.
- Services/Pricing/Contact conectados al backend con estados loading/error/empty.
- **Blog** (`/blog` + `/blog/:title`): lista con tarjetas (imagen, badge de categoría, fecha, excerpt), detalle con contenido Quill, comentarios y formulario; i18n EN/ES (`blog.*`, `header.blog`, `seo.blog`), fechas localizadas con Intl, SEO reactivo (detalle con título dinámico) y canonical por página.
- SEO completo + prerender (`app.routes.server.ts` → `RenderMode.Prerender` para `**`, `RenderMode.Server` para `blog/:title`) + sitemap (+`/blog`) + robots.
- Todos los textos en inglés (el blog hereda traducciones EN/ES del resto); logo naranja real en header/footer.
- Spinner global + toasts (éxito/error) vía interceptores registrados en `app.config.ts`.
- i18n EN/ES completo (Transloco), selector en header, SEO reactivo al idioma, persistencia en localStorage.
- Redes sociales reales en el footer.

## Pendiente
- Posibles ajustes visuales que pida el usuario tras probar.
- Contenido legal (Terms/Privacy/Cookies del footer, links aún `#`).
