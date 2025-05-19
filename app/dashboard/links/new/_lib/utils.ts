export function generateShortCode(length?: string): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
  const charactersLength = characters.length;
  const shortCodeLength = length ? parseInt(length) : 21;

  let result = "";
  for (let i = 0; i < shortCodeLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
