// Configuration Variables
const CONFIG = {
  fbPixelId: '1918000408864284',
  backRedirectUrl: 'https://salmoprohibido.netlify.app/',
  // Time in seconds to reveal the Hotmart button (defaults to 10 minutes/600 seconds, set to 5 or 10 seconds for testing if desired)
  ctaRevealDelaySeconds: 600, 
  vturbEmbedUrl: 'https://scripts.converteai.net/d37063ac-e5eb-428f-9351-a8f62d357e96/players/6a2b3a98e5d8124db97186d6/v4/embed.html'
};

// Quiz Application State
let state = {
  currentScreen: 1,
  gender: null,
  age: null,
  moneyFlow: null,
  priestDiscovery: null,
  manifestationExperience: null,
  lessWorkMoreWealth: null,
  thoughtsOnWealth: null,
  oracionProsperity: null,
  greatestDesire: null,
  manifestationItems: ["Abundancia financiera", "Paz interior"] // Default selections
};

// List of all manifestation options for Screen 14
const MANIFESTATION_OPTIONS = [
  "Abundancia financiera", "Paz interior", "Alegría", "Motivación", 
  "Confianza", "Relaciones saludables", "Propósito", "Gratitud", 
  "Claridad mental", "Pensamientos positivos", "Salud física", "Enfoque", 
  "Evolución personal", "Productividad", "Manifestación de deseos", "Paciencia"
];

