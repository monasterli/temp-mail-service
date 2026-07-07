const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789';
export function randomMailbox(length = 10) {
  return Array.from({ length }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
}
export function tempAddress() {
  const domain = process.env.TEMP_MAIL_DOMAIN || 'example.com';
  return `${randomMailbox()}@${domain}`;
}
