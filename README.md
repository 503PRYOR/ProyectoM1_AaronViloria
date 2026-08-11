# 🎨 ColorFly - Generador de Paletas de Colores

## 📝 Descripción
**ColorFly** es una aplicación web interactiva que genera paletas de colores aleatorias de forma dinámica. Permite seleccionar el tamaño de la paleta (6, 8 o 9 colores), visualizar los colores generados, copiar códigos HEX con un clic y alternar entre formatos HSL y HEX. Incluye feedback visual, accesibilidad y diseño responsive.

---

## 🚀 Demo en Vivo

¡Prueba la aplicación directamente!

> **URL:** [Ver ColorFly en GitHub Pages](https://tuusuario.github.io/Proyecto_integradorM1)  
> *(Reemplaza `tuusuario` con tu usuario de GitHub una vez subas el repositorio)*

**Características de la demo:**
- ✅ Generación instantánea de paletas
- ✅ Copiar códigos HEX al portapapeles
- ✅ Interfaz intuitiva y responsive
- ✅ Diseño moderno con gradientes

---

## ✨ Funcionalidades

<details open>
<summary><b>Haz clic para expandir/contraer</b></summary>

- 🎯 **Selección de tamaño:** Elige entre 6, 8 o 9 colores
- 🎨 **Generación aleatoria:** Colores en formato HSL con conversión a HEX
- 📋 **Copiar al portapapeles:** Haz clic en cualquier color para copiar su código
- 🔄 **Alternar formatos:** Cambia entre HSL y solo HEX
- 💾 **Guardar paletas:** Almacena tus paletas favoritas (LocalStorage)
- 🔒 **Bloquear colores:** Fija colores para mantenerlos en nuevas generaciones
- 📱 **Responsive:** Funciona en desktop, tablet y móvil
- ♿ **Accesibilidad:** Labels, aria-live, foco visible y navegación por teclado
- 🎯 **Feedback visual:** Toast notifications para acciones del usuario

</details>

---

## 📚 Cómo usar la APP

1. Abre la aplicación en tu navegador
2. Selecciona el tamaño de la paleta (6, 8 o 9 colores)
3. Haz clic en **"Generar paleta"**
4. La paleta se mostrará con sus códigos HEX
5. **Haz clic en un color** para copiar su código al portapapeles
6. Usa **"Mostrar solo HEX"** para alternar entre HSL y HEX
7. **Bloquea colores** con el candado para mantenerlos en nuevas generaciones
8. Guarda tus paletas favoritas con **"Guardar paleta"**

---

## 🔧 Decisiones Técnicas

- **HTML:** Estructura semántica con `header`, `main`, `section` y `footer`
- **CSS:** Variables CSS personalizadas y media queries para responsive design
- **JavaScript:** 
  - Generación HSL → conversión a HEX para obtener colores visualmente atractivos
  - LocalStorage para persistencia de paletas guardadas
  - Toast notifications para feedback de usuario
  - Accesibilidad WCAG básica

---

## 💻 Tecnologías

| Tecnología | Descripción |
|-----------|------------|
| **HTML5** | Estructura y semántica |
| **CSS3** | Estilos, variables CSS y responsividad |
| **JavaScript (Vanilla)** | Lógica y interactividad sin dependencias |

---

## 📦 Instalación Local

### Requisitos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Git (opcional, si prefieres clonar)

### Pasos

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/<tu-usuario>/Proyecto_integradorM1.git
   ```

2. **Entra en la carpeta:**
   ```bash
   cd Proyecto_integradorM1
   ```

3. **Abre la aplicación:**
   - Haz doble clic en `index.html`, o
   - Haz clic derecho → "Abrir con" → Tu navegador favorito

---

## 🌐 Despliegue en GitHub Pages

1. **Sube tu repositorio a GitHub** con la rama `main`
2. **Accede a la configuración del repositorio** → Settings
3. **Dirígete a "Pages"** (en el menú lateral izquierdo)
4. **Selecciona:**
   - Source: `main` (o `master`)
   - Folder: `/ (root)`
5. Haz clic en **Save**
6. **Espera unos minutos** y tu sitio estará disponible en:
   ```
   https://<tu-usuario>.github.io/Proyecto_integradorM1
   ```

---

## 📁 Estructura del Proyecto

```
Proyecto_integradorM1/
├── index.html          # Página principal (estructura HTML)
├── css/
│   └── styles.css      # Estilos y diseño responsive
├── js/
│   └── script.js       # Lógica de generación y interactividad
├── README.md           # Este archivo
└── .git/               # Control de versiones
```

---

## 🖼️ Capturas de Pantalla

> Próximamente se agregarán capturas de pantalla y un GIF demostrativo

---

## 📝 Notas

- Este proyecto es parte del Módulo 1 de un programa formativo
- Se puede extender con:
  - Exportar paletas en diferentes formatos (JSON, CSS)
  - Historial de paletas generadas
  - Compartir paletas por URL
  - Modo oscuro/claro
  - Animaciones mejoradas

---

## 📄 Licencia

Este proyecto está disponible bajo licencia MIT.

---

## ✍️ Autor

**Aaron Viloria**  
[Tu GitHub](https://github.com/tuusuario) | [Tu LinkedIn](https://linkedin.com/in/tuusuario)

---

**¡Gracias por usar ColorFly! 🎨**
