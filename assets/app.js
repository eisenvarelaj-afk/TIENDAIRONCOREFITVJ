const CATALOGO = [
    { id: 1, nombre: 'Proteína Whey Isolate H.I.T.', precio: 220000, categoria: 'Suplementos', img: 'https://images.unsplash.com/photo-1579722820308-d7cc05e2439a?auto=format&fit=crop&w=800&q=80', desc: '25g de proteína limpia por servicio.' },
    { id: 2, nombre: 'Creatina Monohidratada Pura', precio: 95000, categoria: 'Suplementos', img: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80', desc: 'Mejora la fuerza y volumen celular.' },
    { id: 5, nombre: 'Mancuernas Ajustables Pro', precio: 4500000, categoria: 'Peso Libre', img: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80', desc: 'Sistema de ajuste rápido.' },
    { id: 9, nombre: 'Torre Polea Alta / Baja', precio: 1850000, categoria: 'Máquinas', img: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80', desc: 'Entrenamiento biomecánico.' },
    { id: 11, nombre: 'Prensa de Piernas 45°', precio: 3200000, categoria: 'Máquinas', img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80', desc: 'Capacidad de carga masiva.' },
    { id: 12, nombre: 'Rack de Sentadillas PowerCage', precio: 2100000, categoria: 'Peso Libre', img: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80', desc: 'Seguridad total para powerlifting.' }
];

const app = {
    carrito: JSON.parse(localStorage.getItem('ironcore_cart')) || [],
    
    init() {
        this.cacheDOM();
        this.bindEvents();
        this.renderProducts();
        this.updateCartUI();
    },

    cacheDOM() {
        this.productContainer = document.getElementById('productContainer');
        this.promoContainer = document.getElementById('promoContainer');
        this.cartSidebar = document.getElementById('cartSidebar');
        this.cartOverlay = document.getElementById('cartOverlay');
        this.cartOpenBtn = document.getElementById('cartOpenBtn');
        this.cartCloseBtn = document.getElementById('cartCloseBtn');
        this.cartItemsContainer = document.getElementById('cartItemsContainer');
        this.cartBadge = document.getElementById('cartBadge');
        this.cartTotal = document.getElementById('cartTotal');
        this.checkoutBtn = document.getElementById('checkoutBtn');
    },

    bindEvents() {
        this.cartOpenBtn.addEventListener('click', () => this.toggleCart(true));
        this.cartCloseBtn.addEventListener('click', () => this.toggleCart(false));
        this.cartOverlay.addEventListener('click', () => this.toggleCart(false));
        
        // **Nueva Lógica del Checkout de Prueba**
        this.checkoutBtn.addEventListener('click', () => {
            if (this.carrito.length === 0) return;
            
            const total = this.carrito.reduce((sum, item) => sum + (item.precio * item.cant), 0);
            const totalFormatted = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(total);

            // Mostramos el mensaje visual de éxito en la consola y en una alerta
            console.log('-------------------------------------------------------------------------');
            console.log('¡EXITO! COMPRA DE PRUEBA COMPLETADA');
            console.log('Total de la compra simulada:', totalFormatted);
            console.log('Productos adquiridos:', this.carrito.map(item => `${item.nombre} (x${item.cant})`).join(', '));
            console.log('Este es un entorno de pruebas. No se han procesado pagos reales.');
            console.log('-------------------------------------------------------------------------');
            
            alert(`¡FELICIDADES! Has completado tu compra de prueba por un valor de ${totalFormatted}.\n\n(Este es un entorno de simulación. Los productos no serán enviados. Consulta la consola para más detalles.)`);

            // Vaciamos el carrito
            this.carrito = [];
            this.saveAndRenderCart();
            this.toggleCart(false);
        });
    },

    formatCOP(price) {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price);
    },

    createProductCard(prod, isPromo = false) {
        return `
            <div class="product-card">
                <div class="product-img"><img src="${prod.img}" alt="${prod.nombre}" loading="lazy"></div>
                <div class="product-info">
                    <span class="product-category">${prod.categoria}</span>
                    <h3 class="product-title">${prod.nombre}</h3>
                    <p class="product-desc">${prod.desc}</p>
                    <div class="product-price-box">
                        <span class="price-current">${this.formatCOP(prod.precio)}</span>
                        <button class="add-to-cart-btn" onclick="app.addToCart(${prod.id})" title="Agregar al carrito">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    renderProducts() {
        // Sección de Ofertas Flash (tomamos los 2 productos más caros para simular el impacto de la referencia)
        const promos = CATALOGO.slice(4, 6); 
        this.promoContainer.innerHTML = promos.map(p => this.createProductCard(p, true)).join('');
        
        // Sección de Catálogo General (el resto)
        const catalogoGeneral = CATALOGO.slice(0, 4).concat(CATALOGO.slice(6));
        this.productContainer.innerHTML = catalogoGeneral.map(p => this.createProductCard(p)).join('');
    },

    toggleCart(state) {
        if (state) {
            this.cartSidebar.classList.add('open');
            this.cartOverlay.classList.add('active');
        } else {
            this.cartSidebar.classList.remove('open');
            this.cartOverlay.classList.remove('active');
        }
    },

    addToCart(id) {
        const prod = CATALOGO.find(p => p.id === id);
        const existing = this.carrito.find(item => item.id === id);
        if (existing) existing.cant += 1;
        else this.carrito.push({ ...prod, cant: 1 });
        this.saveAndRenderCart();
        this.toggleCart(true);
    },

    changeQty(id, delta) {
        const item = this.carrito.find(p => p.id === id);
        if (item) {
            item.cant += delta;
            if (item.cant <= 0) this.removeFromCart(id);
            else this.saveAndRenderCart();
        }
    },

    removeFromCart(id) {
        this.carrito = this.carrito.filter(item => item.id !== id);
        this.saveAndRenderCart();
    },

    saveAndRenderCart() {
        localStorage.setItem('ironcore_cart', JSON.stringify(this.carrito));
        this.updateCartUI();
    },

    updateCartUI() {
        this.cartBadge.innerText = this.carrito.reduce((sum, item) => sum + item.cant, 0);
        
        if (this.carrito.length === 0) {
            this.cartItemsContainer.innerHTML = '<p class="cart-empty">Tu carrito de compras está vacío.</p>';
            this.cartTotal.innerText = '$0 COP';
            return;
        }

        let totalAmount = 0;
        this.cartItemsContainer.innerHTML = this.carrito.map(item => {
            totalAmount += (item.precio * item.cant);
            return `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.nombre}">
                    <div class="cart-item-info">
                        <h4 class="cart-item-title">${item.nombre}</h4>
                        <div class="cart-item-price">${this.formatCOP(item.precio)}</div>
                        <div class="cart-controls">
                            <button class="qty-btn" onclick="app.changeQty(${item.id}, -1)">-</button>
                            <span>${item.cant}</span>
                            <button class="qty-btn" onclick="app.changeQty(${item.id}, 1)">+</button>
                            <button class="del-btn" onclick="app.removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        this.cartTotal.innerText = this.formatCOP(totalAmount);
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());
