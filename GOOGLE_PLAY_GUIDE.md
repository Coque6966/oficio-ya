# Guía de Publicación en Google Play - OficioYa

Esta guía detalla los pasos para convertir tu PWA de OficioYa en una aplicación nativa de Android y publicarla en Google Play Store.

## 1. Convertir PWA a Android (TWA)

La forma más rápida y segura de publicar una aplicación Next.js es usando **Trusted Web Activities (TWA)**.

1.  **Instala Bubblewrap CLI**:
    \`\`\`bash
    npm install -g @bubblewrap/cli
    \`\`\`
2.  **Inicializa el proyecto**:
    \`\`\`bash
    bubblewrap init --manifest=https://tu-dominio.com/manifest.json
    \`\`\`
3.  **Genera el APK/AAB**:
    \`\`\`bash
    bubblewrap build
    \`\`\`
    *Esto generará un archivo \`.aab\` listo para subir a Google Play.*

## 2. Configuración en Google Play Console

1.  **Crea una cuenta de Desarrollador**: (Pago único de $25 USD).
2.  **Crea una nueva aplicación**: Sube el archivo \`.aab\` generado por Bubblewrap.
3.  **App Signing**: Google Play gestionará tus llaves de firma automáticamente.
4.  **Digital Asset Links**: Para que la barra de direcciones del navegador desaparezca, debes subir el archivo \`assetlinks.json\` generado por Bubblewrap a:
    \`https://tu-dominio.com/.well-known/assetlinks.json\`

## 3. Seguridad y Privacidad

1.  **Política de Privacidad**: Google exige una URL con tu política de privacidad.
2.  **Seguridad de Datos**: Declara que usas autenticación (Clerk) y pagos (Stripe), los cuales son proveedores seguros y encriptados.

---

> [!IMPORTANT]
> Recuerda que para que la app sea "Impenetrable":
> 1. Usa siempre HTTPS.
> 2. Mantén tus SECRET_KEYS de Clerk y Stripe solo en el servidor (archivo .env).
> 3. Nunca subas el archivo \`.env\` a GitHub.
