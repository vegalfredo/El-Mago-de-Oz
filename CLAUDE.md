# CLAUDE.md — Guía de Proyecto: Landing Page "El Mago de Oz"
## Teatro La Corte Teatral, Querétaro

> Este archivo es para uso de Claude. Léelo completo antes de tocar cualquier archivo del proyecto.

---

## 1. PROPÓSITO DEL PROYECTO

Landing page de venta de boletos para la obra de teatro **"El Mago de Oz"** de La Corte Teatral, Querétaro. **El objetivo #1 es VENDER BOLETOS**, no informar. Cada decisión de diseño existe para empujar al visitante hacia llamar al 448 120 4431 o escribir por WhatsApp.

**Público:** Papás y mamás de niños de 3-12 años, abuelos, familias en Querétaro Centro. 80%+ en móvil.

---

## 2. STACK TÉCNICO

- **HTML5 + CSS3 + JavaScript Vanilla** — sin frameworks, sin bundlers
- Una sola página (`index.html`), sin dependencias locales de JS/CSS excepto las 2 libs de CDN
- **Swiper.js v11** (CDN) — carrusel de galería
- **AOS v2.3.4** (CDN) — animaciones al hacer scroll
- **Google Fonts** (CDN) — Playfair Display, Montserrat, Open Sans, Dancing Script

---

## 3. ESTRUCTURA DE ARCHIVOS

```
Landing/
├── index.html                  ← Página principal (todo en uno)
├── css/
│   └── styles.css              ← Todos los estilos, Mobile-First
├── js/
│   └── main.js                 ← Tema, countdown, sparkles, Swiper, AOS, menú
├── img/
│   ├── cartel-oficial.webp     ← Cartel principal (hero)
│   ├── logo.png                ← Logo La Corte Teatral (fondo removido con Python PIL)
│   ├── foto-obra-01.jpg        ← Fotos del carrusel (10 fotos, JPG)
│   ├── foto-obra-02.jpg
│   ├── ...
│   └── foto-obra-10.jpg
├── CLAUDE.md                   ← Este archivo
└── PLAN_LANDING_PAGE_MAGO_DE_OZ.md  ← Plan original de diseño (referencia)
```

---

## 4. PALETA DE COLORES (CSS Custom Properties)

Toda la paleta está en variables en `css/styles.css`. Se aplican en `:root` (modo claro) y `[data-theme="dark"]` (modo oscuro).

### Modo Claro (default):
| Variable | Valor | Uso |
|----------|-------|-----|
| `--color-primary` | `#C5A030` | Dorado — camino amarillo |
| `--color-primary-dark` | `#8B6F14` | Dorado hover |
| `--color-secondary` | `#1B7A3D` | Verde esmeralda — color principal de títulos |
| `--color-secondary-light` | `#2ECC71` | Verde claro — badges "Al momento" |
| `--color-accent` | `#E74C3C` | Rojo amapolas |
| `--color-bg` | `#FDFAF3` | Fondo crema cálido |
| `--color-bg-alt` | `#F5EFE0` | Fondo secciones alternas |
| `--color-text` | `#1A1A2E` | Texto principal |
| `--color-text-light` | `#555555` | Texto secundario |
| `--color-cta` | `#E74C3C` | Rojo para botones de compra |
| `--color-cta-hover` | `#C0392B` | Rojo hover |

### Modo Oscuro:
| Variable | Valor |
|----------|-------|
| `--color-bg` | `#0D1117` |
| `--color-bg-alt` | `#161B22` |
| `--color-text` | `#F0E6D3` |
| `--color-primary` | `#D4AF37` |
| `--color-secondary` | `#27AE60` |
| `--color-cta` | `#FF5252` |

---

## 5. TIPOGRAFÍA

