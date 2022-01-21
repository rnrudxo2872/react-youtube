export function getURLParams(url: string, key: string) {
  const result = new URLSearchParams(url).get(key);

  if (!result) throw new Error(`${key} is not Query Parameter.`);
  return result;
}
