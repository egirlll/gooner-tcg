# Gooner TCG - Collectible Card Pack Opening Experience

A digital trading card game with egirl/model imagery. Open packs, collect cards, and build your collection!

## Features

✨ **Pack Opening** — Click to open packs and reveal 3-5 random cards with satisfying animations
🎨 **4-Tier Rarity System** — Common (60%), Rare (25%), Ultra Rare (10%), Legendary (5%)
📚 **Collection Gallery** — View all 60 cards across 3 sets, track owned vs unowned
💫 **Beautiful Design** — Dark theme with hot pink accents, glassmorphism cards, and smooth animations
📱 **Mobile Responsive** — Optimized for all screen sizes
💾 **Local Storage** — Your collection persists across sessions
🔔 **Free Pack Daily** — Claim one free pack every 24 hours

## Card Sets

### Set 1: Relapse Bait (20 cards)
Classic egirl aesthetics with mystical and ethereal vibes.

### Set 2: Egirl Collection (20 cards)
Cyber/digital themed cards with futuristic names and descriptions.

### Set 3: Catfish Queens (20 cards)
Ironic, meta cards about the nature of online personas.

## Tech Stack

- **Pure HTML/CSS/JavaScript** — No frameworks or build tools
- **LocalStorage** — Client-side persistence
- **Web Audio API** — Optional sound effects
- **Responsive Design** — Mobile-first approach
- **Glassmorphism UI** — Modern aesthetic with backdrop filters

## Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Deploy to Other Services

This is a static site — just serve the three files (index.html, styles.css, app.js, cards.js) from any static host:
- GitHub Pages
- Netlify
- Firebase Hosting
- AWS S3 + CloudFront
- Any CDN

## File Structure

```
gooner-tcg/
├── index.html    # Main HTML structure
├── styles.css    # All styling (dark theme, animations)
├── cards.js      # Card database (60 cards)
├── app.js        # Application logic and state
└── README.md     # This file
```

## How It Works

### 1. Opening a Pack

- Click "Open Pack" on the home page
- Pack bounces and explodes in animation
- Cards reveal one-by-one with flip animations
- Each card glows based on rarity (white→blue→purple→gold)
- Legendary cards shake for emphasis

### 2. Your Collection

- Every card you pull is automatically added to your collection
- View all 60 cards in the Collection page
- Filter by rarity
- Click owned cards to see full details
- Unowned cards appear grayed out with a question mark

### 3. Free Packs

- Get 1 free pack every 24 hours
- Timer shows when your next free pack is available
- Packs are stored as a number in localStorage

### 4. Card Data

Each card has:
- **id** — Unique identifier (1-60)
- **name** — Card name (e.g., "Apex Allure")
- **set** — Which set it belongs to
- **rarity** — common, rare, ultra-rare, or legendary
- **image** — URL to the card image
- **description** — Short flirty flavor text

## Customization

### Add Real Images

Replace `picsum.photos` URLs in `cards.js` with real images:

```javascript
{
    id: 1,
    name: 'Aurora Dawn',
    set: 'Relapse Bait',
    rarity: 'common',
    image: 'https://your-image-host.com/aurora.jpg', // Change this
    description: 'First light of the day. Pure energy.'
}
```

### Change Colors

Edit the CSS variables at the top of `styles.css`:

```css
:root {
    --primary-color: #ff1493;      /* Hot pink */
    --secondary-color: #ff69b4;    /* Light pink */
    --dark-bg: #0f172a;            /* Dark navy */
    --darker-bg: #1a1a2e;          /* Darker navy */
    /* ... */
}
```

### Adjust Drop Rates

In `cards.js`:

```javascript
const RARITY_WEIGHTS = {
    'common': 60,      // Increase/decrease
    'rare': 25,
    'ultra-rare': 10,
    'legendary': 5
};
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

Requires ES6 support and localStorage API.

## Future Features

- 🎭 Real model/egirl images
- 💳 Throne integration for pack purchases
- 📊 Trading system
- 🏆 Leaderboards
- 🎯 Challenges/quests
- 🔗 Social sharing
- 🎵 Better sound effects

## License

MIT — Feel free to use, modify, and distribute.

## Credits

Built with passion for the goon community. Card images from Picsum Photos (placeholder).

---

**Play now:** [gooner-tcg.vercel.app](https://gooner-tcg.vercel.app)
