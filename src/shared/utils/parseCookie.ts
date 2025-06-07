type CookieObject = {
  name: string;
  value: string;
  options: Record<string, unknown>;
};

export function parseSetCookieString(setCookieStr: string): CookieObject {
  // Split into [name=value, ...attributes]
  const parts = setCookieStr.split(";").map(s => s.trim());
  const [nameValue, ...attrParts] = parts;
  const eqIdx = nameValue.indexOf("=");
  const name = nameValue.substring(0, eqIdx);
  const value = nameValue.substring(eqIdx + 1);

  // Parse attributes into an object
  const attrs: Record<string, string | boolean> = {};
  for (const attr of attrParts) {
    const [attrName, ...attrValParts] = attr.split("=");
    const key = attrName.trim();
    if (attrValParts.length > 0) {
      attrs[key] = attrValParts.join("=").trim();
    } else {
      attrs[key] = true;
    }
  }

  // Map Set-Cookie attributes to Next.js cookie options
  const options: Record<string, unknown> = {};
  if (attrs["Max-Age"]) options.maxAge = Number(attrs["Max-Age"]);
  if (attrs["Path"]) options.path = attrs["Path"];
  if (typeof attrs["Expires"] === "string") options.expires = new Date(attrs["Expires"]);
  if (attrs["HttpOnly"]) options.httpOnly = true;
  if (attrs["Secure"]) options.secure = true;
  if (attrs["SameSite"]) options.sameSite = attrs["SameSite"];

  return { name, value, options };
}