// ===== APP STATE =====
let appState = {
    collection: {},
    packs: 0,
    lastFreePackTime: null
};

// ===== INITIALIZATION =====
function init() {
    loadState();
    updateStats();
    updateFreePackTimer();
    setInterval(updateFreePackTimer, 1000);
    renderCollection();
}

// ===== STATE MANAGEMENT =====
function loadState() {
    const saved = localStorage.getItem('gooner_tcg_state');
    if (saved) {
        appState = JSON.parse(saved);
    } else {
        // Initialize with 20 free packs for testing
        appState = {
            collection: {},
            packs: 20,
            lastFreePackTime: null
        };
        saveState();
    }
}

function saveState() {
    localStorage.setItem('gooner_tcg_state', JSON.stringify(appState));
}

// ===== PACK OPENING =====
function openPack() {
    if (appState.packs <= 0) {
        alert('No packs available! Buy more or wait for your free pack.');
        return;
    }

    appState.packs--;
    saveState();
    
    const packSize = getPackSize();
    const newCards = [];
    
    for (let i = 0; i < packSize; i++) {
        const card = getRandomCardFromPack();
        newCards.push(card);
        addToCollection(card.id);
    }
    
    showPackOpening(newCards);
    updateStats();
}

function showPackOpening(cards) {
    const modal = document.getElementById('packModal');
    const packContainer = document.getElementById('packContainer');
    const cardsReveal = document.getElementById('cardsReveal');
    const doneBtn = document.getElementById('doneBtn');
    
    modal.classList.remove('hidden');
    packContainer.innerHTML = '<div class="pack-visual">📦</div>';
    cardsReveal.innerHTML = '';
    doneBtn.style.display = 'none';
    
    // Play pack opening animation
    setTimeout(() => {
        playPackOpenAnimation(packContainer, cards, cardsReveal, doneBtn);
    }, 500);
}

function playPackOpenAnimation(packContainer, cards, cardsReveal, doneBtn) {
    packContainer.innerHTML = '<div class="pack-visual" style="animation: packExplode 0.6s ease; opacity: 0;">💥</div>';
    
    // Reveal cards one by one
    cards.forEach((card, index) => {
        setTimeout(() => {
            revealCard(card, cardsReveal, index);
        }, 200 + index * 400);
    });
    
    // Show done button after all cards revealed
    setTimeout(() => {
        doneBtn.style.display = 'block';
        doneBtn.style.animation = 'fadeIn 0.3s ease';
    }, 200 + cards.length * 400);
}

function revealCard(card, container, index) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'reveal-card';
    cardDiv.style.animation = `fadeIn 0.3s ease ${index * 50}ms`;
    
    const rarityColor = getRarityColor(card.rarity);
    
    cardDiv.innerHTML = `
        <div class="reveal-card-inner">
            <div class="reveal-card-front">?</div>
            <div class="reveal-card-back" style="background: linear-gradient(135deg, ${rarityColor}22 0%, ${rarityColor}11 100%); border-color: ${rarityColor};">
                <img src="${card.image}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">
            </div>
        </div>
    `;
    
    container.appendChild(cardDiv);
    
    // Flip animation
    setTimeout(() => {
        const inner = cardDiv.querySelector('.reveal-card-inner');
        inner.classList.add('flipped');
        
        // Add glow effect
        setTimeout(() => {
            cardDiv.classList.add(`card-glow-${card.rarity}`);
        }, 300);
    }, 200);
}

function closePack() {
    document.getElementById('packModal').classList.add('hidden');
    document.getElementById('cardsReveal').innerHTML = '';
}

// ===== COLLECTION =====
function addToCollection(cardId) {
    if (!appState.collection[cardId]) {
        appState.collection[cardId] = 0;
    }
    appState.collection[cardId]++;
    saveState();
}

function hasCard(cardId) {
    return appState.collection[cardId] && appState.collection[cardId] > 0;
}

function getCardCount(cardId) {
    return appState.collection[cardId] || 0;
}

function getTotalCardsCollected() {
    return Object.values(appState.collection).reduce((sum, count) => sum + count, 0);
}

function getUniqueCardsCollected() {
    return Object.keys(appState.collection).filter(id => appState.collection[id] > 0).length;
}

// ===== UI UPDATES =====
function updateStats() {
    const collected = getUniqueCardsCollected();
    const total = CARDS.length;
    const percent = Math.round((collected / total) * 100);
    
    document.getElementById('packsCount').textContent = appState.packs;
    document.getElementById('cardsCollected').textContent = `${collected}/${total}`;
    document.getElementById('collectionPercent').textContent = `${percent}%`;
    document.getElementById('progressFill').style.width = `${percent}%`;
    document.getElementById('freePacks').textContent = appState.packs;
}

