// Clara's Cottage - Main JavaScript

// ==========================================
// FIREFLIES ANIMATION
// ==========================================
function createFireflies() {
    const container = document.getElementById('fireflies');
    if (!container) return;
    
    for (let i = 0; i < 15; i++) {
        const firefly = document.createElement('div');
        firefly.className = 'firefly';
        firefly.style.left = Math.random() * 100 + '%';
        firefly.style.top = Math.random() * 100 + '%';
        firefly.style.animationDelay = Math.random() * 6 + 's';
        firefly.style.animationDuration = (4 + Math.random() * 4) + 's';
        container.appendChild(firefly);
    }
}

// ==========================================
// SETTINGS (Font customization)
// ==========================================
function getSettings() {
    const saved = localStorage.getItem('claras-settings');
    return saved ? JSON.parse(saved) : {
        font: "'Caveat', cursive",
        size: "1.4"
    };
}

function saveSettingsData(settings) {
    localStorage.setItem('claras-settings', JSON.stringify(settings));
}

function applySettings() {
    const settings = getSettings();
    document.documentElement.style.setProperty('--chalk-font', settings.font);
    document.documentElement.style.setProperty('--chalk-size', settings.size + 'rem');
    document.documentElement.style.setProperty('--chalk-title-size', (parseFloat(settings.size) * 2.5) + 'rem');
}

function loadSettings() {
    const settings = getSettings();
    const fontSelect = document.getElementById('font-select');
    const sizeSlider = document.getElementById('size-slider');
    
    if (fontSelect) {
        fontSelect.value = settings.font;
    }
    if (sizeSlider) {
        sizeSlider.value = settings.size;
        document.getElementById('size-display').textContent = settings.size + 'rem';
    }
    
    updateFontPreview();
}

function updateFontPreview() {
    const fontSelect = document.getElementById('font-select');
    const sizeSlider = document.getElementById('size-slider');
    const preview = document.getElementById('font-preview');
    const sizeDisplay = document.getElementById('size-display');
    
    if (!fontSelect || !sizeSlider || !preview) return;
    
    const font = fontSelect.value;
    const size = sizeSlider.value;
    
    preview.style.fontFamily = font;
    preview.querySelectorAll('.font-preview-text').forEach(el => {
        el.style.fontSize = size + 'rem';
    });
    
    if (sizeDisplay) {
        sizeDisplay.textContent = size + 'rem';
    }
}

function saveSettings() {
    const fontSelect = document.getElementById('font-select');
    const sizeSlider = document.getElementById('size-slider');
    
    const settings = {
        font: fontSelect.value,
        size: sizeSlider.value
    };
    
    saveSettingsData(settings);
    applySettings();
    alert('Font settings saved! 🎨');
}

// ==========================================
// MENU DATA & MANAGEMENT (Baked Goods)
// ==========================================
const defaultMenu = {
    cookies: [
        { name: 'Classic Chocolate Chip', price: '3.50' },
        { name: 'Double Fudge Brownie', price: '4.00' },
        { name: 'Oatmeal Raisin', price: '3.00' },
        { name: 'Snickerdoodle', price: '3.00' },
        { name: 'Peanut Butter Bliss', price: '3.50' }
    ],
    cakes: [
        { name: 'Birthday Cake (6")', price: '35.00' },
        { name: 'Carrot Cake Slice', price: '6.00' },
        { name: 'Lemon Drizzle Loaf', price: '18.00' },
        { name: 'Cupcakes (6 pack)', price: '15.00' }
    ],
    breads: [
        { name: 'Sourdough Boule', price: '8.00' },
        { name: 'Cinnamon Swirl', price: '7.00' },
        { name: 'Focaccia (herbs)', price: '9.00' },
        { name: 'Honey Wheat', price: '6.00' }
    ]
};

function getMenu() {
    const saved = localStorage.getItem('claras-menu');
    return saved ? JSON.parse(saved) : defaultMenu;
}

function saveMenuData(menu) {
    localStorage.setItem('claras-menu', JSON.stringify(menu));
}

