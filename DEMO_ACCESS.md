# Guía de Acceso Demo - OficioYa

Esta guía te permite probar todas las funciones de la plataforma en sus diferentes roles.

## 1. Acceso como Cliente (Usuario)
1. Ve a la página de inicio.
2. Haz clic en "Inicia Sesión" o "Regístrate".
3. Puedes usar cualquier correo electrónico.
4. **Función principal**: Buscar profesionales por categoría, ver perfiles y **agendar un servicio**.

## 2. Acceso como Trabajador (Proveedor)
1. Una vez que hayas iniciado sesión como usuario, ve a la sección ["Soy Profesional"](/pricing).
2. Elige un plan (puedes probar primero el **Plan Gratis**).
3. Completa tu perfil en el [Dashboard de Proveedor](/dashboard/provider/setup).
4. **Reglas de Monetización**:
   - **Plan Gratis**: Tienes **2 trabajos gratis**. Después de eso, el sistema te pedirá actualizar.
   - **Plan Básico ($99)**: Hasta 7 trabajos al mes.
   - **Plan Pro ($199)**: Sin límites.

## 3. Acceso como Administrador
Para convertir cualquier cuenta en Administrador, ejecuta el siguiente comando en tu terminal (reemplazando tu correo):

```bash
npm run admin -- email@tu-correo.com
```

**Funciones de Admin**:
- Ver todos los profesionales registrados.
- Verificar perfiles manualmente.
- Ver estadísticas globales de la plataforma.
- Acceso en: [/admin](/admin)

---

### Notas de Prueba (Stripe Test Mode)
Como estamos en modo de prueba, puedes usar esta tarjeta para las suscripciones:
- **Número**: `4242 4242 4242 4242`
- **Fecha**: Cualquier fecha futura (ej. 12/26)
- **CVC**: `123`
