const API_URL = 'https://fakestoreapi.com/products';
let allProducts = [];
let cart = JSON.parse(localStorage.getItem('shopmaster_cart')) || [];

// Elementos del DOM
const productsGrid = document.getElementById('productsGrid');
const loadingSpinner = document.getElementById('loadingSpinner');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartTotal = document.getElementById('cartTotal');
const cartBadge = document.getElementById('cartBadge');
const checkoutBtn = document.getElementById('checkoutBtn');

// Inicializar la aplicación al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    updateCartUI();
});

// Consumir API con Fetch
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        allProducts = await response.json();
        loadingSpinner.style.display = 'none';
        renderProducts(allProducts);
    } catch (error) {
        console.error('Error al cargar productos:', error);
        loadingSpinner.innerHTML = '<p class="text-danger">Error al cargar la tienda. Intenta nuevamente.</p>';
    }
}

// Renderizar tarjetas de productos
function renderProducts(products) {
    productsGrid.innerHTML = '';
    products.forEach(product => {
        const col = document.createElement('div');
        col.className = 'col-sm-6 col-md-4 col-lg-3';
        col.innerHTML = `
            <div class="card h-100 product-card shadow-sm">
                <div class="product-img-container p-3">
                    <img src="${product.image}" class="product-img-top" alt="${product.title}">
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title card-title-clamp fs-6 fw-bold">${product.title}</h5>
                    <p class="card-text card-text-clamp text-muted small">${product.description}</p>
                    <div class="mt-auto">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <span class="fs-5 fw-bold text-primary">$${product.price.toFixed(2)}</span>
                        </div>
                        <button class="btn btn-outline-primary w-100 fw-bold" onclick="openProductModal(${product.id})">
                            🔍 Ver más
                        </button>
                    </div>
                </div>
            </div>
        `;
        productsGrid.appendChild(col);
    });
}

// Abrir Modal de Producto
function openProductModal(id) {
    const product = allProducts.find(p => p.id === id);
    if (!product) return;

    document.getElementById('modalImg').src = product.image;
    document.getElementById('modalCategory').textContent = product.category;
    document.getElementById('modalTitle').textContent = product.title;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalPrice').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('modalQuantity').value = 1;

    // Configurar botón "Agregar al carrito" dentro del modal
    const modalAddBtn = document.getElementById('modalAddToCartBtn');
    modalAddBtn.onclick = () => {
        const qty = parseInt(document.getElementById('modalQuantity').value) || 1;
        addToCart(product.id, qty);
        
        // Cerrar modal de producto
        const modalEl = document.getElementById('productModal');
        const modalObj = bootstrap.Modal.getInstance(modalEl);
        modalObj.hide();
    };

    // Mostrar modal con Bootstrap
    const productModal = new bootstrap.Modal(document.getElementById('productModal'));
    productModal.show();
}

// Agregar producto al carrito
function addToCart(productId, quantity) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    saveCart();
    updateCartUI();
}

// Guardar en LocalStorage
function saveCart() {
    localStorage.setItem('shopmaster_cart', JSON.stringify(cart));
}

