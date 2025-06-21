document.addEventListener('DOMContentLoaded', () => {
  // Only run if we are on a page with the chat iframe
  const chatFrame = document.getElementById('chatFrame');
  if (!chatFrame) return;

  const getThemeColors = () => {
    const computedStyles = getComputedStyle(document.documentElement);
    return {
      bg: computedStyles.getPropertyValue('--bg-primary').trim(),
      fg: computedStyles.getPropertyValue('--text-primary').trim(),
      nick: computedStyles.getPropertyValue('--theme-accent').trim(),
      text: computedStyles.getPropertyValue('--text-secondary').trim(),
      server: computedStyles.getPropertyValue('--glass-bg-heavy').trim(),
      channel: computedStyles.getPropertyValue('--bg-secondary').trim(),
      input: computedStyles.getPropertyValue('--glass-bg-light').trim(),
      border: computedStyles.getPropertyValue('--glass-border-light').trim()
    };
  };

  const sanitizeColor = (colorStr) => {
    colorStr = colorStr.trim();
    if (colorStr.startsWith('#')) {
      return colorStr.substring(1);
    }
    if (colorStr.startsWith('rgb')) {
      return rgbToHex(colorStr);
    }
    console.warn(`Could not sanitize color: ${colorStr}. Using fallback.`);
    return '2c2d30'; // A neutral dark fallback
  };

  const rgbToHex = (rgb) => {
    let match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/);
    if (!match) return '000000';
    
    function hex(x) {
      return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return hex(match[1]) + hex(match[2]) + hex(match[3]);
  };
  
  const updateIrcTheme = () => {
    let currentSrc = chatFrame.src;
    
    // Extract the channel from the current URL
    const channelMatch = currentSrc.match(/#irc:\/\/[^\/]+\/#([^?]+)/);
    const channel = channelMatch ? channelMatch[1] : 'general';
    
    console.log('Updating IRC theme for channel:', channel);
    
    const colors = getThemeColors();
    
    // Translate our theme variables to KiwiIRC URL parameters
    const themeParams = new URLSearchParams({
      theme: 'cli', // Use a basic theme as a starting point
      fg: sanitizeColor(colors.fg),
      bg: sanitizeColor(colors.bg),
      nick: sanitizeColor(colors.nick),
      'channel-background': sanitizeColor(colors.channel),
      'server-background': sanitizeColor(colors.server),
      'input-background': sanitizeColor(colors.input),
      'border-color': sanitizeColor(colors.border)
    }).toString();
    
    // Construct the new URL with theme parameters
    const newSrc = `https://kiwiirc.com/nextclient/?${themeParams}#irc://irc.libera.chat/#${channel}`;

    console.log('New themed URL:', newSrc);

    if (chatFrame.src !== newSrc) {
      chatFrame.src = newSrc;
    }
  };

  // Update theme initially
  setTimeout(updateIrcTheme, 500);

  // Update theme when the site's theme changes
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Give the CSS variables a moment to update
      setTimeout(updateIrcTheme, 100);
    });
  });

  // Also update when the channel changes
  window.addEventListener('channelChanged', updateIrcTheme);
}); 