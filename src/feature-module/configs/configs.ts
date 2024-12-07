// src/config/configuration.ts
import * as dotenv from 'dotenv';

const envPath = process.env.NODE_ENV === 'production'
  ? './src/feature-module/configs/.env.production'  // For production environment
  : './src/feature-module/configs/.env.development';  // Default to development


dotenv.config({ path: envPath });

export const configuration = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: process.env.MONGO_URI,
});

const configs = configuration();  // Get configuration values
export default configs;
