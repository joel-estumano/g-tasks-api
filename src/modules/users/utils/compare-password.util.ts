import { createDecipheriv, scryptSync } from 'crypto';

export function comparePassword(storedPassword: string, suppliedPassword: string): boolean {
    const [iv, encryptedPassword] = storedPassword.split(':');
    const key = scryptSync(suppliedPassword, 'salt', 32);
    const decipher = createDecipheriv('aes-256-ctr', key, Buffer.from(iv, 'hex'));
    const decrypted = decipher.update(encryptedPassword, 'hex', 'utf8') + decipher.final('utf8');

    return suppliedPassword === decrypted;
}
