Documentación Técnica de Desarrollo y Despliegue: "ShopMaster"

 En este documento presento la memoria técnica completa del desarrollo, organización y despliegue en la nube de ShopMaster: una tienda virtual interactiva y responsiva desarrollada con HTML5, CSS3, JavaScript (ES6+), Bootstrap 5 y jsPDF, conectada a la API pública FakeStoreAPI. La aplicación incluye un catálogo dinámico, modal de detalles, carrito de compras persistente (LocalStorage)
 
URL DEL REPOSITORIO: https://genekristi.github.io/portafolio-e-commerce-ropa/

URL DE VERCEL: https://portafolio-e-commerce-ropa.vercel.app/

1. Arquitectura y Estructura del Proyecto
Para garantizar la mantenibilidad, escalabilidad y buenas prácticas de desarrollo frontend, modularicé la aplicación en tres archivos independientes dentro del directorio raíz del proyecto:
Plaintext
ShopMaster/
index.html       Estructura semántica, componentes Bootstrap y modales
styles.css         Estilos personalizados, correcciones y diseño responsivo
script.dev.js     Lógica de negocio, consumo de API, carrito y generación de PDF
README.md     Documentación general y presentación del repositorio

 2. Desarrollo Local en Visual Studio Code y Live Server
Organización en VS Code
Apertura del Espacio de Trabajo: Abrí Visual Studio Code y seleccioné la opción Archivo > Abrir carpeta... (File > Open Folder), eligiendo la carpeta principal ShopMaster.
 

<img width="631" height="355" alt="image" src="https://github.com/user-attachments/assets/5b6b1555-118b-4972-8fa7-2fc9e6e7c952" />


Creación de Archivos: A través del explorador lateral izquierdo, creé los archivos independientes index.html, styles.css, script.dev.js y README.md.

 
<img width="194" height="379" alt="image" src="https://github.com/user-attachments/assets/6736ba11-a52d-4b03-bad4-b56caacbc21f" />

 Ejecución en Tiempo Real con Live Server
 
Para probar la aplicación en tiempo real y visualizar los cambios instantáneamente sin necesidad de recargar manualmente el navegador:
Instalé la extensión Live Server (creada por Ritwick Dey) desde el panel de extensiones de VS Code (Ctrl + Shift + X).
Abrí el archivo index.html, hice clic derecho sobre el código y seleccioné la opción "Open with Live Server" (o presioné el botón Go Live en la barra de estado inferior).

El servidor local se inició automáticamente en la dirección local [http://127.0.0.1:5500/index.html](http://127.0.0.1:5500/index.html) habilitando la recarga en vivo (Hot Reload).


<img width="740" height="431" alt="image" src="https://github.com/user-attachments/assets/15a9e7d3-2b89-4045-a4c9-9c8bb980e594" />


3. Gestión de Código y Control de Versiones en GitHub (Método Visual)
Decidi utilizar para la creación del repositorio de la pag web antigravity, de forma que solo sea tener la url de nuestro repositorio.


<img width="763" height="429" alt="image" src="https://github.com/user-attachments/assets/93f431f4-e8f7-4a9f-aba3-b07bd3c9eebf" />


<img width="786" height="442" alt="image" src="https://github.com/user-attachments/assets/3ece01e4-f098-4add-8e27-724112be1fab" />


Creación del Repositorio:
Accedí a mi cuenta en GitHub.
En el panel superior, seleccioné el ícono + y elegí "New repository".
Asigné el nombre shopmaster y seleccioné la visibilidad Public.
Dejé las casillas de inicialización automática (README, .gitignore, License) desmarcadas y confirmé haciendo clic en "Create repository".

Carga Gráfica mediante Drag & Drop:
En la pantalla del recién creado, seleccioné el repositorio

<img width="591" height="350" alt="image" src="https://github.com/user-attachments/assets/50eb11df-ee97-4b3c-9026-02d1fb8f31a0" />

Desde el explorador de archivos de mi computadora, seleccioné la carpeta del proyecto y arrastré y solté los cuatro archivos (index.html, styles.css, script.dev.js, README.md) dentro de la zona de carga.

<img width="706" height="365" alt="image" src="https://github.com/user-attachments/assets/e9420802-5e69-4852-a2da-769a83c80330" />

Confirmación del Commit:
En la sección "Commit changes", añadí el mensaje descriptivo: feat: carga inicial del proyecto ShopMaster.
Mantuve seleccionada la rama principal main y presioné el botón verde "Commit changes".
<img width="680" height="348" alt="image" src="https://github.com/user-attachments/assets/1a5d562b-85a3-456c-b88f-78bdc90d974c" />

 4. Despliegue en la Nube con Vercel
Para alojar la página en una red CDN global de alto rendimiento y disponer de una URL pública con certificado SSL (HTTPS) automático:

Autenticación e Integración:
Ingresé a vercel.com y seleccioné la opción "Sign Up".
Elegí "Continue with GitHub" y autoricé la vinculación entre ambas plataformas presionando "Authorize Vercel".

Importación del Proyecto:
En el panel de control de Vercel (Dashboard), seleccioné "Add New..." > "Project".
Busqué el repositorio shopmaster en la lista de repositorios sincronizados y presioné "Import".

Despliegue y Publicación:
Vercel detectó automáticamente la arquitectura frontend del proyecto.
Sin modificar configuraciones adicionales, presioné el botón azul "Deploy".
En pocos segundos, el entorno completó la compilación y generó el enlace de producción definitivo:


<img width="886" height="498" alt="image" src="https://github.com/user-attachments/assets/3b79a15e-b84c-40fb-a1d0-f17a9b988b91" />

<img width="886" height="498" alt="image" src="https://github.com/user-attachments/assets/f8ae34ae-d49c-48bc-9f3d-d13cb108f4f8" />

<img width="852" height="479" alt="image" src="https://github.com/user-attachments/assets/cb16c2a9-0e27-4941-9044-e63a4d1bd3df" />





<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/fe8fa52a-ae2b-46e3-90b9-72efa9287d5c" />

