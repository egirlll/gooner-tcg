// Card Database - 60 Cards across 3 Sets
const CARDS = [
    // ===== SET 1: RELAPSE BAIT (20 cards) =====
    {
        id: 1,
        name: 'Aurora Dawn',
        set: 'Relapse Bait',
        rarity: 'common',
        image: 'https://picsum.photos/400/600?random=1',
        description: 'First light of the day. Pure energy.'
    },
    {
        id: 2,
        name: 'Cosmic Ray',
        set: 'Relapse Bait',
        rarity: 'common',
        image: 'https://picsum.photos/400/600?random=2',
        description: 'Gravity bends around her.'
    },
    {
        id: 3,
        name: 'Velvet Whisper',
        set: 'Relapse Bait',
        rarity: 'common',
        image: 'https://picsum.photos/400/600?random=3',
        description: 'Soft but deadly.'
    },
    {
        id: 4,
        name: 'Neon Nights',
        set: 'Relapse Bait',
        rarity: 'common',
        image: 'https://picsum.photos/400/600?random=4',
        description: 'City lights can\t compete.'
    },
    {
        id: 5,
        name: 'Sapphire Dreams',
        set: 'Relapse Bait',
        rarity: 'common',
        image: 'https://picsum.photos/400/600?random=5',
        description: 'Deep blue eyes, deeper thoughts.'
    },
    {
        id: 6,
        name: 'Obsidian Edge',
        set: 'Relapse Bait',
        rarity: 'rare',
        image: 'https://picsum.photos/400/600?random=6',
        description: 'Sharp. Dangerous. Mesmerizing.'
    },
    {
        id: 7,
        name: 'Golden Hour',
        set: 'Relapse Bait',
        rarity: 'rare',
        image: 'https://picsum.photos/400/600?random=7',
        description: 'The best time of day, every day.'
    },
    {
        id: 8,
        name: 'Crimson Kiss',
        set: 'Relapse Bait',
        rarity: 'rare',
        image: 'https://picsum.photos/400/600?random=8',
        description: 'Leaves a mark on your mind.'
    },
    {
        id: 9,
        name: 'Moonlight Muse',
        set: 'Relapse Bait',
        rarity: 'rare',
        image: 'https://picsum.photos/400/600?random=9',
        description: 'Inspiration at 3 AM.'
    },
    {
        id: 10,
        name: 'Siren Song',
        set: 'Relapse Bait',
        rarity: 'ultra-rare',
        image: 'https://picsum.photos/400/600?random=10',
        description: 'Irresistible. Unforgettable.'
    },
    {
        id: 11,
        name: 'Pearl Essence',
        set: 'Relapse Bait',
        rarity: 'common',
        image: 'https://picsum.photos/400/600?random=11',
        description: 'Rare gem. Priceless grace.'
    },
    {
        id: 12,
        name: 'Midnight Crown',
        set: 'Relapse Bait',
        rarity: 'rare',
        image: 'https://picsum.photos/400/600?random=12',
        description: 'Reigns over the darkness.'
    },
    {
        id: 13,
        name: 'Ember Soul',
        set: 'Relapse Bait',
        rarity: 'rare',
        image: 'https://picsum.photos/400/600?random=13',
        description: 'Burning with passion.'
    },
    {
        id: 14,
        name: 'Crystal Echo',
        set: 'Relapse Bait',
        rarity: 'common',
        image: 'https://picsum.photos/400/600?random=14',
        description: 'Resonates in your head rent-free.'
    },
    {
        id: 15,
        name: 'Silk Serpent',
        set: 'Relapse Bait',
        rarity: 'rare',
        image: 'https://picsum.photos/400/600?random=15',
        description: 'Smooth. Intoxicating.'
    },
    {
        id: 16,
        name: 'Sphinx Mystique',
        set: 'Relapse Bait',
        rarity: 'ultra-rare',
        image: 'https://picsum.photos/400/600?random=16',
        description: 'Ancient secrets in modern eyes.'
    },
    {
        id: 17,
        name: 'Veldt Vixen',
        set: 'Relapse Bait',
        rarity: 'common',
        image: 'https://picsum.photos/400/600?random=17',
        description: 'Wild at heart.'
    },
    {
        id: 18,
        name: 'Prism Palace',
        set: 'Relapse Bait',
        rarity: 'ultra-rare',
        image: 'https://picsum.photos/400/600?random=18',
        description: 'Royalty of the digital realm.'
    },
    {
        id: 19,
        name: 'Vortex Vibe',
        set: 'Relapse Bait',
        rarity: 'common',
        image: 'https://picsum.photos/400/600?random=19',
        description: 'Get pulled in. Can\'t escape.'
    },
    {
        id: 20,
        name: 'Apex Allure',
        set: 'Relapse Bait',
        rarity: 'legendary',
        image: 'https://picsum.photos/400/600?random=20',
        description: 'Peak perfection. Pure addiction.'
    },

    // ===== SET 2: EGIRL COLLECTION (20 cards) =====
    {
        id: 21,
        name: 'Cyber Rebel',
        set: 'Egirl Collection',
        rarity: 'common',
        image: 'https://picsum.photos/400/600?random=21',
        description: 'Breaking rules and hearts.'
    },
    {
        id: 22,
        name: 'Digital Diva',
        set: 'Egirl Collection',
        rarity: 'common',
        image: 'https://picsum.photos/400/600?random=22',
        description: 'Online royalty.'
    },
    {
        id: 23,
        name: 'Pixel Princess',
        set: 'Egirl Collection',
        rarity: 'common',
        image: 'https://picsum.photos/400/600?random=23',
        description: '8-bit goddess energy.'
    },
    {
        id: 24,
        name: 'Neon Siren',
        set: 'Egirl Collection',
        rarity: 'rare',
        image: 'https://picsum.photos/400/600?random=24',
        description: 'She exists in RGB color space.'
    },
    {
        id: 25,
        name: 'Glitch Angel',
        set: 'Egirl Collection',
        rarity: 'common',
        image: 'https://picsum.photos/400/600?random=25',
        description: 'Perfect imperfection.'
    },
    {
        id: 26,
        name: 'Chrome Goddess',
        set: 'Egirl Collection',
        rarity: 'rare',
        image: 'https://picsum.photos/400/600?random=26',
        description: 'Metallic and magical.'
    },
    {
        id: 27,
        name: 'Synth Seraph',
        set: 'Egirl Collection',
        rarity: 'rare',
        image: 'https://picsum.photos/400/600?random=27',
        description: 'Heaven in analog form.'
    },
    {
        id: 28,
        name: 'Discord Queen',
        set: 'Egirl Collection',
        rarity: 'rare',
        image: 'https://picsum.photos/400/600?random=28',
        description: 'Streaming takeover imminent.'
    },
    {
        id: 29,
        name: 'Synthetic Dream',
        set: 'Egirl Collection',
        rarity: 'ultra-rare',
        image: 'https://picsum.photos/400/600?random=29',
        description: 'Too good to be real. Still is.'
    },
    {
        id: 30,
        name: 'Violet Void',
        set: 'Egirl Collection',
        rarity: 'common',
        image: 'https://picsum.photos/400/600?random=30',
        description: 'Lost in the void, found in beauty.'
    },
    {
        id: 31,
        name: 'Cyber Sorceress',
        set: 'Egirl Collection',
        rarity: 'ultra-rare',
        image: 'https://picsum.photos/400/600?random=31',
        description: 'She casts spells through screens.'
    },
    {
        id: 32,
        name: 'Plasma Princess',
        set: 'Egirl Collection',
        rarity: 'rare',
        image: 'https://picsum.photos/400/600?random=32',
        description: 'Energy incarnate.'
    },
    {
        id: 33,
        name: 'Cascade Charm',
        set: 'Egirl Collection',
        rarity: 'common',
        image: 'https://picsum.photos/400/600?random=33',
        description: 'Flows like water, hits like lightning.'
    },
    {
        id: 34,
        name: 'Hologram Heart',
        set: 'Egirl Collection',
        rarity: 'rare',
        image: 'https://picsum.photos/400/600?random=34',
        description: 'Virtual but visceral.'
    },
    {
        id: 35,
        name: 'Matrix Maiden',
        set: 'Egirl Collection',
        rarity: 'ultra-rare',
        image: 'https://picsum.photos/400/600?random=35',
        description: 'Reality bends for her.'
    },
    {
        id: 36,
        name: 'Ethereal Echo',
        set: 'Egirl Collection',
        rarity: 'common',
        image: 'https://picsum.photos/400/600?random=36',
        description: 'Haunting. Hypnotic.'
    },
    {
        id: 37,
        name: 'Quantum Queen',
        set: 'Egirl Collection',
        rarity: 'legendary',
        image: 'https://picsum.photos/400/600?random=37',
        description: 'Exists in all states at once.'
    },
    {
        id: 38,
        name: 'Tesla Temptress',
        set: 'Egirl Collection',
        rarity: 'rare',
        image: 'https://picsum.photos/400/600?random=38',
        description: 'High voltage attraction.'
    },
    {
        id: 39,
        name: 'Whisper Widget',
        set: 'Egirl Collection',
        rarity: 'common',
        image: 'https://picsum.photos/400/600?random=39',
        description: 'Soft voice, loud impact.'
    },
    {
        id: 40,
        name: 'Ultra Instinct',
        set: 'Egirl Collection',
        rarity: 'ultra-rare',
        image: 'https://picsum.photos/400/600?random=40',
        description: 'Moving before you can think.'
    },

    // ===== SET 3: CATFISH QUEENS (20 cards) =====
    {
        id: 41,
        name: 'Illusion Prime',
        set: 'Catfish Queens',
        rarity: 'common',
        image: 'https://picsum.photos/400/600?random=41',
        description: 'Not what she seems. Better.'
    },
    {
        id: 42,
        name: 'Masquerade Miss',
        set: 'Catfish Queens',
        rarity: 'common',
        image: 'https://picsum.photos/400/600?random=42',
        description: 'The best characters are imagined.'
    },
    {
        id: 43,
        name: 'Facade Femme',
        set: 'Catfish Queens',
        rarity: 'rare',
        image: 'https://picsum.photos/400/600?random=43',
        description: 'Artistic expression taken far.'
    },
    {
        id: 44,
        name: 'Mirage Maiden',
        set: 'Catfish Queens',
        rarity: 'common',
        image: 'https://picsum.photos/400/600?random=44',
        description: 'Beautiful illusion you want to believe.'
    },
    {
        id: 45,
        name: 'Phantom Flair',
        set: 'Catfish Queens',
        rarity: 'rare',
        image: 'https://picsum.photos/400/600?random=45',
        description: 'Exists mostly in imagination.'
    },
    {
        id: 46,
        name: 'Deceptive Doll',
        set: 'Catfish Queens',
        rarity: 'rare',
        image: 'https://picsum.photos/400/600?random=46',
        description: 'Crafted to perfection.'
    },
    {
        id: 47,
        name: 'Siren Swap',
        set: 'Catfish Queens',
        rarity: 'ultra-rare',
        image: 'https://picsum.photos/400/600?random=47',
        description: 'Different face, same power.'
    },
    {
        id: 48,
        name: 'Echo Entity',
        set: 'Catfish Queens',
        rarity: 'common',
        image: 'https://picsum.photos/400/600?random=48',
        description: 'Reflected beauty. Amplified allure.'
    },
    {
        id: 49,
        name: 'Chimera Charm',
        set: 'Catfish Queens',
        rarity: 'rare',
        image: 'https://picsum.photos/400/600?random=49',
        description: 'Parts of many. One masterpiece.'
    },
    {
        id: 50,
        name: 'Cipher Soul',
        set: 'Catfish Queens',
        rarity: 'ultra-rare',
        image: 'https://picsum.photos/400/600?random=50',
        description: 'Mystery wrapped in beauty.'
    },
    {
        id: 51,
        name: 'Specter Smile',
        set: 'Catfish Queens',
        rarity: 'common',
        image: 'https://picsum.photos/400/600?random=51',
        description: 'Haunting in the best way.'
    },
    {
        id: 52,
        name: 'Hallucination Hub',
        set: 'Catfish Queens',
        rarity: 'rare',
        image: 'https://picsum.photos/400/600?random=52',
        description: 'Center of attention, essence unknown.'
    },
    {
        id: 53,
        name: 'Fabrication Flame',
        set: 'Catfish Queens',
        rarity: 'ultra-rare',
        image: 'https://picsum.photos/400/600?random=53',
        description: 'Burning with false promise. Feeling real.'
    },
    {
        id: 54,
        name: 'Counterfeit Chic',
        set: 'Catfish Queens',
        rarity: 'common',
        image: 'https://picsum.photos/400/600?random=54',
        description: 'Fake but iconic.'
    },
    {
        id: 55,
        name: 'Synthetic Spark',
        set: 'Catfish Queens',
        rarity: 'rare',
        image: 'https://picsum.photos/400/600?random=55',
        description: 'Not real. Somehow more magnetic.'
    },
    {
        id: 56,
        name: 'Illusion Eclipse',
        set: 'Catfish Queens',
        rarity: 'ultra-rare',
        image: 'https://picsum.photos/400/600?random=56',
        description: 'Darkens reality with beauty.'
    },
    {
        id: 57,
        name: 'Phantom Phoenix',
        set: 'Catfish Queens',
        rarity: 'rare',
        image: 'https://picsum.photos/400/600?random=57',
        description: 'Rises from nothing, burns bright.'
    },
    {
        id: 58,
        name: 'Facade Fusion',
        set: 'Catfish Queens',
        rarity: 'common',
        image: 'https://picsum.photos/400/600?random=58',
        description: 'Better together. Even if imagined.'
    },
    {
        id: 59,
        name: 'Veil Vortex',
        set: 'Catfish Queens',
        rarity: 'ultra-rare',
        image: 'https://picsum.photos/400/600?random=59',
        description: 'Swallows truth, births legend.'
    },
    {
        id: 60,
        name: 'Crown Conundrum',
        set: 'Catfish Queens',
        rarity: 'legendary',
        image: 'https://picsum.photos/400/600?random=60',
        description: 'The ultimate illusion. Can you tell?'
    }
];

// Helper function to get cards by rarity
function getCardsByRarity(rarity) {
    return CARDS.filter(card => card.rarity === rarity);
}

// Rarity distribution for pack openings
const RARITY_WEIGHTS = {
    'common': 60,
    'rare': 25,
    'ultra-rare': 10,
    'legendary': 5
};

// Helper function to get random card by rarity weights
function getRandomCardFromPack() {
    const rand = Math.random() * 100;
    let rarity = 'common';
    
    if (rand < RARITY_WEIGHTS.legendary) {
        rarity = 'legendary';
    } else if (rand < RARITY_WEIGHTS.legendary + RARITY_WEIGHTS['ultra-rare']) {
        rarity = 'ultra-rare';
    } else if (rand < RARITY_WEIGHTS.legendary + RARITY_WEIGHTS['ultra-rare'] + RARITY_WEIGHTS.rare) {
        rarity = 'rare';
    }
    
    const cardsOfRarity = getCardsByRarity(rarity);
    return cardsOfRarity[Math.floor(Math.random() * cardsOfRarity.length)];
}

// Helper to get random number of cards per pack (3-5)
function getPackSize() {
    return Math.random() < 0.5 ? 4 : (Math.random() < 0.5 ? 3 : 5);
}
