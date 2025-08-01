import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

const sslDir: string = path.join(__dirname, 'ssl');
// Create ssl directory if it doesn't exist
fs.existsSync(sslDir) && fs.lstatSync(sslDir)?.isDirectory() || fs.mkdirSync(sslDir, { recursive: true });

console.log('Generating SSL certificate with 1-year validity...');

// Platform-specific subject format
const isWindows: boolean = os.platform() === 'win32';
const subjectParam: string = isWindows ? '"/CN=localhost"' : '/CN=localhost';

// Platform-specific path handling
const keyPath: string = path.join(sslDir, 'key.pem');
const certPath: string = path.join(sslDir, 'cert.pem');

try {
  // Generate a certificate valid for 1 year (365 days)
  const command = "openssl";
  const args = [
    'req', '-x509',
    '-newkey', 'rsa:4096',
    '-keyout', keyPath,
    '-out', certPath,
    '-days', '365',
    '-nodes',
    '-subj', subjectParam,
  ];

  console.log('Generating certificate');
  spawnSync(command, args, { encoding: 'utf-8', stdio: 'inherit' });

  console.log('Certificate generated successfully!');
  console.log('Certificate location:', certPath);
  console.log('Key location:', keyPath);
} catch (error) {
  console.error('Failed to generate certificate:', error);
  console.error('Make sure OpenSSL is installed on your system.');
  process.exit(1);
}
