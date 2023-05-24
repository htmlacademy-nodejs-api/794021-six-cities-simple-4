import * as crypto from 'node:crypto';

export function createPasswordHash(text: string, salt: string): string {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(text).digest('hex');
}
