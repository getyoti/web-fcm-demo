const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create ssl directory if it doesn't exist
const sslDir = path.join(__dirname, 'ssl');
if (!fs.existsSync(sslDir)) {
  fs.mkdirSync(sslDir, { recursive: true });
}

console.log('Generating SSL certificate with 50-year validity...');

// Generate a certificate valid for 50 years (18250 days)
try {
  execSync(
    'openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 18250 -nodes -subj "/CN=localhost"',
    { stdio: 'inherit' }
  );
  console.log('Certificate generated successfully!');
  console.log('Certificate location:', path.join(sslDir, 'cert.pem'));
  console.log('Key location:', path.join(sslDir, 'key.pem'));
} catch (error) {
  console.error('Failed to generate certificate:', error);
}