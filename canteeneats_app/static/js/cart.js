// static/js/cart.js - Frontend Order Tray Management

let productCatalog = []; // Holds items fetched from database.db
let orderTray = [];      // Holds items the student adds to order

document.addEventListener("DOMContentLoaded", () => {
    initializeMenuGrid();
    setupOrderTrayActions();
});

function initializeMenuGrid() {
    const contentContainer = document.querySelector('.content');
    if (!contentContainer) return; 

    fetch('/api/menu-items')
        .then(res => res.json())
        .then(items => {
            productCatalog = items; 
            renderMenuGrid(items);
        })
        .catch(err => console.error("Error communicating with database menu rows:", err));
}

function renderMenuGrid(items) {
    const contentContainer = document.querySelector('.content');
    
    contentContainer.innerHTML = `
        <h2>Menu Options</h2>
        <p>Select items below to populate your dynamic order tray allocation.</p>
        <div class="menu-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px;">
        </div>
    `;

    const grid = contentContainer.querySelector('.menu-grid');

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.style = "background: white; border: 1px solid #ddd; padding: 15px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); text-align: center;";
        
        let dietaryFlags = [];
        if (item.is_vegetarian) dietaryFlags.push('V');
        if (item.is_gluten_free) dietaryFlags.push('G');
        const flagText = dietaryFlags.length > 0 ? `${dietaryFlags.join(':')}` : '';

        card.innerHTML = `
            <div style="font-weight: bold; font-size: 14px; min-height: 40px; margin-top: 10px;">${item.item_name}</div>
            <div style="display: flex; justify-content: space-between; margin-top: 10px; align-items: center;">
                <span style="font-weight: bold; color: #111;">$${item.price.toFixed(2)}</span>
                <span style="font-size: 11px; color: #888; font-weight: bold;">${flagText}</span>
            </div>
            <button onclick="addItemToTray(${item.id})" style="margin-top: 10px; width: 100%; padding: 6px; background: #222; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">+ Add to Tray</button>
        `;
        grid.appendChild(card);
    });

    appendOrderTrayHTML(contentContainer);
}

function addItemToTray(itemId) {
    const item = productCatalog.find(p => p.id === itemId);
    if (!item) return;

    const existingTrayItem = orderTray.find(trayItem => trayItem.id === itemId);

    if (existingTrayItem) {
        existingTrayItem.quantity += 1;
    } else {
        orderTray.push({
            id: item.id,
            item_name: item.item_name,
            price: item.price,
            quantity: 1
        });
    }
    updateTrayViewportUI();
}

function appendOrderTrayHTML(container) {
    const trayContainer = document.createElement('div');
    trayContainer.id = "order-tray-wrapper";
    trayContainer.style = "border-top: 2px dashed #222; margin-top: 40px; padding-top: 20px;";
    
    trayContainer.innerHTML = `
        <h3 style="text-align: center; text-transform: uppercase;">- Your Order Tray -</h3>
        <div id="tray-items-list" style="margin-bottom: 20px;">
            <p style="color: #666; font-style: italic; text-align: center;">Your tray is empty. Tap elements above to add food.</p>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #ccc; padding-top: 15px;">
            <div>
                <label style="font-weight: bold; margin-right: 10px;">Target Delivery Window:</label>
                <input type="radio" name="target_period" value="Recess" id="p-recess" checked> <label style="margin-right: 10px;" for="p-recess">Recess</label>
                <input type="radio" name="target_period" value="Lunch" id="p-lunch"> <label for="p-lunch">Lunch</label>
            </div>
            <div style="text-align: right;">
                <div style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">Total: <span id="tray-total-price">$0.00</span></div>
                <button id="submit-order-btn" style="padding: 10px 20px; background: #4CAF50; color: white; border: none; font-weight: bold; border-radius: 4px; cursor: pointer;" disabled>Place Prepaid Order</button>
            </div>
        </div>
    `;
    container.appendChild(trayContainer);
}

function updateTrayViewportUI() {
    const itemsList = document.getElementById('tray-items-list');
    const totalPriceSpan = document.getElementById('tray-total-price');
    const submitBtn = document.getElementById('submit-order-btn');
    
    if (!itemsList) return;

    if (orderTray.length === 0) {
        itemsList.innerHTML = `<p style="color: #666; font-style: italic; text-align: center;">Your tray is empty. Tap elements above to add food.</p>`;
        totalPriceSpan.innerText = "$0.00";
        submitBtn.disabled = true;
        return;
    }

    itemsList.innerHTML = '';
    let runningTotal = 0;

    orderTray.forEach(item => {
        const rowCost = item.price * item.quantity;
        runningTotal += rowCost;

        const row = document.createElement('div');
        row.style = "display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee;";
        row.innerHTML = `
            <span><strong>${item.quantity}x</strong> ${item.item_name}</span>
            <span>$${rowCost.toFixed(2)}</span>
        `;
        itemsList.appendChild(row);
    });

    totalPriceSpan.innerText = `$${runningTotal.toFixed(2)}`;
    submitBtn.disabled = false;
}

function setupOrderTrayActions() {
    document.addEventListener('click', (e) => {
        if (e.target && e.target.id === 'submit-order-btn') {
            const selectedPeriod = document.querySelector('input[name="target_period"]:checked').value;
            
            console.log("Processing Canteen Purchase...");
            alert(`Order successful!\nYour items have been allocated for collection during ${selectedPeriod}.`);
            
            orderTray = [];
            updateTrayViewportUI();
        }
    });
}