// Helper to track Facebook Pixel events
function trackPixelEvent(eventName, eventData = {}) {
  // Frontend pixel call
  if (typeof window.fbq === 'function') {
    try {
      window.fbq('track', eventName, eventData);
      console.log(`Facebook Pixel tracked event: ${eventName}`, eventData);
    } catch (err) {
      console.warn("fbq call failed:", err);
    }
  }

  // Conversions API event dispatch (Simulado, idéntico al original)
  const token = "EAANDgjFpfN8BR2tXixbNgSOOfReLtQpJLpRRfydjrmdmcDg2W8BZB7EuQuh9LbvngjIO1nMpdvvl0uZBfhCYGnUqA3peNUebCsgr10BZBhDRNikxLCqmHvB5RmjweIVHaklsk7EBZCvqF5gpkZA1YAZCuEPvZADizh4g7qO7RQ8mQf6VJPxCWjDbKZB9wXyJYZAoieQZDZD";
  const capiData = {
    data: [{
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      action_source: "website",
      event_id: `evt_${eventName}_${Date.now()}`,
      user_data: {
        em: ["68f9a26372d8296a849f8cd6cbbe2a95c022878bf9dc5e43eb9eb87e83df757a"],
        client_user_agent: navigator.userAgent
      },
      custom_data: eventData
    }]
  };

  fetch(`https://graph.facebook.com/v19.0/${CONFIG.fbPixelId}/events?access_token=${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(capiData)
  }).catch(err => console.warn("CAPI post request failed:", err));
}

// Back-button hijacking (Redirect popstate)
window.history.pushState(null, "", window.location.href);
window.addEventListener("popstate", function () {
  window.location.href = CONFIG.backRedirectUrl;
});

// Initialize Checklist on Screen 14
function initChecklist() {
  const grid = document.getElementById('manifest-grid');
  grid.innerHTML = '';
  
  MANIFESTATION_OPTIONS.forEach(option => {
    const isSelected = state.manifestationItems.includes(option);
    
    const btn = document.createElement('button');
    btn.className = `checklist-btn ${isSelected ? 'selected' : ''}`;
    btn.setAttribute('type', 'button');
    btn.innerHTML = `
      <div class="check-box">
        <svg class="icon-check ${isSelected ? '' : 'hidden'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <span class="checklist-label">${option}</span>
    `;
    
    btn.addEventListener('click', () => {
      toggleManifestationItem(option, btn);
    });
    
    grid.appendChild(btn);
  });
}

function toggleManifestationItem(option, btnElement) {
  const index = state.manifestationItems.indexOf(option);
  const icon = btnElement.querySelector('.icon-check');
  
  if (index > -1) {
    state.manifestationItems.splice(index, 1);
    btnElement.classList.remove('selected');
    icon.classList.add('hidden');
  } else {
    state.manifestationItems.push(option);
    btnElement.classList.add('selected');
    icon.classList.remove('hidden');
  }
}

// Navigation flow controller
function goToScreen(targetIndex) {
  const currentScreenEl = document.getElementById(`screen-${state.currentScreen}`);
  const targetScreenEl = document.getElementById(`screen-${targetIndex}`);
  
  if (!targetScreenEl) return;
  
  // Transition out active screen
  currentScreenEl.classList.add('exit');
  
  setTimeout(() => {
    currentScreenEl.classList.remove('active', 'exit');
    targetScreenEl.classList.add('active');
    
    state.currentScreen = targetIndex;
    updateProgressBar();
    
    // Scroll container to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Pixel event logic based on screen index
    if (targetIndex === 1) {
      trackPixelEvent("PageView");
    } else if (targetIndex === 2) {
      trackPixelEvent("Lead", { step: "GenderSelected", gender: state.gender });
    } else if (targetIndex === 5) {
      trackPixelEvent("ViewContent", { step: "HistoricRevelation" });
    } else if (targetIndex === 12) {
      trackPixelEvent("SubmitApplication", { step: "WishSelection", wish: state.greatestDesire });
    } else if (targetIndex === 15) {
      setupFinalScreen();
    }
  }, 300);
}

// Progress Bar update
function updateProgressBar() {
  const progressHeader = document.getElementById('progress-header');
  const progressFill = document.getElementById('progress-fill');
  const progressText = document.getElementById('progress-percentage');
  
  // Hide progress bar on first and last screen
  if (state.currentScreen === 1 || state.currentScreen === 15) {
    progressHeader.classList.add('hidden');
    return;
  }
  
  progressHeader.classList.remove('hidden');
  
  // Calculate percentage (Screens 2 through 14)
  const percentage = Math.min(100, Math.round((state.currentScreen - 1) / 14 * 100));
  
  progressFill.style.width = `${percentage}%`;
  progressText.textContent = `${percentage}%`;
}

// Final Screen construction
function setupFinalScreen() {
  trackPixelEvent("ViewContent", { step: "FinalVSL" });
  
  // Set summary values
  document.getElementById('summary-gender').textContent = state.gender || "Devoto";
  document.getElementById('summary-age').textContent = state.age ? `${state.age} años` : "No especificado";
  
  // Format greatest desire text
  let desireText = "Paz / Abundancia";
  if (state.greatestDesire) {
    desireText = state.greatestDesire.replace(/_/g, " ");
  }
  document.getElementById('summary-desire').textContent = desireText;
  
  // Manifestation channels count
  document.getElementById('summary-channels').textContent = `${state.manifestationItems.length} canales`;
  
  // Assemble Vturb Embed URL with parameters
  const query = window.location.search || "?";
  const urlEncodedHref = encodeURIComponent(window.location.href);
  const playerSrc = `${CONFIG.vturbEmbedUrl}${query}&vl=${urlEncodedHref}`;
  
  const playerIframe = document.getElementById('vturb-player');
  playerIframe.src = playerSrc;
  
  // Start Vturb Player Listener (to track button clicks inside player)
  const vturbListener = function (event) {
    try {
      if (!event.data) return;
      let isCtaClick = false;
      
      if (typeof event.data === "string") {
        const lowerData = event.data.toLowerCase();
        if (lowerData.includes("smartplayer-click-button") || 
            lowerData.includes("smartplayer-custom-cta-click") || 
            lowerData.includes("smartplayer-default-cta-click") || 
            lowerData.includes("smartplayer-cta-click") || 
            lowerData.includes("smartplayer-button-click")) {
          isCtaClick = true;
        }
      } else if (typeof event.data === "object") {
        const eventType = event.data.type || event.data.event || "";
        if (typeof eventType === "string") {
          const lowerType = eventType.toLowerCase();
          if (lowerType.includes("smartplayer-click-button") || 
              lowerType.includes("smartplayer-custom-cta-click") || 
              lowerType.includes("smartplayer-default-cta-click") || 
              lowerType.includes("smartplayer-cta-click") || 
              lowerType.includes("smartplayer-button-click")) {
            isCtaClick = true;
          }
        }
      }
      
      if (isCtaClick) {
        console.log("VTurb button click detected in script, tracking InitiateCheckout!");
        trackPixelEvent("InitiateCheckout", { source: "VTurbButton", step: "CTA_Clicked" });
      }
    } catch (err) {
      console.warn("Error parsing message event from player:", err);
    }
  };
  
  window.addEventListener("message", vturbListener);
  
  // CTA Reveal Timer
  setTimeout(() => {
    const ctaContainer = document.getElementById('cta-container');
    if (ctaContainer) {
      ctaContainer.classList.remove('hidden');
      ctaContainer.style.display = "block";
    }
  }, CONFIG.ctaRevealDelaySeconds * 1000);
}

// Event Listeners setup
document.addEventListener('DOMContentLoaded', () => {
  // Track PageView initially
  trackPixelEvent("PageView");

  // Screen 1: Gender Buttons
  document.getElementById('opt-hombre').addEventListener('click', () => {
    state.gender = 'Hombre';
    document.getElementById('opt-hombre').classList.add('selected');
    setTimeout(() => goToScreen(2), 350);
  });
  
  document.getElementById('opt-mujer').addEventListener('click', () => {
    state.gender = 'Mujer';
    document.getElementById('opt-mujer').classList.add('selected');
    setTimeout(() => goToScreen(2), 350);
  });

  // Dynamic Options (Screens 2, 3, 4, 6, 7, 9, 11, 12)
  const screensWithOptions = [
    { id: 2, stateKey: 'age' },
    { id: 3, stateKey: 'moneyFlow' },
    { id: 4, stateKey: 'priestDiscovery' },
    { id: 6, stateKey: 'manifestationExperience' },
    { id: 7, stateKey: 'lessWorkMoreWealth' },
    { id: 9, stateKey: 'thoughtsOnWealth' },
    { id: 11, stateKey: 'oracionProsperity' },
    { id: 12, stateKey: 'greatestDesire' }
  ];

  screensWithOptions.forEach(screenInfo => {
    const screenEl = document.getElementById(`screen-${screenInfo.id}`);
    const buttons = screenEl.querySelectorAll('.option-btn');
    
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove selection from siblings
        buttons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        
        // Save to state
        state[screenInfo.stateKey] = btn.getAttribute('data-value') || btn.textContent.trim();
        
        // Wait and proceed
        setTimeout(() => {
          goToScreen(screenInfo.id + 1);
        }, 350);
      });
    });
  });

  // Next Buttons (Screens 5, 8, 10, 13)
  const screensWithNext = [5, 8, 10, 13];
  screensWithNext.forEach(screenId => {
    const screenEl = document.getElementById(`screen-${screenId}`);
    const nextBtn = screenEl.querySelector('[data-next]');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToScreen(screenId + 1);
      });
    }
  });

  // Screen 14 Checklist Submit
  initChecklist();
  document.getElementById('btn-reveal').addEventListener('click', () => {
    goToScreen(15);
  });

  // Track CTA clicks manually as backup
  const ctaBtn = document.getElementById('cta-button');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      trackPixelEvent("InitiateCheckout", { source: "CTA_Button", step: "CTA_Clicked" });
    });
  }
});
