# 🛒 ShopMaster — Tienda Virtual Moderna con Carrito, Pasarela de Pago y Recibo Térmico en PDF

¡Hola! En este documento detallo todo el proceso de desarrollo, estructura de archivos, organización en Visual Studio Code y el despliegue en la nube de mi proyecto **ShopMaster**: una tienda virtual interactiva y responsiva que consume datos reales de la API pública `FakeStoreAPI`, implementa un carrito de compras con persistencia local (`LocalStorage`), un modal de detalles, una pasarela de pago simulada y un sistema automático de generación de tickets de compra estilo recibo térmico en PDF mediante `jsPDF`.

---

## 🛠️ Tecnologías y Librerías Utilizadas

Para este proyecto integré los siguientes estándares y herramientas del desarrollo web frontend:
* **HTML5:** Estructura semántica de la página, modales y contenedores.
* **CSS3:** Estilos personalizados, paleta de colores corporativa y diseño visual.
* **JavaScript (ES6+):** Lógica de negocio, manipulación del DOM, asincronía con `Fetch API` y persistencia.
* **Bootstrap 5:** Framework CSS para componentes responsivos (rejillas, offcanvas, modales).
* **Font Awesome 6:** Iconografía moderna para mejorar la experiencia de usuario (UX).
* **FakeStoreAPI:** API REST gratuita para la obtención dinámica del catálogo de productos.
* **jsPDF:** Librería de JavaScript para maquetar y descargar comprobantes en formato de recibo térmico (80 mm).

---

## ✨ Características Principales

1. **Catálogo Dinámico:** Carga automática de productos desde la API externa, organizados en tarjetas adaptables.
2. **Vista de Detalles (Modal):** Permite inspeccionar la imagen ampliada, categoría, descripción completa y seleccionar la cantidad deseada antes de comprar.
3. **Carrito de Compras Flotante (Offcanvas):** 
   * Añadir, modificar cantidades o eliminar productos.
   * Cálculo en tiempo real del total acumulado.
   * Persistencia local: los productos no se pierden si recargas la página (`LocalStorage`).
4. **Pasarela de Pago Simulada:** Formulario interactivo con validación de datos de tarjeta y titular.
5. **Generador de Ticket Térmico en PDF:** Al confirmar el pago, se descarga automáticamente un recibo de compra ajustado a dimensiones de impresión térmica (80 mm), utilizando fuente monoespaciada y formato limpio.

---

## 💻 Estructura y Organización del Proyecto en Visual Studio Code

Para mantener una separación limpia de responsabilidades (buenas prácticas de desarrollo), estructuré el código en archivos independientes dentro de la carpeta raíz del proyecto:

```text
ShopMaster/
│
├── index.html       # Estructura semántica y componentes Bootstrap
├── styles.css       # Estilos personalizados y ajustes visuales
├── script.dev.js    # Lógica de la aplicación, API, carrito y jsPDF
└── README.md        # Documentación general del repositorio