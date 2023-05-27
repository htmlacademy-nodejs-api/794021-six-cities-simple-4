import * as crypto from 'node:crypto';

export function createPasswordHash(text: string, salt: string): string {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(text).digest('hex');
}


export function isEmailValid(email: string): boolean {
  const emailRegex = /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email);
}
