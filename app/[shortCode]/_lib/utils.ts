export function anonymizeIp(ip: string): string | null {
  if (!ip) return null;

  // Per IPv4
  if (ip.includes(".")) {
    return ip.split(".").slice(0, 3).join(".") + ".0";
  }
  // Per IPv6
  else if (ip.includes(":")) {
    return ip.split(":").slice(0, 4).join(":") + ":0:0:0:0";
  }

  return null;
}