function updateFreePackTimer() {
    const now = Date.now();
    const nextFreeTime = appState.lastFreePackTime ? appState.lastFreePackTime + (24 * 60 * 60 * 1000) : null;
    
    const timerEl = document.getElementById('freePackTimer');
    const statusEl = document.getElementById('freePackStatus');
    const nextFreeEl = document.getElementById('nextFreeStatus');
    
    if (!nextFreeTime || now >= nextFreeTime) {
        if (timerEl) timerEl.textContent = '00:00:00';
        if (statusEl) statusEl.innerHTML = '✅ <strong>Free pack available!</strong>';
        if (nextFreeEl) nextFreeEl.innerHTML = '✅ <strong>Free pack ready to claim!</strong>';
    } else {
        const remaining = nextFreeTime - now;
        const hours = Math.floor(remaining / (60 * 60 * 1000));
        const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((remaining % (60 * 1000)) / 1000);
        
        const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        if (timerEl) timerEl.textContent = timeStr;
        if (nextFreeEl) nextFreeEl.textContent = `Next free pack in: ${timeStr}`;
    }
}

function claimFreepack() {
    const now = Date.now();
    const nextFreeTime = appState.lastFreePackTime ? appState.lastFreePackTime + (24 * 60 * 60 * 1000) : null;
    
    if (nextFreeTime && now < nextFreeTime) {
        alert('You already claimed your free pack! Come back later.');
        return;
    }
    
    appState.packs++;
    appState.lastFreePackTime = now;
    saveState();
    updateStats();
    updateFreePackTimer();
    alert('🎁 Free pack claimed! Head to the home page to open it.');
}

// ===== COLLECTION PAGE =====
let currentFilter = 'all';

function filterCards(rarity) {
    currentFilter = rarity;
    
    // Update button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    renderCollection();
}

function renderCollection() {
    const grid = document.getElementById('collectionGrid');
    grid.innerHTML = '';
    
    let cardsToShow = CARDS;
    if (currentFilter !== 'all') {
        cardsToShow = CARDS.filter(card => card.rarity === currentFilter);
    }
    
    cardsToShow.forEach(card => {
        const cardEl = createCardElement(card);
        grid.appendChild(cardEl);
    });
}

function createCardElement(card) {
    const div = document.createElement('div');
    div.className = `card ${!hasCard(card.id) ? 'unowned' : ''}`;
    
    if (hasCard(card.id)) {
        div.style.cursor = 'pointer';
        div.onclick = () => showCardDetail(card);
    }
    
    const rarityColor = getRarityColor(card.rarity);
    
    div.innerHTML = `
        <div class="card-image">
            ${hasCard(card.id) ? `<img src="${card.image}" alt="${card.name}">` : '<div style="width: 100%; height: 100%; background: linear-gradient(135deg, #2a2a4e 0%, #1a1a2e 100%); display: flex; align-items: center; justify-content: center; color: var(--text-secondary);">?</div>'}
        </div>
        <div class="card-info">
            <div class="card-name">${card.name}</div>
            <div class="card-number">#${String(card.id).padStart(3, '0')} • ${card.set}</div>
            <div class="card-rarity rarity-${card.rarity}">${card.rarity.replace('-', ' ').toUpperCase()}</div>
        </div>
    `;
    
    return div;
}

// ===== CARD DETAIL MODAL =====
function showCardDetail(card) {
    const modal = document.getElementById('cardModal');
    const content = document.getElementById('cardDetailContent');
    
    const rarityColor = getRarityColor(card.rarity);
    
    content.innerHTML = `
        <div class="card-detail-image">
            <img src="${card.image}" alt="${card.name}">
        </div>
        <div class="card-detail-info">
            <div class="card-detail-name">${card.name}</div>
            <div class="card-detail-set">${card.set}</div>
            <div class="card-detail-rarity card-rarity rarity-${card.rarity}">${card.rarity.replace('-', ' ').toUpperCase()}</div>
            
            <div class="card-detail-stats">
                <div class="stat-item">
                    <div class="stat-item-label">Card #</div>
                    <div class="stat-item-value">${String(card.id).padStart(3, '0')}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-item-label">Owned</div>
                    <div class="stat-item-value">${getCardCount(card.id)}</div>
                </div>
            </div>
            
            <div class="card-detail-desc">"${card.description}"</div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function closeCard() {
    document.getElementById('cardModal').classList.add('hidden');
}

// ===== PAGE NAVIGATION =====
function goHome() {
    showPage('homePage');
}

function goCollection() {
    showPage('collectionPage');
    renderCollection();
}

function goShop() {
    showPage('shopPage');
}

function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    // Scroll to top
    window.scrollTo(0, 0);
}

// ===== UTILITY FUNCTIONS =====
function getRarityColor(rarity) {
    const colors = {
        'common': '#ffffff',
        'rare': '#3b82f6',
        'ultra-rare': '#a855f7',
        'legendary': '#fbbf24'
    };
    return colors[rarity] || colors['common'];
}

// ===== SOUND EFFECTS (Optional) =====
function playSound(name) {
    // Create a simple beep sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        if (name === 'pack') {
            oscillator.frequency.value = 200;
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } else if (name === 'reveal') {
            oscillator.frequency.value = 800;
            gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } else if (name === 'legendary') {
            oscillator.frequency.value = 1200;
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        }
    } catch (e) {
        // Audio API not available, silently fail
    }
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePack();
        closeCard();
    }
});

// ===== TEST MODE =====
function addTestPacks() {
    appState.packs += 20;
    saveState();
    updateStats();
}

// ===== START APP =====
window.addEventListener('DOMContentLoaded', init);
