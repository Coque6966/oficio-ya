# OficioYa - Marketplace de Servicios para el Hogar

OficioYa es una plataforma full-stack inspirada en Doctoralia, pero enfocada en oficios y servicios profesionales para el hogar.

## Características Principales

- **Doble Rol**: Clientes y Profesionales con flujos de registro separados.
- **Búsqueda Avanzada**: Filtros por categoría, ubicación (Mapa), precio y rating.
- **Perfiles Profesionales**: Bio, fotos, videos, especialidades y reseñas verificadas.
- **Agendamiento Real**: Calendario interactivo con confirmación automática.
- **Monetización**: Suscripciones Stripe (Básica, Premium, Enterprise) para profesionales.
- **Mensajería**: Chat en tiempo real entre cliente y experto.
- **Panel de Admin**: Gestión de proveedores y verificación de identidad.
- **PWA**: Instalable en dispositivos móviles con soporte offline básico.

## Stack Tecnológico

- **Frontend**: Next.js 15 (App Router), Tailwind CSS, shadcn/ui.
- **Backend**: Next.js API Routes, Prisma ORM.
- **Base de Datos**: PostgreSQL (Producción) / SQLite (Desarrollo).
- **Auth**: Clerk (Social Login & Roles).
- **Pagos**: Stripe (Suscripciones y Webhooks).
- **Mapas**: Leaflet + OpenStreetMap.

## Configuración de Producción

### 1. Base de Datos
Para producción, utiliza un servicio de PostgreSQL gestionado (como Supabase, Neon o Railway):
- Actualiza `DATABASE_URL` en tu archivo `.env`.
- En `prisma/schema.prisma`, cambia el provider a `postgresql` y el `url` a `env("DATABASE_URL")`.
- Ejecuta `npx prisma db push` para sincronizar.

### 2. Autenticación (Clerk)
- Asegúrate de que las claves de Clerk (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` y `CLERK_SECRET_KEY`) estén configuradas.
- Configura las URLs de redirección en el dashboard de Clerk.

### 3. Pagos (Stripe)
- Crea tus productos y precios en el dashboard de Stripe.
- Actualiza los `priceIds` en `src/app/api/stripe/checkout/route.ts` con tus IDs reales.
- Configura el `STRIPE_WEBHOOK_SECRET` una vez desplegado.

