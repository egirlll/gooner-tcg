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
        // Always ensure packs available for testing
        if (appState.packs <= 0) {
            appState.packs = 20;
            saveState();
        }
    } else {
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

// ===== PACK OPENING STATE =====
let packOpeningState = {
    allCards: [],
    currentCardIndex: 0,
    isSpinning: false,
    audioContext: null
};

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
    
    packOpeningState.allCards = newCards;
    packOpeningState.currentCardIndex = 0;
    
    showPackOpening();
    updateStats();
}

function showPackOpening() {
    const modal = document.getElementById('packModal');
    const reelStage = document.getElementById('reelStage');
    const revealStage = document.getElementById('revealStage');
    const summaryStage = document.getElementById('summaryStage');
    
    modal.classList.remove('hidden');
    
    // Show reel stage, hide others
    reelStage.style.display = 'flex';
    revealStage.style.display = 'none';
    summaryStage.style.display = 'none';
    
    // Initialize reel
    initializeReel();
}

function initializeReel() {
    const reel = document.getElementById('reel');
    const spinBtn = document.getElementById('spinBtn');
    
    reel.innerHTML = '';
    packOpeningState.isSpinning = false;
    spinBtn.style.display = 'flex';
    spinBtn.disabled = false;
    
    // Generate 35-40 random cards for the reel, with winning card near the end
    const reelCards = generateReelCards();
    
    // Render reel cards
    reelCards.forEach(card => {
        const cardEl = document.createElement('div');
        cardEl.className = `reel-card rarity-${card.rarity}`;
        cardEl.innerHTML = `<img src="${card.image}" alt="${card.name}">`;
        reel.appendChild(cardEl);
    });
    
    // Store reel data for spin calculation
    packOpeningState.reelCards = reelCards;
    packOpeningState.reelDistance = reelCards.length * 170; // 160px card + 10px gap
}

function generateReelCards() {
    const cards = [];
    const winningCard = packOpeningState.allCards[packOpeningState.currentCardIndex];
    
    // Add 25-30 random cards first
    const randomCount = 25 + Math.floor(Math.random() * 6);
    for (let i = 0; i < randomCount; i++) {
        const randomCard = CARDS[Math.floor(Math.random() * CARDS.length)];
        cards.push(randomCard);
    }
    
    // Add some high-rarity cards for FOMO effect
    const legendaryCards = getCardsByRarity('legendary');
    const ultraRareCards = getCardsByRarity('ultra-rare');
    
    if (legendaryCards.length > 0) {
        cards.push(legendaryCards[Math.floor(Math.random() * legendaryCards.length)]);
    }
    if (ultraRareCards.length > 0) {
        cards.push(ultraRareCards[Math.floor(Math.random() * ultraRareCards.length)]);
    }
    
    // Add winning card at the end
    cards.push(winningCard);
    
    // Add a few more cards after to ensure smooth scrolling
    for (let i = 0; i < 3; i++) {
        const randomCard = CARDS[Math.floor(Math.random() * CARDS.length)];
        cards.push(randomCard);
    }
    
    return cards;
}

function startPackOpening() {
    if (packOpeningState.isSpinning) return;
    
    const spinBtn = document.getElementById('spinBtn');
    spinBtn.disabled = true;
    packOpeningState.isSpinning = true;
    
    const reel = document.getElementById('reel');
    const winningCard = packOpeningState.allCards[packOpeningState.currentCardIndex];
    const winningIndex = packOpeningState.reelCards.indexOf(winningCard);
    
    // Calculate scroll distance to land on winning card (center indicator)
    // Center of screen is at 50%, each card is 170px (160 + 10 gap)
    const reel_width = document.getElementById('reelWrapper').offsetWidth;
    const target_position = (winningIndex * 170) - (reel_width / 2) + 80; // 80 = half card width
    
    // Spin animation with gradual slowdown
    spinReel(reel, target_position, spinBtn);
}

function spinReel(reel, targetPosition, spinBtn) {
    const duration = 4000; // 4 seconds total spin
    const startTime = Date.now();
    const startPosition = 0;
    
    // Initialize audio context for ticks
    if (!packOpeningState.audioContext) {
        packOpeningState.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function: starts fast, slows down (cubic ease-out)
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        const currentPosition = startPosition + (targetPosition - startPosition) * easeProgress;
        reel.style.transform = `translateX(-${currentPosition}px)`;
        
        // Play tick sound based on speed
        const speed = 1 - progress;
        if (speed > 0.1 && Math.random() < speed * 0.3) {
            playTickSound(speed);
        }
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Spin complete
            reel.style.transform = `translateX(-${targetPosition}px)`;
            onReelStopped(spinBtn);
        }
    };
    
    animate();
}

function playTickSound(speed) {
    if (!packOpeningState.audioContext) return;
    
    try {
        const ctx = packOpeningState.audioContext;
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();
        
        oscillator.connect(gain);
        gain.connect(ctx.destination);
        
        // Pitch based on speed - faster = higher pitch
        oscillator.frequency.value = 400 + (speed * 300);
        
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.05);
    } catch (e) {
        // Audio API error, continue anyway
    }
}

