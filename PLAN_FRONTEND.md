Claro, aquí tienes el contenido completo del PDF convertido a un archivo `.md` limpio y bien estructurado:

---

# Plan de Acción para Frontend (React) – Sistema de Gestión de Citas Médicas  
**Fecha**: 2026-01-26

---

## 1. Configuración Inicial del Proyecto

### Tecnologías Sugeridas

| Tecnología | Uso |
|------------|-----|
| **React (Vite) + TypeScript** | Core del frontend (seguridad de tipos con DTOs) |
| **React Router Dom v6+** | Enrutamiento |
| **Axios** | Cliente HTTP (facilita interceptores de JWT) |
| **Tailwind CSS o Material UI** | Estilos y componentes rápidos |
| **Context API + Hooks o Zustand** | Manejo de estado (sesión de usuario) |
| **React Hook Form + Zod** | Formularios y validación (espejo del backend) |

### Estructura de Directorios (por módulos funcionales)

```
/auth         → Login, Contexto de Autenticación
/citas        → Agendamiento, Listados, Cancelación
/consultas    → Registro de consultas (Atención médica)
/pacientes    → Gestión de pacientes
/medicos      → Directorio médico
/components   → UI reutilizable (Navbar, Sidebar, Modales)
```

---

## 2. Gestión de Seguridad y Autenticación (Auth)

> El backend utiliza **JWT Stateless**. El frontend debe manejar el ciclo de vida del token.

### Contexto de Autenticación (`AuthContext`)

| Estado Global | Descripción |
|---------------|-------------|
| `user` | Datos decodificados del token |
| `token` | Token JWT |
| `role` | Rol del usuario (`PACIENTE`, `MEDICO`) |
| `isAuthenticated` | Booleano de autenticación |

**Acciones**:
- `login(credentials)`
- `logout()`

### Interceptor de Axios

#### Request Interceptor
Antes de cada petición, verifica si existe un token y añade el header:
```http
Authorization: Bearer <token_jwt>
```

#### Response Interceptor
Manejo de errores globales:
- **401 Unauthorized** → Token expirado o inválido → Ejecutar `logout()` y redirigir a `/login`
- **403 Forbidden** → Usuario sin permisos → Mostrar alerta "Acceso denegado"

### Rutas Protegidas (`ProtectedRoute`)

- Componente wrapper para React Router.
- Verifica si el usuario está autenticado.
- Valida roles con `allowedRoles`.
- Si el rol no coincide → redirige a "No Autorizado" o dashboard.

---

## 3. Módulos y Flujos de Usuario

### A. Módulo Público

| Ruta | Descripción |
|------|-------------|
| `/login` | Formulario para enviar credenciales a `POST /auth/login` |
| `/medicos` | Listado público de médicos (consume `GET /medicos`) |

---

### B. Módulo Paciente (`ROLE_PACIENTE`)

#### 🔹 Mis Citas (`/mis-citas`)
- **Consume**: `GET /citas/paciente/{mi_cedula}`
- **Tabla**: fecha, hora, médico, estado
- **Acción**: Botón "Cancelar" (visible si estado ≠ `FINALIZADA`/`CANCELADA`) → `PUT /citas/cancelar/{id}`

#### 🔹 Agendar Cita (`/agendar`)
- **Formulario**:
  - Especialidad → Médico → Fecha → Hora
- **Validaciones**:
  - Fecha futura
  - Duración válida
- **Consume**: `POST /citas/agendar` con `CitaRequestDTO`

---

### C. Módulo Médico (`ROLE_MEDICO`)

#### 🔹 Mi Agenda (`/agenda`)
- **Consume**: `GET /citas/medico/{mi_id}`
- **Vista**: calendario o lista del día
- **Acción**: Botón "Atender" en citas con estado `CONFIRMADA`

#### 🔹 Atención Médica / Consulta (`/atender/{idCita}`)
- **Formulario**:
  - Diagnóstico
  - Prescripción
  - Observaciones
- **Consume**: `POST /consultas/registrar` con `ConsultaRequestDTO`
- **Backend**: Finaliza la cita automáticamente

---

### D. Gestión Administrativa (Registro)

| Ruta | Descripción |
|------|-------------|
| `/pacientes/nuevo` | Formulario para `POST /pacientes` |
| `/medicos/nuevo` | Formulario para `POST /medicos` |

---

## 4. Validaciones y Manejo de Errores

### 🔐 Formularios

- Usar **Zod** para esquemas de validación (espejo del backend: `@NotNull`, `@Size`, etc.)
- **Cédula**: 10-13 caracteres
- **Fechas**:
  - No pasadas (para citas)
  - Pasadas (para nacimiento)
- **Contraseñas**: longitud mínima 8, mayúsculas, números, etc.

### 📣 Feedback al Usuario

| Escenario | Acción |
|-----------|--------|
| **Éxito (201 Created)** | Toast verde + redirigir a listado |
| **Error de negocio (409 Conflict)** | Mostrar mensaje del backend (ej. "Ya existe cita en ese horario") |
| **Error de validación (400 Bad Request)** | Mostrar errores debajo de cada input |

---

## 5. Hoja de Ruta de Desarrollo (Roadmap)

| Fase | Tarea |
|------|-------|
| **1** | Setup base: crear proyecto, configurar Axios e interceptores |
| **2** | Auth MVP: login, guardar token, decodificar rol |
| **3** | Vistas públicas: listado de médicos |
| **4** | Módulo citas (paciente): agendamiento y listado personal |
| **5** | Módulo citas (médico): agenda y visualización |
| **6** | Módulo consultas: formulario de atención médica |
| **7** | Refinamiento: mejorar UI, loading states, manejo de errores |

---

¿Quieres que te lo guarde como archivo `.md` descargable o necesitas alguna sección adaptada a otro formato (como JSON o YAML)?