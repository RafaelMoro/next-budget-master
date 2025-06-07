type CookieObject = {
  name: string;
  value: string;
};

export function getCookieProps(setCookieStr: string): CookieObject {
  const parts = setCookieStr.split(";").map(s => s.trim());
  const [nameValue] = parts;
  const eqIdx = nameValue.indexOf("=");
  const name = nameValue.substring(0, eqIdx);
  const value = nameValue.substring(eqIdx + 1);

  return { name, value };
}