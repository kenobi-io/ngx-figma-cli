//TODO: replace hard code url
export function imageUrl(hash: string): string {
  const squash = hash.split('-').join('');
  return `url(https://s3-us-west-2.amazonaws.com/figma-alpha/img/${squash.substring(
    0,
    4
  )}/${squash.substring(4, 8)}/${squash.substring(8)})`;
}
