export function getFallbackText(name: string) {
  const nameParts = name.split(" ");
  if (nameParts.length > 1) {
    return `${nameParts[0][0]}${nameParts[1][0]}`;
  }
  return nameParts[0][0];
}
