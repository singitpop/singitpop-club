const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

console.log("Checking AWS Credentials...");
console.log("AWS_ACCESS_KEY_ID exists:", !!process.env.AWS_ACCESS_KEY_ID);
console.log("AWS_ACCESS_KEY_ID params:", process.env.AWS_ACCESS_KEY_ID ? process.env.AWS_ACCESS_KEY_ID.length : 0);
console.log("AWS_SECRET_ACCESS_KEY exists:", !!process.env.AWS_SECRET_ACCESS_KEY);
console.log("AWS_SECRET_ACCESS_KEY params:", process.env.AWS_SECRET_ACCESS_KEY ? process.env.AWS_SECRET_ACCESS_KEY.length : 0);
console.log("AWS_S3_BUCKET:", process.env.AWS_S3_BUCKET);
