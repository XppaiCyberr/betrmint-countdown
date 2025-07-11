# BETRMINT Countdown - Onchain Creator Game

A Chrome extension that displays a countdown timer for the next BETRMINT game round, helping users never miss a chance to win up to 100X in Based tokens!

---

## 🖼️ Screenshot

<p align="center">
  <img src="ss.png" alt="BETRMINT Countdown Screenshot" width="500">
</p>

---

## Features

- 🎮 **Game Countdown**: Shows time until next BETRMINT round with precision timing
- 📅 **Smart Scheduling**: Automatically calculates next game based on Mon/Wed/Fri at 3:00 PM EST schedule
- 🎯 **Auto-Injection**: Appears on every webpage you visit
- 🎨 **Beautiful Design**: Modern gradient UI with neon glow effects
- 🔧 **Interactive Controls**: Minimize and close functionality
- 📱 **Responsive**: Works on desktop and mobile browsers
- 🎪 **Draggable Interface**: Move the countdown anywhere on the page
- ⚡ **Real-time Updates**: Live countdown with smooth animations
- 🎛️ **Popup Controls**: Manage countdown from browser toolbar
- 🚀 **Direct Launch**: One-click access to BETRMINT game

## What is BETRMINT?

BETRMINT turns supporting onchain creators into a game of serendipitous speculation. Collect content, get FREE TICKETS, and spin the neon flywheel to win up to 100X in Based tokens!

**Prize Pool**: $1500 per round  
**Schedule**: Monday, Wednesday, Friday at 3:00 PM EST  
**Platform**: Farcaster Mini App

## Installation

1. **Download the Extension**
   - Download or clone this repository to your computer

2. **Open Chrome Extensions Page**
   - Open Google Chrome
   - Navigate to `chrome://extensions/`
   - Or go to Chrome menu > More Tools > Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

4. **Load the Extension**
   - Click "Load unpacked" button
   - Select the folder containing the extension files
   - The extension should now appear in your extensions list

5. **Pin the Extension (Optional)**
   - Click the puzzle piece icon in the Chrome toolbar
   - Find "BETRMINT Countdown" and click the pin icon

## Usage

### Automatic Countdown
- The countdown timer automatically appears on any webpage you visit
- Shows in the top-right corner by default
- Displays time remaining until the next scheduled game round
- Automatically adjusts for EST/EDT timezone changes

### Interactive Controls
- **Minimize**: Click the "−" button to minimize to spinning logo
- **Expand**: Click the spinning logo to expand back to full view
- **Close**: Click the "×" button to remove the countdown
- **Launch Game**: Click "Launch BETRMINT" to open the game directly

### Popup Controls
Click the extension icon in the toolbar to access:
- **Show Countdown**: Make the countdown visible if hidden
- **Hide Countdown**: Hide the countdown from the page
- **Refresh Timer**: Recalculate the next game time

## Game Schedule

- **Days**: Monday, Wednesday, Friday
- **Time**: 3:00 PM EST (automatically adjusts for Daylight Saving Time)
- **Prize Pool**: $1500 per round
- **Platform**: Farcaster Mini App

*Note: Rounds go fast! Keep the countdown visible to never miss a drop.*

## Customization

You can customize the extension by modifying these files:

- **`config.json`**: Change game schedule and display settings
- **`content.js`**: Modify countdown behavior and functionality
- **`styles.css`**: Customize appearance and animations
- **`manifest.json`**: Update extension metadata and permissions

### Changing the Game Schedule

To modify the schedule, edit `config.json`: