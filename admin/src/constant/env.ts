export const isProd = process.env.NODE_ENV === 'production';
export const isLocal = process.env.NODE_ENV === 'development';

export const showLogger = isLocal
  ? true
  : process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true' ?? false;

export const baseURL = isLocal ? 'http://localhost:3000' : process.env.BASE_URL ?? 'http://localhost:3000'