// ==========================================
// FLOWERS DATA & MANAGEMENT
// ==========================================
const defaultFlowers = {
    seasonal: [
        { name: 'Sunflowers', price: '4.00/stem' },
        { name: 'Dahlias', price: '5.00/stem' },
        { name: 'Zinnias (bunch)', price: '8.00' },
        { name: 'Lavender (bunch)', price: '6.00' },
        { name: 'Sweet Peas', price: '7.00/bunch' }
    ],
    bouquets: [
        { name: 'Garden Mix (small)', price: '25.00' },
        { name: 'Garden Mix (large)', price: '45.00' },
        { name: 'Wildflower Bouquet', price: '35.00' },
        { name: 'Romantic Rose Mix', price: '50.00' },
        { name: 'Custom Arrangement', price: 'from $30' }
    ]
};

function getFlowers() {
    const saved = localStorage.getItem('claras-flowers');
    return saved ? JSON.parse(saved) : defaultFlowers;
}

function saveFlowersData(flowers) {
    localStorage.setItem('claras-flowers', JSON.stringify(flowers));
}

// ==========================================
// MENU DISPLAY (Chalkboard - Baked Goods)
// ==========================================
function displayMenu() {
    const container = document.getElementById('menu-display');
    if (!container) return;
    
    applySettings();
    const menu = getMenu();
    let html = '';
    
    const sections = [
        { key: 'cookies', title: '🍪 Cookies & Brownies' },
        { key: 'cakes', title: '🎂 Cakes & Treats' },
        { key: 'breads', title: '🥖 Artisan Breads' }
    ];
    
    sections.forEach(section => {
        if (menu[section.key] && menu[section.key].length > 0) {
            html += `<div class="menu-section">
                <h3>${section.title}</h3>`;
            
            menu[section.key].forEach(item => {
                html += `<div class="menu-item">
                    <span class="name">${item.name}</span>
                    <span class="dots"></span>
                    <span class="price">$${item.price}</span>
                </div>`;
            });
            
            html += '</div>';
        }
    });
    
    container.innerHTML = html;
}

// ==========================================
// FLOWERS DISPLAY (Chalkboard)
// ==========================================
function displayFlowers() {
    const container = document.getElementById('flowers-display');
    if (!container) return;
    
    applySettings();
    const flowers = getFlowers();
    let html = '';
    
    const sections = [
        { key: 'seasonal', title: '🌷 Seasonal Blooms' },
        { key: 'bouquets', title: '💐 Bouquets & Arrangements' }
    ];
    
    sections.forEach(section => {
        if (flowers[section.key] && flowers[section.key].length > 0) {
            html += `<div class="menu-section">
                <h3>${section.title}</h3>`;
            
            flowers[section.key].forEach(item => {
                html += `<div class="menu-item">
                    <span class="name">${item.name}</span>
                    <span class="dots"></span>
                    <span class="price">${item.price.startsWith('$') || item.price.startsWith('from') ? item.price : '$' + item.price}</span>
                </div>`;
            });
            
            html += '</div>';
        }
    });
    
    container.innerHTML = html;
}

// ==========================================
// MENU EDITOR (Admin - Baked Goods)
// ==========================================
function loadMenuEditor() {
    const menu = getMenu();
    
    ['cookies', 'cakes', 'breads'].forEach(category => {
        const tbody = document.querySelector(`#${category}-table tbody`);
        if (!tbody) return;
        
        tbody.innerHTML = '';
        menu[category].forEach((item, index) => {
            addMenuRow(tbody, category, item.name, item.price, index);
        });
    });
}

function addMenuRow(tbody, category, name = '', price = '', index = null) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" value="${name}" placeholder="Item name..." class="name-input"></td>
        <td><input type="text" value="${price}" placeholder="0.00" class="price-input"></td>
        <td><button class="btn-delete" onclick="this.closest('tr').remove()">🗑️ Remove</button></td>
    `;
    tbody.appendChild(row);
}

function addMenuItem(category) {
    const tbody = document.querySelector(`#${category}-table tbody`);
    addMenuRow(tbody, category);
}

function saveMenu() {
    const menu = { cookies: [], cakes: [], breads: [] };
    
    ['cookies', 'cakes', 'breads'].forEach(category => {
        const rows = document.querySelectorAll(`#${category}-table tbody tr`);
        rows.forEach(row => {
            const name = row.querySelector('.name-input').value.trim();
            const price = row.querySelector('.price-input').value.trim();
            if (name && price) {
                menu[category].push({ name, price });
            }
        });
    });
    
    saveMenuData(menu);
    alert('Baked goods menu saved! 🍪');
}

