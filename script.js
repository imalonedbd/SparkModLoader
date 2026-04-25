// Sample mods data
const sampleMods = [
    {
        id: 1,
        name: "Enhanced Graphics",
        author: "GhostMaster",
        version: "1.2.3",
        description: "Improve visual quality with enhanced lighting and textures for better ghost detection.",
        enabled: true,
        config: "Resolution: 4K\nLighting: Enhanced\nTextures: Ultra"
    },
    {
        id: 2,
        name: "Ghost Detector",
        author: "SpiritHunter",
        version: "2.0.1",
        description: "Advanced detection system to identify ghost activity with improved accuracy.",
        enabled: true,
        config: "Sensitivity: High\nRange: 100m\nAlert Sound: Enabled"
    },
    {
        id: 3,
        name: "Equipment Manager",
        author: "TechWizard",
        version: "1.5.0",
        description: "Organize and manage your equipment inventory more efficiently during investigations.",
        enabled: false,
        config: "Auto-sort: Enabled\nCategories: Custom\nSync: Disabled"
    },
    {
        id: 4,
        name: "Sound Enhancer",
        author: "AudioPro",
        version: "1.1.2",
        description: "Enhance audio quality to catch subtle sounds and ghost communications better.",
        enabled: true,
        config: "Bass: +5dB\nTreble: +3dB\nNoise Filter: Active"
    }
];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadMods();
    loadSettings();
});

// Load mods from localStorage or use sample mods
function loadMods() {
    const savedMods = localStorage.getItem('mods');
    const mods = savedMods ? JSON.parse(savedMods) : sampleMods;
    
    if (!savedMods) {
        localStorage.setItem('mods', JSON.stringify(mods));
    }
    
    renderMods(mods);
}

// Render mods in grid
function renderMods(mods) {
    const container = document.getElementById('mods-container');
    container.innerHTML = '';
    
    mods.forEach(mod => {
        const modCard = document.createElement('div');
        modCard.className = 'mod-card';
        modCard.innerHTML = `
            <div class="mod-header">
                <div class="mod-name">${mod.name}</div>
                <div class="mod-author">by ${mod.author}</div>
                <span class="mod-version">v${mod.version}</span>
            </div>
            <div class="mod-description">${mod.description}</div>
            <div class="mod-status ${mod.enabled ? 'enabled' : 'disabled'}">
                ${mod.enabled ? '✓ ENABLED' : '✗ DISABLED'}
            </div>
            <div class="mod-buttons">
                <button class="btn-small toggle-${mod.enabled ? 'enabled' : 'disabled'}" 
                    onclick="toggleMod(${mod.id})">
                    ${mod.enabled ? 'DISABLE' : 'ENABLE'}
                </button>
                <button class="btn-small config" onclick="showConfig(${mod.id})">CONFIG</button>
                <button class="btn-small remove" onclick="removeMod(${mod.id})">REMOVE</button>
            </div>
        `;
        container.appendChild(modCard);
    });
}

// Toggle mod enabled/disabled
function toggleMod(modId) {
    const mods = JSON.parse(localStorage.getItem('mods'));
    const mod = mods.find(m => m.id === modId);
    
    if (mod) {
        mod.enabled = !mod.enabled;
        localStorage.setItem('mods', JSON.stringify(mods));
        renderMods(mods);
        
        // Show notification
        const action = mod.enabled ? 'ENABLED' : 'DISABLED';
        showNotification(`${mod.name} ${action}`);
    }
}

// Show mod configuration
function showConfig(modId) {
    const mods = JSON.parse(localStorage.getItem('mods'));
    const mod = mods.find(m => m.id === modId);
    
    if (mod) {
        const modal = document.getElementById('config-modal');
        document.getElementById('config-title').textContent = `${mod.name} - Configuration`;
        document.getElementById('config-details').innerHTML = `
            <p><strong>Name:</strong> ${mod.name}</p>
            <p><strong>Author:</strong> ${mod.author}</p>
            <p><strong>Version:</strong> ${mod.version}</p>
            <p><strong>Status:</strong> ${mod.enabled ? 'ENABLED' : 'DISABLED'}</p>
            <p><strong>Settings:</strong></p>
            <p>${mod.config.replace(/\n/g, '<br>')}</p>
        `;
        modal.style.display = 'block';
    }
}

// Remove mod
function removeMod(modId) {
    if (confirm('Are you sure you want to remove this mod?')) {
        const mods = JSON.parse(localStorage.getItem('mods'));
        const filteredMods = mods.filter(m => m.id !== modId);
        localStorage.setItem('mods', JSON.stringify(filteredMods));
        renderMods(filteredMods);
        showNotification('Mod removed successfully');
    }
}

// Close modal
function closeModal() {
    document.getElementById('config-modal').style.display = 'none';
}

// Show notification
function showNotification(message) {
    const notificationsEnabled = document.getElementById('notifications').checked;
    
    if (notificationsEnabled) {
        // Simple notification (in a real app, use a toast library)
        alert(message);
    }
}

// Load settings from localStorage
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('settings')) || {
        autoUpdate: true,
        notifications: true
    };
    
    document.getElementById('auto-update').checked = settings.autoUpdate;
    document.getElementById('notifications').checked = settings.notifications;
    
    // Save settings when changed
    document.getElementById('auto-update').addEventListener('change', saveSettings);
    document.getElementById('notifications').addEventListener('change', saveSettings);
}

// Save settings to localStorage
function saveSettings() {
    const settings = {
        autoUpdate: document.getElementById('auto-update').checked,
        notifications: document.getElementById('notifications').checked
    };
    
    localStorage.setItem('settings', JSON.stringify(settings));
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('config-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}