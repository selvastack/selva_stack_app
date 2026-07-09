# Selva Stack Landing

Landing page profesional para Selva Stack, construida con Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Lucide React, React Hook Form y Zod.

## Comandos

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
```

## Variables de entorno

Copia `.env.example` a `.env.local` para desarrollo:

```env
NEXT_PUBLIC_DONATION_LINK=
NEXT_PUBLIC_WHATSAPP_LINK=https://wa.me/51940901752
NEXT_PUBLIC_CONTACT_EMAIL=hola@selvastack.org
NEXT_PUBLIC_SITE_URL=https://selva-stack.vercel.app
```

Si `NEXT_PUBLIC_DONATION_LINK` existe, los CTAs de donación abren ese enlace. Si está vacío, se abre el modal interno de intención de donación.

## Canales de contacto

Los canales viven en `src/data/contactChannels.json` para que puedan migrarse a SQL más adelante:

- Donaciones: `donaciones@selvastack.org`
- Contacto general: `hola@selvastack.org`
- Alianzas: `alianzas@selvastack.org`
- WhatsApp: `940901752` (`https://wa.me/51940901752`)

## Datos locales listos para migrar

El contenido editable vive en `src/data/*.json`. Cada colección usa campos compatibles con una futura migración SQL:

- `id`
- `slug`
- `sortOrder`
- `isActive`
- `createdAt`
- `updatedAt`

La UI no lee los JSON directamente. Todo pasa por `src/lib/repositories.ts`, así que una migración futura puede reemplazar `JsonLandingContentRepository` por Prisma, Drizzle, Supabase, Neon, Turso u otra capa SQL sin reescribir componentes.

Tablas sugeridas para SQL:

- `programs`
- `projects`
- `impact_metrics`
- `donation_amounts`
- `faqs`
- `testimonials`
- `allies`
- `transparency_items`
- `contact_messages`
- `donation_leads`
- `contact_channels`

## Formularios

Los formularios se validan con Zod y React Hook Form. Los endpoints actuales:

- `POST /api/contact`
- `POST /api/donation-interest`

Hoy devuelven un recibo local mediante `DeferredLeadRepository`. Para producción con persistencia, reemplaza esa implementación por una conexión a SQL, CRM o correo transaccional.

## Despliegue en Vercel

1. Sube el repo a GitHub.
2. Usa la rama `production` como rama de producción.
3. Importa el proyecto desde Vercel.
4. Framework: Next.js.
5. Build command: `npm run build`.
6. Output: automático.
7. Configura las variables de entorno anteriores.
8. Publica en el plan Hobby gratuito.

## Estrategia de ramas

- `development`: trabajo diario y nuevas funcionalidades.
- `staging`: QA, revisión visual y pruebas antes de producción.
- `production`: rama estable para despliegue en Vercel.

Flujo recomendado:

```bash
git checkout staging
git merge development
git checkout production
git merge staging
git push origin development staging production
```

## Verificación realizada

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- Revisión visual desktop y mobile en navegador local.
- Prueba de menú móvil, modal de donación y endpoints locales.
- `npm audit` quedó en 0 vulnerabilidades usando override seguro de PostCSS.