```css
--font-display:  'Playfair Display', serif;   /* hero title, creditos */
--font-headings: 'Montserrat', sans-serif;    /* section-title, nav, botones, labels */
--font-body:     'Open Sans', sans-serif;     /* párrafos, cuerpo */
--font-accent:   'Dancing Script', cursive;   /* detalles mágicos: "La magia te espera" */
```

**Importante:** Los `.section-title` usan `--font-headings` (Montserrat), NO Playfair Display. El usuario lo prefiere así.

---

## 6. SECCIONES (orden de arriba a abajo)

### `#navbar` — Navegación fija sticky
- Degradado horizontal: verde esmeralda `#1B7A3D` → amarillo dorado `#D4AF37`
- Textos blancos con `text-shadow` sutil
- Logo `img/logo.png` a la izquierda (36×36px, `object-fit: contain`)
- Links desktop: La Obra | Fechas | Galería | Ubicación | Alimentos
- Toggle modo oscuro/claro: botón con texto "🌙 Oscuro" / "☀️ Claro" (CSS puro, sin JS para el ícono)
- Botón CTA rojo "Comprar Boletos" siempre visible
- En móvil: hamburger menu (JS toggle clase `.open` en `#mobile-menu`)

### `#hero` — Pantalla completa
- Fondo: `linear-gradient(180deg, #0e3d6e → #1a5c8a → #1b7a3d → #145c2e)` — azul noche → verde esmeralda
- Overlay `::before` negro al 38% para legibilidad del texto
- Sparkles dorados animados (JS genera 18 `<span>` con `@keyframes sparkle`)
- Layout: cartel izquierda + texto derecha (desktop) / stack vertical (móvil)
- Cartel con `glow` dorado animado (`@keyframes posterGlow`)
- Headline: "El **Mago** de Oz" (palabra "Mago" en `--color-primary`)
- Badges: 4 chips translúcidos con características
- Countdown dinámico (JS actualiza cada segundo)
- **Botón hero** (`#btn-hero-cta`): verde esmeralda por default, cambia a rojo al hacer click (JS toggle clase `.clicked`)
- Botón WhatsApp secundario

### `#obra` — Propuesta de valor
- Fondo `--color-bg-alt`
- 3 tarjetas: 🎭 Actuación | 🎵 Canciones | 😂 Familiar
- Animaciones AOS `fade-up` con delay escalonado (0, 150, 300ms)

### `#fechas` — Fechas, horarios y precios ⚠️ SECCIÓN DE CONVERSIÓN
- 3 tarjetas tipo "boleto" con header verde + cuerpo blanco
- **5 de abril**: 2:30 PM y 4:30 PM
- **12 de abril**: solo 2:30 PM
- **19 de abril**: solo 4:30 PM
- Precios: Adultos $250 | Niños $200 | **Preventa $150** (lunes a miércoles)
- Badge "¡Ahorra $100!" en verde
- CTA: botón rojo con teléfono + botón WhatsApp verde

### `#galeria` — Carrusel de fotos
- Swiper.js con efecto `coverflow` (rotate:5, depth:100)
- 10 fotos JPG: `foto-obra-01.jpg` a `foto-obra-10.jpg`
- Autoplay 3500ms, loop infinito
- Breakpoints: 1 foto móvil / 2 tablet / 3 desktop

### `#alimentos` — Menú de comida
- Fondo `--color-bg-alt`
- 8 items en grid: Refrescos, Té, Café, Papas Sabritas, Papas francesas, Palomitas, Pizza, Tacos
- Badge verde "🔥 Al momento" en los preparados al momento (todos excepto refrescos y papas Sabritas)
- Nota: "excepto refrescos y papas tipo Sabritas"

### `#ubicacion` — Mapa y dirección
- Layout 2 columnas desktop / stack móvil
- Dirección: **5 de Mayo #69, Col. Centro, Querétaro**
- Aviso rojo: NO hay estacionamiento propio
- iframe Google Maps responsivo (padding-bottom: 56.25% trick)
- Botón "Abrir en Google Maps"

