
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("MONGODB_URI is not defined in the environment.");
  process.exit(1);
}

// Log a safe version of the URI
const safeUri = uri.replace(/\/\/.*@/, "//USER:PASSWORD@");
console.log("Testing connection to:", safeUri);

mongoose.connect(uri)
  .then(() => {
    console.log("SUCCESS: Connected to MongoDB!");
    process.exit(0);
  })
  .catch(err => {
    console.error("FAILURE: Could not connect to MongoDB.");
    console.error("Error Detail:", err.message);
    process.exit(1);
  });
