export const envs = {
  GITHUB_TOKEN: import.meta.env.VITE_GITHUB_TOKEN as string,
  GITHUB_API_URL: 'https://api.github.com',
} as const;

export type TEnvList = keyof typeof envs;
