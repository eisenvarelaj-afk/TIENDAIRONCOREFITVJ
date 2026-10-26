const CATALOGO = [
    { id: 1, nombre: 'Proteína Whey Isolate H.I.T. 5lbs', precio: 220000, oldPrecio: null, categoria: 'Suplementos deportivos', img: 'https://images.unsplash.com/photo-1579722820308-d7cc05e2439a?auto=format&fit=crop&w=800&q=80', etiqueta: 'Destacado', desc: 'Aporta 25g de proteína limpia por servicio. Absorción ultrarrápida post-entrenamiento.' },
    { id: 2, nombre: 'Creatina Monohidratada Pura 500g', precio: 95000, oldPrecio: 125000, categoria: 'Suplementos deportivos', img: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80', etiqueta: '-24%', desc: 'Incrementa la producción de ATP, fuerza explosiva y volumen celular intracelular.' },
    { id: 3, nombre: 'Pre-Entreno Ignite Core 30 Serv', precio: 115000, oldPrecio: null, categoria: 'Suplementos deportivos', img: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=800&q=80', etiqueta: 'Nuevo', desc: 'Fórmula avanzada con 300mg de cafeína y citrulina para máxima concentración y bombeo.' },
    { id: 4, nombre: 'BCAA + Glutamina Recovery Core', precio: 85000, oldPrecio: null, categoria: 'Suplementos deportivos', img: 'https://images.unsplash.com/photo-1511135232973-c3ee80040060?auto=format&fit=crop&w=800&q=80', etiqueta: '', desc: 'Evita el catabolismo muscular en sesiones de alta intensidad. Ratio 2:1:1.' },
    
    { id: 5, nombre: 'Mancuernas Ajustables Pro (Hasta 30kg)', precio: 450000, oldPrecio: 580000, categoria: 'Pesas y accesorios', img: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80', etiqueta: '-22%', desc: 'Sistema de ajuste por dial de acero. Reemplaza 15 pares de mancuernas tradicionales.' },
    { id: 6, nombre: 'Par Mancuernas Hexagonales Caucho 20kg', precio: 220000, oldPrecio: null, categoria: 'Pesas y accesorios', img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80', etiqueta: 'Más Vendido', desc: 'Diseño anti-rodadura con núcleo de hierro fundido sólido y mango ergonómico cromado.' },
    { id: 7, nombre: 'Barra Olímpica Profesional 20kg', precio: 380000, oldPrecio: null, categoria: 'Pesas y accesorios', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80', etiqueta: '', desc: 'Acero de alta tensión (190k PSI) con rodamientos de aguja, ideal para powerlifting.' },
    { id: 8, nombre: 'Discos Olímpicos Bumper (Par 20kg)', precio: 290000, oldPrecio: null, categoria: 'Pesas y accesorios', img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80', etiqueta: '', desc: 'Caucho virgen de alta densidad para absorción de impacto en levantamientos pesados.' },
    
    { id: 9, nombre: 'Torre Polea Alta / Baja Comercial', precio: 1450000, oldPrecio: 1750000, categoria: 'Máquinas y equipamiento', img: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80', etiqueta: '-17%', desc: 'Construye una espalda en V con control biomecánico total. Incluye bloque de 100kg.' },
    { id: 10, nombre: 'Banco Ajustable Inclinable (300kg)', precio: 340000, oldPrecio: null, categoria: 'Máquinas y equipamiento', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80', etiqueta: 'Esencial', desc: 'Estructura tubular de acero comercial. Ángulos desde declinado hasta 90°.' },
    { id: 11, nombre: 'Prensa de Piernas 45° IronCore', precio: 2800000, oldPrecio: null, categoria: 'Máquinas y equipamiento', img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80', etiqueta: 'Premium', desc: 'Rieles de acero lineal para movimientos ultra fluidos con cargas masivas. Capacidad 500kg.' },
    { id: 12, nombre: 'Rack de Sentadillas PowerCage', precio: 1150000, oldPrecio: 1350000, categoria: 'Máquinas y equipamiento', img: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80', etiqueta: '-15%', desc: 'Seguridad total para entrenar al fallo. Incluye barras de seguridad y barra de dominadas.' }
];

const app = {
    carrito: JSON.parse(localStorage.getItem('ironcore_cart')) || [],
    
    init() {
        this.cacheDOM();
        this.bindEvents();
        this.renderCatalog(CATALOGO);
        this.renderPromotions();
        this.updateCartUI();
    },

    cacheDOM() {
        this.productContainer = document.getElementById('productContainer');
        this.promoContainer = document.getElementById('promoContainer');
        this.searchInput = document.getElementById('searchInput');
        this.categoryFilter = document.getElementById('categoryFilter');
        this.cartSidebar = document.getElementById('cartSidebar');
        this.cartOverlay = document.getElementById('cartOverlay');
        this.cartOpenBtn = document.getElementById('cartOpenBtn');
        this.cartCloseBtn = document.getElementById('cartCloseBtn');
        this.cartItemsContainer = document.getElementById('cartItemsContainer');
        this.cartBadge = document.getElementById('cartBadge');
        this.cartTotal = document.getElementById('cartTotal');
        this.contactForm = document.getElementById('contactForm');
    },

    bindEvents() {
        this.searchInput.addEventListener('input', () => this.filterProducts());
        this.categoryFilter.addEventListener('change', () => this.filterProducts());
        
        this.cartOpenBtn.addEventListener('click', () => this.toggleCart(true));
        this.cartCloseBtn.addEventListener('click', () => this.toggleCart(false));
        this.cartOverlay.addEventListener('click', () => this.toggleCart(false));
        
        // Simulación Profesional del Formulario con FETCH
        this.contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btnSubmit = this.contactForm.querySelector('button');
            const originalText = btnSubmit.innerText;
            btnSubmit.innerText = "Procesando...";
            btnSubmit.disabled = true;

            const payload = {
                nombre: document.getElementById('nombreContacto').value,
                correo: document.getElementById('correoContacto').value,
                mensaje: document.getElementById('mensajeContacto').value
            };

            try {
                // Reemplaza esta URL con tu webhook de Google Sheets o Formspree
                const response = await fetch('https://formspree.io/f/TU_CODIGO_AQUI', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                alert('Cotización enviada exitosamente. Un agente comercial te contactará en breve.');
            } catch (error) {
                // Bloque fallback para simulación (ya que el link es ficticio)
                setTimeout(() => {
                    alert('[Modo Simulación] Formulario procesado correctamente en el entorno de pruebas.');
                    this.contactForm.reset();
                    btnSubmit.innerText = originalText;
                    btnSubmit.disabled = false;
                }, 800);
            }
        });
    },

    formatCOP(price) {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price);
    },

    createProductCard(prod) {
        let badgeClass = prod.etiqueta.includes('%') ? 'discount' : '';
        let badgeHtml = prod.etiqueta ? `<span class="badge ${badgeClass}">${prod.etiqueta}</span>` : '';
        
        let priceHtml = prod.oldPrecio 
            ? `<span class="price-old">${this.formatCOP(prod.oldPrecio)}</span><span class="price-current highlight">${this.formatCOP(prod.precio)}</span>`
            : `<span class="price-current">${this.formatCOP(prod.precio)}</span>`;

        return `
            <div class="product-card">
                <div class="product-badges">${badgeHtml}</div>
                <div class="product-img"><img src="${prod.img}" alt="${prod.nombre}" loading="lazy"></div>
                <div class="product-info">
                    <span class="product-category">${prod.categoria}</span>
                    <h3 class="product-title">${prod.nombre}</h3>
                    <p class="product-desc">${prod.desc}</p>
                    <div class="product-price-box">${priceHtml}</div>
                    <button class="btn btn-primary btn-block" onclick="app.addToCart(${prod.id})">
                        <i class="fas fa-cart-plus"></i> Agregar al Carrito
                    </button>
                </div>
            </div>
        `;
    },

    renderCatalog(products) {
        if (products.length === 0) {
            this.productContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); padding: 40px;">No se encontraron equipos en esta categoría.</p>';
            return;
        }
        this.productContainer.innerHTML = products.map(p => this.createProductCard(p)).join('');
    },

    renderPromotions() {
        const promos = CATALOGO.filter(p => p.oldPrecio !== null).slice(0, 4);
        this.promoContainer.innerHTML = promos.map(p => this.createProductCard(p)).join('');
    },

    filterProducts() {
        const term = this.searchInput.value.toLowerCase();
        const cat = this.categoryFilter.value;
        const filtered = CATALOGO.filter(p => {
            return (p.nombre.toLowerCase().includes(term) || p.desc.toLowerCase().includes(term)) &&
                   (cat === 'Todos' || p.categoria === cat);
        });
        this.renderCatalog(filtered);
    },

    filterByCategory(categoryName) {
        this.categoryFilter.value = categoryName;
        this.searchInput.value = '';
        this.filterProducts();
        document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
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
            this.cartTotal.innerText = '$0';
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