import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const API = "http://localhost:8000/api";
export const APP_NAME = publicRuntimeConfig.APP_NAME;
export const DOMAIN = "http://localhost:3000";