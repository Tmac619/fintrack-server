// ngrok-setup.js
import ngrok from 'ngrok';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async function() {
  try {
    // Connect to ngrok and expose port 5000 where our app is running
    const url = await ngrok.connect({
      addr: 5000, // The port our app is running on
      region: 'us',
    });
    
    console.log('=================================================');
    console.log(`🚀 Your app is now accessible at: ${url}`);
    console.log('=================================================');
    console.log('1. Scan this QR code with your phone camera:');
    console.log(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`);
    console.log('2. Or type the URL into your phone browser');
    console.log('=================================================');
    console.log('Press Ctrl+C to stop the tunnel');
    
  } catch (error) {
    console.error('Error setting up ngrok tunnel:', error);
  }
})();