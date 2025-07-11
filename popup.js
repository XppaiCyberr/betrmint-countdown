// Popup control script
document.addEventListener('DOMContentLoaded', function() {
    const showButton = document.getElementById('showCountdown');
    const hideButton = document.getElementById('hideCountdown');
    const refreshButton = document.getElementById('refreshTimer');
    
    // Show countdown
    showButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                function: showCountdownMenu
            });
        });
    });
    
    // Hide countdown
    hideButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                function: hideCountdownMenu
            });
        });
    });
    
    // Refresh timer
    refreshButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                function: refreshCountdownTimer
            });
        });
    });
});

// Functions to be injected into the page
function showCountdownMenu() {
    const menu = document.getElementById('betr-countdown-menu');
    if (menu) {
        menu.style.display = 'block';
        // If menu was minimized, expand it
        if (menu.classList.contains('minimized')) {
            const countdownDisplay = menu.querySelector('.betr-countdown-display');
            const minimizedDisplay = menu.querySelector('.betr-minimized-display');
            const minimizeBtn = menu.querySelector('.betr-minimize-btn');
            const closeBtn = menu.querySelector('.betr-close-btn');
            
            menu.classList.remove('minimized');
            minimizedDisplay.style.display = 'none';
            countdownDisplay.style.display = 'flex';
            
            // Show buttons when expanded
            if (minimizeBtn) minimizeBtn.style.display = 'flex';
            if (closeBtn) closeBtn.style.display = 'flex';
        }
    } else {
        // Menu doesn't exist, recreate it
        if (typeof createCountdownMenu === 'function') {
            createCountdownMenu();
        }
    }
}

function hideCountdownMenu() {
    const menu = document.getElementById('betr-countdown-menu');
    if (menu) {
        menu.style.display = 'none';
    }
}

function refreshCountdownTimer() {
    if (typeof refreshCountdown === 'function') {
        refreshCountdown();
    } else {
        // Fallback
        const menu = document.getElementById('betr-countdown-menu');
        if (menu) {
            menu.remove();
        }
        if (typeof createCountdownMenu === 'function') {
            createCountdownMenu();
        }
    }
} 