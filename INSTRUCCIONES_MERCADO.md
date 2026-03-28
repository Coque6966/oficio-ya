# Guía de Despliegue y Seguridad Táctica - OficioYa

Para queOficioYa sea una plataforma "impenetrable" y esté lista para el mercado masivo, sigue estas instrucciones:

## 1. Infraestructura Segura

- **Servidor**: Despliega en **Vercel**. Vercel ofrece protección contra ataques DDoS y aislamiento de procesos por defecto.
- **Base de Datos**: Usa **Supabase** o **Railway** con PostgreSQL. No uses SQLite en producción.
- **SSL**: Vercel gestiona certificados SSL automáticamente. **Nunca** permitas conexiones HTTP sin cifrar.

## 2. Configuración de Variables de Entorno

Configura estas variables en el panel de Vercel (no en el código):

| Variable | Descripción |
| :--- | :--- |
| \`DATABASE_URL\` | URL de conexión de PostgreSQL (Supabase/Railway) |
| \`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY\` | Tu llave pública de Clerk |
| \`CLERK_SECRET_KEY\` | Tu llave secreta de Clerk (CRÍTICA) |
| \`STRIPE_API_KEY\` | Tu llave secreta de Stripe |
| \`STRIPE_WEBHOOK_SECRET\` | Para validar que los pagos son reales |

## 3. Seguridad Implementada

- **CORS & Headers**: He configurado \`next.config.ts\` con cabeceras de seguridad para prevenir Clickjacking y XSS.
- **Rate Limiting**: El API de reservas tiene protección contra ataques de fuerza bruta.
- **Validación Zod**: Todos los datos que entran al servidor son validados estrictamente antes de tocar la base de datos.
- **ORM Prisma**: Previene inyecciones SQL de forma nativa.

## 4. Pasos Finales antes de Lanzar

1.  **Cambio de Base de Datos**:
    En \`prisma/schema.prisma\`, cambia el provider a \`postgresql\` y la url a \`env("DATABASE_URL")\`.
2.  **Prisma Push**:
    \`\`\`bash
    npx prisma db push
    \`\`\`
3.  **Dominio**:
    Compra un dominio profesional (ej. \`oficioya.com\`) y vincúlalo en Vercel.

---

**OficioYa ahora está blindada y lista para recibir a sus primeros miles de usuarios.**
