# Rediseño de la landing Selva Stack (v4): documentación y cambios

Rama: `ccr-9133533c-jkp5vr`. Fuente de verdad: documento maestro v4 y el prompt de rediseño. Donde se contradecían, mandó el prompt.

## 1. Resumen

Se reconstruyó la landing con estética **"Amazonía futurista"** (fondo oscuro, verdes como luz y dorado solo para lo más importante) y con soporte **multi-idioma ES / EN / PT** usando next-intl. La página tiene dos objetivos:

- **Captar clientes:** 8 servicios, todos con "Cotiza" por WhatsApp.
- **Atraer aliados y donantes:** sin montos, sin datos bancarios y sin mención a beneficio tributario.

Todos los textos salen de `messages/{es,en,pt}.json`, que son los archivos entregados, sin cambios.

## 2. Reglas obligatorias: cómo se cumplieron

| Regla | Implementación |
|---|---|
| No mencionar al IIAP | No aparece en ningún texto, metadato ni asset (verificado con `grep`). |
| Aliados visibles: solo UNAP, SENATI, Impacto Bicentenario y WCS | `sections/Allies.tsx`. Mientras no lleguen los logos, cada aliado se muestra con su nombre como placeholder. |
| Sin montos, datos bancarios ni pasarela | Se eliminaron `DonationModal`, `DonationSection`, `donationAmounts.json` y `/api/donation-interest`. |
| Sin precios | Todos los servicios usan "Cotiza". |
| CTAs a WhatsApp | `wa.me/51940901752?text=` con `encodeURIComponent` y el mensaje `whatsapp.*` del idioma activo. En productos se reemplaza `{product}` (`lib/site.ts`, `ui/WaButton.tsx`). |
| Correos | `hola@` (general); `voluntariado@` con `join.emailSubject` como asunto. |
| Redes | Se leen de `social.items`. TikTok es `@selva.stack`. |
| EcoAlerta | "Ver reportes" abre `https://ecoalerta.selvastack.org.pe/reportes` en una pestaña nueva. |
| Testimonios | La sección se oculta mientras `testimonials.items` esté vacío. |
| Cifras reales | `stats.items`: +900, +20, 4, 2. El HTML ya trae el número final; la animación solo corre al entrar en pantalla. |

## 3. Estructura de la página (en orden)

Navbar → Hero → Cifras → Por qué existimos → Nuestro modelo → Servicios → EcoAlerta → Productos → Programas → Para empresas → Apoya → Únete → Testimonios (oculta) → Aliados → Transparencia → FAQ → Contacto → Footer. Además, botón flotante de WhatsApp en toda la página.

## 4. Archivos

**Nuevos**
- `messages/es.json`, `en.json`, `pt.json`: traducciones entregadas.
- `src/i18n/routing.ts`, `request.ts`, `navigation.ts` y `src/proxy.ts`: detección del idioma del navegador, rutas `/es` `/en` `/pt` y cookie `NEXT_LOCALE` (1 año) para recordar la elección.
- `src/app/[locale]/layout.tsx`: fuentes con next/font (Saira Stencil One + Inter), metadatos traducidos, `hreflang`/`alternates`, JSON-LD `NGO` y Vercel Analytics.
- `src/app/[locale]/page.tsx`: composición de las secciones.
- `src/app/[locale]/opengraph-image.tsx`: imagen OG de 1200×630 por idioma, con Otto y el titular.
- `src/components/sections/*`: un componente por sección.
- `src/components/ui/*`: Reveal, TiltCard, Counter, WaButton, LeafCircuit, HeroParticles, RiverScroll, PhoneHeatmap, LanguageSwitcher, BrandMark, SocialIcon y FloatingWhatsApp.
- `src/lib/site.ts`, `types.ts`, `contact-schema.ts`.
- `public/brand/*`, `public/mascots/*` y `public/allies/` (vacía).

**Modificados**
- `globals.css`: tokens de la paleta en `@theme`, animaciones y estilos de botones, tarjetas y formulario.
- `next.config.ts`: plugin de next-intl.
- `api/contact/route.ts`: ahora envía con Resend.
- `sitemap.ts` y `robots.ts`: incluyen los 3 idiomas.
- `.env.example`, `package.json` y README.

**Eliminados**
- El layout y la página antiguos.
- `src/data/*.json`, `src/lib/*` (repositorios) y los componentes viejos (incluidos los de donación).
- El PNG del logo de 900 KB.

