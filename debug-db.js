
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Basic .env.local parser
function loadEnv() {
  const envPath = path.join(__dirname, '.env.local');
  if (!fs.existsSync(envPath)) {
    console.error('.env.local not found at', envPath);
    process.exit(1);
  }
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      let value = valueParts.join('=').trim();
      // Remove quotes if present
      value = value.replace(/^["']|["']$/g, '');
      process.env[key.trim()] = value;
    }
  });
}

loadEnv();

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI not found in environment');
  process.exit(1);
}

console.log('Using URI (cleaned):', uri.replace(/:\/\/.*@/, '://USER:PASS@'));

async function test() {
  try {
    console.log('Attempting to connect...');
    await mongoose.connect(uri, { bufferCommands: false });
    console.log('Connected successfully!');

    // Check if we can access the 'users' collection
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections in database:', collections.map(c => c.name));

    await mongoose.disconnect();
    console.log('Disconnected.');
    process.exit(0);
  } catch (err) {
    console.error('Connection failed:', err.message);
    if (err.stack) console.error(err.stack);
    process.exit(1);
  }
}

test();
