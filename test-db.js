
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("MONGODB_URI is not defined.");
  process.exit(1);
}

console.log("URI Length:", uri.length);
console.log("Raw Chars (first 100):");
let charCodes = [];
for (let i = 0; i < Math.min(uri.length, 100); i++) {
  charCodes.push(uri.charCodeAt(i));
}
console.log(JSON.stringify(charCodes));

// Try to clean it internally for the test
const cleanUri = uri.replace(/[\s\t\n\r]/g, '').replace(/\.net\.net/g, '.net');
console.log("Attempting clean connection to:", cleanUri.replace(/\/\/.*@/, "//USER:PASSWORD@"));

mongoose.connect(cleanUri)
  .then(() => {
    console.log("SUCCESS: Connected with internal cleaning!");
    process.exit(0);
  })
  .catch(err => {
    console.error("FAILURE:", err.message);
    process.exit(1);
  });
