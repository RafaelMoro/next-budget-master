type CookieObject = {
  name: string;
  value: string;
  attributes: Record<string, string | boolean>;
};

export function parseSetCookie(setCookieStr: string): CookieObject {
  const parts = setCookieStr.split(";").map(part => part.trim());
  const [nameValue, ...attrParts] = parts;

  // Split cookie name and value
  const [name, ...valueParts] = nameValue.split("=");
  const value = valueParts.join("=");

  // Parse attributes
  const attributes: Record<string, string | boolean> = {};
  for (const attr of attrParts) {
    const [attrName, ...attrValueParts] = attr.split("=");
    if (attrValueParts.length > 0) {
      attributes[attrName] = attrValueParts.join("=");
    } else {
      attributes[attrName] = true; // For boolean flags like HttpOnly, Secure, etc.
    }
  }

  return { name, value, attributes };
}