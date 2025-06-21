---
layout: default
title: Chat
permalink: /chat/
---

<div class="main-content">
  <div class="glass-card" style="margin-bottom: 2rem;">
    <header class="page-header" style="margin-bottom: 0; text-align: center;">
      <h1>Chat</h1>
      <p>Join the conversation</p>
    </header>
  </div>
  
  <!-- Chat Layout with Sidebar -->
  <div style="display: flex; gap: 1rem; min-height: 700px; max-width: 100%;">
    <!-- Left Sidebar - Channel Buttons -->
    <div class="glass-card" style="width: 180px; flex-shrink: 0; padding: 1.25rem;">
      <h3 style="margin: 0 0 1.25rem 0; color: var(--theme-text); text-align: center; font-size: 1.1rem;">Channels</h3>
      
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <button class="glass-button channel-btn active" 
                onclick="setChannel('general')" 
                data-channel="general"
                style="width: 100%; text-align: left; justify-content: flex-start; padding: 0.75rem 1rem; font-size: 0.9rem;">
          #general
        </button>
        
        <button class="glass-button channel-btn" 
                onclick="setChannel('technology')" 
                data-channel="technology"
                style="width: 100%; text-align: left; justify-content: flex-start; padding: 0.75rem 1rem; font-size: 0.9rem;">
          #technology
        </button>
        
        <button class="glass-button channel-btn" 
                onclick="setChannel('venting')" 
                data-channel="venting"
                style="width: 100%; text-align: left; justify-content: flex-start; padding: 0.75rem 1rem; font-size: 0.9rem;">
          #venting
        </button>
        
        <button class="glass-button channel-btn" 
                onclick="setChannel('chill')" 
                data-channel="chill"
                style="width: 100%; text-align: left; justify-content: flex-start; padding: 0.75rem 1rem; font-size: 0.9rem;">
          #chill
        </button>
      </div>
    </div>
    
    <!-- Right Side - Chat Embed -->
    <div class="glass-card" style="flex-grow: 1; padding: 1.25rem; min-width: 0;">
      <h3 style="margin: 0 0 1rem 0; color: var(--theme-text); font-size: 1.1rem;">#general</h3>
      
      <iframe id="chatFrame"
        src="https://kiwiirc.com/nextclient/#irc://irc.libera.chat/#general"
        title="IRC Chat"
        style="width: 100%; height: 600px; border: none; border-radius: 12px; background: var(--glass-bg-light);">
      </iframe>
    </div>
  </div>
</div>

<style>
  .channel-btn {
    transition: all 0.3s ease;
    border: 1px solid var(--glass-border-light);
  }
  
  .channel-btn:hover {
    transform: translateX(5px);
    border-color: var(--theme-accent);
  }
  
  .channel-btn.active {
    background-color: var(--theme-accent);
    border-color: var(--theme-accent);
    color: var(--text-white);
  }
  
  .channel-btn.active:hover {
    background-color: var(--theme-accent);
    transform: translateX(5px);
  }
  
  /* Responsive adjustments for chat layout */
  @media (max-width: 768px) {
    .main-content > div:last-child {
      flex-direction: column;
    }
    
    .main-content > div:last-child > div:first-child {
      width: 100%;
      margin-bottom: 1rem;
    }
    
    .main-content > div:last-child > div:first-child > div {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .main-content > div:last-child > div:first-child .glass-button {
      width: auto;
      flex: 1;
      min-width: 120px;
    }
  }
</style>

<script src="{{ "/assets/js/irc-themer.js" | relative_url }}" defer></script>
<script>
  function setChannel(channelName) {
    console.log('Switching to channel:', channelName);
    
    const iframe = document.getElementById('chatFrame');
    const server = 'irc.libera.chat';
    
    // Construct the new URL with the correct Kiwi IRC format
    const newUrl = `https://kiwiirc.com/nextclient/#irc://${server}/#${channelName}`;
    
    console.log('New URL:', newUrl);
    
    // Update the iframe source
    iframe.src = newUrl;

    // Update active button
    document.querySelectorAll('.channel-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-channel="${channelName}"]`).classList.add('active');
    
    // Update channel title
    document.querySelector('.glass-card:last-child h3').textContent = `#${channelName}`;

    // Let the themer know something happened so it can reapply theming
    setTimeout(() => {
      window.dispatchEvent(new Event('channelChanged'));
    }, 100);
  }
</script> 