// ==========================================
// FLOWERS EDITOR (Admin)
// ==========================================
function loadFlowersEditor() {
    const flowers = getFlowers();
    
    ['seasonal', 'bouquets'].forEach(category => {
        const tbody = document.querySelector(`#${category}-table tbody`);
        if (!tbody) return;
        
        tbody.innerHTML = '';
        flowers[category].forEach((item, index) => {
            addFlowerRow(tbody, category, item.name, item.price, index);
        });
    });
}

function addFlowerRow(tbody, category, name = '', price = '', index = null) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" value="${name}" placeholder="Flower name..." class="name-input"></td>
        <td><input type="text" value="${price}" placeholder="0.00" class="price-input"></td>
        <td><button class="btn-delete" onclick="this.closest('tr').remove()">🗑️ Remove</button></td>
    `;
    tbody.appendChild(row);
}

function addFlowerItem(category) {
    const tbody = document.querySelector(`#${category}-table tbody`);
    addFlowerRow(tbody, category);
}

function saveFlowers() {
    const flowers = { seasonal: [], bouquets: [] };
    
    ['seasonal', 'bouquets'].forEach(category => {
        const rows = document.querySelectorAll(`#${category}-table tbody tr`);
        rows.forEach(row => {
            const name = row.querySelector('.name-input').value.trim();
            const price = row.querySelector('.price-input').value.trim();
            if (name && price) {
                flowers[category].push({ name, price });
            }
        });
    });
    
    saveFlowersData(flowers);
    alert('Flowers menu saved! 🌸');
}

// ==========================================
// KANBAN BOARD - DUAL BOARDS (Business + Personal)
// ==========================================

const defaultBusinessTasks = {
    todo: [
        { id: 1, title: 'Register with county environmental health', desc: 'CA cottage food requirement' },
        { id: 2, title: 'Complete CA cottage food registration', desc: 'File with CalCode' },
        { id: 3, title: 'Complete AB 626 food safety training', desc: 'Required online course' },
        { id: 4, title: 'Create product labels', desc: 'Ingredients, allergens, "Made in Home Kitchen"' },
        { id: 5, title: 'Photograph signature products', desc: 'Cookies, brownies, cakes for website' },
        { id: 6, title: 'Design logo with artist', desc: 'Bohemian cottage style' },
        { id: 7, title: 'Set up Instagram account', desc: '@clarascottage' },
        { id: 8, title: 'Research payment solutions', desc: 'Square, Stripe, etc.' },
        { id: 9, title: 'Get business license', desc: 'Check city requirements' },
        { id: 10, title: 'Set up accounting system', desc: 'Track sales & expenses' }
    ],
    doing: [],
    done: []
};

const defaultPersonalTasks = {
    todo: [
        { id: 101, title: 'Example personal task', desc: 'Add your own tasks here' }
    ],
    doing: [],
    done: []
};

function getTasks(board) {
    const key = `claras-tasks-${board}`;
    const saved = localStorage.getItem(key);
    if (saved) return JSON.parse(saved);
    return board === 'business' ? defaultBusinessTasks : defaultPersonalTasks;
}

function saveTasks(board, tasks) {
    const key = `claras-tasks-${board}`;
    localStorage.setItem(key, JSON.stringify(tasks));
}

function loadKanban() {
    ['business', 'personal'].forEach(board => {
        const tasks = getTasks(board);
        
        ['todo', 'doing', 'done'].forEach(status => {
            const container = document.querySelector(`[data-board="${board}"][data-status="${status}"]`);
            if (!container) return;
            
            container.innerHTML = '';
            tasks[status].forEach(task => {
                const card = createCardElement(task, board);
                container.appendChild(card);
            });
        });
    });
    
    initDragAndDrop();
}

function createCardElement(task, board) {
    const card = document.createElement('div');
    card.className = 'kanban-card';
    card.draggable = true;
    card.dataset.id = task.id;
    card.dataset.board = board;
    
    card.innerHTML = `
        <button class="delete-card" onclick="deleteCard('${board}', ${task.id})">×</button>
        <div class="card-title">${task.title}</div>
        ${task.desc ? `<div class="card-desc">${task.desc}</div>` : ''}
    `;
    
    return card;
}

