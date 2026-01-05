const fs = require('fs');
const { exec } = require('child_process');

// Generate a simple beep sound using ffmpeg (if available) or provide instructions
console.log('Generating notification sound...');

// Check if ffmpeg is available
exec('ffmpeg -version', (error) => {
  if (error) {
    console.log('ffmpeg not found. Please add a notification sound file manually.');
    console.log('\nOptions:');
    console.log('1. Download a free notification sound from:');
    console.log('   - https://www.soundjay.com/buttons/sounds/button-09a.mp3');
    console.log('   - https://notificationsounds.com/notification-sounds');
    console.log('   - https://zapsplat.com/sound-effect-categories/pings-and-beeps/');
    console.log('\n2. Save it as: public/notification.mp3');
    console.log('\n3. Recommended: Short, pleasant notification sound (0.5-2 seconds)');
    return;
  }

  // Generate a simple beep sound using ffmpeg
  exec('ffmpeg -f lavfi -i "sine=frequency=800:duration=0.3" -af "volume=0.5" public/notification.mp3', (error) => {
    if (error) {
      console.error('Error generating sound:', error);
      return;
    }
    console.log('✓ Notification sound generated: public/notification.mp3');
  });
});
