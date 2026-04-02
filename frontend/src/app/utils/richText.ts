export function sanitizeRichText(input: string) {
  if (!input) return "";

  return input
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/javascript:/gi, "");
}

export function formatRichText(input: string) {
  if (!input) return "";
  const sanitized = sanitizeRichText(input);
  if (/<[a-z][\s\S]*>/i.test(sanitized)) {
    return sanitized;
  }
  return sanitized.replace(/\n/g, "<br />");
}
