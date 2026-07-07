import crypto from 'crypto';

const MAX_SIGNATURE_AGE_SECONDS = 15 * 60;
const SHA256_HEX_LENGTH = 64;

export function verifyMailgunSignature(timestamp: string, token: string, signature: string) {
  const key = process.env.MAILGUN_WEBHOOK_SIGNING_KEY;
  if (!key) return false;

  if (!timestamp || !token || !signature) return false;

  const timestampSeconds = Number(timestamp);
  if (!Number.isFinite(timestampSeconds)) return false;

  const ageSeconds = Math.abs(Date.now() / 1000 - timestampSeconds);
  if (ageSeconds > MAX_SIGNATURE_AGE_SECONDS) return false;

  if (!/^[a-f0-9]+$/i.test(signature) || signature.length !== SHA256_HEX_LENGTH) {
    return false;
  }

  const expected = crypto.createHmac('sha256', key).update(timestamp + token).digest('hex');
  const expectedBuffer = Buffer.from(expected, 'hex');
  const signatureBuffer = Buffer.from(signature, 'hex');

  if (expectedBuffer.length !== signatureBuffer.length) return false;

  return crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
}
