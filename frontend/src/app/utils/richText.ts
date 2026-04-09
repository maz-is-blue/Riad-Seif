export function sanitizeRichText(input: string) {
  if (!input) return "";

  return input
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/javascript:/gi, "");
}

function decodeBasicEntities(input: string) {
  return input
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&amp;/gi, "&");
}

export function formatRichText(input: string) {
  if (!input) return "";
  const sanitized = sanitizeRichText(input);
  const decoded = sanitizeRichText(decodeBasicEntities(sanitized));
  if (/<[a-z][\s\S]*>/i.test(decoded)) {
    return decoded;
  }
  return decoded.replace(/\n/g, "<br />");
}
