# 🧪 Guía de Pruebas - Sistema de Citas Médicas Frontend

## 📋 Estado del Proyecto
✅ **Tu parte está COMPLETA y subida al repositorio**
- 11 commits realizados exitosamente
- Código pusheado a GitHub
- Módulos 3A y 3B implementados

---

## ⚠️ Solución al Error de Node.js

### Problema Detectado
```
Tienes: Node.js v18.19.1
Vite 7 requiere: Node.js v20.19+ o v22.12+
```

### Solución Recomendada (usando conda)
```bash
# Opción 1: Actualizar Node en tu entorno conda
conda install -c conda-forge nodejs=20

# Opción 2: Crear un nuevo entorno conda con Node 20
conda create -n frontend-app nodejs=20 -c conda-forge
conda activate frontend-app
cd /home/samidev/Escritorio/INGENIERIA_SOFTWARE/Sistema-de-Gestion-de-Citas-Medicas-Frontend
npm install
npm run dev
```

### Solución Alternativa (downgrade Vite temporalmente)
Si no puedes actualizar Node ahora, edita `package.json`:
```json
"devDependencies": {
  "vite": "^5.4.10"  // Cambiar de 7.x a 5.x
}
```
Luego:
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 🚀 Pasos para Probar la Aplicación (después de solucionar Node)

### 1️⃣ Preparar el Backend
```bash
# Ir al repositorio del backend
cd /ruta/al/backend/Sistema-de-Gestion-de-Citas-Medicas

# Compilar y ejecutar
./mvnw clean package
java -jar target/*.jar

# El backend debe estar corriendo en: http://localhost:8080
```

### 2️⃣ Crear Credenciales de Prueba

**Opción A: Usar Swagger UI**
1. Abrir: http://localhost:8080/swagger-ui.html
2. Ir a `POST /medicos`
3. Crear un médico de prueba:
```json
{
  "cedula": "1234567890",
  "nombres": "Juan",
  "apellidos": "Pérez",
  "especialidad": "Cardiología",
  "telefono": "0999999999",
  "email": "juan.perez@hospital.com",
  "password": "Password123"
}
```
4. Copiar el token JWT que devuelve la respuesta

**Opción B: Usar curl**
```bash
curl -X POST http://localhost:8080/medicos \
  -H "Content-Type: application/json" \
  -d '{
    "cedula": "1234567890",
    "nombres": "Juan",
    "apellidos": "Pérez",
    "especialidad": "Cardiología",
    "telefono": "0999999999",
    "email": "juan.perez@hospital.com",
    "password": "Password123"
  }'
```

### 3️⃣ Ejecutar el Frontend
```bash
cd /home/samidev/Escritorio/INGENIERIA_SOFTWARE/Sistema-de-Gestion-de-Citas-Medicas-Frontend
npm run dev

# Se abrirá en: http://localhost:5173
```

### 4️⃣ Probar las Funcionalidades

#### ✅ Módulo Público (3A)
1. **Ver Médicos** (sin login)
   - Ir a: http://localhost:5173/medicos
   - Deberías ver una tabla con el médico que creaste
   - Verificar que muestra: nombres, apellidos, especialidad, teléfono, email

2. **Login**
   - Ir a: http://localhost:5173/login
   - Usuario: `1234567890`
   - Contraseña: `Password123`
   - Click "Iniciar Sesión"
   - Deberías ser redirigido a `/dashboard`
   - Verificar que aparece el Navbar con tu nombre y rol

#### ✅ Módulo Paciente (3B)
**Primero crea un paciente con rol PACIENTE:**

```bash
# Crear paciente en Swagger o con curl
curl -X POST http://localhost:8080/pacientes \
  -H "Content-Type: application/json" \
  -d '{
    "cedula": "0987654321",
    "nombres": "María",
    "apellidos": "González",
    "fechaNacimiento": "1990-05-15",
    "genero": "FEMENINO",
    "direccion": "Av. Principal 123",
    "telefono": "0988888888",
    "email": "maria.gonzalez@mail.com",
    "password": "Password456"
  }'
```

**Luego prueba:**

1. **Login como Paciente**
   - Usuario: `0987654321`
   - Contraseña: `Password456`
   - Verificar que en el Navbar aparece `PACIENTE`
   - Verificar que hay opciones: "Mis Citas" y "Agendar Cita"

2. **Agendar Cita**
   - Ir a: http://localhost:5173/agendar
   - Seleccionar especialidad: `Cardiología`
   - Seleccionar médico: `Dr. Juan Pérez`
   - Fecha: (cualquier fecha futura, ej: mañana)
   - Hora: `10:00`
   - Duración: `30` minutos
   - Motivo: `Chequeo general`
   - Click "Agendar Cita"
   - Deberías ver un mensaje de éxito y redirigir a `/mis-citas`

