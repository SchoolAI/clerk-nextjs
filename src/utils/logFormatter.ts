import type { LogEntry } from './debugLogger';

// Move to shared once clerk/shared is used in clerk/nextjs
const maskSecretKey = (str: any) => {
  if (!str || typeof str !== 'string') {
    return str;
  }

  try {
    return (str || '').replace(/^(sk_(live|test)_)(.+?)(.{3})$/, '$1*********$4');
  } catch (e) {
    return '';
  }
};

export const logFormatter = (entry: LogEntry, i: number) => {
  return (Array.isArray(entry) ? entry : [entry]).map(entry => {
    if (typeof entry === 'string') {
      return { logKey: i, content: maskSecretKey(entry) };
    }

    const entries = Object.fromEntries(Object.entries(entry).map(([k, v]) => [k, maskSecretKey(v)]));
    if (!('logKey' in entries)) {
      entries.logKey = i;
    }

    return entries;
  });
};
