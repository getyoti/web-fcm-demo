import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Create ssl directory if it doesn't exist
const sslDir: string = path.join(__dirname, 'ssl');
if (!fs.existsSync(sslDir)) {
  fs.mkdirSync(sslDir, { recursive: true });
}

console.log('Generating SSL certificate with 50-year validity...');

// Platform-specific subject format
const isWindows: boolean = os.platform() === 'win32';
const subjectParam: string = isWindows ? '"/CN=localhost"' : '/CN=localhost';

// Platform-specific path handling
const keyPath: string = path.join(sslDir, 'key.pem');
const certPath: string = path.join(sslDir, 'cert.pem');

try {
  // Generate a certificate valid for 50 years (18250 days)
  const command: string = [
    'openssl req -x509',
    '-newkey rsa:4096',
    `-keyout "${keyPath}"`,
    `-out "${certPath}"`,
    '-days 18250',
    '-nodes',
    `-subj ${subjectParam}`
  ].join(' ');

  console.log(`Running command: ${command}`);
  execSync(command, { stdio: 'inherit' });

  console.log('Certificate generated successfully!');
  console.log('Certificate location:', certPath);
  console.log('Key location:', keyPath);
} catch (error) {
  console.error('Failed to generate certificate:', error);
  console.error('Make sure OpenSSL is installed on your system.');
  console.error('On Windows, you can install it via Chocolatey: choco install openssl');
  console.error('On macOS, you can install it via Homebrew: brew install openssl');
  process.exit(1);
}