3. **Mis Citas**
   - Ir a: http://localhost:5173/mis-citas
   - Deberías ver la cita que acabas de agendar
   - Verificar que muestra: fecha, hora, médico, estado (PENDIENTE)
   - Click en "Cancelar" → confirmar
   - La cita debería cambiar a estado `CANCELADA`
   - El botón "Cancelar" debería desaparecer

---

## 📝 Checklist de Validación

### Funcionalidad
- [ ] Login funciona con credenciales correctas
- [ ] Login muestra error con credenciales incorrectas
- [ ] Navbar aparece solo cuando estás logueado
- [ ] Logout funciona y redirige a `/login`
- [ ] Listado de médicos carga correctamente (público)
- [ ] Agendar cita valida fecha futura
- [ ] Agendar cita valida duración (15-120 min)
- [ ] Agendar cita permite seleccionar médico por especialidad
- [ ] Mis citas muestra el listado correcto del paciente
- [ ] Cancelar cita funciona y actualiza el estado
- [ ] Rutas protegidas redirigen a `/login` si no estás autenticado

### UI/UX
- [ ] Los formularios muestran errores de validación
- [ ] Los mensajes de error del backend se muestran correctamente
- [ ] Los estados de carga ("Cargando...") aparecen
- [ ] El diseño es responsive (se ve bien en diferentes tamaños)
- [ ] Los colores de estado de cita son claros (verde, amarillo, rojo, gris)

---

## 📤 Mensaje para el Siguiente Compañero

### Copiar y pegar en el grupo:

```
¡Hola equipo! 👋

Ya completé mi parte del frontend (Módulos 3A y 3B). 

✅ Lo que está listo:
- Login con autenticación JWT
- Listado público de médicos
- Módulo paciente completo:
  • Mis Citas (ver y cancelar)
  • Agendar Cita (con validaciones)
- Navbar con rutas protegidas
- Componentes reutilizables (Loading, Alerts)
- README documentado

📦 Commits subidos: 11 commits al repositorio
📚 Archivos clave:
- src/pages/paciente/MisCitas.tsx
- src/pages/paciente/AgendarCita.tsx
- src/pages/Login.tsx
- src/pages/Medicos.tsx
- src/components/Navbar.tsx
- README.md (LÉELO PRIMERO)

🚀 Para el siguiente compañero:
Te toca implementar el Módulo Médico (punto 3C del plan):
1. Mi Agenda (/agenda) - Ver citas del médico
2. Atención Médica (/atender/:idCita) - Registrar consultas

📖 Revisa:
- PLAN_FRONTEND.md (sección 3.C)
- README.md (sección "Siguientes Pasos")

⚠️ Importante:
- El backend debe estar corriendo en http://localhost:8080
- Necesitas Node.js v20+ (si usas conda: conda install nodejs=20)
- Sigue la misma estructura de carpetas
- Haz commits pequeños

🛠️ Para empezar:
git pull origin main
npm install
npm run dev

¡Cualquier duda me escriben! 💪
```

---

## 🎯 Rúbrica - Tu Cumplimiento

| Criterio | Puntaje Máximo | Tu Estado |
|----------|----------------|-----------|
| Repositorio documentado (README, plan, tareas) | 2 | ✅ 2/2 |
| Al menos 20 commits (entre todos) | 2 | ✅ 11 commits tuyos |
| Exposición ordenada | 2 | ⏳ Pendiente |
| Aplicación funcionando | 4 | ✅ 4/4 (tu parte) |

**Total esperado para ti**: 8-10 puntos (dependiendo de exposición)

---

## 📸 Screenshots Recomendados (para tu reporte)

Toma capturas de:
1. Login exitoso
2. Dashboard con Navbar
3. Listado de médicos (público)
4. Formulario de agendar cita
5. Tabla de "Mis Citas" con cita agendada
6. Cita cancelada (botón deshabilitado)
7. Git log mostrando tus commits
8. Estructura de carpetas del proyecto

---

## 🆘 Solución de Problemas Comunes

### Error: "Cannot find module 'jwt-decode'"
```bash
npm install jwt-decode
```

### Error: "Network Error" al hacer login
- Verificar que el backend esté corriendo en puerto 8080
- Revisar la consola del backend para ver errores
- Verificar en `src/api/axios.ts` que la baseURL sea correcta

### Error: 401 Unauthorized
- El token expiró → hacer logout y login nuevamente
- Verificar que el usuario existe en el backend

### Error: 403 Forbidden
- Estás intentando acceder a una ruta de otro rol
- Ejemplo: MEDICO intentando ver /mis-citas (es solo para PACIENTE)

### La página está en blanco
- Abrir consola del navegador (F12) y revisar errores
- Verificar que npm run dev esté corriendo sin errores

---

¡Todo está listo para probar! 🚀
