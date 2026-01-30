
const fs = require('fs');
const path = require('path');

function checkEnv() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) {
    console.log('.env.local not found');
    return;
  }

  const content = fs.readFileSync(envPath, 'utf8');
  const lines = content.split('\n');
  
  const vars = [
    'MONGODB_URI',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET'
  ];

  vars.forEach(v => {
    const line = lines.find(l => l.startsWith(v + '='));
    if (line) {
      const value = line.split('=')[1].trim();
      console.log(`${v} is defined. Length: ${value.length}`);
      if (v === 'MONGODB_URI') {
        if (value.includes('clusterO')) console.log('WARNING: MONGODB_URI contains "clusterO" instead of "cluster0"');
        if (value.includes('.net.net')) console.log('WARNING: MONGODB_URI contains ".net.net"');
        if (/\s/.test(value)) console.log('WARNING: MONGODB_URI contains whitespace');
      }
    } else {
      console.log(`${v} is MISSING`);
    }
  });
}

checkEnv();
