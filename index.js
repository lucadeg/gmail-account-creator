const { spawn } = require('child_process');
const path = require('path');

console.log('--- SPAWNING AUTO GMAIL CREATOR PROCESS via wrapper.js ---');
const exePath = path.join(__dirname, 'auto_gmail_creator.exe');

// Spawn the executable inside its own directory
const child = spawn(exePath, [], {
  cwd: __dirname,
  stdio: ['pipe', 'pipe', 'pipe']
});

// Stream stdout to parent console
child.stdout.on('data', (data) => {
  process.stdout.write(data);
});

// Stream stderr to parent console
child.stderr.on('data', (data) => {
  process.stderr.write(data);
});

// Stream parent stdin input to child stdin
process.stdin.on('data', (data) => {
  child.stdin.write(data);
});

child.on('close', (code) => {
  console.log(`\n--- Wrapper child process exited with code ${code} ---`);
  process.exit(code);
});