// Actualizar interfaz del carrito y offcanvas
function updateCartUI() {
    // Actualizar insignia flotante (Badge)
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-muted text-center mt-5">Tu carrito está vacío 🛍️</p>';
        cartTotal.textContent = '$0.00';
        checkoutBtn.disabled = true;
        return;
    }

    checkoutBtn.disabled = false;
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const div = document.createElement('div');
        div.className = 'd-flex align-items-center justify-content-between border-bottom py-2';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: contain;" class="me-2">
            <div class="flex-grow-1 small">
                <h6 class="mb-0 text-truncate" style="max-width: 150px;">${item.title}</h6>
                <span class="text-muted">$${item.price.toFixed(2)} x ${item.quantity}</span>
            </div>
            <div class="d-flex align-items-center">
                <button class="btn btn-sm btn-outline-secondary px-1 py-0 me-1" onclick="changeQuantity(${item.id}, -1)">-</button>
                <span class="small fw-bold mx-1">${item.quantity}</span>
                <button class="btn btn-sm btn-outline-secondary px-1 py-0 ms-1 me-2" onclick="changeQuantity(${item.id}, 1)">+</button>
                <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash-alt"></i></button>
            </div>
        `;
        cartItemsContainer.appendChild(div);
    });

    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
}

// Cambiar cantidad de un ítem en el carrito
function changeQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        updateCartUI();
    }
}

// Eliminar producto del carrito
function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    saveCart();
    updateCartUI();
}

// Manejar formulario de pago
const paymentForm = document.getElementById('paymentForm');
paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const clientName = document.getElementById('cardName').value;
    
    // Generar PDF térmico
    generateThermalReceipt(clientName);

    // Vaciar carrito y cerrar modales
    cart = [];
    saveCart();
    updateCartUI();

    const checkoutModalEl = document.getElementById('checkoutModal');
    const checkoutModalObj = bootstrap.Modal.getInstance(checkoutModalEl);
    checkoutModalObj.hide();

    // Cerrar también el offcanvas del carrito
    const offcanvasEl = document.getElementById('cartOffcanvas');
    const offcanvasObj = bootstrap.Offcanvas.getInstance(offcanvasEl);
    if (offcanvasObj) offcanvasObj.hide();

    paymentForm.reset();
    alert('¡Pago procesado con éxito! 🎉 Se ha descargado tu recibo térmico en PDF.');
});

// Generar Ticket Térmico en PDF con jsPDF
function generateThermalReceipt(clientName) {
    const { jsPDF } = window.jspdf;
    
    // Configuración para recibo térmico de 80mm de ancho (aprox 80mm = 226 puntos)
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [80, 200]
    });

    doc.setFont('courier', 'normal');
    doc.setFontSize(9);

    let y = 10;
    const pageWidth = 80;
    const margin = 5;
    const printableWidth = pageWidth - (margin * 2);

    // Función auxiliar para texto centrado
    const centerText = (text, yPos) => {
        const textWidth = doc.getTextWidth(text);
        const xPos = (pageWidth - textWidth) / 2;
        doc.text(text, xPos, yPos);
    };

    // Encabezado del negocio
    centerText('SHOPMASTER STORE', y);
    y += 5;
    centerText('RUC: 20123456789', y);
    y += 5;
    centerText('Av. Comercio 123 - Ciudad', y);
    y += 6;
    doc.text('------------------------------------------------', margin, y);
    y += 5;

    // Fecha y cliente
    const now = new Date();
    const dateStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
    doc.text(`Fecha: ${dateStr}`, margin, y);
    y += 5;
    doc.text(`Cliente: ${clientName}`, margin, y);
    y += 6;
    doc.text('------------------------------------------------', margin, y);
    y += 5;

    // Detalle de productos
    doc.text('CANT  DESCRIPCION             P.UNIT   TOTAL', margin, y);
    y += 5;
    doc.text('------------------------------------------------', margin, y);
    y += 5;

    let grandTotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        grandTotal += itemTotal;

        const qtyStr = String(item.quantity).padEnd(5, ' ');
        // Recortar título a 18 caracteres para que encaje
        const titleStr = item.title.substring(0, 18).padEnd(19, ' ');
        const priceStr = `$${item.price.toFixed(2)}`.padStart(8, ' ');
        const totalStr = `$${itemTotal.toFixed(2)}`.padStart(8, ' ');

        const line = `${qtyStr} ${titleStr} ${priceStr} ${totalStr}`;
        doc.text(line, margin, y);
        y += 5;
    });

    doc.text('------------------------------------------------', margin, y);
    y += 6;

    // Totales
    doc.setFont('courier', 'bold');
    doc.text(`TOTAL A PAGAR: $${grandTotal.toFixed(2)}`, margin, y);
    y += 8;

    doc.setFont('courier', 'normal');
    centerText('¡GRACIAS POR SU COMPRA!', y);
    y += 5;
    centerText('Conserve este ticket para cambios', y);

    // Descargar PDF automáticamente
    doc.save(`ticket-compra-${Date.now()}.pdf`);
}