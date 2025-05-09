# Sistema Académico

Un sistema de gestión académica moderno y completo para instituciones educativas, desarrollado con React, TypeScript y Supabase.

## 🚀 Características Principales

- 🔐 Sistema de autenticación multi-rol (Administrador, Profesor, Estudiante)
- 📚 Gestión completa de cursos y matrículas
- 📊 Sistema de calificaciones con retroalimentación
- 📅 Control de asistencia en tiempo real
- 🌐 Soporte multiidioma (Español e Inglés)
- 📱 Diseño responsivo y moderno
- 📄 Generación de reportes en PDF

## 🛠️ Tecnologías Utilizadas

- **Frontend**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Vite

- **Backend & Base de Datos**
  - Supabase (PostgreSQL)
  - Row Level Security (RLS)

- **Utilidades**
  - i18next (Internacionalización)
  - Lucide React (Iconos)
  - jsPDF (Generación de PDF)

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn
- Cuenta en Supabase

## 🔧 Instalación y Configuración

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/MarTryxz/SistemaNotas.git
   cd sistema-academico
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   - Crear archivo `.env` en la raíz del proyecto
   ```env
   VITE_SUPABASE_URL=tu_url_de_supabase
   VITE_SUPABASE_ANON_KEY=tu_anon_key
   ```

4. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

## 🔑 Cuentas Demo

El sistema incluye tres cuentas de demostración para probar los diferentes roles:

- **Administrador**: admin@example.com
- **Profesor**: teacher@example.com
- **Estudiante**: student@example.com

## 🏗️ Arquitectura del Proyecto

### Arquitectura en Capas

Hemos implementado una arquitectura en capas para este sistema académico, organizando el código en diferentes niveles de abstracción que separan claramente las responsabilidades.

### Justificación

La arquitectura en capas fue seleccionada por las siguientes razones:

1. **Separación de Responsabilidades**
   - Cada capa tiene una función específica y bien definida
   - Facilita el mantenimiento y las pruebas
   - Permite modificar una capa sin afectar a las demás

2. **Escalabilidad**
   - Facilita la adición de nuevas funcionalidades
   - Permite escalar componentes específicos según necesidad
   - Estructura modular que facilita el crecimiento del sistema

3. **Mantenibilidad**
   - Código más organizado y fácil de entender
   - Mejor gestión de dependencias
   - Facilita la detección y corrección de errores

### Capas del Sistema

```
├── Presentación (UI)
│   ├── Componentes
│   ├── Páginas
│   └── Layouts
│
├── Lógica de Negocio
│   ├── Contextos
│   ├── Hooks
│   └── Servicios
│
├── Datos
│   ├── Types
│   ├── Utils
│   └── i18n
```

## 🌟 Funcionalidades Destacadas

### 1. Sistema de Calificaciones Inteligente
- Cálculo automático de promedios
- Retroalimentación personalizada
- Exportación de reportes en PDF
- Visualización de tendencias de rendimiento

### 2. Control de Asistencia Avanzado
- Registro en tiempo real
- Estadísticas de asistencia
- Alertas automáticas
- Reportes por período

### 3. Gestión de Cursos
- Inscripción y des-inscripción automática
- Control de capacidad
- Asignación de profesores
- Calendario académico integrado

### 4. Panel de Administración
- Gestión completa de usuarios
- Configuración de períodos académicos
- Reportes y estadísticas
- Control de accesos y permisos

## 🔒 Seguridad

El sistema implementa múltiples capas de seguridad:

- Autenticación robusta con Supabase
- Row Level Security (RLS) en base de datos
- Políticas de acceso por rol
- Validación de datos en frontend y backend

## 📱 Responsive Design

La interfaz se adapta perfectamente a diferentes dispositivos:
- Escritorio
- Tablet
- Móvil

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.