### `#prueba-social` — Social proof
- Contador "+500 familias vivieron la magia"
- 3 tarjetas de testimonios con ⭐⭐⭐⭐⭐

### `#cta-final` — Cierre de conversión
- Fondo: `linear-gradient(160deg, #0e3d6e → #1a5c8a → #1b7a3d → #145c2e)` + destello dorado en base
- Sparkles dorados extra
- Countdown repetido (mismas clases `.cd-days`, `.cd-hours`, etc. — el JS actualiza todos a la vez)
- Botón rojo grande: "📞 Llama ahora: 448 120 4431"
- Botón WhatsApp: `https://wa.me/524481204431?text=Hola,%20quiero%20boletos%20para%20El%20Mago%20de%20Oz`

### `#footer`
- Fondo `#0a0a0a`
- Logo + dirección + teléfono clickeable
- Links de navegación
- Íconos SVG reales de Facebook, Instagram, TikTok (clase `.social-icon-link`, círculos translúcidos)
  - Facebook: https://www.facebook.com/LaCorteTeatral
  - Instagram: https://www.instagram.com/lacorteteatral/
  - TikTok: https://www.tiktok.com/@lacorteteatralqro?lang=es
  - Todos abren en pestaña nueva (`target="_blank" rel="noopener noreferrer"`)
  - En móvil: `initSocialDeepLinks()` en `main.js` detecta iOS/Android e intenta abrir la app nativa primero (deep link). Si la app no responde en 1.5s, abre el navegador como fallback.
  - Los deep links están en atributos `data-app-ios` y `data-app-android` en cada `<a>`
- "© 2026 La Corte Teatral. Adaptación: César Ferrón · Dirección: Joel Jiménez"

### `.floating-cta` — Botón flotante fijo
- Siempre visible, esquina inferior derecha
- Rojo con animación `pulse-cta` infinita
- `href="tel:4481204431"`
- **NUNCA eliminar este botón** — es la red de seguridad de conversión

---

## 7. SISTEMA DE MODO OSCURO/CLARO

### Cómo funciona:
1. Script inline en `<head>` (antes del CSS) lee `localStorage.getItem('theme')`
2. Default siempre es `'light'` — NO depende de `prefers-color-scheme` del sistema
3. Aplica `data-theme="light"` o `data-theme="dark"` en `<html>`
4. Todo el CSS usa variables que cambian según `[data-theme="dark"]`
5. El botón toggle en navbar muestra "🌙 Oscuro" en modo claro y "☀️ Claro" en modo oscuro — controlado **solo por CSS** con `.icon-dark` / `.icon-light`
6. `toggleTheme()` en JS solo cambia el atributo y guarda en `localStorage`

**Importante:** El hero SIEMPRE tiene fondo oscuro (azul/verde) independientemente del tema — es intencional por diseño.

---

## 8. COUNTDOWN TIMER

En `js/main.js`, array `SHOW_DATES` con todas las funciones:
```javascript
const SHOW_DATES = [
  new Date('2026-04-05T14:30:00'), // 5 abril 2:30 PM
  new Date('2026-04-05T16:30:00'), // 5 abril 4:30 PM
  new Date('2026-04-12T14:30:00'), // 12 abril 2:30 PM
  new Date('2026-04-19T16:30:00'), // 19 abril 4:30 PM
];
```

`getNextShow()` recorre el array y devuelve la **primera fecha futura**. El countdown salta automáticamente a la siguiente función cuando la actual pasa. Actualiza cada segundo con `setInterval`.

Las clases `.cd-days`, `.cd-hours`, `.cd-mins`, `.cd-secs` existen en **dos lugares** del HTML (hero y CTA final) — el JS actualiza **todos** con `querySelectorAll`.

---

## 9. ANIMACIONES CLAVE

### `@keyframes pulse-cta` (rojo)
Botones de compra principales — scale + box-shadow expandiéndose.

### `@keyframes pulse-cta-green` (verde)
Botón hero en estado default (verde esmeralda).

