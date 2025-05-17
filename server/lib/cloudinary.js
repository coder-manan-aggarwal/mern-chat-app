import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';

// Force reload .env (bypass caching)
config({ path: '.env', override: true });

// Throw explicit error if vars missing
const requiredVars = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
requiredVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Missing ${varName} in environment variables`);
  }
});

// Initialize with validation
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Test connection immediately
cloudinary.api.ping()
  .then(() => console.log('✅ Cloudinary verified'))
  .catch(err => {
    console.error('❌ Cloudinary test failed:', err.message);
    process.exit(1); // Crash if Cloudinary fails
  });

export default cloudinary;