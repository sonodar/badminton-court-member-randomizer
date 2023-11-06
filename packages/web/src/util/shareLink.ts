export function makeShareLink(sharedId?: string) {
  return sharedId ? `${location.origin}?s=${sharedId}` : undefined;
}

export function parseShareLink(location: Location) {
  const params = new URLSearchParams(location.search);
  const sharedId = params.get("s");
  return sharedId || undefined;
}
