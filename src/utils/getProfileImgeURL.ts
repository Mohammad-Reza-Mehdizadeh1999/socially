export function getProfileImageURL(image: string | null) {
  if (!image) return null;

  // already a usable URL (remote, bundled asset, blob/data) -> use as is
  if (/^(https?:|data:|blob:|\/)/.test(image)) return image;

  return `https://1p5nep1spk.ucarecd.net/${image}/`;
}