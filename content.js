// Create and inject the countdown menu
function createCountdownMenu() {
  // Check if menu already exists
  if (document.getElementById('betr-countdown-menu')) {
    return;
  }

  // Load config and create menu
  loadConfig().then(config => {
    const nextGameTime = calculateNextGameTime(config.schedule);
    
    // Create the menu container (start minimized by default)
    const menu = document.createElement('div');
    menu.id = 'betr-countdown-menu';
    menu.className = 'betr-countdown-container minimized';

    // Create the countdown display
    const countdownDisplay = document.createElement('div');
    countdownDisplay.className = 'betr-countdown-display';
    countdownDisplay.style.display = 'none'; // Hidden by default
    
    // Format initial display time
    const timeLeft = nextGameTime - new Date().getTime();
    const initialTime = formatTime(timeLeft);
    
    countdownDisplay.innerHTML = `
      <img src="${chrome.runtime.getURL('img/betr.webp')}" alt="Betr" class="betr-logo">
      <div class="betr-countdown-title">${config.display.title}</div>
      <div class="betr-countdown-time" id="betr-countdown-time">${initialTime}</div>
      <div class="betr-schedule-info">Mon, Wed, Fri • 3:00 PM ${config.display.timezone_display}</div>
      <button class="betr-play-button" id="betr-play-button">Launch BETRMINT</button>
    `;

    // Create minimized view (visible by default)
    const minimizedDisplay = document.createElement('div');
    minimizedDisplay.className = 'betr-minimized-display';
    minimizedDisplay.style.display = 'flex'; // Visible by default
    minimizedDisplay.innerHTML = `
      <img src="${chrome.runtime.getURL('img/spin.webp')}" alt="Spin" class="betr-spin-logo">
    `;
    
    // Make minimized display clickable to expand
    minimizedDisplay.addEventListener('click', expandMenu);
    minimizedDisplay.style.cursor = 'pointer';

    // Add click handler for the play button
    const playButton = countdownDisplay.querySelector('#betr-play-button');
    if (playButton) {
      playButton.addEventListener('click', () => {
        window.open('https://farcaster.xyz/miniapps/yG210D-5eNqL/betrmint', '_blank');
      });
    }

    // Create minimize button (only visible when expanded)
    const minimizeButton = document.createElement('button');
    minimizeButton.className = 'betr-minimize-btn';
    minimizeButton.innerHTML = '−';
    minimizeButton.addEventListener('click', minimizeMenu);

    // Create close button (only visible when expanded)
    const closeButton = document.createElement('button');
    closeButton.className = 'betr-close-btn';
    closeButton.innerHTML = '×';
    closeButton.addEventListener('click', closeMenu);

    // Assemble the menu
    menu.appendChild(minimizeButton);
    menu.appendChild(closeButton);
    menu.appendChild(countdownDisplay);
    menu.appendChild(minimizedDisplay);

    // Add to page
    document.body.appendChild(menu);

    // Start the countdown with schedule
    startCountdown(nextGameTime);
  });
}



// Minimize menu (called when user wants to minimize)
function minimizeMenu() {
  const menu = document.getElementById('betr-countdown-menu');
  if (!menu) return;
  
  const countdownDisplay = menu.querySelector('.betr-countdown-display');
  const minimizedDisplay = menu.querySelector('.betr-minimized-display');
  
  if (!countdownDisplay || !minimizedDisplay) return;
  
  // Minimize menu
  menu.classList.add('minimized');
  
  // Use timeout for smooth transition
  setTimeout(() => {
    countdownDisplay.style.display = 'none';
    minimizedDisplay.style.display = 'flex';
  }, 50);
}

// Expand menu (called when clicking on spinning logo)
function expandMenu() {
  const menu = document.getElementById('betr-countdown-menu');
  if (!menu) return;
  
  const countdownDisplay = menu.querySelector('.betr-countdown-display');
  const minimizedDisplay = menu.querySelector('.betr-minimized-display');
  
  if (!countdownDisplay || !minimizedDisplay) return;
  
  // Expand menu
  menu.classList.remove('minimized');
  
  // Use timeout for smooth transition
  setTimeout(() => {
    minimizedDisplay.style.display = 'none';
    countdownDisplay.style.display = 'flex';
  }, 50);
}

// Close menu
function closeMenu() {
  const menu = document.getElementById('betr-countdown-menu');
  if (menu) {
    menu.remove();
  }
}

// Load configuration
async function loadConfig() {
  try {
    const response = await fetch(chrome.runtime.getURL('config.json'));
    return await response.json();
  } catch (error) {
    console.error('Error loading config:', error);
    // Fallback config
    return {
      schedule: {
        timezone: "America/New_York",
        days: [1, 3, 5],
        time: { hour: 15, minute: 0, second: 0 }
      },
      display: {
        title: "NEXT GAME IN",
        timezone_display: "EST"
      }
    };
  }
}