**Dependencias**
- Se agregaron `next-intl` y `@vercel/analytics`.
- Se quitaron `react-hook-form` y `@hookform/resolvers`, porque la validación del formulario ahora es nativa.

## 5. Assets procesados

A partir de los PNG entregados (con fondo transparente) se generaron:

- Logo vertical en color y en blanco (para el footer).
- Hoja del logo en color y en blanco: el navbar usa la hoja + el wordmark en tipografía stencil como logo horizontal.
- Logo vertical de EcoAlerta.
- Otto y Coconita en WebP: Otto pasó de 2 MB a 177 KB y Coconita de 1,3 MB a 58 KB.
- Favicon `src/app/icon.png`.

## 6. Animaciones

1. Los circuitos de la hoja se encienden al cargar (SVG + CSS `stroke-dashoffset`). La hoja del navbar tiene además un brillo suave.
2. Canvas con símbolos de código que se transforman en hojas: solo en escritorio (≥1024 px) y se pausa cuando sale de pantalla.
3. Otto flota y saluda de forma sutil (CSS).
4. Contadores que suben al entrar en pantalla (Framer Motion).
5. Las secciones aparecen con fade y deslizamiento.
6. Las tarjetas de servicios y productos se inclinan en 3D con borde verde neón al pasar el mouse (solo con mouse).
7. Celular flotante con el mapa de calor de EcoAlerta "latiendo".
8. Línea de río que se dibuja con el scroll: solo en pantallas ≥1280 px.
9. Brillo verde en los botones al pasar el cursor.

Todas se desactivan con `prefers-reduced-motion`.

## 7. SEO y accesibilidad

**SEO**
- `canonical` y `og:url` apuntan a `https://selvastack.org.pe/{locale}`, con `x-default` en `/es`.
- Sitemap con los 3 idiomas y alternates.
- Robots bloquea `/api/`.

**Accesibilidad**
- Foco visible en dorado.
- Menú móvil con `aria-expanded` y cierre con Esc.
- FAQ con `<details>`/`<summary>`.
- `aria-label` en los botones de redes y WhatsApp.
- Campos del formulario con `label`, `aria-invalid` y `aria-describedby`.

## 8. Formulario de contacto

- Validación en el cliente con los textos del JSON.
- Envío por `POST /api/contact`: Zod en el servidor, honeypot anti-spam y envío con la API REST de Resend. La clave solo vive en el servidor.
- Si falla, se muestra `contact.error` con un botón a WhatsApp. Si el envío sale bien, aparece Coconita con `contact.success`.

## 9. Analítica

Evento `whatsapp_click` con `type` = `project` | `support` | `ally` | `product` | `general` | `floating`. En productos se agrega `product` = id.

## 10. Pendientes

- [ ] **Logos de aliados** (UNAP, SENATI, Impacto Bicentenario, WCS) con permiso de uso. Guardarlos en `public/allies/*.webp` y registrarlos en `LOGO_FILES` (`sections/Allies.tsx`).
- [ ] **Banners oficiales:** no llegaron adjuntos. Tampoco llegaron logos horizontales; se armó uno con la hoja + el wordmark.
- [ ] **Variables de entorno en Vercel:** `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (dominio verificado en Resend) y `CONTACT_TO_EMAIL` (opcional). Mientras no estén, el formulario responde 503 y muestra el mensaje de error con el enlace a WhatsApp.
- [ ] **Activar Vercel Analytics** en el proyecto de Vercel.
- [ ] **Política de privacidad:** no hay textos en los JSON. Por ahora el enlace del footer abre un correo a hola@. Falta redactar la página.
- [ ] Testimonios reales con consentimiento (Parte E del v4).
- [ ] Revisión de las traducciones EN/PT por un hablante nativo.
- [ ] Apuntar el dominio `selvastack.org.pe` al proyecto de Vercel.

## 11. Cómo probar localmente

```bash
npm install
npm run dev          # http://localhost:3000 → redirige a /es, /en o /pt según el navegador
npm run typecheck && npm run lint && npm run build
```

Verificado: typecheck, lint y build sin errores; páginas `/es`, `/en` y `/pt` estáticas; redirección por `Accept-Language`; sin scroll horizontal en 390 px ni en 1440 px; imagen OG generada. El único error en consola fue un 404 de `/_vercel/insights/script.js`, que es normal fuera de Vercel.