function addCard(board, status) {
    const input = document.getElementById(`${board}-${status}-input`);
    const title = input.value.trim();
    if (!title) return;
    
    const tasks = getTasks(board);
    const newId = Date.now();
    tasks[status].push({ id: newId, title: title, desc: '' });
    saveTasks(board, tasks);
    
    const container = document.querySelector(`[data-board="${board}"][data-status="${status}"]`);
    const card = createCardElement({ id: newId, title: title }, board);
    container.appendChild(card);
    
    input.value = '';
    initDragAndDrop();
}

function handleCardEnter(event, board, status) {
    if (event.key === 'Enter') {
        addCard(board, status);
    }
}

function deleteCard(board, id) {
    const tasks = getTasks(board);
    ['todo', 'doing', 'done'].forEach(status => {
        tasks[status] = tasks[status].filter(t => t.id !== id);
    });
    saveTasks(board, tasks);
    loadKanban();
}

function switchBoard(board) {
    // Update tabs
    document.querySelectorAll('.board-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector(`.board-tab.${board}`).classList.add('active');
    
    // Update boards
    document.querySelectorAll('.kanban-wrapper').forEach(wrapper => wrapper.classList.remove('active'));
    document.getElementById(`${board}-board`).classList.add('active');
}

function initDragAndDrop() {
    const cards = document.querySelectorAll('.kanban-card');
    const columns = document.querySelectorAll('.kanban-cards');
    
    cards.forEach(card => {
        card.addEventListener('dragstart', () => {
            card.classList.add('dragging');
        });
        
        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
            updateTasksFromDOM();
        });
    });
    
    columns.forEach(column => {
        column.addEventListener('dragover', e => {
            e.preventDefault();
            const dragging = document.querySelector('.dragging');
            if (!dragging) return;
            
            // Only allow dropping in same board
            if (dragging.dataset.board !== column.dataset.board) return;
            
            const afterElement = getDragAfterElement(column, e.clientY);
            
            if (afterElement) {
                column.insertBefore(dragging, afterElement);
            } else {
                column.appendChild(dragging);
            }
        });
    });
}

function getDragAfterElement(column, y) {
    const cards = [...column.querySelectorAll('.kanban-card:not(.dragging)')];
    
    return cards.reduce((closest, card) => {
        const box = card.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: card };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function updateTasksFromDOM() {
    ['business', 'personal'].forEach(board => {
        const tasks = { todo: [], doing: [], done: [] };
        
        ['todo', 'doing', 'done'].forEach(status => {
            const cards = document.querySelectorAll(`[data-board="${board}"][data-status="${status}"] .kanban-card`);
            cards.forEach(card => {
                const id = parseInt(card.dataset.id);
                const title = card.querySelector('.card-title').textContent;
                const descEl = card.querySelector('.card-desc');
                const desc = descEl ? descEl.textContent : '';
                tasks[status].push({ id, title, desc });
            });
        });
        
        saveTasks(board, tasks);
    });
}

// ==========================================
// ADMIN UI
// ==========================================
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    event.target.classList.add('active');
}

// ==========================================
// SHOPPING CART
// ==========================================
function getCart() {
    return JSON.parse(localStorage.getItem('claras-cart') || '[]');
}

function saveCart(cart) {
    localStorage.setItem('claras-cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll('#cart-count, .cart-count').forEach(el => {
        el.textContent = count;
    });
}

function addToCart(name, price, category) {
    const cart = getCart();
    const existing = cart.find(item => item.name === name);
    
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price: parseFloat(price), qty: 1, category });
    }
    
    saveCart(cart);
    
    // Show feedback
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✓ Added!';
    btn.style.background = 'var(--sage)';
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 1000);
}

function updateQty(name, delta) {
    const cart = getCart();
    const item = cart.find(i => i.name === name);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            const idx = cart.indexOf(item);
            cart.splice(idx, 1);
        }
    }
    saveCart(cart);
    renderCart();
}

function removeFromCart(name) {
    let cart = getCart();
    cart = cart.filter(item => item.name !== name);
    saveCart(cart);
    renderCart();
}

