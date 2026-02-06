# Sistema de Gestión de Citas Médicas - Frontend

## 📋 Descripción
Frontend de la aplicación de gestión de citas médicas desarrollado con React + TypeScript + Vite. Este proyecto consume los servicios REST del backend para la gestión de citas médicas, pacientes y médicos.

## 🚀 Tecnologías Utilizadas
- **React 18** con TypeScript
- **Vite** - Build tool
- **React Router Dom v6** - Enrutamiento
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Estilos
- **Context API** - Manejo de estado de autenticación
- **JWT** - Autenticación basada en tokens

## 📁 Estructura del Proyecto
```
src/
├── api/
│   └── axios.ts              # Configuración de Axios con interceptores
├── components/
│   ├── Navbar.tsx            # Barra de navegación
│   ├── ProtectedRoute.tsx    # Componente de rutas protegidas
│   ├── LoadingSpinner.tsx    # Componente de carga
│   ├── ErrorAlert.tsx        # Alerta de errores
│   └── SuccessAlert.tsx      # Alerta de éxito
├── context/
│   └── AuthContext.tsx       # Contexto de autenticación
├── hooks/
│   └── useAuth.ts            # Hook personalizado para autenticación
├── pages/
│   ├── Login.tsx             # Página de inicio de sesión
│   ├── Medicos.tsx           # Listado público de médicos
│   ├── Dashboard.tsx         # Dashboard principal
│   └── paciente/
│       ├── MisCitas.tsx      # Gestión de citas del paciente
│       └── AgendarCita.tsx   # Formulario de agendamiento
├── types/
│   ├── auth.ts               # Tipos de autenticación
│   ├── medico.ts             # Tipos de médico
│   ├── cita.ts               # Tipos de cita
│   └── paciente.ts           # Tipos de paciente
├── App.tsx                   # Componente principal con rutas
└── main.tsx                  # Punto de entrada
```

## 🔐 Funcionalidades Implementadas

### Módulo Público (3A)
- ✅ **Login** (`/login`) - Autenticación con JWT
- ✅ **Directorio de Médicos** (`/medicos`) - Listado público de médicos con especialidades

### Módulo Paciente (3B) - `ROLE: PACIENTE`
- ✅ **Mis Citas** (`/mis-citas`)
  - Ver listado de citas programadas
  - Cancelar citas (si estado ≠ FINALIZADA/CANCELADA)
  - Endpoint: `GET /citas/paciente/{cedula}`, `PUT /citas/cancelar/{id}`
  
- ✅ **Agendar Cita** (`/agendar`)
  - Selección de especialidad
  - Selección de médico según especialidad
  - Formulario con validaciones (fecha futura, duración 15-120 min)
  - Endpoint: `POST /citas/agendar`

## 🔌 Endpoints Consumidos

| Método | Endpoint | Descripción | Rol Requerido |
|--------|----------|-------------|---------------|
| POST | `/auth/login` | Iniciar sesión | Público |
| GET | `/medicos` | Listar médicos | Público |
| GET | `/citas/paciente/{cedula}` | Ver citas del paciente | PACIENTE |
| POST | `/citas/agendar` | Agendar nueva cita | PACIENTE |
| PUT | `/citas/cancelar/{id}` | Cancelar cita | PACIENTE |

## 🛡️ Seguridad y Autenticación

### JWT Stateless
- Token almacenado en `localStorage`
- Decodificación de token para obtener `username` y `rol`
- Interceptor de Axios añade automáticamente el header `Authorization: Bearer <token>`

### Interceptores de Axios
- **Request**: Añade token JWT a todas las peticiones
- **Response**: 
  - `401 Unauthorized` → Logout automático y redirección a `/login`
  - `403 Forbidden` → Alerta de "Acceso Denegado"

### Rutas Protegidas
- `ProtectedRoute` verifica autenticación
- Validación de roles con prop `allowedRoles`
- Redirección automática si no está autenticado

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Backend corriendo en `http://localhost:8080`

### Pasos
```bash
# 1. Clonar el repositorio
git clone https://github.com/FepDev25/Sistema-de-Gestion-de-Citas-Medicas-Frontend.git
cd Sistema-de-Gestion-de-Citas-Medicas-Frontend

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:5173
```

## 🧪 Probar la Aplicación

### 1. Preparar Backend
```bash
# En el repositorio del backend
./mvnw clean package
java -jar target/*.jar
```

### 2. Crear Credenciales de Médico
1. Abrir Swagger: `http://localhost:8080/swagger-ui.html`
2. Crear médico con endpoint `POST /medicos`
3. Copiar el token JWT de la respuesta

### 3. Iniciar Sesión
1. Ir a `http://localhost:5173/login`
2. Usuario: (username del médico creado)
3. Contraseña: (la que configuraste)
4. Usar token generado

## 📦 Build para Producción
```bash
npm run build
# Los archivos se generarán en /dist
```

## 👥 Siguientes Pasos (Para el siguiente compañero)

### Módulo Médico (3C) - Pendiente
- [ ] **Mi Agenda** (`/agenda`)
  - Vista de calendario/lista del día
  - Endpoint: `GET /citas/medico/{id}`
  
- [ ] **Atención Médica** (`/atender/{idCita}`)
  - Formulario de consulta (diagnóstico, prescripción, observaciones)
  - Endpoint: `POST /consultas/registrar`
  - El backend finaliza la cita automáticamente

### Mejoras Sugeridas
- [ ] Agregar validaciones con Zod
- [ ] Mejorar UI/UX con loading states
- [ ] Agregar tests unitarios
- [ ] Implementar notificaciones toast
- [ ] Agregar paginación en listados

## 📝 Convenciones de Commits
Se están usando commits descriptivos en español:
- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de errores
- `docs:` - Documentación
- `refactor:` - Refactorización de código
- `style:` - Cambios de formato/estilo

## 🤝 Contribución
Este proyecto es parte del trabajo final del curso de Ingeniería de Software. Cada integrante debe:
- Realizar commits pequeños y frecuentes
- Documentar cambios en el código
- Seguir la estructura establecida
- Cumplir con la rúbrica del trabajo final

## 📄 Licencia
Proyecto académico - Universidad [Nombre]

## 👨‍💻 Equipo de Desarrollo
- Felipe Peralta - Backend + Auth Frontend
- Sami Suquilanda - Módulo Público (3A) + Módulo Paciente (3B)
- [Siguiente compañero] - Módulo Médico (3C)

---
**Última actualización**: 6 de febrero de 2026