### `.btn-cta-hero.clicked`
Al hacer click en el botón hero, se agrega clase `.clicked` → cambia a rojo con `pulse-cta`. Toggle (click de nuevo → vuelve a verde).

### `@keyframes sparkle`
18 spans generados por JS en `.sparkles`. Posición aleatoria, duración 3-7s, delay aleatorio. Color dorado `--color-primary`.

### `@keyframes posterGlow`
El cartel del hero tiene un `::after` con `radial-gradient` dorado que pulsa entre 0.4 y 1 de opacidad.

### AOS
Inicializado con `duration: 700, offset: 120, once: true`. Todas las tarjetas y secciones usan `data-aos="fade-up"` con `data-aos-delay` escalonado.

---

## 10. DATOS DE CONTACTO Y NEGOCIO

| Dato | Valor |
|------|-------|
| Obra | El Mago de Oz |
| Adaptación | César Ferrón |
| Dirección | Joel Jiménez |
| Teatro | La Corte Teatral |
| Dirección | 5 de Mayo #69, Col. Centro, Querétaro |
| Teléfono | 448 120 4431 |
| WhatsApp | wa.me/524481204431 |
| Fechas | Domingos 5, 12 y 19 de abril 2026 |
| Horario 5 abril | 2:30 PM y 4:30 PM |
| Horario 12 abril | Solo 2:30 PM |
| Horario 19 abril | Solo 4:30 PM |
| Recepción | Media hora antes |
| Precio adultos | $250 MXN |
| Precio niños | $200 MXN |
| Preventa | $150 MXN (lunes a miércoles) |
| Estacionamiento | NO hay |

---

## 11. DECISIONES DE DISEÑO IMPORTANTES (no cambiar sin razón)

- **Títulos de sección** (`.section-title`): Montserrat + color verde esmeralda + `text-shadow` glow verde. El usuario prefiere Montserrat sobre Playfair Display para títulos.
- **Fondo hero**: azul noche → verde esmeralda. Sin dorados/cafés en el fondo. Solo azul y verde.
- **Fondo CTA final**: mismo esquema azul/verde que el hero.
- **Navbar**: degradado horizontal verde→amarillo dorado. Textos blancos.
- **Botón hero**: verde por default, rojo al hacer click (toggle con clase `.clicked`).
- **Logo**: PNG 1080×1080 con fondo negro removido con Python PIL (umbral < 50 RGB → transparente).
- **Modo claro es el default** — ignorar `prefers-color-scheme` del sistema operativo.
- **Botón flotante**: NUNCA quitar. Es la red de seguridad de conversión más importante.
- **Alimentos**: decir "papas tipo Sabritas", NO "papas empaquetadas".

---

## 12. REPOSITORIO

- **GitHub**: https://github.com/vegalfredo/El-Mago-de-Oz
- **Branch**: `main`
- Para publicar: GitHub Pages → Settings → Pages → Branch: main

---

## 13. COMANDOS ÚTILES

```bash
# Ver en local (desde la carpeta Landing/)
# Abrir index.html directamente en el navegador, o usar Live Server de VS Code

# Limpiar tema guardado en caché del navegador (consola del navegador):
localStorage.removeItem('theme')

# Subir cambios al repo:
cd "c:/Users/vegal/Documents/La corte Teatral/El Mago de Oz/Landing"
git add -A
git commit -m "descripción del cambio"
git push

# Remover fondo de imagen con Python (si se necesita de nuevo):
python -c "
from PIL import Image
import numpy as np
img = Image.open('img/logo.png').convert('RGBA')
data = np.array(img, dtype=float)
mask = (data[:,:,0] < 50) & (data[:,:,1] < 50) & (data[:,:,2] < 50)
data[:,:,3] = np.where(mask, 0, data[:,:,3])
Image.fromarray(data.astype(np.uint8), 'RGBA').save('img/logo.png')
"
```
