# Guía Operativa de OficioYa (Modo Demo)

Para que puedas operar la plataforma ahora mismo, sigue estos pasos:

## 1. Acceso a la Plataforma
- **URL**: `http://localhost:3000`
- **Registro**: Haz clic en "Regístrate" para crear tu propia cuenta de prueba (Cliente).
- **Inicio**: Siempre puedes volver al inicio haciendo clic en el logo de **OficioYa**.

## 2. Flujo de Cliente (Búsqueda y Reserva)
1.  **Explora**: Ve a la sección de categorías o haz clic en "Explorar" en el menú superior (o barra inferior en móvil).
2.  **Filtros**: Prueba los botones de categorías (Plomero, Electricista, etc.). Verás que cada una tiene un profesional real cargado.
3.  **Mapa**: Mueve el mapa para ver cómo los pins se sincronizan con los resultados.
4.  **Reserva**: Entra al perfil de "Juan Pérez" y usa el calendario para agendar una cita. ¡Es totalmente interactivo!

## 3. Flujo de Mensajería
- **Chat**: Haz clic en el icono de mensajes (MessageSquare) en la barra lateral o inferior para ver la interfaz de conversación simulada.

## 4. Panel Administrativo (Control Total)
- **Acceso**: Ve a `http://localhost:3000/admin`
- **Función**: Aquí verás la lista de los 12 proveedores que he cargado. Puedes "Aprobarlos" manualmente para verificar sus perfiles.

## 5. Panel de Proveedor (Gestión de Trabajo)
- **Acceso**: Ve a `http://localhost:3000/dashboard/provider`
- **Función**: Revisa tus próximos trabajos (Bookings), tus ganancias totales y tu rating actual.

---

### 💡 Tips para "Operarla" mejor:
- Abre la página en modo **Inspección (F12)** y activa la **vista móvil** (icono de celular) para ver cómo se comporta como una App real.
- Si el servidor se detiene, solo escribe `npm run dev` en tu terminal.