function calculateTotal(cart) {
    return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function renderCart() {
    const cart = getCart();
    const emptyEl = document.getElementById('cart-empty');
    const contentEl = document.getElementById('cart-content');
    const itemsEl = document.getElementById('cart-items');
    
    if (!emptyEl || !contentEl || !itemsEl) return;
    
    if (cart.length === 0) {
        emptyEl.style.display = 'block';
        contentEl.style.display = 'none';
        return;
    }
    
    emptyEl.style.display = 'none';
    contentEl.style.display = 'block';
    
    itemsEl.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-price">$${item.price.toFixed(2)} each</div>
            </div>
            <div class="item-qty">
                <button class="qty-btn" onclick="updateQty('${item.name}', -1)">−</button>
                <span class="qty-num">${item.qty}</span>
                <button class="qty-btn" onclick="updateQty('${item.name}', 1)">+</button>
            </div>
            <div class="item-total">$${(item.price * item.qty).toFixed(2)}</div>
            <button class="remove-btn" onclick="removeFromCart('${item.name}')">🗑️</button>
        </div>
    `).join('');
    
    const total = calculateTotal(cart);
    document.getElementById('subtotal').textContent = '$' + total.toFixed(2);
    document.getElementById('total').textContent = '$' + total.toFixed(2);
    
    updateCartCount();
}

// ==========================================
// MENU DISPLAY WITH ADD TO CART
// ==========================================
function displayMenuWithCart() {
    const container = document.getElementById('menu-display');
    if (!container) return;
    
    applySettings();
    const menu = getMenu();
    let html = '';
    
    const sections = [
        { key: 'cookies', title: '🍪 Cookies & Brownies' },
        { key: 'cakes', title: '🎂 Cakes & Treats' },
        { key: 'breads', title: '🥖 Artisan Breads' }
    ];
    
    sections.forEach(section => {
        if (menu[section.key] && menu[section.key].length > 0) {
            html += `<div class="menu-section">
                <h3>${section.title}</h3>`;
            
            menu[section.key].forEach(item => {
                const priceNum = item.price.replace(/[^0-9.]/g, '');
                html += `<div class="menu-item" style="flex-wrap: wrap; gap: 0.5rem;">
                    <span class="name">${item.name}</span>
                    <span class="dots"></span>
                    <span class="price">$${item.price}</span>
                    <button onclick="addToCart('${item.name.replace(/'/g, "\\'")}', '${priceNum}', 'baked')" 
                            style="background: var(--gold-light); border: none; padding: 0.3rem 0.8rem; 
                                   border-radius: 15px; font-family: var(--font-script); font-size: 1rem;
                                   cursor: pointer; margin-left: 0.5rem; transition: all 0.2s;">
                        + Add
                    </button>
                </div>`;
            });
            
            html += '</div>';
        }
    });
    
    container.innerHTML = html;
}

function displayFlowersWithCart() {
    const container = document.getElementById('flowers-display');
    if (!container) return;
    
    applySettings();
    const flowers = getFlowers();
    let html = '';
    
    const sections = [
        { key: 'seasonal', title: '🌷 Seasonal Blooms' },
        { key: 'bouquets', title: '💐 Bouquets & Arrangements' }
    ];
    
    sections.forEach(section => {
        if (flowers[section.key] && flowers[section.key].length > 0) {
            html += `<div class="menu-section">
                <h3>${section.title}</h3>`;
            
            flowers[section.key].forEach(item => {
                const priceStr = item.price.replace(/[^0-9.]/g, '') || '0';
                const displayPrice = item.price.startsWith('$') || item.price.startsWith('from') ? item.price : '$' + item.price;
                html += `<div class="menu-item" style="flex-wrap: wrap; gap: 0.5rem;">
                    <span class="name">${item.name}</span>
                    <span class="dots"></span>
                    <span class="price">${displayPrice}</span>
                    <button onclick="addToCart('${item.name.replace(/'/g, "\\'")}', '${priceStr}', 'flowers')" 
                            style="background: var(--rose-light); border: none; padding: 0.3rem 0.8rem; 
                                   border-radius: 15px; font-family: var(--font-script); font-size: 1rem;
                                   cursor: pointer; margin-left: 0.5rem; transition: all 0.2s;">
                        + Add
                    </button>
                </div>`;
            });
            
            html += '</div>';
        }
    });
    
    container.innerHTML = html;
}

// ==========================================
// INITIALIZE
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    createFireflies();
    applySettings();
    
    // Use cart-enabled display if on menu pages
    if (document.getElementById('menu-display')) {
        displayMenuWithCart();
    } else {
        displayMenu();
    }
    
    if (document.getElementById('flowers-display')) {
        displayFlowersWithCart();
    } else {
        displayFlowers();
    }
    
    updateCartCount();
});