function onReelStopped(spinBtn) {
    // Transition to reveal stage
    setTimeout(() => {
        showRevealStage();
    }, 500);
}

function showRevealStage() {
    const reelStage = document.getElementById('reelStage');
    const revealStage = document.getElementById('revealStage');
    
    reelStage.style.display = 'none';
    revealStage.style.display = 'flex';
    
    const card = packOpeningState.allCards[packOpeningState.currentCardIndex];
    displayWinningCard(card);
}

function displayWinningCard(card) {
    const winningCardDisplay = document.getElementById('winningCardDisplay');
    const cardRevealInfo = document.getElementById('cardRevealInfo');
    const nextCardBtn = document.getElementById('nextCardBtn');
    const doneBtn = document.getElementById('doneBtn');
    
    const rarityColor = getRarityColor(card.rarity);
    
    // Create card display
    winningCardDisplay.innerHTML = `
        <div class="winning-card-inner reveal" style="animation-delay: 0.2s;">
            <div class="winning-card-front">?</div>
            <div class="winning-card-back">
                <img src="${card.image}" alt="${card.name}">
            </div>
        </div>
    `;
    
    winningCardDisplay.className = `winning-card-display rarity-${card.rarity}`;
    
    // Add reveal animation class
    setTimeout(() => {
        const inner = winningCardDisplay.querySelector('.winning-card-inner');
        if (inner) {
            inner.classList.add('reveal');
        }
    }, 100);
    
    // Trigger special effects based on rarity
    if (card.rarity === 'legendary') {
        playLegendarySound();
        flashScreen();
    } else if (card.rarity === 'ultra-rare') {
        playRareSoundEffect();
    }
    
    // Display card info
    cardRevealInfo.innerHTML = `
        <div class="card-reveal-name">${card.name}</div>
        <div class="card-reveal-rarity rarity-${card.rarity}">${card.rarity.replace('-', ' ').toUpperCase()}</div>
        <div class="card-reveal-desc">"${card.description}"</div>
    `;
    
    // Show buttons
    const hasMoreCards = packOpeningState.currentCardIndex < packOpeningState.allCards.length - 1;
    nextCardBtn.style.display = hasMoreCards ? 'flex' : 'none';
    doneBtn.style.display = hasMoreCards ? 'none' : 'flex';
}

function nextCardInPack() {
    packOpeningState.currentCardIndex++;
    
    const hasMoreCards = packOpeningState.currentCardIndex < packOpeningState.allCards.length;
    
    if (hasMoreCards) {
        // Show reel stage again
        const reelStage = document.getElementById('reelStage');
        const revealStage = document.getElementById('revealStage');
        
        revealStage.style.display = 'none';
        reelStage.style.display = 'flex';
        
        initializeReel();
    } else {
        // Show summary
        showSummaryStage();
    }
}

function showSummaryStage() {
    const revealStage = document.getElementById('revealStage');
    const summaryStage = document.getElementById('summaryStage');
    const openAnotherBtn = document.getElementById('openAnotherBtn');
    
    revealStage.style.display = 'none';
    summaryStage.style.display = 'flex';
    
    const summaryCardsGrid = document.getElementById('summaryCardsGrid');
    summaryCardsGrid.innerHTML = '';
    
    // Display all cards in summary
    packOpeningState.allCards.forEach(card => {
        const cardEl = document.createElement('div');
        cardEl.className = `summary-card rarity-${card.rarity}`;
        cardEl.innerHTML = `<img src="${card.image}" alt="${card.name}">`;
        summaryCardsGrid.appendChild(cardEl);
    });
    
    // Show open another button if packs available
    openAnotherBtn.style.display = appState.packs > 0 ? 'flex' : 'none';
}

function playRareSoundEffect() {
    if (!packOpeningState.audioContext) {
        packOpeningState.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    try {
        const ctx = packOpeningState.audioContext;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.3);
        
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
        // Audio error, continue
    }
}

function playLegendarySound() {
    if (!packOpeningState.audioContext) {
        packOpeningState.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    try {
        const ctx = packOpeningState.audioContext;
        const now = ctx.currentTime;
        
        // Two oscillators for legendary chord
        for (let freq of [400, 600]) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
            
            osc.start(now);
            osc.stop(now + 0.8);
        }
    } catch (e) {
        // Audio error, continue
    }
}

function flashScreen() {
    const modal = document.getElementById('packModal');
    const originalBg = modal.style.backgroundColor;
    
    modal.style.backgroundColor = 'rgba(251, 191, 36, 0.5)';
    setTimeout(() => {
        modal.style.backgroundColor = originalBg;
    }, 200);
    setTimeout(() => {
        modal.style.backgroundColor = 'rgba(251, 191, 36, 0.3)';
    }, 400);
    setTimeout(() => {
        modal.style.backgroundColor = originalBg;
    }, 600);
}

function closePack() {
    document.getElementById('packModal').classList.add('hidden');
    packOpeningState.currentCardIndex = 0;
    packOpeningState.allCards = [];
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
    appState.packs += 5;
    appState.lastFreePackTime = null;
    saveState();
    updateStats();
    updateFreePackTimer();
    alert('🎁 5 packs claimed! Head to Home to open them.');
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
