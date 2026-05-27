# JR Digital Solutions — Design System Master

**Versión:** 2.0  
**Última actualización:** Abril 18, 2026  
**Arquitectura:** Progressive Disclosure + Token Hierarchy  
**Stack:** React 18 + Tailwind CSS v4 + Vite 5

---

## 📚 Tabla de Contenido

1. [Filosofía del Sistema](#filosofía-del-sistema)
2. [Arquitectura de Tokens](#arquitectura-de-tokens)
3. [Paleta de Colores](#paleta-de-colores)
4. [Tipografía](#tipografía)
5. [Gradientes](#gradientes)
6. [Espaciado y Layout](#espaciado-y-layout)
7. [Componentes](#componentes)
8. [Animaciones](#animaciones)
9. [Guías de Uso](#guías-de-uso)
10. [Anti-Patrones](#anti-patrones)

---

## 🎨 Filosofía del Sistema

### Principios de Diseño

**1. Anti-AI-Generic**  
- ❌ NO usar: gradientes púrpura-azul genéricos, orbs brillantes al azar, centered-everything  
- ✅ SÍ usar: paleta técnica con índigo + verde, grids animados, asimetrías intencionales

**2. Profesionalismo Técnico**  
- Inspiración: GitHub, Vercel, Linear, Stripe  
- Estética: Minimalista, futurista-técnico, alta legibilidad  
- Jerarquía clara, espaciado generoso, micro-animaciones con propósito

**3. Token-First Architecture**  
- **Jamás** hardcodear colores hex, tamaños px, o duraciones ms  
- Todo valor visual debe vivir en `tokens.css`  
- Cambios globales desde un solo archivo

---

## 🏗 Arquitectura de Tokens

### Jerarquía de 3 Capas

```
┌─────────────────────────────────────────┐
│ CAPA 1: Tokens Primitivos              │
│ --color-indigo-600: #4F46E5             │
│ (raw values - NO usar directamente)    │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ CAPA 2: Tokens Semánticos              │
│ --color-primary: var(--color-indigo-600)│
│ (significado contextual - SÍ usar)     │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ CAPA 3: Tokens de Componente           │
│ --gradient-primary, --shadow-glow      │
│ (específicos a patrones visuales)      │
└─────────────────────────────────────────┘
```

**Ejemplo de uso correcto:**

```jsx
// ✅ CORRECTO - Usa tokens semánticos
<div className="bg-bg-card border-border text-text-primary">
  <button className="bg-primary hover:bg-primary-hover">
    Acción
  </button>
</div>

// ✅ CORRECTO - Gradiente desde variable
<div style={{ background: 'var(--gradient-primary)' }}>
  Hero Section
</div>

// ❌ INCORRECTO - Hardcoded
<div style={{ background: '#4F46E5' }}>...</div>
<div style={{ background: 'linear-gradient(135deg, #4F46E5, #22C55E)' }}>...</div>
```

---

## 🎨 Paleta de Colores

### Colores Primarios

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-primary` | #4F46E5 (Indigo 600) | CTAs, enlaces, acentos principales |
| `--color-primary-hover` | #6366F1 (Indigo 500) | Estados hover/focus |
| `--color-primary-active` | #4338CA (Indigo 700) | Estados active |

### Colores de Acento

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-accent` | #22C55E (Green 500) | Éxito, llamadas a acción secundarias |
| `--color-accent-hover` | #4ADE80 (Green 400) | Estados hover |
| `--color-accent-active` | #16A34A (Green 600) | Estados active |

### Fondos

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-bg-primary` | #0B0F19 (Gray 950) | Fondo principal de página |
| `--color-bg-secondary` | #111827 (Gray 900) | Secciones alternadas |
| `--color-bg-card` | #1A1F2E (Gray 800) | Tarjetas, modales, contenedores |
| `--color-bg-card-hover` | #242B3D (Gray 700) | Estado hover de tarjetas |

### Texto

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-text-primary` | #F9FAFB (Gray 50) | Texto principal, títulos |
| `--color-text-secondary` | #9CA3AF (Gray 300) | Descripciones, subtexto |
| `--color-text-muted` | #6B7280 (Gray 400) | Placeholders, texto deshabilitado |

### Estados

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-success` | #22C55E | Mensajes de éxito |
| `--color-warning` | #F59E0B | Alertas |
| `--color-error` | #EF4444 | Errores, validaciones fallidas |
| `--color-info` | #6366F1 | Mensajes informativos |

---

## 📐 Tipografía

### Font Families

```css
--font-family-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-family-mono: 'Fira Code', 'Consolas', monospace;
```

### Scale de Tamaños

| Token | Valor | Uso |
|-------|-------|-----|
| `--font-size-xs` | 0.75rem (12px) | Badges, labels |
| `--font-size-sm` | 0.875rem (14px) | Texto secundario |
| `--font-size-base` | 1rem (16px) | Cuerpo de texto |
| `--font-size-lg` | 1.125rem (18px) | Subtítulos |
| `--font-size-xl` | 1.25rem (20px) | Títulos de sección |
| `--font-size-2xl` | 1.5rem (24px) | Títulos destacados |
| `--font-size-3xl` | 1.875rem (30px) | H2 |
| `--font-size-4xl` | 2.25rem (36px) | H1 secundarios |
| `--font-size-5xl` | 3rem (48px) | H1 héroes |

### Pesos

| Token | Valor | Uso |
|-------|-------|-----|
| `--font-weight-normal` | 400 | Texto normal |
| `--font-weight-medium` | 500 | Botones, navegación |
| `--font-weight-semibold` | 600 | Subtítulos |
| `--font-weight-bold` | 700 | Títulos principales |

### Line Heights

| Token | Valor | Uso |
|-------|-------|-----|
| `--line-height-tight` | 1.25 | Títulos |
| `--line-height-normal` | 1.5 | Texto de cuerpo |
| `--line-height-relaxed` | 1.75 | Párrafos largos |

---

## 🌈 Gradientes

### Gradientes Lineales

#### Gradiente Primario (Diagonal 135deg)
```css
--gradient-primary: linear-gradient(
  135deg,
  var(--color-indigo-500),
  var(--color-indigo-600),
  var(--color-green-500)
);
```
**Uso:** Hero sections, backgrounds principales, overlays

#### Gradiente Horizontal
```css
--gradient-primary-horizontal: linear-gradient(
  90deg,
  var(--color-indigo-600),
  var(--color-indigo-500)
);
```
**Uso:** Barras de progreso, divisores

#### Gradiente de Texto
```css
--gradient-text-hero: linear-gradient(
  135deg,
  var(--color-indigo-500),
  var(--color-indigo-600),
  var(--color-green-500)
);
```
**Uso:** Títulos principales con efecto degradado  
**Clase helper:** `.gradient-text`

#### Gradiente de Decoración
```css
--gradient-decoration: linear-gradient(
  90deg,
  transparent,
  rgba(79, 70, 229, 0.4),
  transparent
);
```
**Uso:** Líneas divisoras animadas, scan lines  
**Clase helper:** `.circuit-line`

### Gradientes Radiales (Orbs)

#### Orb Primario
```css
--gradient-orb-primary: radial-gradient(
  circle,
  rgba(79, 70, 229, 0.2) 0%,
  transparent 70%
);
```
**Uso:** Backgrounds decorativos, efectos de glow

#### Orb de Acento
```css
--gradient-orb-accent: radial-gradient(
  circle,
  rgba(34, 197, 94, 0.15) 0%,
  transparent 70%
);
```
**Uso:** Acentos secundarios, elementos de fondo

### Backgrounds Especiales

#### Grid Técnico
```css
--gradient-tech-grid:
  linear-gradient(rgba(79, 70, 229, 0.05) 1px, transparent 1px),
  linear-gradient(90deg, rgba(79, 70, 229, 0.05) 1px, transparent 1px);
```
**Clase helper:** `.tech-grid`  
**backgroundSize:** `50px 50px`

#### Grid de Proyectos
```css
--gradient-project-grid:
  linear-gradient(white 1px, transparent 1px),
  linear-gradient(90deg, white 1px, transparent 1px);
```
**Uso:** Fondos de tarjetas de proyecto con animación

---

## 📏 Espaciado y Layout

### Scale de Espaciado

| Token | Valor | Uso |
|-------|-------|-----|
| `--spacing-xs` | 0.25rem (4px) | Gaps mínimos |
| `--spacing-sm` | 0.5rem (8px) | Padding interno pequeño |
| `--spacing-md` | 1rem (16px) | Espaciado estándar |
| `--spacing-lg` | 1.5rem (24px) | Gaps entre elementos |
| `--spacing-xl` | 2rem (32px) | Secciones internas |
| `--spacing-2xl` | 3rem (48px) | Entre secciones |
| `--spacing-3xl` | 4rem (64px) | Secciones grandes |
| `--spacing-4xl` | 6rem (96px) | Hero padding vertical |

### Bordes

#### Radios
| Token | Valor | Uso |
|-------|-------|-----|
| `--border-radius-sm` | 0.25rem (4px) | Badges, tags |
| `--border-radius-md` | 0.5rem (8px) | Botones, inputs |
| `--border-radius-lg` | 0.75rem (12px) | Tarjetas |
| `--border-radius-xl` | 1rem (16px) | Modales, secciones |
| `--border-radius-full` | 9999px | Botones redondos, avatars |

#### Anchos
| Token | Valor | Uso |
|-------|-------|-----|
| `--border-width-thin` | 1px | Bordes estándar |
| `--border-width-medium` | 2px | Bordes enfatizados |
| `--border-width-thick` | 4px | Indicadores, estados focus |

### Sombras

| Token | Descripción | Uso |
|-------|-------------|-----|
| `--shadow-sm` | Sombra sutil | Elementos flotantes ligeros |
| `--shadow-md` | Sombra mediana | Tarjetas en reposo |
| `--shadow-lg` | Sombra grande | Modales, dropdowns |
| `--shadow-xl` | Sombra extra grande | Elementos elevados importantes |
| `--shadow-glow-primary` | Glow índigo | Efectos hover con color primario |
| `--shadow-glow-accent` | Glow verde | Efectos hover con acento |

---

## 🧩 Componentes

### Glassmorphism

#### Glass Base
```css
.glass {
  background: rgba(26, 31, 46, 0.6);
  backdrop-filter: blur(20px);
  border: var(--border-width-thin) solid rgba(255, 255, 255, 0.05);
}
```
**Uso:** Navbars, modales flotantes

#### Glass Card
```css
.glass-card {
  background: rgba(26, 31, 46, 0.4);
  backdrop-filter: blur(15px);
  border: var(--border-width-thin) solid rgba(255, 255, 255, 0.08);
  border-radius: var(--border-radius-lg);
}
```
**Uso:** Tarjetas de contenido, sidebars

### Borde con Gradiente Animado

```jsx
<div className="border-gradient relative rounded-2xl">
  {/* Contenido */}
</div>
```
**Efecto:** Borde animado con gradiente primario  
**Animación:** `gradient-x` 4s infinito

---

## 🎬 Animaciones

### Duraciones

| Token | Valor | Uso |
|-------|-------|-----|
| `--duration-instant` | 100ms | Feedback inmediato |
| `--duration-fast` | 200ms | Hover effects |
| `--duration-normal` | 300ms | Transiciones estándar |
| `--duration-slow` | 500ms | Animaciones complejas |
| `--duration-slower` | 1000ms | Efectos decorativos |

### Easings

| Token | Curva | Uso |
|-------|-------|-----|
| `--ease-standard` | cubic-bezier(0.4, 0.0, 0.2, 1) | Transiciones generales |
| `--ease-emphasized` | cubic-bezier(0.0, 0.0, 0.2, 1) | Entradas enfáticas |
| `--ease-decelerated` | cubic-bezier(0.0, 0.0, 0.2, 1) | Salidas suaves |
| `--ease-accelerated` | cubic-bezier(0.4, 0.0, 1, 1) | Salidas rápidas |

### Keyframes Disponibles

#### gradient-x
```css
@keyframes gradient-x {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```
**Clase:** `.animate-gradient-x`  
**Uso:** Fondos y bordes con gradiente animado

#### shimmer
```css
@keyframes shimmer {
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
}
```
**Clase:** `.animate-shimmer`  
**Uso:** Efectos de carga, skeleton loaders

#### glow-pulse
```css
@keyframes glow-pulse {
  0%, 100% { box-shadow: var(--shadow-glow-primary); }
  50% {
    box-shadow:
      0 0 50px rgba(79, 70, 229, 0.5),
      0 0 80px rgba(79, 70, 229, 0.2);
  }
}
```
**Clase:** `.animate-glow`  
**Uso:** CTAs, elementos destacados

#### border-dance
```css
@keyframes border-dance {
  0%, 100% { border-color: rgba(79, 70, 229, 0.3); }
  33% { border-color: rgba(34, 197, 94, 0.3); }
  66% { border-color: rgba(99, 102, 241, 0.5); }
}
```
**Clase:** `.animate-border-dance`  
**Uso:** Bordes decorativos con cambio de color

---

## 📖 Guías de Uso

### Cómo Usar Este Sistema

#### 1. Al Crear Componentes Nuevos

```jsx
// ✅ CORRECTO
function NewFeature() {
  return (
    <div className="bg-bg-card border-border rounded-lg p-lg">
      <h2 className="text-2xl font-semibold text-text-primary">
        Título
      </h2>
      <p className="text-text-secondary mt-sm">
        Descripción
      </p>
      <button className="bg-primary hover:bg-primary-hover text-white px-md py-sm rounded-md transition-colors duration-fast">
        Acción
      </button>
    </div>
  );
}

// ❌ INCORRECTO
function NewFeature() {
  return (
    <div style={{
      background: '#1A1F2E',
      border: '1px solid #374151',
      borderRadius: '8px',
      padding: '24px'
    }}>
      {/* ... */}
    </div>
  );
}
```

#### 2. Gradientes en Style Props

```jsx
// ✅ CORRECTO - Variable CSS
<div style={{ background: 'var(--gradient-primary)' }}>
  Hero Content
</div>

// ❌ INCORRECTO - Hardcoded
<div style={{
  background: 'linear-gradient(135deg, #4F46E5, #22C55E)'
}}>
  Hero Content
</div>
```

#### 3. Animaciones

```jsx
// ✅ CORRECTO - Clase helper
<div className="border-gradient animate-gradient-x">
  Borde animado
</div>

// ✅ CORRECTO - Duración desde variable
<motion.div
  animate={{ opacity: 1 }}
  transition={{
    duration: 'var(--duration-normal)',
    ease: 'var(--ease-standard)'
  }}
>
  Fade in
</motion.div>
```

### Workflow de Desarrollo

1. **Diseño en Figma/Wireframe** → Identificar tokens necesarios
2. **Verificar `tokens.css`** → Usar tokens existentes cuando sea posible
3. **Si falta un token** → Agregarlo en `tokens.css` (no en componente)
4. **Componente** → Usar solo clases de Tailwind y variables CSS
5. **Testing visual** → Verificar consistencia con resto del sitio

---

## ❌ Anti-Patrones

### Qué NO Hacer

#### 1. Hardcodear Valores

```jsx
// ❌ MAL
<div style={{ color: '#4F46E5' }}>...</div>
<div className="text-[#4F46E5]">...</div>

// ✅ BIEN
<div className="text-primary">...</div>
```

#### 2. Gradientes Inline Hardcoded

```jsx
// ❌ MAL
<div style={{
  background: 'linear-gradient(135deg, #4F46E5, #22C55E, #6366F1)'
}}>
  Hero
</div>

// ✅ BIEN
<div style={{ background: 'var(--gradient-primary)' }}>
  Hero
</div>
```

#### 3. Magic Numbers

```jsx
// ❌ MAL
<div style={{ padding: '24px', margin: '16px' }}>...</div>

// ✅ BIEN
<div className="p-lg m-md">...</div>
```

#### 4. Duplicar Definiciones

```css
/* ❌ MAL - En un componente CSS Module */
.myButton {
  background: linear-gradient(135deg, #4F46E5, #22C55E);
}

/* ✅ BIEN - Reutilizar token */
.myButton {
  background: var(--gradient-primary);
}
```

#### 5. Valores Arbitrarios Sin Justificación

```jsx
// ❌ MAL
<div className="text-[17px] leading-[1.42857] tracking-[-0.0234em]">
  Texto
</div>

// ✅ BIEN - Usar tokens predefinidos
<div className="text-lg leading-normal">
  Texto
</div>
```

---

## 🔗 Referencias

- **Tokens Source:** [`design-system/tokens.css`](./tokens.css)
- **Implementación:** [`src/index.css`](../src/index.css)
- **Tailwind Docs:** https://tailwindcss.com/docs
- **Inspiración:** Vercel Design System, GitHub Primer, Linear Design

---

## 📝 Changelog

### v2.0 — Abril 18, 2026
- ✅ Arquitectura de tokens de 3 capas implementada
- ✅ Todos los gradientes hardcoded eliminados
- ✅ Variables CSS centralizadas en `tokens.css`
- ✅ Documentación completa del sistema

### v1.0 — Inicial
- Implementación base con Tailwind CSS
- Configuración de colores primarios y acentos
- Animaciones básicas

---

**Mantenedor:** Jorge Rodríguez (JR Digital Solutions)  
**Contacto:** jrodri1493@gmail.com  
**Última revisión:** Abril 18, 2026