// Helper function to determine if a date is in Daylight Saving Time for America/New_York
function isDaylightSavingTime(date) {
  // DST in US starts on the second Sunday in March and ends on the first Sunday in November
  const year = date.getFullYear();
  
  // Find second Sunday in March
  const march = new Date(year, 2, 1); // March 1st
  const firstSundayMarch = march.getDate() + (7 - march.getDay()) % 7;
  const secondSundayMarch = firstSundayMarch + 7;
  const dstStart = new Date(year, 2, secondSundayMarch);
  
  // Find first Sunday in November
  const november = new Date(year, 10, 1); // November 1st
  const firstSundayNovember = november.getDate() + (7 - november.getDay()) % 7;
  const dstEnd = new Date(year, 10, firstSundayNovember);
  
  return date >= dstStart && date < dstEnd;
}

// Calculate next game time based on schedule
function calculateNextGameTime(schedule) {
  const now = new Date();
  const targetDays = schedule.days; // [1, 3, 5] = Monday, Wednesday, Friday
  const targetHour = schedule.time.hour;
  const targetMinute = schedule.time.minute;
  const targetSecond = schedule.time.second;
  
  let nextGame = null;
  let minDiff = Infinity;
  
  // Check next 14 days to find the closest game
  for (let i = 0; i < 14; i++) {
    const checkDate = new Date(now);
    checkDate.setDate(now.getDate() + i);
    
    const dayOfWeek = checkDate.getDay();
    const mondayBasedDay = dayOfWeek === 0 ? 7 : dayOfWeek; // Convert Sunday from 0 to 7
    
    if (targetDays.includes(mondayBasedDay)) {
      // Create date in target timezone by constructing ISO string with timezone
      const year = checkDate.getFullYear();
      const month = String(checkDate.getMonth() + 1).padStart(2, '0');
      const day = String(checkDate.getDate()).padStart(2, '0');
      const hour = String(targetHour).padStart(2, '0');
      const minute = String(targetMinute).padStart(2, '0');
      const second = String(targetSecond).padStart(2, '0');
      
      // Determine if we're in EST or EDT for the given date
      const isDST = isDaylightSavingTime(new Date(year, checkDate.getMonth(), checkDate.getDate()));
      const timezoneOffset = isDST ? '-04:00' : '-05:00'; // EDT or EST
      
      const gameTime = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}${timezoneOffset}`);
      
      const diff = gameTime.getTime() - now.getTime();
      
      if (diff > 0 && diff < minDiff) {
        minDiff = diff;
        nextGame = gameTime;
      }
    }
  }
  
  return nextGame ? nextGame.getTime() : now.getTime() + 24 * 60 * 60 * 1000; // Fallback to 24 hours
}

// Format time display
function formatTime(milliseconds) {
  if (milliseconds <= 0) return '00:00:00.000';
  
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  const ms = milliseconds % 1000;
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
}

// Start countdown timer
function startCountdown(targetTime) {
  // Clear any existing timer
  if (window.betrCountdownTimer) {
    clearInterval(window.betrCountdownTimer);
  }
  
  window.betrCountdownTimer = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = targetTime - now;
    
    if (timeLeft <= 0) {
      clearInterval(window.betrCountdownTimer);
      const timeElement = document.getElementById('betr-countdown-time');
      const titleElement = document.querySelector('.betr-countdown-title');
      
      if (timeElement && titleElement) {
        // Show "SPIN RIGHT NOW" message
        titleElement.textContent = 'SPIN RIGHT NOW';
        timeElement.textContent = '00:00:00.000';
        
        // After 10 minutes (600,000 ms), refresh to show next countdown
        setTimeout(() => {
          const menu = document.getElementById('betr-countdown-menu');
          if (menu) {
            menu.remove();
            createCountdownMenu();
          }
        }, 600000); // 10 minutes = 600,000 milliseconds
      }
      return;
    }
    
    const timeString = formatTime(timeLeft);
    const timeElement = document.getElementById('betr-countdown-time');
    if (timeElement) {
      timeElement.textContent = timeString;
    }
  }, 10); // Update every 10ms for smooth millisecond display
}



// Initialize the countdown menu when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createCountdownMenu);
} else {
  createCountdownMenu();
}

// Global function to refresh countdown (for manual refresh)
window.refreshCountdown = function() {
  const menu = document.getElementById('betr-countdown-menu');
  if (menu) {
    menu.remove();
    createCountdownMenu();
  }
}; 