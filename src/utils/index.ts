export const getPlatform = (value: string): string | undefined => {
  if (value === 'true') return 'Fastify';
  if (value === 'false') return 'Express';
  return;
};
