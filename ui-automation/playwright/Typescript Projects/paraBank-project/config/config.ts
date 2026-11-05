//web app base
export const WEB_BASE = process.env.PARABANK_WEB ?? 'https://parabank.parasoft.com/parabank/about.htm';

//API base
export const API_BASE = process.env.PARABANK_API ?? `${WEB_BASE}/service/bank`;

//DEMO CREDENTIALS
export const DEMO = { username: 'john', password: 'demo' };


