import { createCipheriv, randomBytes, scryptSync } from 'crypto';

export function encryptPassword(password: string): string {
    const iv = randomBytes(16);
    const key = scryptSync(password, 'salt', 32);
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    return iv.toString('hex') + ':' + cipher.update(password, 'utf8', 'hex') + cipher.final('hex');
}
