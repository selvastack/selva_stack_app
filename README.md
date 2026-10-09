# Selva Stack Landing

Landing de Selva Stack (selvastack.org.pe): Next.js, TypeScript, Tailwind CSS v4, next-intl, Framer Motion y Zod.

## Comandos

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
```

## Variables de entorno

Copia `.env.example` a `.env.local`:

```env
RESEND_API_KEY=          # server-only
CONTACT_FROM_EMAIL=      # remitente verificado en Resend
CONTACT_TO_EMAIL=hola@selvastack.org.pe
```

## Idiomas y contenido

- next-intl con rutas `/es` (por defecto), `/en` y `/pt`.
- Todos los textos están en `messages/*.json`.
- Las secciones están en `src/components/sections/`.
- Detalle completo de los cambios en [`docs/CAMBIOS-LANDING-V4.md`](docs/CAMBIOS-LANDING-V4.md).

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
