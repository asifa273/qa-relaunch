import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

//web app base
export const WEB_BASE = process.env.PARABANK_WEB ?? 'https://parabank.parasoft.com/parabank';

//API base
export const API_BASE = process.env.PARABANK_API ?? `${WEB_BASE}/services/bank`;

//DEMO CREDENTIALS
export const DEMO = { username: 'john', password: 'demo' } as const;





